class Resolvers::CreateDirector < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :imdb_link, types.String

  # return type from the mutation
  type Types::DirectorType

  # the mutation method
  def call(_obj, args, _ctx)
    Director.create!(
    name: args[:name],
    imdb_link: args[:imdb_link],
    )
  end
end
