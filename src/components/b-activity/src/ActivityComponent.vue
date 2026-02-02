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
  <div class="flex w-50 flex-col justify-center items-center">
    <div
      class="m-3 p-6 w-75 min-h-full outline-2 outline-neutral-600 shadow-lg shadow-sky-100/10 rounded-xl"
    >
      <span v-if="visibleActivities.length > 0" class="flex flex-col gap-2">
        <div v-for="(item, index) in visibleActivities" :key="index" @click="openPopUp(item)">
          <SingleActivityComponent :activity="item" />
        </div>
      </span>
      <span v-else>
        <p style="width: max-content">There are no activities</p>
      </span>
    </div>
  </div>
</template>
