<script lang="ts" setup>
import type FilterInterface from '@/core/interface/FilterInterface';
import { ref } from 'vue';

const props = defineProps({ filters: Boolean });

const active_filter = ref<FilterInterface[]>([]);

function filters_manage(filters: FilterInterface) {
  if (!filters.status) {
    if (!active_filter.value.some((f) => f.filter_name === filters.filter_name)) {
      active_filter.value.push(filters);
    }
  } else {
    active_filter.value = removeFilter(filters);
  }
}

function removeFilter(filter: FilterInterface) {
  return active_filter.value.filter((f: FilterInterface) => f.filter_name !== filter.filter_name);
}
</script>

<template>
  <div class="w-fit min-w-1/5 h-full p-4">
    <SideContainerComponent>
      <template v-slot:header>
        <div class="flex justify-center items-center w-full h-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="64"
            height="64"
            role="img"
            aria-label="Task Manager Logo"
          >
            <title>Task Manager Minimal Logo</title>
            <g
              fill="none"
              stroke="#1a1a1a"
              stroke-width="8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="14 22 26 34 50 10" />

              <line x1="14" y1="46" x2="50" y2="46" />

              <line x1="14" y1="58" x2="50" y2="58" />
            </g>
          </svg>
          <p class="text-4xl font-black">TodoDash</p>
        </div>
      </template>

      <template v-slot:body>
        <div class="flex flex-col justify-baseline w-full h-full">
          <div class="flex flex-col justify-start w-full h-fit py-10">
            <MenuButtonComponent icon="pi-home" label="Dashboard" :isSelected="false" path="home" />
            <MenuButtonComponent
              icon="pi-tags"
              label="Categories"
              :isSelected="true"
              path="category"
            />
            <MenuButtonComponent icon="pi-cog" label="Settings" path="home" />
          </div>

          <FiltersGroupComponent
            v-if="props.filters"
            @filter_selected="(filter: FilterInterface) => filters_manage(filter)"
          />
        </div>
      </template>

      <template v-slot:footer>
        <UserComponent />
      </template>
    </SideContainerComponent>
  </div>
</template>
