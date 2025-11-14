<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SingleFilterComponent from './SingleFilterComponent.vue'

const filters = ref<string[]>([])

interface Filters {
  title: string
  status: boolean
}

const emits = defineEmits(['filter_selected'])

onMounted(() => {
  if (filters.value.length == 0) {
    filters.value.push('Tutti')
    filters.value.push('Attive')
    filters.value.push('Completate')
  }
})

function emits_filter_name(filter: Filters) {
  emits('filter_selected', filter)
}
</script>

<template>
  <div class="filters-group-container flex">
    <h1 class="w-100">Filters</h1>
    <div class="flex filters-group p-2">
      <div v-if="filters.length > 0" class="flex">
        <div v-for="item in filters" :key="item">
          <SingleFilterComponent
            :name_filter="item"
            :class="{}"
            @filter_selected="
              (filter: Filters) => {
                emits_filter_name(filter)
              }
            "
          />
        </div>
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
  width: 100%;
  height: 75vh;
  background-color: transparent;
  border: 2px solid #4d4d4dd8;
  border-radius: 15px;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}

.filters-group div {
  flex-direction: column;
  gap: 0.3vw;
}
</style>
