class Resolvers::CreateResource < GraphQL::Function
  # arguments passed as "args"
  argument :digital_copy_link, types.String
  argument :citation_source, types.String
  argument :cataloging_notes, types.String

  argument :publication_status, types.String

  argument :work_id, !types.ID
  argument :material_format_id, !types.ID

  argument :collection_ids, types[types.ID]

  # return type from the mutation
  type Types::ResourceType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    publication_status = args[:publication_status] || 'draft'

    Resource.create!(
      digital_copy_link: args[:digital_copy_link],
      citation_source: args[:citation_source],
      cataloging_notes: args[:cataloging_notes],
      publication_status: publication_status,

      work_id: args[:work_id],
      material_format_id: args[:material_format_id],

      created_by: ctx[:current_user],

      collection_ids: args[:collection_ids],
    )

  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
