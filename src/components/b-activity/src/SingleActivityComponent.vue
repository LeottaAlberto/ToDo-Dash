<script lang="ts" setup>
import type ActivityInterface from '@/core/interface/ActivityInterface';
import { ref } from 'vue';

const props = defineProps<{
  activity: ActivityInterface;
}>();

const priority = ref({
  Priority: [
    ['H', 'p-high'],
    ['M', 'p-medium'],
    ['L', 'p-low'],
  ],
});

function priorityClass(p: string) {
  if (!p) return '';
  const key = p.charAt(0).toUpperCase();
  const found = priority.value['Priority'].find((f: string[]) => f[0] === key);
  return found ? found[1] : '';
}
</script>

<template>
  <div
    v-if="props.activity"
    :class="[
      props.activity.status
        ? 'hover:outline-lime-600 brightness-50 hover:brightness-75'
        : 'outline-violet-500 hover:brightness-125',
    ]"
    class="flex justify-between cursor-pointer px-4 py-2 w-full rounded-md transition-all duration-50 bg-neutral-600 hover:outline-2"
  >
    <div class="flex flex-col pt-1 gap-2">
      <!-- Priority -->
      <div class="flex content-start w-full max-h-6 cursor-default">
        <span
          class="flex justify-center items-center rounded-md text-xs text-bold p-2"
          :class="[priorityClass(props.activity.priority), { grayscale: props.activity.status }]"
          >{{ props.activity.priority.toUpperCase() }}</span
        >
      </div>

      <!-- Title -->
      <div class="flex content-start w-full text-3xl">
        <h2 v-if="props.activity.title.length < 30" class="font-bold whitespace-nowrap">
          {{ props.activity.title }}
        </h2>
        <h2 v-else :title="props.activity.title" class="font-bold whitespace-nowrap">
          {{ props.activity.title.substring(0, 30) }}...
        </h2>
      </div>
    </div>

    <div class="flex flex-wrap flex-col justify-center w-1/4">
      <h2
        v-if="props.activity.type.length < 15"
        class="flex flex-wrap justify-end font-bolder w-full"
      >
        <svg
          v-if="!props.activity.status"
          fill="none"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path
              d="M5.06152 12C5.55362 8.05369 8.92001 5 12.9996 5C17.4179 5 20.9996 8.58172 20.9996 13C20.9996 17.4183 17.4179 21 12.9996 21H8M13 13V9M11 3H15M3 15H8M5 18H10"
              stroke="#ebebeba3"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              data-darkreader-inline-stroke=""
              style="--darkreader-inline-stroke: var(--darkreader-text-000000, #e8e6e3)"
            />
          </g>
        </svg>
        <svg
          v-else
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

          <g id="SVGRepo_iconCarrier">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.4933 6.93502C15.8053 7.20743 15.8374 7.68122 15.565 7.99325L7.70786 16.9933C7.56543 17.1564 7.35943 17.25 7.14287 17.25C6.9263 17.25 6.72031 17.1564 6.57788 16.9933L3.43502 13.3933C3.16261 13.0812 3.19473 12.6074 3.50677 12.335C3.8188 12.0626 4.29259 12.0947 4.565 12.4068L7.14287 15.3596L14.435 7.00677C14.7074 6.69473 15.1812 6.66261 15.4933 6.93502Z"
              fill="#4caf50"
              style="--darkreader-inline-fill: var(--darkreader-background-4caf50, #3d8c40)"
              data-darkreader-inline-fill=""
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5175 7.01946C20.8174 7.30513 20.829 7.77986 20.5433 8.07981L11.9716 17.0798C11.8201 17.2389 11.6065 17.3235 11.3872 17.3114C11.1679 17.2993 10.9649 17.1917 10.8318 17.0169L10.4035 16.4544C10.1526 16.1249 10.2163 15.6543 10.5458 15.4034C10.8289 15.1878 11.2161 15.2044 11.4787 15.4223L19.4571 7.04531C19.7428 6.74537 20.2175 6.73379 20.5175 7.01946Z"
              fill="#4caf50"
              style="--darkreader-inline-fill: var(--darkreader-background-4caf50, #3d8c40)"
              data-darkreader-inline-fill=""
            />
          </g>
        </svg>
        <h5 v-if="!props.activity.status" class="font-bolder">{{ props.activity.duration }}h</h5>
      </h2>

      <h2 v-else class="flex flex-wrap justify-end font-bolder">
        <svg
          v-if="!props.activity.status"
          fill="none"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path
              d="M5.06152 12C5.55362 8.05369 8.92001 5 12.9996 5C17.4179 5 20.9996 8.58172 20.9996 13C20.9996 17.4183 17.4179 21 12.9996 21H8M13 13V9M11 3H15M3 15H8M5 18H10"
              stroke="#ebebeba3"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              data-darkreader-inline-stroke=""
              style="--darkreader-inline-stroke: var(--darkreader-text-000000, #e8e6e3)"
            />
          </g>
        </svg>
        <svg
          v-else
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

          <g id="SVGRepo_iconCarrier">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.4933 6.93502C15.8053 7.20743 15.8374 7.68122 15.565 7.99325L7.70786 16.9933C7.56543 17.1564 7.35943 17.25 7.14287 17.25C6.9263 17.25 6.72031 17.1564 6.57788 16.9933L3.43502 13.3933C3.16261 13.0812 3.19473 12.6074 3.50677 12.335C3.8188 12.0626 4.29259 12.0947 4.565 12.4068L7.14287 15.3596L14.435 7.00677C14.7074 6.69473 15.1812 6.66261 15.4933 6.93502Z"
              fill="#4caf50"
              style="--darkreader-inline-fill: var(--darkreader-background-4caf50, #3d8c40)"
              data-darkreader-inline-fill=""
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5175 7.01946C20.8174 7.30513 20.829 7.77986 20.5433 8.07981L11.9716 17.0798C11.8201 17.2389 11.6065 17.3235 11.3872 17.3114C11.1679 17.2993 10.9649 17.1917 10.8318 17.0169L10.4035 16.4544C10.1526 16.1249 10.2163 15.6543 10.5458 15.4034C10.8289 15.1878 11.2161 15.2044 11.4787 15.4223L19.4571 7.04531C19.7428 6.74537 20.2175 6.73379 20.5175 7.01946Z"
              fill="#4caf50"
              style="--darkreader-inline-fill: var(--darkreader-background-4caf50, #3d8c40)"
              data-darkreader-inline-fill=""
            />
          </g>
        </svg>
        {{ props.activity.duration }}h
      </h2>
      <h2 v-if="props.activity.type.length < 15" class="flex justify-end w-full text-md">
        {{ props.activity.type }}
      </h2>
      <h2 v-else class="flex justify-end w-50 text-md pr-2" :title="props.activity.type">
        {{ props.activity.type.substring(0, 15) }}...
      </h2>
    </div>
  </div>
</template>
