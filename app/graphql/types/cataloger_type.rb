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
  field :works, ( -> { !types[Types::WorkType] })
  field :material_formats, ( -> { !types[Types::MaterialFormatType] })
  field :media_types, ( -> { !types[Types::MediaTypeType] })
  field :production_companies, ( -> { !types[Types::ProductionCompanyType] })
  field :repositories, ( -> { !types[Types::RepositoryType] })
  field :resources, ( -> { !types[Types::ResourceType] })

  field :catalogers_as_updater, ( -> { !types[Types::CatalogerType] })
  field :collections_as_updater, ( -> { !types[Types::CollectionType] })
  field :composers_as_updater, ( -> { !types[Types::ComposerType] })
  field :countries_as_updater, ( -> { !types[Types::CountryType] })
  field :directors_as_updater, ( -> { !types[Types::DirectorType] })
  field :works_as_updater, ( -> { !types[Types::WorkType] })
  field :material_formats_as_updater, ( -> { !types[Types::MaterialFormatType] })
  field :media_types_as_updater, ( -> { !types[Types::MediaTypeType] })
  field :production_companies_as_updater, ( -> { !types[Types::ProductionCompanyType] })
  field :repositories_as_updater, ( -> { !types[Types::RepositoryType] })
  field :resources_as_updater, ( -> { !types[Types::ResourceType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })

  field :created_at, !types.String
  field :updated_at, !types.String

  field :is_self, types.Boolean do
    resolve ->(obj, args, ctx) {
      obj.id == ctx[:current_user].id
    }
  end
end
