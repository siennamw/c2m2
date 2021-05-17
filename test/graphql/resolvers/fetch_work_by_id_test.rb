require 'test_helper'

class Resolvers::FetchWorkByIdTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::FetchWorkById.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    )
    media_type = MediaType.create!(name: 'a media type', created_by: @cataloger)
    @work = Work.create!(
      title: 'a film',
      media_type: media_type,
      year: 1990,
      created_by: @cataloger,
    )
    @deleted_work = Work.create!(
      title: 'a deleted film',
      media_type: media_type,
      year: 1990,
      created_by: @cataloger,
      deleted: true,
    )
  end

  test 'returns expected record if not deleted' do
    result = find(id: @work.id)
    assert_equal @work, result
  end

  test 'if user not authenticated and record is deleted, raises RecordNotFound error' do
    assert_raises ActiveRecord::RecordNotFound do
      find(id: @deleted_work.id)
    end
  end

  test 'if user authenticated, returns expected record even if deleted' do
    result = find({ id: @deleted_work.id }, @cataloger)
    assert_equal @deleted_work, result
  end
end
