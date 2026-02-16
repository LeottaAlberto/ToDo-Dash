<script setup lang="ts">
import StatisticComponent from '@/components/b-utility/src/StatisticComponent.vue';
import { useActivity } from '@/composable/useActivity';
import { computed } from 'vue';

const { totalActivities, getNumByType } = useActivity();

const stats = computed(() => {
  return {
    all: totalActivities.value,
    completed: getNumByType(true),
    uncompleted: getNumByType(false),
  };
});
</script>

<template>
  <div class="grid grid-cols-2 gap-4 w-full p-5">
    <p class="col-span-2 text-2xl font-semibold">Overview</p>
    <StatisticComponent
      :statName="'Total Activities'"
      :statNum="stats.all"
      :iconName="'pi-clipboard'"
      class="col-span-2"
    />

    <StatisticComponent
      :statName="'Completed'"
      :statNum="stats.completed"
      :iconName="'pi-check-circle'"
    />

    <StatisticComponent
      :statName="'Uncompleted'"
      :statNum="stats.uncompleted"
      :iconName="'pi-times-circle'"
    />
  </div>
</template>
