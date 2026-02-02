<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue';

const props = defineProps({
  statName: String,
  iconName: String,
  statNum: Number,
});

const iconComponent = computed(() => {
  if (!props.iconName) return null;
  return defineAsyncComponent(() => import(`@/assets/SVGs/statistics/${props.iconName}.svg`));
});
</script>

<template>
  <div class="flex items-center justify-between w-full rounded-md gap-2 px-2 py-4">
    <div class="flex justify-center-safe items-center-safe w-50 max-w-15 h-15">
      <component
        v-if="iconComponent"
        :is="iconComponent"
        class="flex justify-center items-center w-full h-full min-y-10"
      />
      <div v-else class="flex justify-center items-center w-full h-full min-y-10">
        <slot></slot>
      </div>
    </div>

    <div class="flex grow items-center">
      <h4>{{ statName }}</h4>
    </div>

    <h1 class="font-extrabold text-2xl min-y-10 text-right m-0 text-stone-300">{{ statNum }}</h1>
  </div>
</template>
