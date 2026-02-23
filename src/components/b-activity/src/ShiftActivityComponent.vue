<script lang="ts" setup>
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';
import { useActivity } from '@/composable/useActivity';
import { usePagination } from '@/composable/usePagination';
import { ButtonDimension } from '@/enums/ButtonEnum';

const { allActivities } = useActivity();
const { nextPage, prevPage, currentPage } = usePagination();
</script>

<template>
  <div class="w-1/2 flex justify-center" v-if="allActivities.length > 5">
    <div class="flex justify-between px-2 w-1/2 rounded-xl">
      <ButtonComponent icon="pi-angle-left" :dimension="ButtonDimension.BIG" @click="prevPage()" />

      <h2 class="text-center text-nowrap flex items-center font-semibold text-2xl">
        Page {{ currentPage }}
      </h2>

      <ButtonComponent icon="pi-angle-right" :dimension="ButtonDimension.BIG" @click="nextPage()" />
    </div>
  </div>
</template>
