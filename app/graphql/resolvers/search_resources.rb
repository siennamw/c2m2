require 'search_object/plugin/graphql'

class Resolvers::SearchResources
  include SearchObject.module(:graphql)
  include SearchHelper

  scope { Resource.all }

  # return type
  type !types[Types::ResourceType]

  option :first, type: types.Int, with: :apply_first
  option :skip, type: types.Int, with: :apply_skip
  option :sorting, type: Types::Inputs::SortingFilter, with: :apply_sorting

  def sorting_valid?
    Resource.column_names.include?(sorting['field'])
  end
end
