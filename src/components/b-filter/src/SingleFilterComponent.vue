<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { ref } from 'vue';

import type FilterInterface from '@/core/interface/FilterInterface';
import { useFilter } from '@/composable/useFilter';

const { allFilters } = useFilter();

const props = defineProps<{
  filter: FilterInterface;
  selectedId: number | string | null;
}>();

const filterData = ref<FilterInterface>();
const emits = defineEmits(['filter_selected']);

function select_filter() {
  if (filterData.value) {
    filterData.value.status = !filterData.value.status;
    emits('filter_selected', filterData.value);
  }
}

onMounted(() => {
  filterData.value = props.filter;
  if (props.filter.filter_id == 0) select_filter();
  if (props.filter.filter_id == 1 || props.filter.filter_id == 2) filterData.value.frequency = 1;
});

watch(
  allFilters,
  () => {
    const f = allFilters.value.filter((filter) => filter.filter_id === filterData.value?.filter_id);

    if (f && f[0] && filterData.value) {
      filterData.value.status = f[0].status;
    }
  },
  { deep: true, immediate: true },
);

const getFiltersClass = computed(() => {
  return [
    filterData.value?.status
      ? 'bg-neutral-700 outline-1 outline-neutral-300'
      : 'bg-neutral-500 outline-neutral-700 hover:scale-102',
  ];
});
</script>

<template>
  <div
    v-if="filterData && filterData.filter_id != 0"
    class="cursor-pointer w-1/2"
    @click="select_filter()"
  >
    <div
      class="flex justify-center rounded-md w-full py-3 text-md font-semibold outline-2 duration-75"
      :class="[getFiltersClass]"
    >
      <h3>{{ filterData.filter_name }}</h3>
    </div>
  </div>

  <div v-else class="w-full">
    <div
      v-if="filterData"
      class="flex justify-center rounded-md w-full py-3 text-md font-semibold outline-2 outline-neutral-700 bg-neutral-800"
      name="all"
      :class="{ select: filterData.status }"
    >
      <h3>{{ filterData.filter_name }}</h3>
    </div>
  </div>
</template>
