require 'search_object/plugin/graphql'

class Resolvers::SearchCollections
  # include SearchObject for GraphQL
  include SearchObject.module(:graphql)
  # include search helpers (apply_filter, apply_first, and apply_skip)
  include SearchHelper

  # scope is starting point for search
  scope { Collection.all }

  # return type
  type !types[Types::CollectionType]

  CollectionFilter = GraphQL::InputObjectType.define do
    name 'CollectionFilter'

    argument :OR, -> { types[CollectionFilter] }
    argument :name_contains, types.String
  end

  option :filter, type: CollectionFilter, with: :apply_filter
  option :first, type: types.Int, with: :apply_first
  option :skip, type: types.Int, with: :apply_skip
  option :sorting, type: Types::Inputs::SortingFilter, default: { 'field' => 'name', 'is_ascending' => true }, with: :apply_sorting

  def sorting_valid?
    Collection.column_names.include?(sorting['field'])
  end

  def normalize_filters(value, branches = [])
    scope = Collection.all

    # add like SQL conditions
    scope = scope.where('name ILIKE ?', "%#{value['name_contains']}%") if value['name_contains']

    branches << scope

    # continue to normalize down
    value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?

    branches
  end
end
