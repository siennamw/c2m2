require 'test_helper'

class Resolvers::BulkUploadTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::BulkUpload.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @admin = Cataloger.create!(
      admin: true,
      email: 'admin@email.com',
      name: 'admin',
    )

    @non_admin = Cataloger.create!(
      email: 'non-admin@email.com',
      name: 'non-admin',
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
