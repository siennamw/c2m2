class Resolvers::CreateCataloger < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :email, !types.String
  argument :description, types.String

  # return type from the mutation
  type Types::CatalogerType

  # the mutation method
  # _obj - is parent object, which in this case is nil
  # args - are the arguments passed
  # _ctx - is the GraphQL context
  def call(_obj, args, _ctx)
    Cataloger.create!(
    name: args[:name],
    email: args[:email],
    description: args[:description],
    )
  end
end
