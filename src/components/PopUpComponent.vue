<script lang="ts" setup>
// import { ref } from 'vue'

const props = defineProps({
  title: String,
  footer_btn: String,
})
</script>

<template>
  <div class="pop-up-container flex">
    <div class="flex f-col w-25">
      <div class="header flex f-row w-100">
        <h1 class="w-100">{{ props.title }}</h1>
        <svg
          width="48px"
          height="48px"
          viewBox="0 0 24 24"
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
              fill="#181818"
              data-darkreader-inline-fill=""
              style="--darkreader-inline-fill: var(--darkreader-background-080341, #060234)"
            />
          </g>
        </svg>
      </div>
      <div class="body">
        <slot />
      </div>
      <div class="footer w-100">
        <div class="flex w-100">
          <input type="button" :value="footer_btn" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pop-up-container {
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
</style>
