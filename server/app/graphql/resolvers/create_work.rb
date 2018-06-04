class Resolvers::CreateWork < GraphQL::Function
  # arguments passed as "args"
  argument :title, !types.String
  argument :secondary_title, types.String
  argument :year, !types.Int

  argument :finding_aid_link, types.String
  argument :digital_copy_link, types.String
  argument :rights_holder, types.String
  argument :citation_source, types.String
  argument :alias_alternates, types.String
  argument :cataloging_notes, types.String

  argument :country_id, types.Int
  argument :media_type_id, !types.Int
  argument :material_format_id, !types.Int

  argument :collection_ids, ( -> { !types[Types::CollectionType] })
  argument :composer_ids, ( -> { !types[Types::ComposerType] })
  argument :director_ids, ( -> { !types[Types::DirectorType] })
  argument :production_company_ids, ( -> { !types[Types::ProductionCompanyType] })
  argument :publisher_ids, ( -> { !types[Types::PublisherType] })

  # return type from the mutation
  type Types::WorkType

  # the mutation method
  def call(_obj, args, ctx)
    Work.create!(
      title: args[:title],
      secondary_title: args[:secondary_title],
      year: args[:year],

      finding_aid_link: args[:finding_aid_link],
      digital_copy_link: args[:digital_copy_link],
      rights_holder: args[:rights_holder],
      citation_source: args[:citation_source],
      alias_alternates: args[:alias_alternates],
      cataloging_notes: args[:cataloging_notes],

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
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
