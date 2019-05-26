Types::WorkType = GraphQL::ObjectType.define do
  name 'Work'

  field :id, !types.ID
  field :title, !types.String
  field :secondary_title, types.String
  field :year, !types.Int
  field :finding_aid_link, types.String
  field :digital_copy_link, types.String
  field :citation_source, types.String
  field :alias_alternates, types.String
  field :cataloging_notes, types.String
  field :publication_status, types.String

  field :country, (-> { Types::CountryType })
  field :media_type, (-> { Types::MediaTypeType })
  field :material_format, (-> { Types::MaterialFormatType })
  field :cataloger, (-> { Types::CatalogerType })

  field :collections, ( -> { !types[Types::CollectionType] })
  field :composers, ( -> { !types[Types::ComposerType] })
  field :directors, ( -> { !types[Types::DirectorType] })
  field :orchestrators, ( -> { !types[Types::ComposerType] })
  field :production_companies, ( -> { !types[Types::ProductionCompanyType] })
  field :publishers, ( -> { !types[Types::PublisherType] })
end
