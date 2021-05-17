require 'search_object/plugin/graphql'

class Resolvers::SearchComposers
  # include SearchObject for GraphQL
  include SearchObject.module(:graphql)
  # include search helpers (apply_filter, apply_first, and apply_skip)
  include SearchHelper

  # scope is starting point for search
  scope { context && context[:current_user] ? Composer.all : Composer.active }

  # return type
  type !types[Types::ComposerType]

  ComposerFilter = GraphQL::InputObjectType.define do
    name 'ComposerFilter'

    argument :OR, -> { types[ComposerFilter] }
    argument :name_contains, types.String
  end

  option :filter, type: ComposerFilter, with: :apply_filter
  option :first, type: types.Int, with: :apply_first
  option :include_deleted, type: types.Boolean, default: false, with: :apply_include_deleted
  option :skip, type: types.Int, with: :apply_skip
  option :sorting, type: Types::Inputs::SortingFilter, with: :apply_sorting

  def sorting_valid?
    Composer.column_names.include?(sorting['field'])
  end

  def normalize_filters(value, branches = [])
    scope = Composer.all

    # add like SQL conditions
    scope = scope.where('name ILIKE ?', "%#{value['name_contains']}%") if value['name_contains']

    branches << scope

    # continue to normalize down
    value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?

    branches
  end
end
