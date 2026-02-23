<script setup lang="ts">
import type ActivityInterface from '@/core/interface/ActivityInterface';
import { computed } from 'vue';

const props = defineProps<{
  activity: ActivityInterface;
}>();

const principal = computed(() => props.activity.categories.find((f) => f && f.primary));
const secondary = computed(() => props.activity.categories.filter((f) => f && !f.primary));
</script>

<template>
  <div class="grid grid-cols-[2fr_1.5fr] pt-5 min-w-130 max-w-150">
    <!-- Note Zone -->
    <div class="flex flex-col justify-between gap-4 w-full text-start px-5">
      <div
        v-if="props.activity.note"
        class="rounded-md gap-2 px-3 py-2 bg-zinc-800/50 min-w-61 w-full max-w-11/12"
      >
        <h2 class="text-start font-bold text-xl text-nowrap w-full uppercase">
          Description & Notes
        </h2>
        <h2 class="text-start w-full text-xs leading-4">
          {{ props.activity.note }}
        </h2>
      </div>

      <h2 v-else class="font-size-medium">There are no notes for this activity</h2>
    </div>
    <!-- Other Data Zone -->
    <div class="flex flex-col gap-2 px-5">
      <!-- Category Div -->
      <div class="flex flex-row justify-start items-center gap-3 py-2 rounded-md text-violet-500">
        <!-- Icon -->
        <i class="text-2xl pi pi-tag rotate-90"></i>
        <!-- Category Value -->
        <h1 class="w-fit text-2xl text-center font-bold">
          {{ principal?.label }}
        </h1>
      </div>
      <!-- Tags -->
      <div class="flex flex-row flex-wrap gap-2 max-h-15 overflow-y-auto">
        <div v-for="category in secondary" :key="category.id">
          <span
            class="flex items-center px-4 w-fit rounded-md max-h-10"
            :style="{ backgroundColor: category.color }"
          >
            <h2
              :id="'secondary-category-' + category.id"
              class="flex justify-center w-full text-xs font-bold py-0.5"
            >
              {{ category.label }}
            </h2>
          </span>
        </div>
        <div v-if="secondary.length === 0">No more tags</div>
      </div>
    </div>
  </div>
</template>
