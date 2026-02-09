<script lang="ts" setup>
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';
import type ActivityInterface from '@/core/interface/ActivityInterface';
import { Position } from '@/enums';
import { computed, ref } from 'vue';

const props = defineProps<{
  activity: ActivityInterface;
}>();

const emits = defineEmits(['popup', 'delete-activity']);

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

const trashClass = computed(() => {
  return ['bg-transparent'];
});
</script>

<template>
  <div
    v-if="props.activity"
    class="group flex justify-between cursor-pointer px-4 py-2 w-full rounded-md transition-all duration-50 bg-neutral-600 hover:outline-2"
    :class="[
      props.activity.status
        ? 'hover:outline-lime-600 brightness-50 hover:brightness-75'
        : 'outline-violet-500 hover:brightness-125',
    ]"
    @click="emits('popup', props.activity)"
  >
    <div class="flex flex-col pt-1 gap-2 w-full">
      <!-- Priority -->
      <div class="flex content-start w-full max-h-6 cursor-default relative">
        <span
          class="flex justify-center items-center rounded-md text-xs text-bold py-1 px-5 absolute -top-6"
          :class="[priorityClass(props.activity.priority), { grayscale: props.activity.status }]"
          >{{ props.activity.priority.toUpperCase() }}</span
        >
      </div>

      <!-- Title -->
      <div class="flex content-between w-full text-4xl relative">
        <h2 class="font-bold w-full whitespace-nowrap">
          {{ props.activity.title }}
        </h2>
        <ButtonComponent
          :direction="Position.RIGHT"
          :icon="'pi-trash'"
          :class="trashClass"
          class="absolute right-0 -top-4 invisible opacity-0 -translate-y-2 duration-75 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:duration-200 transition-all ease-out"
          @click.stop="emits('delete-activity', props.activity)"
        />
      </div>

      <div class="flex flex-row justify-between items-center w-full relative">
        <!-- Todo: aggiungere for per visualizzare le categorie -->
        <!-- Category -->
        <div class="flex flex-row justify-start gap-2 w-full">
          <span v-for="category in props.activity.categories" :key="category.id">
            <div
              v-if="category.primary"
              class="flex items-center bg-neutral-500/70 w-20 rounded-md max-h-5"
            >
              <h2 class="flex justify-center w-full text-md font-bold">
                {{ category.label }}
              </h2>
            </div>

            <div v-else class="flex items-center bg-neutral-400 w-30 rounded-md max-h-5">
              <h2 class="flex justify-center w-full text-md font-bold">{{ category.label }}</h2>
            </div>
          </span>

          <div class="flex items-center bg-neutral-400 w-10 rounded-md max-h-5">
            <h2 class="flex justify-center w-full text-center text-md font-bold">
              +{{ Math.round(Math.random() * 10) + 1 }}
            </h2>
          </div>
        </div>
        <!-- Duration -->
        <div
          class="flex flex-row items-center justify-end gap-1 font-mono text-center font-bold absolute -top-2 right-0 w-2"
        >
          <i class="pi pi-clock text-2xl"></i>
          <h5 class="text-3xl">{{ props.activity.duration }}h</h5>
        </div>
      </div>
    </div>
  </div>
</template>
