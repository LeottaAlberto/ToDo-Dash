<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

import Title from '../components/TitleComponent.vue'
import ActivityComponent from '@/components/ActivityComponent.vue'
import CreateActivityComponent from '@/components/CreateActivityComponent.vue'
import DashboardComponent from '@/components/DashboardComponent.vue'

interface Activity {
  priority: string
  title: string
  duration: number
  type: string
}
const isClicked = ref(false)

const todo: Ref<Activity[]> = ref([])

onMounted(() => {
  try {
    const stored = localStorage.getItem('user-activity');
    if (stored) {
      const parsedData = JSON.parse(stored);
      // Check if parsedData is an array
      if (Array.isArray(parsedData)) {
        todo.value = parsedData;
      } else {
        // If single item, wrap in array
        todo.value = [parsedData];
      }
    }
  } catch (error) {
    console.error('Error loading activities:', error)
    todo.value = [];
  }
})

function createActivity(v: Activity) {
  console.log(v)
  isClicked.value = false
  if (v != null) todo.value.push(v as Activity)
  localStorage.setItem('user-activity', JSON.stringify(todo.value));
}
</script>

<template>
  <div class="container flex">
    <Title @clicked="() => (isClicked = true)"></Title>
    <div class="w-100 flex main-container">
      <DashboardComponent/>
      <ActivityComponent :activity="todo" />
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
      <DashboardComponent/>
    </div>
  </div>
</template>

<style scoped>
.container {
  flex-direction: column;
  width: 100%;
}

.main-container {
  width: 100%;
}
</style>
