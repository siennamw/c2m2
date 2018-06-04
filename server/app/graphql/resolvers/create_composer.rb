class Resolvers::CreateComposer < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :imdb_link, types.String

  # return type from the mutation
  type Types::ComposerType

  # the mutation method
  def call(_obj, args, _ctx)
    Composer.create!(
    name: args[:name],
    imdb_link: args[:imdb_link],
    )
  end
end
