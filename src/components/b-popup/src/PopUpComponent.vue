<script lang="ts" setup>
import type ActivityInterface from '@/core/interface/ActivityInterface';
import { APP_MESSAGE } from '@/core/constants/messages';
import { useToast } from '@/composable/useToast';
import { useActivity } from '@/composable/useActivity';
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';
import { Position } from '@/enums';

const props = defineProps<{
  title: string;
  footer_btn_title: string;
  disable_btn_footer: boolean | true;
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
    if (!props.activity) throw new Error('');

    completeActivity(props.activity);
    closePopUp();
    showToast(APP_MESSAGE.ACTIVITY.COMPLETED_SUCCESS);
  } catch (e) {
    showToast(APP_MESSAGE.ACTIVITY.COMPLETED_ERROR);
    console.error(e);
  }
}
</script>

<template>
  <div
    class="flex justify-center items-center top-0 left-0 p-0 m-0 z-9999 absolute w-full h-full bg-black/20"
  >
    <div
      class="flex flex-col px-5 py-3 max-h-4/6 max-w-2/5 absolute rounded-xl w-full h-full bg-zinc-900"
    >
      <div class="flex just-content-space-between w-full">
        <div class="flex flex-row basis-2/3">
          <h1
            class="flex justify-start items-center text-align-center px-2 pt-1 text-5xl font-bold w-full"
          >
            {{ props.title }}
          </h1>
        </div>

        <div class="flex basis-1/3 px-2">
          <ButtonComponent
            :is_svg="true"
            :direction="Position.RIGHT"
            :icon="'close'"
            class="w-full"
            @click="closePopUp()"
          >
          </ButtonComponent>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-5 w-full">
        <slot />
      </div>

      <div class="w-full p-4">
        <slot name="footer" v-if="$slots.footer" />
        <div class="flex justify-end w-full" v-else>
          <ButtonComponent
            :direction="Position.RIGHT"
            :disable="props.disable_btn_footer"
            class="w-full"
            @click="complete()"
          >
            {{ props.footer_btn_title }}
          </ButtonComponent>
        </div>
      </div>
    </div>
  </div>
</template>
