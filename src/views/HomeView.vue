<script setup lang="ts">
import { watch, onMounted, ref, type Ref } from 'vue'

import Title from '../components/TitleComponent.vue'
import ActivityComponent from '@/components/ActivityComponent.vue'
import CreateActivityComponent from '@/components/CreateActivityComponent.vue'
import SideContainerComponent from '@/components/SideContainerComponent.vue'
import FiltersGroupComponent from '@/components/FiltersGroupComponent.vue'
import PopUpActivityComponents from '@/components/PopUpActivityComponents.vue'
import DashboardComponent from '@/components/DashboardComponent.vue'
import PopUpComponent from '@/components/PopUpComponent.vue'

import type ActivityInterface from '../interface/ActivityInterface'
import type FilterInterface from '../interface/FilterInterface'

const isVisibleAddActivity = ref(false)
const addSubmitActivityClicked = ref(false);

const todo: Ref<ActivityInterface[]> = ref([])
const filters = ref<string[]>([])
const active_filter = ref<FilterInterface[]>([])

const activity_in_pop_up = ref<ActivityInterface>()

onMounted(() => {
  loadActivity()
  loadFilters()
  activity_in_pop_up.value = undefined;
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
            console.log(obj);
            activity_in_pop_up = obj
          }
        "
      />

      <SideContainerComponent title="Dashboard">
        <DashboardComponent
          :num_activity="todo.length"
          :num_activity_completed="1"
          :num_activity_not_completed="2"
        />
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
        }
        "
      @closed="
        () => {
          isVisibleAddActivity = false
        }
        "
    />
    <template #footer>
      <div
        class="flex w-100 px-3"
        style="display: flex; justify-content: space-between; gap: 2vw;"
      >
        <input type="button" value="Cancel" class="btn w-75" style="height: 3vh;" @click="isVisibleAddActivity = false" />
        <input type="button" value="Add" class="btn w-75" style="height: 3vh;" @click="()=>addSubmitActivityClicked = !addSubmitActivityClicked"/>
      </div>
    </template>
  </PopUpComponent>

  <PopUpComponent
    v-if="activity_in_pop_up"
    :activity="activity_in_pop_up"
    :title="activity_in_pop_up.title"
    footer_btn_title="Complete Activity"
    @closed="() => activity_in_pop_up = undefined"
  >
    <PopUpActivityComponents
      :activity="activity_in_pop_up"
      @closed="() => (activity_in_pop_up = undefined)"
    />
  </PopUpComponent>


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
