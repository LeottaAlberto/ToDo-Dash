import type FilterInterface from '@/core/interface/FilterInterface';
import { ref, watch } from 'vue';

/**
 * Progressive numeric identifier used to assign
 * a unique `filter_id` to each added filter.
 */
const progressive = ref<number>(0);
/**
 * Reactive collection containing only active filters.
 * Each active filter must also exist in `allFilters`.
 */
const activeFilters = ref<FilterInterface[]>([]);

const INITIAL_FILTERS: Omit<FilterInterface, 'filter_id'>[] = [
  { filter_name: 'All', status: false },
  { filter_name: 'Completed', status: false },
  { filter_name: 'Uncompleted', status: false },
];

const generateDefaults = (): FilterInterface[] => {
  return INITIAL_FILTERS.map((f) => ({
    ...f,
    filter_id: progressive.value++,
  }));
};

/**
 * Reactive collection containing all registered filters.
 * A filter may exist here without being active.
 */
const allFilters = ref<FilterInterface[]>(generateDefaults());

const allFiltersLength = {
  size: 1,
};

/**
 * useFilter
 *
 * Vue 3 composable that provides centralized filter management.
 * It exposes reactive state and utility methods to:
 * - register filters
 * - remove filters
 * - activate filters
 * - deactivate filters
 *
 * The composable is stateful at module level:
 * all consumers share the same filter state.
 */
export function useFilter() {
  /**
   * Registers a new filter.
   *
   * - Assigns a unique `filter_id`
   * - Prevents duplicate registration of the same object reference
   * - Does not activate the filter automatically
   *
   * @param act Filter definition
   */
  const addFilter = (act: FilterInterface): void => {
    const exists = allFilters.value.find((filter) => filter === act);
    if (exists !== undefined) return;

    const filter: FilterInterface = {
      ...act,
      filter_id: progressive.value++,
    };

    allFilters.value.push(filter);
  };

  /**
   * Removes a filter from the global filter list.
   *
   * - Matches by `filter_id`
   * - Does not automatically deactivate the filter
   *
   * @param id Filter identifier
   */
  const removeFilter = (id: number | string): void => {
    allFilters.value = allFilters.value.filter((filter) => filter.filter_id != id);
  };

  /**
   * Activates a filter.
   *
   * - The filter must exist in `allFilters`
   * - Prevents duplicate activation
   *
   * @param id Filter identifier
   */
  const activateFilter = (id: number | string): void => {
    const filter = allFilters.value.find((f) => f.filter_id == id);
    if (!filter) return;

    const isActive = activeFilters.value.some((f) => f.filter_id === id);
    if (isActive) {
      deactivateFilter(id);
      return;
    }

    if (filter.frequency) {
      const conflicts = activeFilters.value.filter(
        (f) => f.frequency === filter.frequency && f.filter_id !== id,
      );

      conflicts.forEach((f) => deactivateFilter(f.filter_id));
    }

    if (id === 0) [...activeFilters.value].forEach((f) => deactivateFilter(f.filter_id));
    else if (activeFilters.value.some((f) => f.filter_id === 0)) deactivateFilter(0);

    filter.status = true;
    activeFilters.value.push(filter);
  };

  /**
   * Deactivates a filter.
   *
   * - Removes the filter from `activeFilters`
   * - Does not remove it from `allFilters`
   *
   * @param id Filter identifier
   */
  const deactivateFilter = (id: number | string): void => {
    activeFilters.value = activeFilters.value.filter((f) => f.filter_id !== id);

    const filterRef = allFilters.value.find((f) => f.filter_id === id);
    if (filterRef) {
      filterRef.status = false;
    }
  };

  watch(
    allFilters,
    () => {
      allFiltersLength.size = allFilters.value.length;
    },
    { deep: true, immediate: true },
  );

  return {
    allFilters,
    activeFilters,
    allFiltersLength,
    INITIAL_FILTERS,
    addFilter,
    removeFilter,
    activateFilter,
    deactivateFilter,
  };
}
