module SearchHelper
  # limit
  def apply_first(scope, value)
    scope.limit(value)
  end

  # offset
  def apply_skip(scope, value)
    scope.offset(value)
  end

  # sorting
  # sorting_valid? must be defined in each resolver using this helper
  def apply_sorting(scope, value)
    if sorting_valid?
      value['is_ascending'] ? scope.reorder("#{value['field']} ASC") : scope.reorder("#{value['field']} DESC")
    else
      # fall back to recently updated entries first
      scope.reorder(:updated_at => :desc)
    end
  end

  # apply_filter calls normalize_filters which recursively loops through "OR" branches;
  # normalize_filters must be defined in each resolver using this helper
  def apply_filter(scope, value)
    # normalize filters from nested OR structure to flat scope list
    branches = normalize_filters(value).reduce { |a, b| a.or(b) }
    scope.merge(branches).distinct
  end
end
