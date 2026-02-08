<template>
  <div class="title-component-container flex w-75 h-20 z-10">
    <div
      class="flex flex-row justify-between items-center rounded-md w-full h-max py-2 px-4 outline-2 outline-neutral-700 bg-transparent"
    >
      <h1 class="font-bold text-4xl w-100">My ToDo-Dash</h1>
      <ButtonComponent
        :direction="Position.RIGHT"
        :label="'Add Activity'"
        :icon="'pi-plus'"
        @click="emit('clicked')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';
import { Position } from '@/enums';

const emit = defineEmits(['clicked']);
</script>
