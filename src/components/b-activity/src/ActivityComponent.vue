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
const firstActivity = ref<ComponentPublicInstance | HTMLElement | null>(null);

const fixedHeight = ref<string>('auto');

let observer: ResizeObserver | null = null;

const emits = defineEmits(['open_pop_up', 'delete-activity']);

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
      if (!parentEl) return;

      const parentHeight = parentEl.clientHeight;
      const containerPadding = 48;
      const gap = 8;

      const availableHeight = parentHeight - containerPadding;
      const singleItemHeight = activityEl.offsetHeight;

      if (singleItemHeight > 0) {
        const capacity = Math.floor((availableHeight + gap) / (singleItemHeight + gap));
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
  <div class="flex flex-col items-center p-1 w-1/2 h-11/12">
    <div ref="hDiv" class="m-3 py-4 px-8 w-3/4 h-full rounded-xl bg-zinc-900/50">
      <TransitionGroup
        name="list"
        tag="div"
        class="flex flex-col gap-5 h-full"
        :class="[justifyClass()]"
        v-if="visibleActivities.length > 0"
      >
        <ShiftActivityComponent />
        <div v-for="(item, index) in visibleActivities" :key="item.id">
          <SingleActivityComponent
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
