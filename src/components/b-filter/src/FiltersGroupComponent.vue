<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SingleFilterComponent from './SingleFilterComponent.vue';

import type FilterInterface from '@/core/interface/FilterInterface';
import { useFilter } from '@/composable/useFilter';

const selectedId = ref<number | string | null>(null);

const { activateFilter, allFilters } = useFilter();

function checkFilter(filter: FilterInterface) {
  selectedId.value = filter.filter_id;
  activateFilter(filter.filter_id);
}

onMounted(() => {
  activateFilter(0);
});
</script>

<template>
  <div v-if="allFilters.length > 0" class="grid grid-cols-2 gap-4 w-full px-10 py-2">
    <p class="text-2xl font-semibold">Filters</p>
    <div
      v-for="item in allFilters"
      :key="item.filter_id"
      :class="item.filter_name === 'All' ? 'col-span-2' : 'col-span-1'"
    >
      <SingleFilterComponent
        :selected-id="selectedId"
        :filter="item"
        class="w-full"
        @filter_selected="(filter: FilterInterface) => checkFilter(filter)"
      />
    </div>
  </div>
</template>
