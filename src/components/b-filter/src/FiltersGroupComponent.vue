<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SingleFilterComponent from './SingleFilterComponent.vue';

import type FilterInterface from '@/core/interface/FilterInterface';
import { useFilter } from '@/composable/useFilter';

const selectedId = ref<number | string | null>(null)

const { activateFilter, allFilters } = useFilter();

function checkFilter(filter: FilterInterface) {
  selectedId.value = filter.filter_id;
  activateFilter(filter.filter_id);
}

onMounted(() => {
  activateFilter(0)
});

</script>

<template>
  <div class="flex filters-group">
    <div v-if="allFilters.length > 0" class="flex">
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

<style scoped>
.filters-group-container {
  max-width: 15%;
  width: 35%;
  height: 70vh;
  margin: 0;
  padding: 0;
  flex-direction: column;
}
.filters-group {
  background-color: transparent;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}

.filters-group div {
  flex-direction: column;
  gap: 0.3vw;
}
</style>
