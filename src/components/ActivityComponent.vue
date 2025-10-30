<script setup lang="ts">
import { ref } from 'vue'
interface Activity {
  priority: string
  title: string
  duration: number
  type: string
}

const props = defineProps<{
  activity: Activity[]
}>()
// console.log('Props:')
// props.activity.forEach((item) => {
//   console.log(item)
// })
</script>

<template>
  <div v-if="activity && activity.length > 0 && activity.length <= 5" class="flex w-100 m-3 p-3 px-2 activity-container">

    <div v-for="(item, index) in activity" :key="index" class="flex px-2 single-activity">
      <h2 class="w-25 mw-25">[{{ item.priority.charAt(0).toUpperCase()}}]</h2>
      <h1 v-if="item.title.length < 12" class="w-50 mw-55 p-relative left-0 px-3">{{ item.title }}</h1>
      <h1 v-else class="w-50 p-relative left-0 px-3" >{{ item.title.slice(0, 12) }}...</h1>
      <div class="flex w-25 mw-25 item-activity">
        <h2>{{ item.duration }}h</h2>
        <h2>{{ item.type }}</h2>
      </div>
    </div>
  </div>
  <div v-else-if="activity.length > 5">
    
  </div>
  <div v-else>
    <p style="width: max-content;">Nessuna attività presente</p>
  </div>
</template>

<style scoped>
  .activity-container {
    max-width: 35%;
    height: 70vh;
    border: solid 2px #4d4d4dd8;;
    border-radius: 15px;
    gap: 1vw;
    flex-direction: column;
    justify-content: flex-start;
  }
  .single-activity{
    background-color: #4d4d4dd8;
    border: solid 2px #2d2d2d;
    max-width: 100%;
    max-height: 10vh;

    min-width: 100%;
    min-height: 10vh;
    justify-content: space-between;
    flex-direction: row;
    border-radius: 10px;
  }

  .item-activity {
    gap: 1vw;
    justify-content: space-around;
  }
</style>
