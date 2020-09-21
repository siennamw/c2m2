require 'search_object/plugin/graphql'

class Resolvers::SearchWorks
  # include SearchObject for GraphQL
  include SearchObject.module(:graphql)
  # include search helpers (apply_filter, apply_first, and apply_skip)
  include SearchHelper

  # scope is starting point for search
  scope { Work.all }

  # return type
  type !types[Types::WorkType]

  # inline input type definition for the advanced filter
  WorkFilter = GraphQL::InputObjectType.define do
    name 'WorkFilter'

    argument :OR, -> { types[WorkFilter] }
    argument :title_contains, types.String
    argument :secondary_title_contains, types.String
    argument :alias_alternates_contains, types.String
  end

  option :filter, type: WorkFilter, with: :apply_filter
  option :first, type: types.Int, with: :apply_first
  option :skip, type: types.Int, with: :apply_skip

  def normalize_filters(value, branches = [])
    scope = Work.all

    # add like SQL conditions
    scope = scope.where('title ILIKE ?', "%#{value['title_contains']}%") if value['title_contains']
    scope = scope.where('secondary_title ILIKE ?', "%#{value['secondary_title_contains']}%") if value['secondary_title_contains']
    scope = scope.where('alias_alternates ILIKE ?', "%#{value['alias_alternates_contains']}%") if value['alias_alternates_contains']

    branches << scope

    # continue to normalize down
    value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?

    branches
  end
end
