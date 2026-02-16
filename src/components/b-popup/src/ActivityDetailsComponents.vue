<script setup lang="ts">
import type ActivityInterface from '@/core/interface/ActivityInterface';
import { computed } from 'vue';

const props = defineProps<{
  activity: ActivityInterface;
}>();

const principal = computed(() => props.activity.categories.find((f) => f && f.primary));
const secondary = computed(() => props.activity.categories.filter((f) => f && !f.primary));

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
  <div class="flex flex-col justify-between items-start pt-4 w-full h-full max-h-2/3">
    <span class="w-full h-px bg-gray-400/20"></span>

    <div class="flex flex-row w-full h-20 px-10 gap-15 justify-start items-center">
      <!-- Duration Div -->
      <div class="flex flex-row justify-center items-center gap-2">
        <!-- Icon -->
        <h1 class="text-2xl! pi pi-clock"></h1>
        <!-- Duration Value -->
        <h3 class="w-full flex items-center text-xl font-bold text-center1">
          {{ props.activity.duration }} h
        </h3>
      </div>

      <!-- Priority Div -->
      <div class="flex text-center">
        <!-- Priority Value -->
        <h2 class="w-full text-center">
          <span
            class="px-6 py-1 rounded-md text-md font-extrabold bg-transparent"
            :class="[getPriorityColor(props.activity.priority.charAt(0).toUpperCase())]"
            >{{ props.activity.priority }}</span
          >
        </h2>
      </div>

      <!-- Category Div -->
      <div class="flex flex-row justify-center items-center gap-2">
        <!-- Icon -->
        <h1 class="text-2xl! pi pi-tag rotate-90"></h1>
        <!-- Category Value -->
        <h2 class="w-full text-center font-bold">
          {{ principal?.label }}
        </h2>
      </div>
    </div>
    <div>
      <div v-for="categories in secondary" :key="categories.id">
        <span class="flex items-center bg-neutral-400 w-30 rounded-md max-h-5">
          <h2
            :id="'secondary-category-' + categories.id"
            class="flex justify-center w-full text-md font-bold"
          >
            {{ categories.label }}
          </h2>
        </span>
      </div>
    </div>

    <span class="w-full h-px bg-gray-400/20"></span>

    <div class="flex w-full text-start px-3 pt-4">
      <div v-if="props.activity.note" class="w-full">
        <h2 class="text-start font-bold text-xl w-full">Note</h2>
        <h2 class="text-start w-full font-size-medium">
          {{ props.activity.note }}
        </h2>
      </div>

      <h2 v-else class="font-size-medium">There are no notes for this activity</h2>
    </div>
  </div>
</template>
