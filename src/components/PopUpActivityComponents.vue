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
  isVisible.value = !isVisible.value
})
</script>

<template>
  <div class="w-50 flex pop-up-container" :class="{ visibility: !isVisible }">
    <div class="w-100 flex" v-if="props.activity" style="flex-direction: column">
      <h1>{{ props.activity.title }}</h1>
      <h3>{{ props.activity.duration }}</h3>
      <h3>{{ props.activity.type }}</h3>
      <h3>{{ props.activity.priority }}</h3>
      <h3>{{ props.activity.note }}</h3>
    </div>
  </div>
</template>

<style scoped>
.pop-up-container {
  background-color: red;
  min-width: 10vw;
  min-height: 10vw;
  position: absolute;
}
.pop-up-container div {
  position: absolute;
}
.visibility {
  display: none;
}
</style>
