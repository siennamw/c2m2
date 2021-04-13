require 'search_object/plugin/graphql'

class Resolvers::SearchCatalogers
  # include SearchObject for GraphQL
  include SearchObject.module(:graphql)
  # include search helpers (apply_filter, apply_first, apply_skip, apply_sorting)
  include SearchHelper

  # scope is starting point for search
  scope { Cataloger.all }

  # return type
  type !types[Types::CatalogerType]

  CatalogerFilter = GraphQL::InputObjectType.define do
    name 'CatalogerFilter'

    argument :OR, -> { types[CatalogerFilter] }
    argument :name_contains, types.String
  end

  option :filter, type: CatalogerFilter, with: :apply_filter
  option :first, type: types.Int, with: :apply_first
  option :skip, type: types.Int, with: :apply_skip
  option :sorting, type: Types::Inputs::SortingFilter, with: :apply_sorting

  def sorting_valid?
    Cataloger.column_names.include?(sorting['field'])
  end

  def normalize_filters(value, branches = [])
    scope = Cataloger.all

    # add like SQL conditions
    scope = scope.where('name ILIKE ?', "%#{value['name_contains']}%") if value['name_contains']

    branches << scope

    # continue to normalize down
    value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?

    branches
  end
end
