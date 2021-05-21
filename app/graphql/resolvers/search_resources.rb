require 'search_object/plugin/graphql'

class Resolvers::SearchResources
  include SearchObject.module(:graphql)
  include SearchHelper

  scope { context && context[:current_user] ? Resource.all : Resource.active }

  # return type
  type !types[Types::ResourceType]

  option :first, type: types.Int, with: :apply_first
  option :include_deleted, type: types.Boolean, default: false, with: :apply_include_deleted
  option :skip, type: types.Int, with: :apply_skip
  option :sorting, type: Types::Inputs::SortingFilter, default: { 'field' => 'created_at', 'is_ascending' => false }, with: :apply_sorting

  def sorting_valid?
    Resource.column_names.include?(sorting['field'])
  end
end
