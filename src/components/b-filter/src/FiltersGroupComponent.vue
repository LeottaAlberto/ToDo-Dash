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
  <div>
    <div v-if="allFilters.length > 0" class="flex flex-col gap-2 w-full px-4 py-2">
      <div v-for="item in allFilters" :key="item.filter_id">
        <SingleFilterComponent
          :selected-id="selectedId"
          :filter="item"
          :class="{}"
          @filter_selected="(filter: FilterInterface) => checkFilter(filter)"
        />
      </div>
    </div>
  </div>
</template>
