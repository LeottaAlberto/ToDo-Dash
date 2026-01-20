<script setup lang="ts">
import { watch, ref, type Ref, onMounted } from 'vue';
import { useActivity } from '@/composable/useActivity';
import { useFilter } from '@/composable/useFilter';
import { usePagination } from '@/composable/usePagination';
import type ActivityInterface from '@/core/interface/ActivityInterface';
import SingleActivityComponent from './SingleActivityComponent.vue';

const { allActivities, totalActivities } = useActivity();
const { activeFilters, allFiltersLength, INITIAL_FILTERS } = useFilter();

const { startIndex, itemPerPage, currentPage } = usePagination();
const visibleActivities: Ref<ActivityInterface[]> = ref([]);

const emits = defineEmits(['open_pop_up']);

watch(totalActivities, () => setActivity());
watch(
  currentPage,
  () => {
    setActivity();
  },
  { deep: true, immediate: true },
);

watch(
  activeFilters,
  () => {
    if (allFiltersLength.size !== INITIAL_FILTERS.length) {
      visibleActivities.value = allActivities.value.filter((activity) =>
        activity.filters.some((activityFilter) =>
          activeFilters.value.some(
            (activeFilter) => activeFilter.filter_id === activityFilter.filter_id,
          ),
        ),
      );
    } else {
      if (activeFilters.value.find((f) => f.filter_id === 2)) {
        // Uncompleted
        visibleActivities.value = allActivities.value.filter((activity) => !activity.status);
      } else if (activeFilters.value.find((f) => f.filter_id === 1)) {
        // Completed
        visibleActivities.value = allActivities.value.filter((activity) => activity.status);
      } else {
        visibleActivities.value = allActivities.value;
      }
    }
  },
  { deep: true },
);

onMounted(() => setActivity());

function setActivity(): void {
  if (totalActivities.value < itemPerPage) visibleActivities.value = allActivities.value;
  else {
    const start = itemPerPage * (currentPage.value - 1);
    const end =
      startIndex.value + itemPerPage < start + itemPerPage
        ? startIndex.value + itemPerPage
        : start + itemPerPage;
    visibleActivities.value = allActivities.value.slice(start, end);
  }
}

// function updateFilters() {
//   // Caso in cui non ci sono activity
//   if (!allActivities.value || totalActivities.value === 0) visibleActivities.value = []

//   if (props.filters.length === 0 || props.filters.some((filter) => filter.id === 0)) {
//     console.log('caso 2')

//     visibleActivities.value = allActivities.value.slice(
//       pages.indexStart,
//       pages.indexEnd,
//     )
//   } else {
//     console.log('caso 3')
//     const filterIds = new Set(props.filters.map((filter) => filter.id))
//     const filtered_activity = allActivities.value.filter((activity) => {
//       return activity.filters.some((statusFilter) => filterIds.has(statusFilter.filter_id))
//     })
//     visibleActivities.value = filtered_activity.slice(
//       pages.indexStart,
//       pages.indexEnd,
//     )
//   }
// }

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
      class="flex w-100 m-3 p-3 px-2 activity-container box-shadow"
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
  border-radius: 15px;
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
