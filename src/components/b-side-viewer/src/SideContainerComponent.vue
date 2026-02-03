<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-2 w-65">
    <h1 class="w-full text-center font-bold text-4xl">{{ props.title }}</h1>
    <div
      class="w-full h-full py-2 px-1 rounded-md shadow-lg shadow-sky-100/10 outline-2 outline-neutral-700"
    >
      <slot />
    </div>
  </div>
</template>
