<script lang="ts" setup>
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';
import type ActivityInterface from '@/core/interface/ActivityInterface';
import { ButtonDimension } from '@/enums/ButtonEnum';
import { computed, ref } from 'vue';

const NUM_ACTIVITY_SHOW = 2;

const props = defineProps<{
  activity: ActivityInterface;
}>();

const categories = computed(() => {
  return props.activity.categories.slice(0, NUM_ACTIVITY_SHOW);
});

const isHover = ref(false);

const emits = defineEmits(['popup', 'delete-activity']);

const activityClass = computed(() => {
  const base =
    'grid grid-cols-[2fr_1fr_1fr] cursor-pointer w-full h-12! transition-all duration-75 relative';
  const hover = 'hover:z-20 hover:ring-2 hover:ring-inset';

  const priorityMap: Record<string, string> = {
    HIGHER: 'shadow-[inset_5px_0_0_0_#991b1b]',
    MEDIUM: 'shadow-[inset_5px_0_0_0_#f59e0b]',
    LOWER: 'shadow-[inset_5px_0_0_0_#1e40af]',
  };

  const completed = 'shadow-[inset_5px_0_0_0_#5ea500]';

  const priority = props.activity.priority?.toUpperCase() || '';

  const status = props.activity.status
    ? 'hover:ring-lime-600/80 hover:bg-lime-600/5 brightness-110'
    : 'hover:ring-violet-500/80 hover:bg-violet-600/5 brightness-100';

  return `${!props.activity.status ? priorityMap[priority] : completed} ${status} ${base} ${hover}`;
});
</script>

<template>
  <div
    v-if="props.activity"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    @click="emits('popup', props.activity)"
    :class="[activityClass]"
  >
    <div class="border-r-2 border-neutral-900 px-3 h-full flex items-center">
      <h2 class="font-normal truncate text-xl">
        {{ props.activity.title }}
      </h2>
    </div>

    <div
      class="border-r-2 border-neutral-900 px-3 h-full flex flex-row flex-wrap gap-2 items-center"
    >
      <div v-for="category in categories" :key="category.id">
        <div
          :class="[
            'flex items-center rounded-md px-2 py-0',
            category.primary ? 'bg-neutral-500/70' : 'bg-neutral-400',
          ]"
        >
          <span class="text-sm font-bold">{{ category.label }}</span>
        </div>
      </div>
      <div
        v-if="props.activity.categories.length > 2"
        class="flex items-center bg-neutral-400 px-2 py-0.5 rounded-md"
      >
        <span class="text-sm font-bold"
          >+{{ props.activity.categories.length - NUM_ACTIVITY_SHOW }}</span
        >
      </div>
    </div>

    <div class="px-3 h-full flex flex-row justify-between items-center relative">
      <div class="flex flex-row items-center gap-1 font-mono font-bold">
        <!-- <h5 class="text-2xl">{{ props.activity.duration }}h</h5> -->
      </div>

      <Transition name="fade">
        <ButtonComponent
          v-if="isHover"
          icon="pi-trash"
          :dimension="ButtonDimension.SMALL"
          @click.stop="emits('delete-activity', props.activity)"
        />
      </Transition>
    </div>
  </div>
</template>
