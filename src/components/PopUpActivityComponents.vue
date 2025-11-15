<script setup lang="ts">
import { ref, watch } from 'vue'

interface Activity {
  priority: string
  title: string
  duration: number
  type: string
  note: string
  status: string
}

const isVisible = ref(false)

const props = defineProps<{
  activity?: Activity
}>()

watch(props, () => {
  console.log('PopUpSbloccato =>')
  console.log(props.activity)
  isVisible.value = true;
})

function closePopUp() {
  isVisible.value = false;
}
</script>

<template>
  <div class="w-50 flex pop-up-container" :class="{ visibility: !isVisible }">
    <button @click="closePopUp()">X</button>
    <div class="w-100 flex" v-if="props.activity" style="flex-direction: column">
      <h1>{{ props.activity.title }}</h1>
      <h3>{{ props.activity.duration }}</h3>
      <h3>{{ props.activity.type }}</h3>
      <h3>{{ props.activity.priority }}</h3>
      <h3 v-if="props.activity.note">{{ props.activity.note }}</h3>
      <h3 v-else>Non ci sono note per questa Activity</h3>
    </div>
  </div>
</template>

<style scoped>
.pop-up-container {
  background-color: red;
  width: 20vw;
  min-height: 10vw;
  position: absolute;
}
.pop-up-container div {
  position: absolute;
}

.pop-up-container button {
  position: absolute;
  right: 0.5vw;
  top: 0.5vw;
  background-color: blue;
  z-index: 999;
}

.visibility {
  display: none;
}
</style>
