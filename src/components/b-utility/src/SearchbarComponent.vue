<script lang="ts" setup>
import { ref } from 'vue';

const input = ref('');

// const props = defineProps();
</script>

<template>
  <div class="flex justify-left items-center w-full h-10">
    <div
      class="relative flex flex-row gap-5 justify-between items-center rounded-2xl w-9/12 h-full px-15 bg-neutral-700 hover:outline-1 hover:outline-neutral-600 selected:outline-1 selected:outline-neutral-600"
    >
      <i class="max-h-fit pi pi-search text-xl!"></i>
      <input
        class="w-full outline-0 border-0"
        type="text"
        maxlength="30"
        v-model="input"
        placeholder="Search by name"
      />
      <div
        v-if="input.length === 30"
        class="absolute rounded-md right-10 -top-12 py-2 px-4 bg-amber-500 transition-all duration-75 animate-bounce"
      >
        <p class="text-xs text-gray-300 font-bold">Max 30 characters!</p>
      </div>
    </div>
  </div>
</template>
