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
  <div class="flex flex-col gap-2 w-full p-2">
    <StatisticComponent :statName="'Total Activities'" :statNum="stats.all">
      <svg
        width="60px"
        height="50px"
        viewBox="-2.4 -2.4 28.80 28.80"
        xmlns="http://www.w3.org/2000/svg"
        fill="#c084fc"
        data-darkreader-inline-fill=""
        style="--darkreader-inline-fill: var(--darkreader-background-000000, #ebebeba3); padding: 0"
        class="flex"
        transform="matrix(1, 0, 0, 1, 0, 0)"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="#CCCCCC"
          stroke-width="0.048"
          data-darkreader-inline-stroke=""
          style="--darkreader-inline-stroke: var(--darkreader-text-cccccc, #c8c3bc)"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M20 4h-3V3h-3a2 2 0 0 0-4 0H7v1H4v18h16zM8 4h3V2.615A.615.615 0 0 1 11.614 2h.771a.615.615 0 0 1 .615.615V4h3v2H8zm11 17H5V5h2v2h10V5h2zM7 18h5v1H7zm0-8h10v1H7zm0 4h10v1H7z"
          />
          <path fill="none" d="M0 0h24v24H0z" />
        </g>
      </svg>
    </StatisticComponent>

    <!-- :icon_name="'num_activity_completed'" -->
    <StatisticComponent :statName="'Completed'" :statNum="stats.completed">
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="#34d399"
        data-darkreader-inline-fill=""
        style="
          --darkreader-inline-fill: var(--darkreader-background-ebebeba3, rgba(35, 38, 40, 0.64));
        "
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M7 13.689l.637-.636 2.863 2.674 7.022-6.87.637.637L10.5 17zM22.8 12.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"
          />
          <path fill="none" d="M0 0h24v24H0z" />
        </g>
      </svg>
    </StatisticComponent>

    <!-- :icon_name="'num_activity_uncompleted'" -->
    <StatisticComponent :statName="'Uncompleted'" :statNum="stats.uncompleted">
      <svg
        width="51px"
        height="51px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="#fb7185"
        data-darkreader-inline-fill=""
        style="
          --darkreader-inline-fill: var(--darkreader-background-ebebeba3, rgba(35, 38, 40, 0.64));
        "
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M17.45 8.257L13.207 12.5l4.243 4.243-.707.707-4.243-4.243-4.243 4.243-.707-.707 4.243-4.243L7.55 8.257l.707-.707 4.243 4.243 4.243-4.243zM22.8 12.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"
          />
          <path fill="none" d="M0 0h24v24H0z" />
        </g>
      </svg>
    </StatisticComponent>
  </div>
</template>
