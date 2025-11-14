<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

import Title from '../components/TitleComponent.vue'
import ActivityComponent from '@/components/ActivityComponent.vue'
import CreateActivityComponent from '@/components/CreateActivityComponent.vue'
import DashboardComponent from '@/components/DashboardComponent.vue'
import FiltersGroupComponent from '@/components/FiltersGroupComponent.vue'

interface Activity {
  priority: string
  title: string
  duration: number
  type: string
  status: string
}
const isClicked = ref(false)

const todo: Ref<Activity[]> = ref([])
const filters = ref<string[]>([])
const active_filter = ref<string[]>([])

onMounted(() => {
  loadActivity()
  loadFilters()
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
</script>

<template>
  <div class="container flex">
    <Title @clicked="() => (isClicked = true)"></Title>
    <div class="w-100 flex main-container">
      <FiltersGroupComponent
        @filter_selected="
          (filter: string) => {
            active_filter.push(filter)
          }
        "
      />
      <ActivityComponent :activity="todo" :filters="active_filter" />
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
