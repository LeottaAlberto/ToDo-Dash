<script lang="ts" setup>
import { useActivity } from '@/composable/useActivity';
import { usePagination } from '@/composable/usePagination';

const { allActivities } = useActivity();
const { nextPage, prevPage } = usePagination();
</script>

<template>
  <div class="flex scroll-buttons w-50" v-if="allActivities.length > 5">
    <div class="flex border-standard w-25">
      <button @click.stop="prevPage()">
        <svg
          width="48px"
          height="48px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(180)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path
              d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19"
              stroke="#181818"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              data-darkreader-inline-stroke=""
              style="--darkreader-inline-stroke: var(--darkreader-text-000000, #e8e6e3)"
            />
          </g>
        </svg>
      </button>
      <h2 class="text-bolder text-align-center">Activity</h2>
      <button @click.stop="nextPage()">
        <svg
          width="48px"
          height="48px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path
              d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19"
              stroke="#181818"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              data-darkreader-inline-stroke=""
              style="--darkreader-inline-stroke: var(--darkreader-text-000000, #e8e6e3)"
            />
          </g>
        </svg>
      </button>
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
