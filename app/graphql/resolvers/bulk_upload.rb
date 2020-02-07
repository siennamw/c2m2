require 'csv'

class Resolvers::BulkUpload < GraphQL::Function
  # arguments passed as "args"
  argument :file, ApolloUploadServer::Upload
  argument :model, !types.String

  # return type
  type types[!types.String]

  # the mutation method
  # _obj - is parent object, which in this case is nil
  # args - are the arguments passed
  # _ctx - is the GraphQL context
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    # only admins can do mass imports
    unless ctx[:current_user].admin
      raise GraphQL::ExecutionError.new("You do not have permission to do bulk uploads")
    end

    model_name_to_model = {
      'cataloger' => Cataloger,
      'collection' => Collection,
      'composer' => Composer,
      'country' => Country,
      'director' => Director,
      'production_company' => ProductionCompany,
      'repository' => Repository,
      'resource' => Resource,
      'work' => Work,
    }

    unless model_name_to_model[args[:model]]
      raise GraphQL::ExecutionError.new("Model not recognized or not suitable for bulk import. Import failed")
    end

    import(
      model_name_to_model[args[:model]],
      args[:file].tempfile,
      ctx[:current_user]
    )
  end

  def import(model, tempfile, current_user)
    results = []

    CSV.foreach(tempfile, headers: true) do |row|
      attributes = row.to_h
      attributes[:created_by] = current_user

      new_entry = model.new(attributes)

      result = new_entry.save! ? 'Success' : 'Failure'
      results.push(result)

    rescue ActiveRecord::RecordInvalid => e
      results.push(e)
    rescue ActiveModel::UnknownAttributeError => e
      results.push(e)
    end

    results
  end
end
