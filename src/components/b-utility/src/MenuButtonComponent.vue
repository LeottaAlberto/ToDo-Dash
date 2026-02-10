<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  icon: String,
  label: String,
  isSelected: Boolean,
});

const menuButtonClasses = computed(() => {
  return [props.isSelected ? 'bg-neutral-900 border-r-5 border-violet-600 py-4' : 'border-0'];
});
</script>

<template>
  <div
    class="flex flex-row justify-between gap-3 text-3xl font-semibold py-3 cursor-pointer hover:bg-neutral-700"
    :class="menuButtonClasses"
  >
    <i class="text-center w-1/4" :class="[`pi ${props.icon}`]"></i>
    <p class="flex justify-start w-3/4">{{ props.label }}</p>
    <!-- <p class="pi" :class="!props.isSelected ? 'pi-angle-up' : ''"></p> -->
  </div>
</template>
