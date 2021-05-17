require 'test_helper'

class Resolvers::FetchResourceByIdTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::FetchResourceById.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    )
    media_type = MediaType.create!(name: 'a media type', created_by: @cataloger)
    work = Work.create!(
      title: 'a film',
      media_type: media_type,
      year: 1990,
      created_by: @cataloger,
    )
    material_format = MaterialFormat.create!(
      name: 'material format',
      created_by: @cataloger,
    )

    @resource = Resource.create!(
      created_by: @cataloger,
      material_format: material_format,
      publication_status: 'approved',
      work: work,
    )
    @draft_resource = Resource.create!(
      created_by: @cataloger,
      material_format: material_format,
      publication_status: 'draft',
      work: work,
    )
    @deleted_resource = Resource.create!(
      created_by: @cataloger,
      material_format: material_format,
      publication_status: 'approved',
      work: work,
      deleted: true,
    )
  end

  test 'returns expected record if not deleted and not draft' do
    result = find(id: @resource.id)
    assert_equal @resource, result
  end

  test 'if user not authenticated and record is draft, raises RecordNotFound error' do
    assert_raises ActiveRecord::RecordNotFound do
      find(id: @draft_resource.id)
    end
  end

  test 'if user not authenticated and record is deleted, raises RecordNotFound error' do
    assert_raises ActiveRecord::RecordNotFound do
      find(id: @deleted_resource.id)
    end
  end

  test 'if user authenticated, returns expected record even if draft' do
    result = find({ id: @draft_resource.id }, @cataloger)
    assert_equal @draft_resource, result
  end

  test 'if user authenticated, returns expected record even if deleted' do
    result = find({ id: @deleted_resource.id }, @cataloger)
    assert_equal @deleted_resource, result
  end
end
