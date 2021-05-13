Types::ResourceType = GraphQL::ObjectType.define do
  name 'Resource'

  field :id, !types.ID
  field :digital_copy_link, types.String
  field :citation_source, types.String
  field :cataloging_notes, types.String
  field :publication_status, types.String

  field :deleted, types.Boolean
  field :deletable, types.Boolean # calls object.deletable

  field :work, (-> { !Types::WorkType })
  field :material_format, (-> { Types::MaterialFormatType })

  field :collections, ( -> { !types[Types::CollectionType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })

  field :created_at, !types.String
  field :updated_at, !types.String
end
