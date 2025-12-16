<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type ActivityInterface from '@/interface/ActivityInterface'

const optionStored = ref()

const title = ref('')
const category = ref('')
const priority = ref('')
const note = ref('')
const duration = ref(0)

const formRef = ref<HTMLFormElement | null>(null)

const emit = defineEmits(['submit', 'closed'])
const props = defineProps({
  isSubmitClicked: Boolean,
})

watch(props, () => {
  const btn = document.getElementById('submit-add-activity-btn')

  if (btn) btn.click()
})

optionStored.value = JSON.parse(localStorage.getItem('priority-option') || '{}')

const optionsArray = optionStored.value.option ? Object.values(optionStored.value.option) : []

for (const option of optionsArray) {
  console.log('Elemento nel ciclo:', option)
}

function closeCreateActivity() {
  emit('closed')
}

function submit() {
  // Verifica validità del form nativo
  if (formRef.value && !formRef.value.checkValidity()) {
    formRef.value.reportValidity()
    return
  }

  if (duration.value > 72) duration.value = 72

  console.log(note.value)

  const activity: ActivityInterface = {
    title: title.value,
    type: category.value,
    priority: priority.value,
    duration: duration.value,
    note: note.value,
    status: [
      { title: 'active', id: 1 },
      { title: 'uncompleted', id: 6 },
      { title: category.value, id: 3 },
      { title: priority.value, id: 4 },
      { title: duration.value + '', id: 5 },
    ],
  }
  emit('submit', activity)
}

onMounted(() => {
  const handlerEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeCreateActivity()
  }

  window.addEventListener('keydown', handlerEscape)

  onUnmounted(() => window.removeEventListener('keydown', handlerEscape))
})

addEventListener('keypress', (key) => {
  console.log(key.key)

  if (key.key == 'escape') closeCreateActivity()
})
</script>
<template>
  <div class="create-activity-container flex">
    <form class="flex f-col w-100" ref="formRef" @submit.prevent="submit">
      <div class="flex f-row g-1 w-100 min-w-100">
        <div class="w-100">
          <h3>Title *</h3>
          <input name="title-content" type="text" v-model="title" required />
        </div>
        <div class="w-50">
          <h3>Time (h)</h3>
          <input
            name="duration"
            type="number"
            placeholder="How much time in hours"
            class="font-size-little"
            v-model="duration"
            required
          />
        </div>
      </div>

      <div class="flex f-row g-1 w-100 min-w-100">
        <div class="w-100">
          <h3>Category *</h3>
          <input
            class="w-100 min-w-100"
            name="category-content"
            type="text"
            v-model="category"
            required
          />
        </div>

        <div class="w-50">
          <h3>Priority *</h3>
          <select
            v-if="optionsArray.length > 0"
            class="w-100 btn select"
            v-model="priority"
            required
          >
            <option v-for="opt in optionsArray" :value="opt" :key="opt">
              {{ opt }}
            </option>
          </select>
          <select v-else class="w-100 btn select" v-model="priority">
            <option>Lower</option>
            <option>Medium</option>
            <option>Higher</option>
          </select>
        </div>
      </div>
      <div class="txt-area-container w-100">
        <h3>Note</h3>
        <textarea v-model="note" id="note-content" name="note-content" class="txt-area"></textarea>
      </div>
      <p class="font-size-little">* campi obbligatori</p>
      <input type="submit" id="submit-add-activity-btn" hidden />
    </form>
  </div>
</template>
<style scoped>
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
  background-color: var(--color-background);
  color: var(--color-text);
  padding-inline: 0.5vw;
  height: 2vw;
}
</style>
