<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { ref } from 'vue';

import type FilterInterface from '@/core/interface/FilterInterface';
import { useFilter } from '@/composable/useFilter';

const { allFilters } = useFilter();

const props = defineProps<{
  filter: FilterInterface,
  selectedId: number | string | null
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

watch(allFilters, () => {
  const f = allFilters.value.filter(filter => filter.filter_id === filterData.value?.filter_id);

  if (f && f[0] && filterData.value) {
    filterData.value.status = f[0].status;
  }
}, {  deep: true, immediate: true })
</script>

<template>
  <div
    v-if="filterData && filterData.filter_id != 0"
    class="single-filter-container cursor-pointer"
    @click="select_filter()"
  >
    <div class="single-filter flex font-size-little" :class="{ select: filterData.status }">
      <h3>{{ filterData.filter_name }}</h3>
    </div>
  </div>

  <div v-else class="single-filter-container">
    <div
      v-if="filterData"
      class="single-filter flex font-size-little"
      name="all"
      :class="{ select: filterData.status }"
      style="background-color: grey"
    >
      <h3>{{ filterData.filter_name }}</h3>
    </div>
  </div>
</template>

<style scoped>
.single-filter-container {
  height: fit-content;
}

.single-filter {
  width: 10vw;
  height: 5vh;
  border: solid 2px #4d4d4dd8;
  border-radius: 15px;
  gap: 1vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.cursor-pointer {
  cursor: pointer;
}

.single-filter:not([name='all']):hover {
  transform: scale(1.02, 1.02);
}
.select {
  background-color: #6d6d6d;
}
</style>
