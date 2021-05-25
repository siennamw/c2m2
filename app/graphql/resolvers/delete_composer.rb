class Resolvers::DeleteComposer < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID

  # return type from the mutation
  type types.Boolean

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new('Authentication required')
    end

    composer = Composer.find(args[:id])

    unless composer.deletable
      raise GraphQL::ExecutionError.new('Record has associated works and cannot be deleted')
    end

    composer.destroy!
    true
  end
end
