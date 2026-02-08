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
  <div class="flex flex-col gap-1 w-full p-2">
    <StatisticComponent
      :statName="'Total Activities'"
      :statNum="stats.all"
      :iconName="'pi-clipboard'"
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
