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
  <div class="flex flex-row justify-between items-start w-full h-full max-h-2/3">
    <div class="flex w-2/5 min-w-2/5 text-start px-3 pt-4">
      <div v-if="props.activity.note" class="w-full">
        <h2 class="text-start font-bold text-xl w-full">Note</h2>
        <h2 class="text-start w-full font-size-medium">
          {{ props.activity.note }}
        </h2>
      </div>

      <h2 v-else class="font-size-medium">There are no notes for this activity</h2>
    </div>

    <span class="w-1 h-96 bg-neutral-600 text-transparent">.</span>

    <div
      class="flex flex-col justify-start items-center gap-15 py-4 px-16 w-full h-full min-h-full"
    >
      <!-- Category Div -->
      <div class="h-1/3">
        <h3>Primary Context</h3>
        <div
          class="flex flex-row justify-center items-center gap-3 p-5 rounded-md w-[20rem] h-full bg-neutral-800 text-violet-500"
        >
          <!-- Icon -->
          <h1 class="text-4xl! pi pi-tag rotate-90"></h1>
          <!-- Category Value -->
          <h2 class="w-fit text-4xl text-center font-bold">
            {{ principal?.label }}
          </h2>
        </div>
      </div>
      <!-- Tags -->
      <div class="w-full h-1/3 text-start">
        <h3>Tags</h3>
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
      <!-- Priority Value -->
      <div class="flex justify-end items-end w-full h-full">
        <h2 class="w-full h-1/3 text-start">
          <span
            class="px-6 py-1 rounded-md text-md font-extrabold bg-transparent h-full"
            :class="[getPriorityColor(props.activity.priority.charAt(0).toUpperCase())]"
            >{{ props.activity.priority }}</span
          >
        </h2>
      </div>
    </div>
  </div>
</template>
