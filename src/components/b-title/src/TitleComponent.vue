<template>
  <div class="title-component-container flex w-75 h-20 z-10">
    <div
      class="flex flex-row justify-between items-center rounded-md w-full h-max py-2 px-4 outline-2 outline-neutral-700 bg-transparent"
    >
      <h1 class="text-bolder text-4xl font-bold">My ToDo-Dash</h1>
      <ButtonComponent @click="emit('clicked')"> Add Activity </ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';

const emit = defineEmits(['clicked']);
</script>
