class Resolvers::CreateWork < GraphQL::Function
  # arguments passed as "args"
  argument :id, types.ID
  argument :title, !types.String
  argument :secondary_title, types.String
  argument :alias_alternates, types.String
  argument :imdb_link, types.String

  argument :year, !types.Int

  argument :country_id, types.ID
  argument :media_type_id, !types.ID

  argument :composer_ids, types[types.ID]
  argument :director_ids, types[types.ID]
  argument :orchestrator_ids, types[types.ID]
  argument :production_company_ids, types[types.ID]

  # return type from the mutation
  type Types::WorkType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    attributes = {
      id: args[:id],
      title: args[:title],
      secondary_title: args[:secondary_title],
      alias_alternates: args[:alias_alternates],
      imdb_link: args[:imdb_link],

      year: args[:year],

      country_id: args[:country_id],
      media_type_id: args[:media_type_id],

      composer_ids: args[:composer_ids],
      director_ids: args[:director_ids],
      orchestrator_ids: args[:orchestrator_ids],
      production_company_ids: args[:production_company_ids],

      created_by: ctx[:current_user],
    }

    record = Work.create!(attributes)

    if record.persisted?
      Event.create!(
        created_by: record.created_by,
        entity_id: record.id,
        name: 'CreateWork',
        payload: attributes.filter do |k|
          !%i[id created_by].include?(k)
        end
      )
    end

    # return new record
    record
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
