<script setup lang="ts">
import { ref, watch } from 'vue';
import type ActivityInterface from '@/core/interface/ActivityInterface';

const optionStored = ref();

const title = ref('');
const category = ref('');
const priority = ref('');
const note = ref('');
const duration = ref(0);

const formRef = ref<HTMLFormElement | null>(null);

defineExpose({
  triggerSubmit,
});

const emit = defineEmits(['submit', 'closed']);
const props = defineProps({
  isSubmitClicked: Boolean,
});

watch(props, () => {
  const btn = document.getElementById('submit-add-activity-btn');

  if (btn) btn.click();
});

optionStored.value = JSON.parse(localStorage.getItem('priority-option') || '{}');

const optionsArray = optionStored.value.option ? Object.values(optionStored.value.option) : [];

function submit() {
  // Verifica validità del form nativo
  if (formRef.value && !formRef.value.checkValidity()) {
    formRef.value.reportValidity();
    return;
  }

  const activity: ActivityInterface = {
    id: crypto.randomUUID(),
    title: title.value,
    type: category.value,
    priority: priority.value ? priority.value : 'Lower',
    duration: duration.value < 72 ? duration.value : 72,
    note: note.value,
    status: false,
    filters: [
      { filter_name: category.value, filter_id: 3 },
      { filter_name: priority.value, filter_id: 4 },
      { filter_name: duration.value + '', filter_id: 5 },
    ],
  };

  emit('submit', activity);
}

function triggerSubmit() {
  submit();
}
</script>
<template>
  <div class="create-activity-container flex mx-2">
    <form class="flex f-col w-100" ref="formRef" @submit.prevent="submit">
      <!-- Riga 1 -->
      <div class="flex f-row g-3 w-100 min-w-100">
        <!-- Title -->
        <div class="w-75 flex f-col just-content-end">
          <label for="title-content" class="w-100">Title *</label>
          <input name="title-content" type="text" v-model="title" maxlength="20" required />
          <span for="title-content" class="w-100 text-align-end font-size-little"
            >{{ title.length }} / 20</span
          >
        </div>
        <!-- Time -->
        <div class="w-25 flex f-col just-content-end">
          <label for="duration" class="w-100">Time (h)</label>
          <input name="duration" type="number" v-model="duration" maxlength="2" required />
          <span for="duration" class="w-100 text-align-end font-size-little">Max 72 Hours</span>
        </div>
      </div>

      <!-- Riga 2 -->
      <div class="flex f-row g-3 w-100 min-w-100">
        <!-- Category -->
        <div class="w-75 flex f-col just-content-end">
          <label for="category-content" class="w-100">Category *</label>
          <input name="category-content" type="text" v-model="category" maxlength="20" required />
          <span for="category-content" class="w-100 text-align-end font-size-little"
            >{{ category.length }} / 20</span
          >
        </div>

        <!-- Priority -->
        <div class="w-25 flex f-col just-content-end">
          <label for="note-content" class="w-100">Priority *</label>
          <select
            v-if="optionsArray.length > 0"
            name="note-content"
            class="w-100 btn select radius-cummed"
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
            class="w-100 btn select radius-cummed"
            v-model="priority"
            required
          >
            <option>Lower</option>
            <option>Medium</option>
            <option>Higher</option>
          </select>
          <label for="note" class="w-100 text-align-end font-size-little" style="color: transparent"
            >a</label
          >
        </div>
      </div>
      <div class="txt-area-container flex f-col w-100">
        <h3 class="text-align-start w-100">Note</h3>
        <textarea
          v-model="note"
          id="note-content"
          name="note-content"
          class="txt-area"
          maxlength="500"
        ></textarea>
        <label for="note-content" class="w-100 text-align-end font-size-little"
          >{{ note.length }} / 500</label
        >
      </div>
      <p class="font-size-little w-100">* campi obbligatori</p>
      <input type="submit" id="submit-add-activity-btn" hidden />
    </form>
  </div>
</template>
<style scoped>
input {
  background-color: var(--input-background);
}

.create-activity-container {
  height: 35vh;
}

.create-activity-container input {
  border-radius: 7px;
  border: none;
  height: 2vw;
  width: 100%;
  color: var(--color-text);
  padding-inline: 0.3vw;
}

.txt-area {
  width: 100%;
  height: 10vh;
  resize: none;
  border-radius: 8px;
  color: var(--color-text);
  padding: 0.4vw;
}

.txt-area-container {
  width: 100%;
}

.select {
  background-color: var(--input-background);
  color: var(--color-text);
  padding-inline: 0.5vw;
  height: 2vw;
}
</style>
