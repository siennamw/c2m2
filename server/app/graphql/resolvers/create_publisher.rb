class Resolvers::CreatePublisher < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :contact_info, types.String

  # return type from the mutation
  type Types::PublisherType

  # the mutation method
  def call(_obj, args, _ctx)
    Publisher.create!(
    name: args[:name],
    contact_info: args[:contact_info],
    )
  end
end
