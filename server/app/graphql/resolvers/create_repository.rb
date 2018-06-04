class Resolvers::CreateRepository < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :location, !types.String
  argument :website, types.String

  # return type from the mutation
  type Types::RepositoryType

  # the mutation method
  def call(_obj, args, _ctx)
    Repository.create!(
    name: args[:name],
    location: args[:location],
    website: args[:website],
    )
  end
end
