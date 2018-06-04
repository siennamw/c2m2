require 'search_object/plugin/graphql'

class Resolvers::WorksSearch
  # include SearchObject for GraphQL
  include SearchObject.module(:graphql)

  # scope is starting point for search
  scope { Work.all }

  # return type
  type !types[Types::WorkType]

  # inline input type definition for the advance filter
  WorkFilter = GraphQL::InputObjectType.define do
    name 'WorkFilter'

    argument :OR, -> { types[WorkFilter] }
    argument :title_contains, types.String
    argument :secondary_title_contains, types.String
    argument :alias_alternates_contains, types.String
  end

  # when "filter" is passed "apply_filter" would be called to narrow the scope
  option :filter, type: WorkFilter, with: :apply_filter

  # apply_filter recursively loops through "OR" branches
  def apply_filter(scope, value)
    # normalize filters from nested OR structure, to flat scope list
    branches = normalize_filters(value).reduce { |a, b| a.or(b) }
    scope.merge branches
  end

  def normalize_filters(value, branches = [])
    # add like SQL conditions
    scope = Work.all
    scope = scope.where('title LIKE ?', "%#{value['title_contains']}%") if value['title_contains']
    scope = scope.where('secondary_title LIKE ?', "%#{value['secondary_title_contains']}%") if value['secondary_title_contains']
    scope = scope.where('alias_alternates LIKE ?', "%#{value['alias_alternates_contains']}%") if value['alias_alternates_contains']

    branches << scope

    # continue to normalize down
    value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?

    branches
  end
end
