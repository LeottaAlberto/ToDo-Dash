<script setup lang="ts">
import { ref, type Ref } from 'vue'

import Title from '../components/TitleComponent.vue'
import ActivityComponent from '@/components/ActivityComponent.vue'
import CreateActivityComponent from '@/components/CreateActivityComponent.vue'
interface Activity {
  priority: string
  title: string
  duration: number
  type: string
}
const isClicked = ref(false)

const todo: Ref<Activity[] | null> = ref(null)

function createActivity(v: any) {
  console.log(v)
  isClicked.value = false
}
</script>

<template>
  <div class="container flex">
    <Title @clicked="(click) => (isClicked = true)"></Title>
    <ActivityComponent :activity="todo" />
    <CreateActivityComponent
      v-if="isClicked"
      @submit="
        (form) => {
          createActivity(form)
        }
      "
    />
  </div>
</template>

<style scoped>
.container {
  flex-direction: column;
  width: 100%;
}
</style>
