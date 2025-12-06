<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SingleFilterComponent from './SingleFilterComponent.vue'

import type FilterInterface from '@/interface/FilterInterface'

const filters = ref<FilterInterface[]>([])
const id_increment = ref(0)

const emits = defineEmits(['filter_selected'])

onMounted(() => {
  if (filters.value.length == 0) {
    pushNewFilter('All')
    pushNewFilter('Active')
    pushNewFilter('Completed')
  }
})

function emits_filter_name(filter: FilterInterface) {
  emits('filter_selected', filter)
}

function pushNewFilter(title: string) {
  if (title === undefined) return
  if (title.length === 0) return

  const filter: FilterInterface = {
    title: title,
    status: false,
    id: id_increment.value,
  }

  id_increment.value++
  filters.value.push(filter)
}
</script>

<template>
  <div class="filters-group-container flex">
    <h1 class="w-100">Filters</h1>
    <div class="flex filters-group p-2">
      <div v-if="filters.length > 0" class="flex">
        <div v-for="item in filters" :key="item.id">
          <SingleFilterComponent
            :name_filter="item.title"
            :id="item.id"
            :class="{}"
            @filter_selected="
              (filter: FilterInterface) => {
                console.log('Creo un nuovo filtro singolo')

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
