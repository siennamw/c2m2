require 'test_helper'

class Resolvers::CreatePublisherTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreatePublisher.new.call(nil, args, {})
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
  end
end
