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
    argument :composer, types.String
    argument :country, types.String
    argument :dateRangeEnd, types.Int
    argument :dateRangeStart, types.Int
    argument :director, types.String
    argument :keyword, types.String
    argument :productionCompany, types.String
    argument :title, types.String
  end

  option :filter, type: WorkFilter, with: :apply_filter
  option :first, type: types.Int, with: :apply_first
  option :skip, type: types.Int, with: :apply_skip

  def normalize_filters(value, branches = [])
    if value.keys.length == 1 && value['OR'].present?
      # OR is only value in this scope, do nothing
    else
      scope = Work.all.joins(:composers, :country, :directors, :production_companies)

      # add ilike SQL conditions
      if value['composer'] && !value['composer'].blank?
        scope = scope.where('composers.name ILIKE ?', "%#{value['composer']}%")
      end

      if value['country'] && !value['country'].blank?
        scope = scope.where('countries.name ILIKE ?', "%#{value['country']}%")
      end

      if value['dateRangeEnd'] && !value['dateRangeEnd'].blank?
        scope = scope.where('year <= ?', value['dateRangeEnd'])
      end

      if value['dateRangeStart'] && !value['dateRangeStart'].blank?
        scope = scope.where('year >= ?', value['dateRangeStart'])
      end

      if value['director'] && !value['director'].blank?
        scope = scope.where('directors.name ILIKE ?', "%#{value['director']}%")
      end

      if value['productionCompany'] && !value['productionCompany'].blank?
        scope = scope.where('production_companies.name ILIKE ?', "%#{value['productionCompany']}%")
      end

      if value['title'] && !value['title'].blank?
        scope = scope.where('title ILIKE ? OR secondary_title ILIKE ? OR alias_alternates ILIKE ?', "%#{value['title']}%", "%#{value['title']}%", "%#{value['title']}%")
      end

      if value['keyword'] && !value['keyword'].blank?
        keyword = "%#{value['keyword']}%"
        # keyword always OR
        scope = scope.where('title ILIKE ? OR secondary_title ILIKE ? OR alias_alternates ILIKE ?', keyword, keyword, keyword)
        .or(scope.where('composers.name ILIKE ?', keyword))
        .or(scope.where('countries.name ILIKE ?', keyword))
        .or(scope.where('directors.name ILIKE ?', keyword))
        .or(scope.where('production_companies.name ILIKE ?', keyword))
      end

      branches << scope
    end

    # continue to normalize down
    value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?

    branches
  end
end
