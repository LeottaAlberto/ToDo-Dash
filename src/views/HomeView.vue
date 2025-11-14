<script setup lang="ts">
import { watch, onMounted, ref, type Ref } from 'vue'

import Title from '../components/TitleComponent.vue'
import ActivityComponent from '@/components/ActivityComponent.vue'
import CreateActivityComponent from '@/components/CreateActivityComponent.vue'
import DashboardComponent from '@/components/DashboardComponent.vue'
import FiltersGroupComponent from '@/components/FiltersGroupComponent.vue'
import PopUpActivityComponents from '@/components/PopUpActivityComponents.vue'

interface Activity {
  priority: string
  title: string
  duration: number
  type: string
  note: string
  status: string
}

interface Filters {
  title: string
  status: boolean
}

const isClicked = ref(false)

const todo: Ref<Activity[]> = ref([])
const filters = ref<string[]>([])
const active_filter = ref<Filters[]>([])

const activity_in_pop_up = ref<Activity>()

onMounted(() => {
  loadActivity()
  loadFilters()
})

watch(todo, () => {
  console.log('Todo Aggiornato =>')
  console.log(todo.value)
})

function loadActivity() {
  try {
    const stored = localStorage.getItem('user-activity')
    if (stored) {
      const parsedData = JSON.parse(stored)
      // Check if parsedData is an array
      if (Array.isArray(parsedData)) {
        todo.value = parsedData
      } else {
        // If single item, wrap in array
        todo.value = [parsedData]
      }
    }
  } catch (error) {
    console.error('Error loading activities:', error)
    todo.value = []
  }
}

function loadFilters() {
  try {
    const stored = localStorage.getItem('user-filters')
    if (stored) {
      const parsedData = JSON.parse(stored)
      if (Array.isArray(parsedData)) {
        filters.value = parsedData
      } else {
        filters.value = [parsedData]
      }
    }
  } catch (error) {
    console.error('Error loading activities:', error)
    filters.value = []
  }
}

function createActivity(v: Activity) {
  console.log(v)
  isClicked.value = false
  if (v != null) todo.value.push(v as Activity)
  localStorage.setItem('user-activity', JSON.stringify(todo.value))
}

function filters_manage(filters: Filters) {
  if (filters.status) {
    // Aggiungi solo se non esiste già
    if (!active_filter.value.some((f) => f.title === filters.title)) {
      active_filter.value.push(filters)
    }
  } else {
    // Rimuovi
    active_filter.value = removeFilter(filters)
  }
}
function removeFilter(filter: Filters) {
  return active_filter.value.filter((f) => f.title !== filter.title)
}
</script>

<template>
  <div class="container flex">
    <Title @clicked="() => (isClicked = true)"></Title>
    <div class="w-100 flex main-container">
      <FiltersGroupComponent
        @filter_selected="
          (filter: Filters) => {
            filters_manage(filter)
          }
        "
      />
      {{ console.log(todo) }}
      <ActivityComponent
        :activity="todo"
        :filters="active_filter"
        @open_pop_up="
          (obj) => {
            activity_in_pop_up = obj
          }
        "
      />
      <PopUpActivityComponents :activity="activity_in_pop_up" />
      <DashboardComponent />
      <CreateActivityComponent
        v-if="isClicked"
        @submit="
          (form) => {
            createActivity(form)
          }
        "
        @closed="
          () => {
            isClicked = false
          }
        "
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  flex-direction: column;
  width: 100%;
}

.main-container {
  justify-content: center;
  gap: 0vw;
  padding: 0;
  margin: 0;
}
</style>
