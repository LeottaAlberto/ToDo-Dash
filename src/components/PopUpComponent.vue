<script lang="ts" setup>
import type ActivityInterface from '@/interface/ActivityInterface'
// import { ref } from 'vue'

const props = defineProps<{
  title: string
  footer_btn_title: string
  activity?: ActivityInterface
}>()

const emits = defineEmits(['closed'])

function closePopUp() {
  emits('closed')
}

// :class="{ flex: isVisible, 'display-none': !isVisible }"
</script>

<template>
  <div class="pop-up-background flex">
    <div class="pop-up-container border-standard flex f-col w-25">

      <div class="" @click="closePopUp()" style="position: relative; left: 45%; top: 30px;">
        <svg
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          class="close-btn flex"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z"
              fill="currentColor"
              data-darkreader-inline-fill=""
              style="--darkreader-inline-fill: var(--darkreader-background-080341, #060234)"
            />
          </g>
        </svg>
      </div>

      <div class="flex f-row w-100">
        <h1 class="flex px-1 pt-1 font-size-little-big text-bolder w-100">{{ props.title }}</h1>
      </div>

      <div class="body px-2">
        <slot />
      </div>

      <div class="w-100 p-1">
        <slot name="footer" v-if="$slots.footer" />
        <div class="flex w-100" v-else>
          <input type="button" :value="footer_btn_title" class="btn footer-btn w-75" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pop-up-background {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
}

.pop-up-container {
  background-color: #5d5d5d;
}

.footer-btn {
  height: 3vh;
}

.close-btn {
  color: #4d4d4d;
}

.close-btn:hover {
  color: var(--darkreader-text-ff6b6b, #e70000);
}
</style>
