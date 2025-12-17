<script setup lang="ts">
  // import { ref } from 'vue'
  // import FilterGroupComponent from './FilterGroupComponent.vue'

  const props = defineProps<{
    title: string
  }>()
</script>

<template>
    <div class="flex f-col side-container">
      <h1 class="w-100 text-align-center text-bolder font-size-little-big">{{ props.title }}</h1>
      <div class="side-sub-container p-2 box-shadow">
        <slot/>
      </div>
    </div>
</template>

<style scoped>
    .side-container {
      flex-direction: column;
      width: fit-content;
      max-width: 15%;
      min-width: 10%;
    }
    .side-sub-container {
      width: 100%;
      height: 65vh;
      border: solid 2px #4d4d4dd8;
      border-radius: 15px;
      gap: 1vw;
      flex-direction: column;
      justify-content: flex-start;
    }

    .side-sub-container div {
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.3vw;
    }
</style>
