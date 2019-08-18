Types::ResourceType = GraphQL::ObjectType.define do
  name 'Resource'

  field :id, !types.ID
  field :finding_aid_link, types.String
  field :digital_copy_link, types.String
  field :citation_source, types.String
  field :cataloging_notes, types.String
  field :publication_status, types.String

  field :film, (-> { !Types::FilmType })
  field :material_format, (-> { Types::MaterialFormatType })

  field :collections, ( -> { !types[Types::CollectionType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })

  field :created_at, !types.String
  field :updated_at, !types.String
end
