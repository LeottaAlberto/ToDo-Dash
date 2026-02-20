<script lang="ts" setup>
import type CategoryInterface from '@/core/interface/CategoryInterface';
import { ref } from 'vue';

const emit = defineEmits(['submit']);

const formRef = ref<HTMLFormElement | null>(null);

const label = ref('');
const color = ref('');

defineExpose({
  submitForm: submit,
});

function submit(event?: Event) {
  if (event) event.preventDefault();

  if (!label.value.trim()) {
    alert('Il nome è obbligatorio');
    return;
  }

  const category: CategoryInterface = {
    id: crypto.randomUUID(),
    label: label.value,
    color: color.value,
    primary: false,
  };
  emit('submit', category);
}
</script>

<template>
  <div>
    <form
      action=""
      ref="formRef"
      @submit.prevent="submit"
      class="flex flex-row justify-between gap-2 py-8"
    >
      <!-- Label -->
      <div
        class="relative flex justify-start items-center rounded-md border border-zinc-600 px-3 py-1 bg-neutral-800 w-2/3 hover:border-violet-700"
      >
        <span for="category-label" class="absolute -top-5 left-0 text-sm">Category Name *</span>
        <input
          name="category-label"
          type="text"
          v-model="label"
          required
          class="w-full px-1 text-start bg-transparent outline-none border-none"
        />
      </div>
      <!-- Color Picker -->
      <div
        class="relative flex justify-between items-center rounded-md border border-zinc-600 px-3 py-1 bg-neutral-800 w-1/3 hover:border-violet-700 transition-all"
      >
        <span class="absolute -top-5 left-0 text-sm text-zinc-400">Category Color *</span>

        <div
          class="relative min-w-6 w-6 h-6 rounded-full border-2 border-zinc-700 shadow-lg cursor-pointer transition-all overflow-hidden hover:scale-110"
          :style="{ backgroundColor: color }"
        >
          <input
            type="color"
            v-model="color"
            class="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer opacity-0"
          />
        </div>

        <input
          type="text"
          v-model="color"
          maxlength="7"
          placeholder="#000000"
          class="w-full px-3 text-start bg-transparent outline-none border-none text-zinc-200 font-mono uppercase"
        />
      </div>
      <input type="submit" class="hidden" />
    </form>
  </div>
</template>
