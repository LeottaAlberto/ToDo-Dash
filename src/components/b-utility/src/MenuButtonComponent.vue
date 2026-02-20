<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  icon: String,
  label: String,
  isSelected: Boolean,
});

const emit = defineEmits(['press']);

const menuButtonClasses = computed(() => {
  return [props.isSelected ? 'bg-neutral-900 border-r-5 border-violet-600 py-4' : 'border-0'];
});
</script>

<template>
  <div
    class="flex flex-row justify-between gap-3 font-semibold py-3 cursor-pointer hover:bg-neutral-700"
    :class="menuButtonClasses"
    @click="emit('press')"
  >
    <i class="text-center w-1/4 text-3xl" :class="[`pi ${props.icon}`]"></i>
    <p class="flex justify-start w-3/4 text-3xl">{{ props.label }}</p>
    <!-- <p class="pi" :class="!props.isSelected ? 'pi-angle-up' : ''"></p> -->
  </div>
</template>
