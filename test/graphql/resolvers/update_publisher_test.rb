require 'test_helper'

class Resolvers::UpdatePublisherTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdatePublisher.new.call(nil, args, { current_user: @new_cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @publisher = Publisher.create!(
      name: 'a company',
      contact_info: 'company.com',
      created_by: @cataloger
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )
  end

  test 'updating a publisher' do
    name = 'Publishing Co'
    contact_info = 'pubco.com'

    updated_publisher = perform(
      id: @publisher.id,
      name: name,
      contact_info: contact_info,
    )

    assert updated_publisher.persisted?
    assert_equal updated_publisher.id, @publisher.id
    assert_equal updated_publisher.name, name
    assert_equal updated_publisher.contact_info, contact_info
    assert_equal updated_publisher.created_by, @cataloger
    assert_equal updated_publisher.updated_by, @new_cataloger
  end
end
