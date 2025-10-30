<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'

interface Activity {
  priority: string
  title: string
  duration: number
  type: string
}

const count_scorer = ref(0);
const max_visible_activity = ref(5);

const props = defineProps<{
  activity: Activity[]
}>()

// const visible_activity: Ref<Activity[]> = ref([]);

const visibleActivities = computed(() => {
  if (!props.activity || props.activity.length === 0) return []
  return props.activity.slice(count_scorer.value, count_scorer.value + max_visible_activity.value)
})

</script>

<template>
  <!-- <div v-if="activity && activity.length > 0" class="flex w-100 m-3 p-3 px-2 activity-container">

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

  <div v-if="activity !== undefined && activity.length > 5" class="flex w-100 m-3 p-3 px-2 activity-container">
    <div 
    v-for="(index = count_scorer.value) in 5+(count_scorer)" 
    :key="index" 
    v-if="props.activity[count_scorer + index - 1]"
    class="flex px-2 single-activity">
      
      <h2 class="w-25 mw-25">[{{ props.activity[index].priority.charAt(0).toUpperCase()}}]</h2>
      <h1 v-if="props.activity[index].title.length < 12" class="w-50 mw-55 p-relative left-0 px-3">{{ props.activity[index].title }}</h1>
      <h1 v-else class="w-50 p-relative left-0 px-3" >{{ props.activity[index].title.slice(0, 12) }}...</h1>
      <div class="flex w-25 mw-25 item-activity">
        <h2>{{ props.activity[index].duration }}h</h2>
        <h2>{{ props.activity[index].type }}</h2>
      </div>
      <span v-if="props.activity[index]">
      </div>
      <div class="flex num-of-page">
        <h3 
      v-for="(i) in (activity.length % 5)+1" 
      :key="i" 
      :id="'z' + i"
      @click="count_scorer++">{{ i }}</h3>
    </div>
  </div>
  <div v-else >
    <p style="width: max-content;">Nessuna attività presente</p>
  </div>
</span> -->

  <div v-if="visibleActivities.length > 0" class="flex w-100 m-3 p-3 px-2 activity-container">
    <div
      v-for="(item, index) in visibleActivities"
      :key="index"
      class="flex px-2 single-activity"
    >
      <h2 class="w-25 mw-25">[{{ item.priority.charAt(0).toUpperCase() }}]</h2>
      <h1
        v-if="item.title.length < 12"
        class="w-50 mw-55 p-relative left-0 px-3"
      >
        {{ item.title }}
      </h1>
      <h1
        v-else
        class="w-50 p-relative left-0 px-3"
      >
        {{ item.title.slice(0, 12) }}...
      </h1>
      <div class="flex w-25 mw-25 item-activity">
        <h2>{{ item.duration }}h</h2>
        <h2>{{ item.type }}</h2>
      </div>
    </div>
  </div>

  <div v-else>
    <p style="width: max-content;">Nessuna attività presente</p>
  </div>

  <!-- 🔹 (Facoltativo) Pulsanti per scorrere -->
  <div v-if="props.activity.length > max_visible_activity" class="flex gap-2 mt-2">
    <button @click="count_scorer = Math.max(0, count_scorer - 1)" :disabled="count_scorer === 0">←</button>
    <button
      @click="count_scorer = Math.min(props.activity.length - max_visible_activity, count_scorer + 1)"
      :disabled="count_scorer + max_visible_activity >= props.activity.length"
    >
      →
    </button>
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

  .num-of-page {
    flex-direction: row;
    gap: 1vw;
    cursor: pointer;
  }

  .num-of-page h3:hover {
    transform: scale(1.015, 1.015);
    font-weight: bold;
  }
</style>
