<script setup lang="ts">
import { ref } from 'vue';
import type ActivityInterface from '@/core/interface/ActivityInterface';

const emit = defineEmits(['submit', 'closed']);
const formRef = ref<HTMLFormElement | null>(null);

defineExpose({
  triggerSubmit,
});

const title = ref('');
const category = ref('');
const priority = ref('');
const note = ref('');
const duration = ref(0);

const priorityOptionData = localStorage.getItem('priority-option');
const optionStored = priorityOptionData ? JSON.parse(priorityOptionData) : {};
const optionsArray = optionStored.option ? Object.values(optionStored.option) : [];

function submit() {
  const activity: ActivityInterface = {
    id: crypto.randomUUID(),
    title: title.value,
    categories: [
      {
        id: Number.parseInt(crypto.randomUUID()),
        label: category.value,
        color: 'standard',
        primary: true,
      },
    ],
    priority: priority.value,
    duration: duration.value < 72 ? duration.value : 72,
    note: note.value,
    status: false,
    filters: [
      { filter_name: category.value, filter_id: 3, status: false },
      { filter_name: priority.value, filter_id: 4, status: false },
      { filter_name: String(duration.value), filter_id: 5, status: false },
    ],
  };
  emit('submit', activity);
}

function triggerSubmit() {
  if (formRef.value) formRef.value.requestSubmit();
  return false;
}
</script>

<template>
  <div class="h-full flex mx-2">
    <form
      class="flex flex-col justify-between gap-1 w-full overflow-y-hidden"
      ref="formRef"
      @submit.prevent="submit"
    >
      <!-- Riga 1 -->
      <div class="flex flex-row gap-5 w-full min-w-full">
        <!-- Title -->
        <div class="w-75 flex flex-col justify-end">
          <label for="title-content" class="w-full tracking-wide">Title *</label>
          <input
            class="rounded-md border-0 px-3 w-full outline-0 py-2 bg-neutral-800"
            name="title-content"
            type="text"
            v-model="title"
            maxlength="20"
            required
          />
          <span for="title-content" class="w-full text-align-end text-[10px]"
            >{{ title.length }} / 20</span
          >
        </div>
        <!-- Time -->
        <div class="w-25 flex flex-col justify-end">
          <label for="duration" class="w-full tracking-wide">Time (h)</label>
          <input
            class="rounded-md border-0 px-3 w-full outline-0 py-2 bg-neutral-800"
            name="duration"
            type="number"
            v-model="duration"
            maxlength="2"
            min="0"
            max="72"
            required
          />
          <span for="duration" class="w-full text-align-end text-[10px]">Max 72 Hours</span>
        </div>
      </div>

      <!-- Riga 2 -->
      <div class="flex flex-row gap-5 w-full min-w-full">
        <!-- Category -->
        <div class="w-75 flex flex-col justify-end">
          <label for="category-content" class="w-full tracking-wide">Category *</label>
          <input
            class="rounded-md border-0 px-3 w-full outline-0 py-2 bg-neutral-800"
            name="category-content"
            type="text"
            v-model="category"
            maxlength="20"
            required
          />
          <span for="category-content" class="w-full text-align-end text-[10px]"
            >{{ category.length }} / 20</span
          >
        </div>

        <!-- Priority -->
        <div class="w-25 flex flex-col justify-end">
          <label for="note-content" class="w-full tracking-wide">Priority *</label>
          <select
            v-if="optionsArray.length > 0"
            name="note-content"
            class="w-full btn rounded-md py-2 bg-neutral-800 outline-0 px-1 focus:outline-0"
            v-model="priority"
            required
          >
            <option v-for="opt in optionsArray" :value="opt" :key="opt as string">
              {{ opt }}
            </option>
          </select>

          <select
            v-else
            name="note-content"
            class="w-full btn rounded-md py-2 bg-neutral-800 outline-0 px-1 focus:outline-0"
            v-model="priority"
            required
          >
            <option>Lower</option>
            <option>Medium</option>
            <option>Higher</option>
          </select>
          <label for="note" class="text-transparent w-full text-align-end text-[10px]">a</label>
        </div>
      </div>

      <!-- Riga 3 -->
      <div class="txt-area-container flex flex-col w-full">
        <h3 class="text-start w-full tracking-wide">Note</h3>

        <textarea
          v-model="note"
          id="note-content"
          name="note-content"
          class="min-x-90 h-50 resize-none rounded-md p-4 bg-neutral-800 focus:outline-0"
          maxlength="500"
        ></textarea>

        <label for="note-content" class="w-full text-align-end text-[10px]"
          >{{ note.length }} / 500</label
        >
      </div>

      <p class="text-[10px] w-full tracking-wide">*Required fields</p>
    </form>
  </div>
</template>
