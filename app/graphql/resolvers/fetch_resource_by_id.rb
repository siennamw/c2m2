class Resolvers::FetchResourceById < GraphQL::Function
  type Types::ResourceType
  description 'Resource by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    if ctx[:current_user]
      Resource.find(args[:id])
    else
      # filter out deleted and draft entries for unauthenticated users
      Resource.active.where.not(publication_status: 'draft').find(args[:id])
    end
  end
end
