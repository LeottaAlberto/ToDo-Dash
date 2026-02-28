<script lang="ts" setup>
import type FilterInterface from '@/core/interface/FilterInterface';
import { computed, ref } from 'vue';
import MenuButtonComponent from '@/components/b-utility/src/MenuButtonComponent.vue';

const props = defineProps<{ filters: boolean; settings: boolean | false }>();

const menuVoices = ref({
  normal: [
    { id: crypto.randomUUID(), label: 'Dashboard', path: 'home', icon: 'pi-home' },
    { id: crypto.randomUUID(), label: 'Categories', path: 'category', icon: 'pi-tags' },
    { id: crypto.randomUUID(), label: 'Team', path: 'home', icon: 'pi-users' },
  ],
  settings: [
    { id: crypto.randomUUID(), label: 'Account Profile', path: 'accountProfile', icon: 'pi-user' },
    {
      id: crypto.randomUUID(),
      label: 'Security & Password',
      path: 'securityPassword',
      icon: 'pi-lock',
    },
    {
      id: crypto.randomUUID(),
      label: 'Notifications',
      path: 'notifications',
      icon: 'pi-bell',
    },
    {
      id: crypto.randomUUID(),
      label: 'Preferences',
      path: 'preferences',
      icon: 'pi-sliders-h',
    },
  ],
});

const activeMenu = computed(() => {
  return props.settings ? menuVoices.value.settings : menuVoices.value.normal;
});

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
        <div v-if="!props.settings" class="flex justify-center items-center w-full h-fit">
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
        <div
          v-else
          @click="$router.push({ name: 'home' })"
          class="cursor-pointer flex items-center gap-1"
        >
          <i class="pi pi-arrow-left text-2xl"></i>
          <span class="text-xl">Back to Dashboard</span>
        </div>
      </template>

      <template v-slot:body>
        <div class="flex flex-col justify-baseline w-full h-full">
          <div class="flex flex-col justify-start w-full h-fit py-10">
            <div v-for="men in activeMenu" :key="men.id">
              <MenuButtonComponent :menu="men" />
            </div>
          </div>

          <FiltersGroupComponent
            v-if="props.filters"
            @filter_selected="(filter: FilterInterface) => filters_manage(filter)"
          />
        </div>
      </template>

      <template v-slot:footer>
        <UserComponent v-if="!props.settings" />
      </template>
    </SideContainerComponent>
  </div>
</template>
