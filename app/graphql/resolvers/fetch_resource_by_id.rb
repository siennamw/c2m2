class Resolvers::FetchResourceById < GraphQL::Function
  type Types::ResourceType
  description 'Resource by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    if ctx[:current_user]
      Resource.find(args[:id])
    else
      # filter out draft entries for unauthenticated users
      Resource.where.not(publication_status: 'draft').find(args[:id])
    end
  rescue ActiveRecord::RecordNotFound
    GraphQL::ExecutionError.new('Entry not found')
  end
end
