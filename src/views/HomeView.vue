<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type ActivityInterface from '../core/interface/ActivityInterface';
import type FilterInterface from '../core/interface/FilterInterface';
import type { ToastMessage } from '@/core/interface/ToastInterface';

import { useActivity } from '@/composable/useActivity';
import { useToast } from '@/composable/useToast';
import { APP_MESSAGE } from '@/core/constants/messages';

import ActivityComponent from '@/components/b-activity/src/ActivityComponent.vue';
import CreateActivityComponent from '@/components/b-popup/src/CreateActivityComponent.vue';
import PopUpActivityComponents from '@/components/b-popup/src/ActivityDetailsComponents.vue';
import PopUpComponent from '@/components/b-popup/src/PopUpComponent.vue';
import RightContainerComponent from '@/components/b-side-viewer/src/RightContainerComponent.vue';
import LeftContainerComponent from '@/components/b-side-viewer/src/LeftContainerComponent.vue';

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

const getPriorityColor = (type: string) => {
  switch (type) {
    case 'H':
      return 'border-2 border-red-500 text-red-400';
    case 'M':
      return 'border-2 border-amber-500 text-amber-400';
    case 'L':
      return 'border-2 border-sky-600 text-sky-500';
  }
};
</script>

<template>
  <div class="flex flex-row gap-10 justify-start w-full h-full">
    <LeftContainerComponent :filters="true" :settings="false" />

    <ActivityComponent
      :activity="allActivities"
      :filters="active_filter"
      @open_pop_up="(obj: ActivityInterface) => (activity_in_pop_up = obj)"
      @delete-activity="(activity: ActivityInterface) => setRemoveActivity(activity)"
    />

    <RightContainerComponent @is-visible="isVisibleAddActivity = true" />
  </div>

  <PopUpComponent
    :show="isVisibleAddActivity"
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
    :show="activity_in_pop_up !== undefined"
    :activity="activity_in_pop_up"
    :title="activity_in_pop_up.title"
    :disable_btn_footer="activity_in_pop_up.status"
    :icon_button_2="'pi-check'"
    :editable="true"
    footer_btn_title="Complete"
    @closed="() => (activity_in_pop_up = undefined)"
    @confirm="(a: ActivityInterface) => completeActivityHandler(a)"
    @remove="(activity: ActivityInterface) => setRemoveActivity(activity)"
  >
    <template v-slot:title-element>
      <span
        class="px-6 py-1 rounded-md text-xs font-extrabold bg-transparent"
        :class="[getPriorityColor(activity_in_pop_up.priority.charAt(0).toUpperCase())]"
        >{{ activity_in_pop_up.priority.toUpperCase() }}</span
      >
    </template>
    <PopUpActivityComponents :activity="activity_in_pop_up" />
  </PopUpComponent>

  <PopUpComponent
    :show="isVisibleWarningPopup == true"
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
