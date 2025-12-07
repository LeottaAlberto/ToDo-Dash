<script setup lang="ts">
import { watch, ref, type Ref } from 'vue'
import type ActivityInterface from '@/interface/ActivityInterface'
import type FilterInterface from '@/interface/FilterInterface'

const count_scorer = ref(0)
const max_visible_activity = ref(5)

const props = defineProps<{
  activity: ActivityInterface[]
  filters: FilterInterface[]
}>()

const emits = defineEmits(['open_pop_up'])

const visibleActivities: Ref<ActivityInterface[]> = ref([])

const priority = ref({
  'Priority': [['H', 'p-high'], ['M', 'p-medium'], ['L', 'p-low']]
});

function priorityClass(p: string) {
  if (!p) return ''
  const key = p.charAt(0).toUpperCase()
  const found = priority.value['Priority'].find((f: string[]) => f[0] === key)
  return found ? found[1] : ''
}

watch(
  () => props.filters,
  (newVal) => {
    console.log('Filters updated:', newVal)
    updateFilters()
  },
  { deep: true, immediate: false },
)

watch(props.activity, () => {
  console.log('Monted: activity')
  console.log('Filters: ')
  console.log(props.filters)
  console.log(props.filters.length)

  if (props.filters.length !== 0) updateFilters()
  else {
    console.log('No Filters')
    console.log(props.activity)
    visibleActivities.value = props.activity
    console.log(visibleActivities.value)
  }
})

function updateFilters() {
  console.log('Update Filters')

  // Caso in cui non ci sono activity
  if (!props.activity || props.activity.length === 0) visibleActivities.value = []

  console.log(props.filters)

  if (props.filters.length === 0 || props.filters.some((filter) => filter.id === 0)) {
    console.log('caso 2')

    visibleActivities.value = props.activity.slice(
      count_scorer.value,
      count_scorer.value + max_visible_activity.value,
    )
  } else {
    console.log('caso 3')
    const filterIds = new Set(props.filters.map((filter) => filter.id))
    const filtered_activity = props.activity.filter((activity) => {
      return activity.status.some((statusFilter) => filterIds.has(statusFilter.id))
    })
    visibleActivities.value = filtered_activity.slice(
      count_scorer.value,
      count_scorer.value + max_visible_activity.value,
    )

    console.log(filterIds)
    console.log(filtered_activity)
    console.log(visibleActivities)
    debugger
  }
}

function openPopUp(activity: ActivityInterface) {
  console.log('Click sul prop => ')
  console.log(activity)

  emits('open_pop_up', activity)
}
</script>

<template>
  <div
    class="flex w-50"
    style="flex-direction: column; justify-content: center; align-items: center"
  >
    <div v-if="visibleActivities.length > 0" class="flex w-100 m-3 p-3 px-2 activity-container">
      <div
        v-for="(item, index) in visibleActivities"
        :key="index"
        class="flex px-2 single-activity pointer-clicked"
        @click="openPopUp(item)"
      >

        <div class="flex f-col" style="gap: 1vw;">
          <!-- Priority -->
          <div class="flex just-content-start w-100 pointer-normal">
            <span class="flex text-bold priority font-size-subtitle" :class="priorityClass(item.priority)">{{ item.priority.toUpperCase() }}</span>
        </div>

          <!-- Title -->
          <div class="flex just-content-start w-100 font-size-medium" style="padding: 0;">
            <h2 v-if="item.title.length < 30" class="text-bolder single-line">
              {{ item.title }}
            </h2>
            <h2 v-else :title="item.title" class="text-bolder single-line">
              {{ item.title.substring(0, 30) }}...
            </h2>
          </div>
        </div>

        <div class="flex f-col w-50 mw-50 min-w-50 item-activity">
          <h2 v-if="item.type.length < 15" class="flex just-content-end text-bolder w-100">
            <svg fill="none" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"/>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
              <g id="SVGRepo_iconCarrier"> <path d="M5.06152 12C5.55362 8.05369 8.92001 5 12.9996 5C17.4179 5 20.9996 8.58172 20.9996 13C20.9996 17.4183 17.4179 21 12.9996 21H8M13 13V9M11 3H15M3 15H8M5 18H10" stroke="#ebebeba3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: var(--darkreader-text-000000, #e8e6e3);"/> </g>
            </svg>
            {{ item.duration }}
          </h2>
          <h2 v-else  class="flex just-content-end text-bolder w-25">
            <svg fill="none" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"/>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
              <g id="SVGRepo_iconCarrier"> <path d="M5.06152 12C5.55362 8.05369 8.92001 5 12.9996 5C17.4179 5 20.9996 8.58172 20.9996 13C20.9996 17.4183 17.4179 21 12.9996 21H8M13 13V9M11 3H15M3 15H8M5 18H10" stroke="#ebebeba3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: var(--darkreader-text-000000, #e8e6e3);"/> </g>
            </svg>
            {{ item.duration }}
          </h2>
          <h2 v-if="item.type.length < 15" class="flex just-content-end w-100 font-size-little">{{ item.type }}</h2>
          <h2 v-else class="flex just-content-end w-50 font-size-little" :title="item.type">{{ item.type.substring(0, 15) }}...</h2>
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
  min-height: 70vh;
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
  /* gap: 1vw;
  justify-content: space-around; */
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

.pointer-normal {
  cursor: default;
}

.pointer-clicked {
  cursor: pointer;
}

.single-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  max-width: 100%;
}
</style>
