<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type ActivityInterface from '../core/interface/ActivityInterface';
import type FilterInterface from '../core/interface/FilterInterface';
import type { ToastMessage } from '@/core/interface/ToastInterface';

import { useActivity } from '@/composable/useActivity';
import { useToast } from '@/composable/useToast';
import { APP_MESSAGE } from '@/core/constants/messages';

import UserComponent from '@/components/b-user/src/UserComponent.vue';
import ActivityComponent from '@/components/b-activity/src/ActivityComponent.vue';
import CreateActivityComponent from '@/components/b-popup/src/CreateActivityComponent.vue';
import SideContainerComponent from '@/components/b-side-viewer/src/SideContainerComponent.vue';
import FiltersGroupComponent from '@/components/b-filter/src/FiltersGroupComponent.vue';
import PopUpActivityComponents from '@/components/b-popup/src/ActivityDetailsComponents.vue';
import DashboardComponent from '@/components/b-dashboard/src/DashboardComponent.vue';
import PopUpComponent from '@/components/b-popup/src/PopUpComponent.vue';
import MenuButtonComponent from '@/components/b-utility/src/MenuButtonComponent.vue';
import { Position } from '@/enums';
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';
import { ButtonRadius } from '@/enums/ButtonEnum';

const { addActivity, removeActivity, allActivities, completeActivity } = useActivity();
const { showToast } = useToast();

const isVisibleAddActivity = ref(false);
const isVisibleWarningPopup = ref(false);
const addSubmitActivityClicked = ref(false);

const filters = ref<string[]>([]);
const active_filter = ref<FilterInterface[]>([]);

const activity_in_pop_up = ref<ActivityInterface>();
const delete_activity_in_popup = ref<ActivityInterface>();

onMounted(() => {
  loadFilters();
  activity_in_pop_up.value = undefined;
});

const activityFormRef = ref<InstanceType<typeof CreateActivityComponent> | null>(null);

const handleConfirmClick = () => {
  activityFormRef.value?.triggerSubmit();
};

const handleFormSuccess = (newActivity: ActivityInterface) => {
  handleSave(APP_MESSAGE.ACTIVITY.ADD_SUCCESS, newActivity);
  addSubmitActivityClicked.value = false;
};

function loadFilters() {
  try {
    const stored = localStorage.getItem('user-filters');
    if (stored) {
      const parsedData = JSON.parse(stored);
      if (Array.isArray(parsedData)) {
        filters.value = parsedData;
      } else {
        filters.value = [parsedData];
      }
    }
  } catch (error) {
    console.error('Error loading activities:', error);
    filters.value = [];
  }
}

function filters_manage(filters: FilterInterface) {
  if (!filters.status) {
    if (!active_filter.value.some((f) => f.filter_name === filters.filter_name)) {
      active_filter.value.push(filters);
    }
  } else {
    active_filter.value = removeFilter(filters);
  }
}

function removeFilter(filter: FilterInterface) {
  return active_filter.value.filter((f) => f.filter_name !== filter.filter_name);
}

function completeActivityHandler(activity: ActivityInterface) {
  try {
    if (!activity) throw new Error('');

    completeActivity(activity);
    showToast(APP_MESSAGE.ACTIVITY.COMPLETED_SUCCESS);
    activity_in_pop_up.value = undefined;
  } catch (e) {
    showToast(APP_MESSAGE.ACTIVITY.COMPLETED_ERROR);
    console.error(e);
  }
}

function setRemoveActivity(activity?: ActivityInterface) {
  delete_activity_in_popup.value = activity;
  isVisibleWarningPopup.value = true;
}

function rmActivity(activity?: ActivityInterface) {
  try {
    if (!activity) throw new Error('');

    removeActivity(activity.id);
    showToast(APP_MESSAGE.ACTIVITY.DELETE_SUCCESS);
    delete_activity_in_popup.value = undefined;
    isVisibleWarningPopup.value = false;
  } catch (e) {
    showToast(APP_MESSAGE.ACTIVITY.DELETE_ERROR);
    console.error(e);
  }
}

const handleSave = async (message: ToastMessage, activity?: ActivityInterface) => {
  try {
    if (message === APP_MESSAGE.ACTIVITY.ADD_SUCCESS && activity) {
      addActivity(activity);
      isVisibleAddActivity.value = false;
    }
    showToast(message);
  } catch (error) {
    showToast(APP_MESSAGE.ACTIVITY.ADD_ERROR);
    console.error(error);
  }
};
</script>

