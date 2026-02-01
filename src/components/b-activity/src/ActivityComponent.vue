<script setup lang="ts">
import { computed } from 'vue';
import { useActivity } from '@/composable/useActivity';
import { useFilter } from '@/composable/useFilter';
import { usePagination } from '@/composable/usePagination';
import type ActivityInterface from '@/core/interface/ActivityInterface';
import SingleActivityComponent from './SingleActivityComponent.vue';

const { allActivities } = useActivity();
const { activeFilters } = useFilter();

const { itemPerPage, currentPage } = usePagination();

const emits = defineEmits(['open_pop_up']);

const filteredActivities = computed(() => {
  const isAllSelected = activeFilters.value.some((f) => f.filter_id === 0);
  if (activeFilters.value.length === 0 || isAllSelected) {
    return allActivities.value;
  }

  return allActivities.value.filter((activity) => {
    const statusFilter = activeFilters.value.find((f) => f.filter_id === 1 || f.filter_id === 2);

    if (statusFilter) {
      const isCompletedRequested = statusFilter.filter_id === 1;
      if (activity.status !== isCompletedRequested) return false;
    }

    const activeTags = activeFilters.value.filter((f) => f.filter_id > 2);

    if (activeTags.length === 0) return true;

    const hasMatchingTag = activity.filters.some((activityFilter) => {
      return activeTags.some((activeTag) => activeTag.filter_id === activityFilter.filter_id);
    });

    return hasMatchingTag;
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

    <div v-else class="flex w-100 m-3 p-3 px-2 activity-container box-shadow radius-standard">
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
