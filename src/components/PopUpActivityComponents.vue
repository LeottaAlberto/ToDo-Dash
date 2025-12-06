<script setup lang="ts">
import type ActivityInterface from '@/interface/ActivityInterface'
import { ref, watch } from 'vue'

const isVisible = ref(false)

const props = defineProps<{
  activity?: ActivityInterface
}>()

watch(props, () => {
  console.log('PopUpSbloccato =>')
  console.log(props.activity)
  isVisible.value = true
})

function closePopUp() {
  isVisible.value = false
}
</script>

<template>
  <div class="w-50 flex pop-up-container" :class="{ visibility: !isVisible }">
    <button @click="closePopUp()">X</button>
    <div class="w-100 flex f-col pop-up-body g-2" v-if="props.activity">

      <div class="flex flex-row w-100 text-align-start">
        <h2 class="text-bolder font-size-big">Title {{ props.activity.title }}</h2>
      </div>

      <div class="flex flex-col w-100">

        <div class="flex flex-row w-50 text-align-center">
          <h1 class="text-bolder w-75">Duration = </h1>
          <h2 class="w-25">{{ props.activity.duration }} h</h2>
        </div>

        <div class="flex flex-row w-50 text-align-center">
          <h1 class="text-bolder w-75">Priority = </h1>
          <h2 class="w-25">{{ props.activity.priority }}</h2>
        </div>

        <div class="flex flex-row w-50 text-align-center">
          <h1 class="text-bolder w-75">Type = </h1>
          <h2 class="w-25">{{ props.activity.type }}</h2>
        </div>

      </div>


      <h2 v-if="props.activity.note">{{ props.activity.note }}</h2>
      <h2 v-else>Non ci sono note per questa Activity</h2>

    </div>
  </div>
</template>

<style scoped>
.pop-up-container {
  background-color: grey;
  width: 40vw;
  min-height: 50vh;
  position: absolute;
}

.pop-up-container button {
  position: absolute;
  right: 0.5vw;
  top: 0.5vw;
  background-color: blue;
  z-index: 999;
}

.pop-up-body {
  min-height: 20vh;
  background-color: purple;
}

.visibility {
  display: none;
}
</style>
