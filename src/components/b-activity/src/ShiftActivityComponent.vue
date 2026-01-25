<script lang="ts" setup>
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';
import { useActivity } from '@/composable/useActivity';
import { usePagination } from '@/composable/usePagination';

const { allActivities } = useActivity();
const { nextPage, prevPage } = usePagination();
</script>

<template>
  <div class="flex scroll-buttons w-50" v-if="allActivities.length > 5">
    <div class="flex border-standard w-25 radius-standard">
      <ButtonComponent :icon="'leftArrow'" @click="prevPage()" />

      <h2 class="text-bolder text-align-center">Activity</h2>

      <ButtonComponent :icon="'rightArrow'" @click="nextPage()" />
    </div>
  </div>
</template>

<style scoped>
.scroll-buttons {
  position: absolute;
  bottom: 1vh;
}

.scroll-buttons > div {
  background-color: var(--vt-c-divider-dark-1);
  justify-content: space-between;
}

button {
  transition: all 0.05s;
  background-color: transparent;
  border: transparent;
}

button:hover {
  transform: scale(1.08, 1.08);
}
</style>
