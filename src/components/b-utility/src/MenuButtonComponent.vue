<script lang="ts" setup>
import type { MenuInterface } from '@/core/interface/MenuInterface';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps<{
  menu: MenuInterface;
}>();

const isActive = computed(() => {
  return route.path.includes(props.menu.path);
});

const menuButtonClasses = computed(() => {
  return [
    'flex flex-row justify-between items-center gap-3 font-semibold py-3 cursor-pointer hover:bg-neutral-700 transition-all w-full',
    isActive.value
      ? 'bg-neutral-900 border-r-4 border-violet-600'
      : 'border-r-4 border-transparent',
  ];
});
</script>

<template>
  <RouterLink
    :to="{ name: props.menu.path }"
    class="block no-underline group"
    active-class="is-active"
  >
    <div :class="menuButtonClasses">
      <i class="text-center w-1/4 text-3xl" :class="[`pi ${props.menu.icon}`]"></i>
      <p class="flex justify-start w-3/4 text-xl">{{ props.menu.label }}</p>
    </div>
  </RouterLink>
</template>
