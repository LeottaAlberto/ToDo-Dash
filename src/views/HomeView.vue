<script setup lang="ts">
import { watch, onMounted, ref, type Ref } from 'vue'

import Title from '../components/b-title/src/TitleComponent.vue'
import ActivityComponent from '@/components/b-activity/src/ActivityComponent.vue'
import CreateActivityComponent from '@/components/b-popup/src/CreateActivityComponent.vue'
import SideContainerComponent from '@/components/b-side-viewer/src/SideContainerComponent.vue'
import FiltersGroupComponent from '@/components/b-filter/src/FiltersGroupComponent.vue'
import PopUpActivityComponents from '@/components/b-popup/src/ActivityDetailsComponents.vue'
import DashboardComponent from '@/components/b-dashboard/src/DashboardComponent.vue'
import PopUpComponent from '@/components/b-popup/src/PopUpComponent.vue'
import ShiftActivityComponent from '@/components/b-activity/src/ShiftActivityComponent.vue'
import { useToast } from '@/composable/useToast'
import { APP_MESSAGE } from '@/core/constants/messages'

import type ActivityInterface from '../core/interface/ActivityInterface'
import type FilterInterface from '../core/interface/FilterInterface'
import type { ToastMessage } from '@/core/interface/toast.interface'

const { showToast } = useToast()

const isVisibleAddActivity = ref(false)
const addSubmitActivityClicked = ref(false)

const todo: Ref<ActivityInterface[]> = ref([])
const filters = ref<string[]>([])
const active_filter = ref<FilterInterface[]>([])

const activity_in_pop_up = ref<ActivityInterface>()

onMounted(() => {
  loadActivity()
  loadFilters()
  activity_in_pop_up.value = undefined
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

function createActivity(activity: ActivityInterface) {
  isVisibleAddActivity.value = false
  if (activity != null) todo.value.push(activity as ActivityInterface)
  localStorage.setItem('user-activity', JSON.stringify(todo.value))
}

function filters_manage(filters: FilterInterface) {
  if (!filters.status) {
    if (!active_filter.value.some((f) => f.title === filters.title)) {
      active_filter.value.push(filters)
    }
  } else {
    active_filter.value = removeFilter(filters)
  }
}
function removeFilter(filter: FilterInterface) {
  return active_filter.value.filter((f) => f.title !== filter.title)
}

const handleSave = async (message: ToastMessage) => {
  try {
    showToast(message)
  } catch (error) {
    showToast(APP_MESSAGE.ACTIVITY.ADD_ERROR)
    console.error(error);
  }
}
</script>

<template>
  <div class="container flex">
    <Title @clicked="() => (isVisibleAddActivity = true)"></Title>
    <div class="w-100 flex main-container">
      <SideContainerComponent title="Filters">
        <FiltersGroupComponent
          @filter_selected="(filter: FilterInterface) => filters_manage(filter)"
        />
      </SideContainerComponent>

      <ActivityComponent
        :activity="todo"
        :filters="active_filter"
        @open_pop_up="
          (obj) => {
            console.log(obj)
            activity_in_pop_up = obj
          }
        "
      />

      <SideContainerComponent title="Dashboard">
        <DashboardComponent :activities="todo" />
      </SideContainerComponent>
    </div>
  </div>

  <PopUpComponent
    v-if="isVisibleAddActivity"
    title="Create New Activity"
    footer_btn_title="Add"
    @closed="isVisibleAddActivity = false"
  >
    <CreateActivityComponent
      :is-submit-clicked="addSubmitActivityClicked"
      @submit="
        (form) => {
          createActivity(form)
          handleSave(APP_MESSAGE.ACTIVITY.ADD_SUCCESS)
        }
      "
      @closed="
        () => {
          isVisibleAddActivity = false
        }
      "
    />
    <template #footer>
      <div class="flex w-100 px-3" style="display: flex; justify-content: space-between; gap: 2vw">
        <input
          type="button"
          value="Cancel"
          class="btn w-75"
          style="height: 3vh"
          @click="isVisibleAddActivity = false"
        />
        <input
          type="button"
          value="Add"
          class="btn w-75"
          style="height: 3vh"
          @click="() => (addSubmitActivityClicked = !addSubmitActivityClicked)"
        />
      </div>
    </template>
  </PopUpComponent>

  <PopUpComponent
    v-if="activity_in_pop_up"
    :activity="activity_in_pop_up"
    :title="activity_in_pop_up.title"
    footer_btn_title="Complete Activity"
    @closed="() => (activity_in_pop_up = undefined)"
  >
    <PopUpActivityComponents
      :activity="activity_in_pop_up"
      @closed="() => (activity_in_pop_up = undefined)"
    />
  </PopUpComponent>

  <ShiftActivityComponent />
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
