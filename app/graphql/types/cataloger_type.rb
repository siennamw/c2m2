Types::CatalogerType = GraphQL::ObjectType.define do
  name 'Cataloger'

  field :id, !types.ID
  field :name, !types.String
  field :email, !types.String
  field :description, types.String
  field :admin, types.Boolean

  field :catalogers, ( -> { !types[Types::CatalogerType] })
  field :collections, ( -> { !types[Types::CollectionType] })
  field :composers, ( -> { !types[Types::ComposerType] })
  field :countries, ( -> { !types[Types::CountryType] })
  field :directors, ( -> { !types[Types::DirectorType] })
  field :material_formats, ( -> { !types[Types::MaterialFormatType] })
  field :media_types, ( -> { !types[Types::MediaTypeType] })
  field :production_companies, ( -> { !types[Types::ProductionCompanyType] })
  field :publishers, ( -> { !types[Types::PublisherType] })
  field :repositories, ( -> { !types[Types::RepositoryType] })
  field :works, ( -> { !types[Types::WorkType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })

  field :is_self, types.Boolean do
    resolve ->(obj, args, ctx) {
      obj.id == ctx[:current_user].id
    }
  end
end
