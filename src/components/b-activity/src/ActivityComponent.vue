<script setup lang="ts">
import { computed } from 'vue';
import { useActivity } from '@/composable/useActivity';
import { useFilter } from '@/composable/useFilter';
import { usePagination } from '@/composable/usePagination';
import type ActivityInterface from '@/core/interface/ActivityInterface';
import SingleActivityComponent from './SingleActivityComponent.vue';

const { allActivities } = useActivity();
const { activeFilters, allFiltersLength, INITIAL_FILTERS } = useFilter();

const { itemPerPage, currentPage } = usePagination();

const emits = defineEmits(['open_pop_up']);

const filteredActivities = computed(() => {
  if (allFiltersLength.size === INITIAL_FILTERS.length) return allActivities.value;

  return allActivities.value.filter((activity) => {
    const statusFilter = activeFilters.value.find((f) => f.filter_id === 1 || f.filter_id === 2);

    if (statusFilter) {
      const isCompletedRequested = statusFilter.filter_id === 1;
      if (activity.status !== isCompletedRequested) return false;
    }

    return activity.filters.some((activityFilter) => {
      activeFilters.value.some((active) => active.filter_id === activityFilter.filter_id);
    });
  });
});

const visibleActivities = computed(() => {
  const start = itemPerPage * (currentPage.value - 1);
  const end = start + itemPerPage;
  return filteredActivities.value.slice(start, end);
});

function openPopUp(activity: ActivityInterface) {
  emits('open_pop_up', activity);
}
</script>

<template>
  <div
    class="flex w-50"
    style="flex-direction: column; justify-content: center; align-items: center"
  >
    <div
      v-if="visibleActivities.length > 0"
      class="flex w-100 m-3 p-3 px-2 activity-container box-shadow radius-standard"
    >
      <div
        v-for="(item, index) in visibleActivities"
        :key="index"
        class="flex w-100"
        @click="openPopUp(item)"
      >
        <SingleActivityComponent :activity="item" />
      </div>
    </div>

    <div v-else>
      <p style="width: max-content">Nessuna attività presente</p>
    </div>
  </div>
</template>

<style scoped>
.activity-container {
  max-width: 75%;
  height: 70vh;
  min-height: 70vh;
  border: solid 2px #4d4d4dd8;
  gap: 1vw;
  flex-direction: column;
  justify-content: flex-start;
}

.num-of-page {
  flex-direction: row;
  gap: 1vw;
  cursor: pointer;
}

.num-of-page h3:hover {
  transform: scale(1.015, 1.015);
  font-weight: bold;
}

button {
  background-color: transparent;
  border: none;
  max-width: fit-content;
}

.pointer-normal {
  cursor: default;
}

.pointer-clicked {
  cursor: pointer;
}
</style>
