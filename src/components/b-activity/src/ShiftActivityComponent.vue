<script lang="ts" setup>
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';
import { useActivity } from '@/composable/useActivity';
import { usePagination } from '@/composable/usePagination';

const { allActivities } = useActivity();
const { nextPage, prevPage, currentPage } = usePagination();
</script>

<template>
  <div class="w-full flex justify-center" v-if="allActivities.length > 5">
    <div class="bg-neutral-800 flex justify-between px-2 w-1/2 rounded-xl">
      <ButtonComponent :icon="'pi-angle-left'" @click="prevPage()" />

      <h2 class="text-center flex items-center font-bold text-3xl">Page {{ currentPage }}</h2>

      <ButtonComponent :icon="'pi-angle-right'" @click="nextPage()" />
    </div>
  </div>
</template>
