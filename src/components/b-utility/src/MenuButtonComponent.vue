<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  icon: string;
  label: string;
  path: string;
  isSelected?: boolean;
}>();

const menuButtonClasses = computed(() => {
  return [
    'flex flex-row justify-between items-center gap-3 font-semibold py-3 cursor-pointer hover:bg-neutral-700 transition-all w-full',
    props.isSelected
      ? 'bg-neutral-900 border-r-4 border-violet-600'
      : 'border-r-4 border-transparent',
  ];
});
</script>

<template>
  <RouterLink :to="{ name: props.path }" class="block no-underline group" active-class="is-active">
    <div :class="menuButtonClasses">
      <i class="text-center w-1/4 text-3xl" :class="[`pi ${props.icon}`]"></i>
      <p class="flex justify-start w-3/4 text-3xl">{{ props.label }}</p>
    </div>
  </RouterLink>
</template>
