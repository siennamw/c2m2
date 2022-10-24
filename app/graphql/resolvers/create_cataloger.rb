class Resolvers::CreateCataloger < GraphQL::Function
  # arguments passed as "args"
  argument :id, types.ID
  argument :name, !types.String
  argument :email, !types.String
  argument :description, types.String
  argument :admin, types.Boolean

  # return type from the mutation
  type Types::CatalogerType

  # the mutation method
  # _obj - is parent object, which in this case is nil
  # args - are the arguments passed
  # _ctx - is the GraphQL context
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new('Authentication required')
    end

    # only admins can create other catalogers
    unless ctx[:current_user].admin
      raise GraphQL::ExecutionError.new('Only administrators can create catalogers')
    end

    attributes = {
      name: args[:name],
      email: args[:email],
      description: args[:description],
      admin: !!args[:admin],
      id: args[:id],
      created_by: ctx[:current_user],
    }

    record = Cataloger.create!(attributes)

    if record.persisted?
      Event.create!(
        created_by: record.created_by,
        entity_id: record.id,
        name: 'CreateCataloger',
        payload: attributes.filter do |k|
          !%i[id created_by].include?(k)
        end
      )
    end

    # Tell the UserMailer to send a welcome email asynchronously
    UserMailer.welcome_email(record).deliver_now

    # return new record
    record
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
