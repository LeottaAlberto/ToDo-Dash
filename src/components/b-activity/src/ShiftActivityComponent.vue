<script lang="ts" setup>
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';
import { useActivity } from '@/composable/useActivity';
import { usePagination } from '@/composable/usePagination';

const { allActivities } = useActivity();
const { nextPage, prevPage } = usePagination();
</script>

<template>
  <div class="absolute bottom-0 w-full flex justify-center py-4" v-if="allActivities.length > 5">
    <div class="bg-neutral-800 flex justify-between px-2 w-2/12 rounded-xl">
      <ButtonComponent :icon="'leftArrow'" @click="prevPage()" />

      <h2 class="text-center flex items-center font-bold text-3xl">Activity</h2>

      <ButtonComponent :icon="'rightArrow'" @click="nextPage()" />
    </div>
  </div>
</template>
