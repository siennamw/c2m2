class Resolvers::CreateCollection < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :description, types.String
  argument :repository_id, !types.Int

  # return type from the mutation
  type Types::CollectionType

  # the mutation method
  def call(_obj, args, _ctx)
    repository = Repository.find(args[:repository_id])
    return unless repository

    Collection.create!(
    name: args[:name],
    description: args[:description],
    repository: repository,
    )
  end
end
