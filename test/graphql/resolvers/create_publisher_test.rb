require 'test_helper'

class Resolvers::CreatePublisherTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreatePublisher.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')
  end

  test 'creating new publisher' do
    name = 'Publishing Co'
    contact_info = 'pubco.com'

    publisher = perform(
      name: name,
      contact_info: contact_info,
    )

    assert publisher.persisted?
    assert_equal publisher.name, name
    assert_equal publisher.contact_info, contact_info
    assert_equal publisher.created_by, @cataloger
  end
end
