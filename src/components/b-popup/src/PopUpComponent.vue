<script lang="ts" setup>
import type ActivityInterface from '@/core/interface/ActivityInterface';
import { APP_MESSAGE } from '@/core/constants/messages';
import { useToast } from '@/composable/useToast';
import { useActivity } from '@/composable/useActivity';

// import { ref } from 'vue'

const props = defineProps<{
  title: string;
  footer_btn_title: string;
  activity?: ActivityInterface;
}>();

const { showToast } = useToast();
const { completeActivity } = useActivity();
const emits = defineEmits(['closed']);

function closePopUp() {
  emits('closed');
}

function complete() {
  try {
    // 2. Chiami il toast dedicato
    if (!props.activity) throw new Error('');

    completeActivity(props.activity);
    closePopUp();
    showToast(APP_MESSAGE.ACTIVITY.COMPLETED_SUCCESS);
  } catch (e) {
    showToast(APP_MESSAGE.ACTIVITY.COMPLETED_ERROR);
    console.error(e);
  }
}

// :class="{ flex: isVisible, 'display-none': !isVisible }"
</script>

<template>
  <div class="pop-up-background flex">
    <div class="pop-up-container just-content-start radius-cummed flex f-col w-50">
      <div class="flex just-content-space-between w-100" style="background-color: transparent">
        <div class="flex f-row w-75">
          <h1
            class="flex just-content-start px-2 pt-1 font-size-big text-bolder w-100 popup-title-color"
          >
            {{ props.title }}
          </h1>
        </div>

        <div
          class="flex w-25 min-h-100 just-content-end align-items-end px-2 py-1"
          @click="closePopUp()"
        >
          <svg
            class="close-btn flex"
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A1A1AA"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      </div>

      <div class="popup-body w-100">
        <slot />
      </div>

      <div class="w-100 p-2">
        <slot name="footer" v-if="$slots.footer" />
        <div class="flex just-content-end w-100" v-else>
          <input
            type="button"
            :value="footer_btn_title"
            class="btn radius-edge footer-btn w-50"
            @click="complete()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-title-color {
  color: var(--popup-primary);
}

.pop-up-container {
  background-color: var(--popup-background);
  min-height: 45vh;
  max-height: 45vh;
  max-width: 40vw;
  position: absolute;
  align-items: baseline;
}

.pop-up-background {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 900;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
}

.popup-body {
  max-height: 30vh;
  min-height: 20vh;
}

.footer-btn {
  height: 3vh;
}

.close-btn {
  animation: all 0.2s;
}

.close-btn:hover {
  transform: scale(1.08, 1.08);
}
</style>
