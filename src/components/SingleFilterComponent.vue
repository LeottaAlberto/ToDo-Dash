<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'

import type FilterInterface from '@/interface/FilterInterface'

const props = defineProps({
  name_filter: String,
  id: Number,
})
const emits = defineEmits(['filter_selected'])

const filtro = ref<FilterInterface>({
  title: props.name_filter + '',
  status: false,
  id: props.id || 0,
})

function select_filter(filters: FilterInterface) {
  filtro.value.status = !filtro.value.status
  emits('filter_selected', filters)
}

onMounted(() => {
  console.log(props)
  if (props.name_filter == 'All') {
    console.log('Filter All')
    select_filter({ title: props.name_filter, status: true, id: props.id || 0 })
  }
  console.log(filtro)
})
</script>

<template>
  <div
    v-if="props.name_filter != 'Tutti'"
    class="single-filter-container cursor-pointer"
    @click="select_filter({ title: props.name_filter, status: filtro.status, id: props.id || 0 })"
  >
    <div class="single-filter flex" :class="{ select: filtro.status }">
      <h3>{{ props.name_filter }}</h3>
    </div>
  </div>
  <div v-else class="single-filter-container">
    <div class="single-filter flex" :class="{ select: filtro.status }">
      <h3>{{ props.name_filter }}</h3>
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

.single-filter:hover {
  transform: scale(1.02, 1.02);
}
.select {
  background-color: #6d6d6d;
}
</style>
