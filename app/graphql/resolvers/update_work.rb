class Resolvers::UpdateWork < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID

  argument :title, !types.String
  argument :secondary_title, types.String
  argument :year, !types.Int

  argument :finding_aid_link, types.String
  argument :digital_copy_link, types.String
  argument :rights_holder, types.String
  argument :citation_source, types.String
  argument :alias_alternates, types.String
  argument :cataloging_notes, types.String

  argument :country_id, types.ID
  argument :media_type_id, !types.ID
  argument :material_format_id, !types.ID

  argument :collection_ids, types[types.ID]
  argument :composer_ids, types[types.ID]
  argument :director_ids, types[types.ID]
  argument :production_company_ids, types[types.ID]
  argument :publisher_ids, types[types.ID]

  # return type from the mutation
  type Types::WorkType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    work = Work.find_by(id: args[:id])

    # TODO: temporary until admin role is implemented
    user_is_admin = false

    # only admin can set to 'approved'
    if !user_is_admin && args[:publication_status] == 'approved'
      new_status = 'provisional'
    else
      new_status = args[:publication_status]
    end

    work.update(
      title: args[:title],
      secondary_title: args[:secondary_title],
      year: args[:year],

      finding_aid_link: args[:finding_aid_link],
      digital_copy_link: args[:digital_copy_link],
      rights_holder: args[:rights_holder],
      citation_source: args[:citation_source],
      alias_alternates: args[:alias_alternates],
      cataloging_notes: args[:cataloging_notes],
      publication_status: new_status,

      country_id: args[:country_id],
      media_type_id: args[:media_type_id],
      material_format_id: args[:material_format_id],

      cataloger: ctx[:current_user],

      collection_ids: args[:collection_ids],
      composer_ids: args[:composer_ids],
      director_ids: args[:director_ids],
      production_company_ids: args[:production_company_ids],
      publisher_ids: args[:publisher_ids]
    )

    # return work
    work
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
