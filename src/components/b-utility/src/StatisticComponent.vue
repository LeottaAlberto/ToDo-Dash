<script lang="ts" setup>
const props = defineProps({
  statName: String,
  iconName: String,
  statNum: Number,
});
</script>

<template>
  <div class="flex items-start justify-start w-full rounded-xl gap-2 p-2 bg-zinc-950/40">
    <div class="flex justify-center-safe items-center-safe w-1/4 max-w-15 h-15">
      <div class="min-y-10 pi text-4xl! text-center" :class="props.iconName"></div>
    </div>

    <div class="flex flex-col flex-wrap items-center justify-start w-2/3">
      <h4>{{ statName }}</h4>
      <h1 class="font-bold text-2xl min-y-10 text-right m-0 text-stone-300">{{ statNum }}</h1>
    </div>
  </div>
</template>
