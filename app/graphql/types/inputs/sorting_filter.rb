Types::Inputs::SortingFilter = GraphQL::InputObjectType.define do
  name 'SortingFilter'
  description 'An object representing sorting attributes for query results'

  argument :field, !types.String
  argument :is_ascending, !types.Boolean
end
