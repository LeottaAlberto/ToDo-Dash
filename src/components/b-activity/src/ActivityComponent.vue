<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  type ComponentPublicInstance,
} from 'vue';
import { useActivity } from '@/composable/useActivity';
import { useFilter } from '@/composable/useFilter';
import { usePagination } from '@/composable/usePagination';
import type ActivityInterface from '@/core/interface/ActivityInterface';
import SingleActivityComponent from './SingleActivityComponent.vue';
import ShiftActivityComponent from './ShiftActivityComponent.vue';

const { allActivities } = useActivity();
const { activeFilters } = useFilter();

const { currentPage, itemPerPage } = usePagination();

const hDiv = ref<HTMLElement | null>(null);
const hHeader = ref<HTMLElement | null>(null);
const firstActivity = ref<ComponentPublicInstance | HTMLElement | null>(null);

const fixedHeight = ref<string>('auto');

let observer: ResizeObserver | null = null;

const emits = defineEmits(['open_pop_up', 'delete-activity', 'create-activity']);

const filteredActivities = computed(() => {
  const isAllSelected = activeFilters.value.some((f) => f.filter_id === 0);
  if (activeFilters.value.length === 0 || isAllSelected) {
    return allActivities.value;
  }

  return allActivities.value.filter((activity) => {
    const statusFilter = activeFilters.value.find((f) => f.filter_id === 1 || f.filter_id === 2);

    if (statusFilter) {
      const isCompletedRequested = statusFilter.filter_id === 1;
      if (activity.status !== isCompletedRequested) return false;
    }

    const activeTags = activeFilters.value.filter((f) => f.filter_id > 2);

    if (activeTags.length === 0) return true;

    const hasMatchingTag = activity.filters.some((activityFilter) => {
      return activeTags.some((activeTag) => activeTag.filter_id === activityFilter.filter_id);
    });

    return hasMatchingTag;
  });
});

const visibleActivities = computed(() => {
  const start = itemPerPage.value * (currentPage.value - 1);
  const end =
    start + itemPerPage.value > 0 ? start + itemPerPage.value : (start + itemPerPage.value) * -1;
  return filteredActivities.value.slice(start, end);
});

function justifyClass() {
  if (visibleActivities.value.length < itemPerPage.value) return 'justify-baseline';
  else return 'justify-start';
}

const calculateHeight = () => {
  if (hDiv.value && firstActivity.value) {
    const activityEl = (firstActivity.value as ComponentPublicInstance).$el || firstActivity.value;

    if (activityEl instanceof HTMLElement) {
      const parentEl = hDiv.value.parentElement;
      const header = hHeader.value?.parentElement;

      if (!parentEl) return;
      if (!header) return;

      const parentHeight = parentEl.clientHeight;
      const headerHeight = header.clientHeight;
      const containerPadding = 48;
      const gap = 8;

      const availableHeight = parentHeight - containerPadding;
      const singleItemHeight = activityEl.offsetHeight;

      if (singleItemHeight > 0) {
        const capacity = Math.floor(
          (availableHeight - (availableHeight - headerHeight)) / (singleItemHeight + gap - 5),
        );

        itemPerPage.value = Math.max(1, capacity);

        const totalPixels = capacity * (singleItemHeight + gap) - gap + containerPadding;
        fixedHeight.value = `${totalPixels}px`;
      }
    }
  }
};

onMounted(async () => {
  await nextTick();
  calculateHeight();

  observer = new ResizeObserver(() => {
    calculateHeight();
  });

  if (hDiv.value) observer.observe(hDiv.value.parentElement || hDiv.value);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateHeight);
});
</script>

<template>
  <div class="flex flex-col items-center w-2/3 h-full overflow-hidden /*bg-zinc-800/50*/ py-4">
    <div class="flex flex-row justify-between w-full py-6 rounded-t-xl bg-zinc-800/50">
      <div class="flex flex-row justify-between items-center w-full px-8">
        <p class="font-bold text-4xl w-50">My Activities</p>

        <ShiftActivityComponent class="flex justify-end w-1/2" />
      </div>
    </div>

    <div ref="hDiv" class="w-full h-full max-y-11/12 overflow-hidden">
      <div
        ref="hHeader"
        class="grid grid-cols-[2fr_1fr_1fr] items-center bg-zinc-800/50 border-b-2 border-t-2 border-neutral-900 font-bold text-2xl text-white/50 tracking-wider h-13"
      >
        <p class="flex justify-center items-center h-full border-r-2 border-neutral-900">Title</p>
        <p class="flex justify-center items-center h-full border-r-2 border-neutral-900">
          Category
        </p>
        <p class="flex justify-center items-center h-full">Given To</p>
      </div>
      <div class="h-full">
        <TransitionGroup
          name="list"
          tag="div"
          class="flex flex-col h-full bg-zinc-800/50"
          :class="[justifyClass()]"
          v-if="visibleActivities.length > 0"
        >
          <div
            v-for="(item, index) in visibleActivities"
            :key="index"
            class="odd:bg-zinc-800 even:bg-neutral-700 transition-colors"
          >
            <SingleActivityComponent
              class="bg-transparent"
              @popup="(activity: ActivityInterface) => emits('open_pop_up', activity)"
              @delete-activity="(activity: ActivityInterface) => emits('delete-activity', activity)"
              :activity="item"
              :ref="
                (el) => {
                  if (index === 0) firstActivity = el as any;
                }
              "
            />
          </div>
        </TransitionGroup>
        <div v-else class="flex items-center justify-center h-full">
          <p class="text-gray-300 italic">There are no activities</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active {
  transition: all 0.2s ease-out;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.list-leave-active {
  transition: opacity 0.000000001s;
  position: absolute;
}

.list-leave-to {
  opacity: 0;
}

.list-move {
  transition: none !important;
}
</style>
