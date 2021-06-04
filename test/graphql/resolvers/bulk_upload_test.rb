require 'test_helper'

class Resolvers::BulkUploadTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::BulkUpload.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @admin = Cataloger.create!(
      admin: true,
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )

    @non_admin = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )

    @file_duplicates = Rack::Test::UploadedFile.new(file_fixture('bulk_upload/composers_duplicates.csv'), 'text/csv')
    @file_extra_field = Rack::Test::UploadedFile.new(file_fixture('bulk_upload/composers_extra_field.csv'), 'text/csv')
    @file_good = Rack::Test::UploadedFile.new(file_fixture('bulk_upload/composers_good.csv'), 'text/csv')
    @file_missing_required = Rack::Test::UploadedFile.new(file_fixture('bulk_upload/composers_missing_required_field.csv'), 'text/csv')
  end

  test 'non-admin cataloger cannot bulk upload' do
    assert_raises GraphQL::ExecutionError do
      perform(
        {
          model: 'composer',
          file: @file_good,
        },
        @non_admin
      )
    end
  end

  test 'duplicates will cause row to fail import with ActiveRecord::RecordInvalid' do
    results = perform(
      {
        model: 'composer',
        file: @file_duplicates,
      },
      @admin
    )

    assert_equal results.length, 2
    assert_equal results[0], 'Success'
    assert_instance_of ActiveRecord::RecordInvalid, results[1]
  end

  test 'extra fields will cause row to fail import with ActiveModel::UnknownAttributeError' do
    results = perform(
      {
        model: 'composer',
        file: @file_extra_field,
      },
      @admin
    )
    assert_equal results.length, 1
    assert_instance_of ActiveModel::UnknownAttributeError, results[0]
  end

  test 'good data will import successfully' do
    composer_count = Composer.count
    count = 3

    results = perform(
      {
        model: 'composer',
        file: @file_good,
      },
      @admin
    )

    assert_equal results.length, 3
    results.each do |result|
      assert_equal result, 'Success'
    end
    assert_equal composer_count + count, Composer.count
  end

  test 'does not create Events for rows that failed to import' do
    event_count = Event.count
    expected_successes = 1

    results = perform(
      {
        model: 'composer',
        file: @file_duplicates,
      },
      @admin
    )

    assert_equal results.length, 2
    assert_equal event_count + expected_successes, Event.count
  end

  test 'creates expected Event for each row successfully imported' do
    event_count = Event.count
    count = 3

    results = perform(
      {
        model: 'composer',
        file: @file_good,
      },
      @admin
    )

    assert_equal results.length, count
    assert_equal event_count + count, Event.count

    Composer.order('created_at DESC').last(count).each do |composer|
      event = Event.find_by(entity_id: composer.id)
      event_payload = event.payload.to_h

      # event record
      assert_equal composer.created_by, event.created_by
      assert_equal 'CreateComposer', event.name
      assert_equal composer.id, event.entity_id

      # event payload
      assert_equal composer.name, event_payload['name']
      if composer.imdb_link
        assert_equal composer.imdb_link, event_payload['imdb_link']
      else
        assert_nil event_payload['imdb_link']
      end
    end
  end

  test 'missing fields will cause row to fail import with ActiveRecord::RecordInvalid' do
    results = perform(
      {
        model: 'composer',
        file: @file_missing_required,
      },
      @admin
    )

    assert_equal results.length, 1
    assert_instance_of ActiveRecord::RecordInvalid, results[0]
  end
end
