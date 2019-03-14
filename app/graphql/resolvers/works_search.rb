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

    # given at top level, cascades into all WorkFilters nested in ORs
    argument :include_drafts, types.Boolean

    argument :OR, -> { types[WorkFilter] }
    argument :title_contains, types.String
    argument :secondary_title_contains, types.String
    argument :alias_alternates_contains, types.String
  end

  # when "filter" is passed "apply_filter" would be called to narrow the scope
  option :filter, type: WorkFilter, with: :apply_filter
  option :first, type: types.Int, with: :apply_first
  option :skip, type: types.Int, with: :apply_skip

  def apply_first(scope, value)
    scope.limit(value)
  end

  def apply_skip(scope, value)
    scope.offset(value)
  end

  # apply_filter recursively loops through "OR" branches
  def apply_filter(scope, value)
    # normalize filters from nested OR structure, to flat scope list
    branches = normalize_filters(value, value['include_drafts']).reduce { |a, b| a.or(b) }
    scope.merge branches
  end

  def normalize_filters(value, include_drafts, branches = [])
    # add like SQL conditions

    # exclude drafts by default
    if include_drafts
      scope = Work.all
    else
      scope = Work.where.not(publication_status: 'draft')
    end

    scope = scope.where('title ILIKE ?', "%#{value['title_contains']}%") if value['title_contains']
    scope = scope.where('secondary_title ILIKE ?', "%#{value['secondary_title_contains']}%") if value['secondary_title_contains']
    scope = scope.where('alias_alternates ILIKE ?', "%#{value['alias_alternates_contains']}%") if value['alias_alternates_contains']

    branches << scope

    # continue to normalize down
    value['OR'].reduce(branches) { |s, v| normalize_filters(v, include_drafts, s) } if value['OR'].present?

    branches
  end
end
