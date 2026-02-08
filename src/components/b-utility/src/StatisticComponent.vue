<script lang="ts" setup>
const props = defineProps({
  statName: String,
  iconName: String,
  statNum: Number,
});
</script>

<template>
  <div class="flex items-center justify-between w-full rounded-md gap-2 p-2">
    <div class="flex justify-center-safe items-center-safe w-50 max-w-15 h-15">
      <div class="min-y-10 pi text-4xl text-center" :class="props.iconName"></div>
    </div>

    <div class="flex grow items-center justify-start">
      <h4>{{ statName }}</h4>
    </div>

    <h1 class="font-bold text-2xl min-y-10 text-right m-0 text-stone-300">{{ statNum }}</h1>
  </div>
</template>
