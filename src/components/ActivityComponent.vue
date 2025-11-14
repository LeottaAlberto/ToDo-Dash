<script setup lang="ts">
import { computed, watch, ref, type Ref, onMounted } from 'vue'

interface Activity {
  priority: string
  title: string
  duration: number
  type: string
  status: string
}

const count_scorer = ref(0)
const max_visible_activity = ref(5)

const props = defineProps<{
  activity: Activity[]
  filters: string[]
}>()

const visibleActivities: Ref<Activity[]> = ref([])

watch(props.filters, () => {
  console.log(props.filters)
  updateFilters()
})

onMounted(() => updateFilters())

function updateFilters() {
  console.log('Update Filters')

  if (!props.activity || props.activity.length === 0) visibleActivities.value = []
  if (!props.filters)
    visibleActivities.value = props.activity.slice(
      count_scorer.value,
      count_scorer.value + max_visible_activity.value,
    )

  const filtered_activity = props.activity.filter((activity) => {
    return props.filters.filter((filter) => activity.status == filter)
  })
  visibleActivities.value = filtered_activity.slice(
    count_scorer.value,
    count_scorer.value + max_visible_activity.value,
  )
}
</script>

<template>
  <div
    class="flex w-50"
    style="flex-direction: column; justify-content: center; align-items: center"
  >
    <div v-if="visibleActivities.length > 0" class="flex w-100 m-3 p-3 px-2 activity-container">
      {{ console.log(visibleActivities) }}
      <div
        v-for="(item, index) in visibleActivities"
        :key="index"
        class="flex px-2 single-activity"
      >
        <h2 class="w-25 mw-25">[{{ item.priority.charAt(0).toUpperCase() }}]</h2>
        <h1 v-if="item.title.length < 12" class="w-50 mw-55 p-relative left-0 px-3">
          {{ item.title }}
        </h1>
        <h1 v-else class="w-50 p-relative left-0 px-3">{{ item.title.slice(0, 12) }}...</h1>
        <div class="flex w-25 mw-25 item-activity">
          <h2>{{ item.duration }}h</h2>
          <h2>{{ item.type }}</h2>
        </div>
      </div>
    </div>

    <div v-else>
      <p style="width: max-content">Nessuna attività presente</p>
    </div>

    <!-- Pulsanti per scorrere -->
    <div
      v-if="props.activity.length > max_visible_activity"
      class="flex w-50 gap-2 mt-2"
      style="justify-content: center"
    >
      <button @click="count_scorer = Math.max(0, count_scorer - 1)" :disabled="count_scorer === 0">
        <svg
          width="32px"
          height="32px"
          viewBox="-1.6 -1.6 19.20 19.20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#D4D4D4D4"
          transform="rotate(180)matrix(-1, 0, 0, 1, 0, 0)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#CCCCCC"
            stroke-width="0.48"
          >
            <path
              d="M8 10L8 14L6 14L-2.62268e-07 8L6 2L8 2L8 6L16 6L16 10L8 10Z"
              fill="#D4D4D4D4"
            ></path>
          </g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M8 10L8 14L6 14L-2.62268e-07 8L6 2L8 2L8 6L16 6L16 10L8 10Z"
              fill="#D4D4D4D4"
            ></path>
          </g>
        </svg>
      </button>
      <button
        @click="
          count_scorer = Math.min(props.activity.length - max_visible_activity, count_scorer + 1)
        "
        :disabled="count_scorer + max_visible_activity >= props.activity.length"
      >
        <svg
          width="32px"
          height="32px"
          viewBox="-1.6 -1.6 19.20 19.20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#D4D4D4D4"
          transform="rotate(180)matrix(1, 0, 0, 1, 0, 0)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#CCCCCC"
            stroke-width="0.48"
          >
            <path
              d="M8 10L8 14L6 14L-2.62268e-07 8L6 2L8 2L8 6L16 6L16 10L8 10Z"
              fill="#D4D4D4D4"
            ></path>
          </g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M8 10L8 14L6 14L-2.62268e-07 8L6 2L8 2L8 6L16 6L16 10L8 10Z"
              fill="#D4D4D4D4"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.activity-container {
  max-width: 75%;
  height: 70vh;
  border: solid 2px #4d4d4dd8;
  border-radius: 15px;
  gap: 1vw;
  flex-direction: column;
  justify-content: flex-start;
}
.single-activity {
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

button {
  background-color: transparent;
  border: none;
  max-width: fit-content;
}
</style>