<template>
  <div class="flex flex-row gap-10 justify-start w-full h-full py-6">
    <SideContainerComponent>
      <template v-slot:header>
        <div class="flex justify-center items-center w-full h-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="64"
            height="64"
            role="img"
            aria-label="Task Manager Logo"
          >
            <title>Task Manager Minimal Logo</title>
            <desc>
              Un'icona minimalista che mostra una spunta sopra due linee orizzontali impilate,
              rappresentando una lista di compiti.
            </desc>
            <g
              fill="none"
              stroke="#1a1a1a"
              stroke-width="8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="14 22 26 34 50 10" />

              <line x1="14" y1="46" x2="50" y2="46" />

              <line x1="14" y1="58" x2="50" y2="58" />
            </g>
          </svg>
          <p class="text-4xl font-black">TodoDash</p>
        </div>
      </template>

      <template v-slot:body>
        <div class="flex flex-col justify-baseline w-full h-full">
          <div class="flex flex-col justify-start w-full h-fit py-10">
            <MenuButtonComponent icon="pi-home" label="Dashboard" :isSelected="true" />
            <MenuButtonComponent icon="pi-tags" label="Categories" />
            <MenuButtonComponent icon="pi-cog" label="Settings" />
          </div>

          <FiltersGroupComponent
            @filter_selected="(filter: FilterInterface) => filters_manage(filter)"
          />
        </div>
      </template>

      <template v-slot:footer>
        <UserComponent />
      </template>
    </SideContainerComponent>

    <ActivityComponent
      :activity="allActivities"
      :filters="active_filter"
      @open_pop_up="(obj: ActivityInterface) => (activity_in_pop_up = obj)"
      @delete-activity="(activity: ActivityInterface) => setRemoveActivity(activity)"
    />

    <SideContainerComponent title="Overview">
      <template v-slot:header>
        <ButtonComponent
          :direction="Position.RIGHT"
          :icon="'pi-plus'"
          :label="'New Activity'"
          :radius="ButtonRadius.SMALL"
          @click="isVisibleAddActivity = true"
        />
      </template>
      <template v-slot:body>
        <DashboardComponent :activities="allActivities" />
      </template>
    </SideContainerComponent>
  </div>

  <PopUpComponent
    v-if="isVisibleAddActivity"
    title="Create New Activity"
    footer_btn_title="Add"
    :disable_btn_footer="false"
    :editable="false"
    icon_button_2="pi-plus"
    @closed="isVisibleAddActivity = false"
    @confirm="handleConfirmClick"
  >
    <CreateActivityComponent
      ref="activityFormRef"
      @closed="handleFormSuccess"
      @submit="(form: ActivityInterface) => handleSave(APP_MESSAGE.ACTIVITY.ADD_SUCCESS, form)"
    />
  </PopUpComponent>

  <PopUpComponent
    v-if="activity_in_pop_up"
    :activity="activity_in_pop_up"
    :title="activity_in_pop_up.title"
    :disable_btn_footer="activity_in_pop_up.status"
    :icon_button_2="'pi-check'"
    :editable="true"
    footer_btn_title="Complete Activity"
    @closed="() => (activity_in_pop_up = undefined)"
    @confirm="(a: ActivityInterface) => completeActivityHandler(a)"
    @remove="(activity: ActivityInterface) => setRemoveActivity(activity)"
  >
    <PopUpActivityComponents :activity="activity_in_pop_up" />
  </PopUpComponent>

  <PopUpComponent
    v-if="isVisibleWarningPopup == true"
    :title="'Warning'"
    :footer_btn_title="'Confirm'"
    :icon_button_2="'pi-trash'"
    :disable_btn_footer="false"
    :editable="false"
    @closed="isVisibleWarningPopup = false"
    @confirm="rmActivity(delete_activity_in_popup)"
  >
    Are you sure you want to delete the activity?
  </PopUpComponent>
</template>

<style scoped>
.container {
  flex-direction: column;
  /* width: 100%; */
}

.main-container {
  justify-content: center;
  gap: 0vw;
  padding: 0;
  margin: 0;
}
</style>
