<script lang="ts" setup>
import type ActivityInterface from '@/core/interface/ActivityInterface';
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';
import { computed, onMounted, onUnmounted, useSlots } from 'vue';

const props = defineProps<{
  title: string;
  footer_btn_title: string;
  disable_btn_footer: boolean | true;
  activity?: ActivityInterface;
  icon_button_2?: string;
}>();

const slots = useSlots();

const emits = defineEmits(['closed', 'confirm']);

function closePopUp() {
  emits('closed');
}

function clickBtn2() {
  emits('confirm', props.activity);
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closePopUp();
};

/**
 * @return true if slot is string
 * @return false if slot is something other than the string
 */
const slotType = computed(() => {
  const content = slots.default?.();

  if (!content) return false;

  const firstNode = content[0];

  if (typeof firstNode?.children === 'string') return true;

  return false;
});

const bodyClass = computed(() => {
  return [slotType.value ? 'h-20 max-h-1/12 text-2xl p-2' : 'min-h-1/2 max-h-8/12'];
});

onMounted(() => window.addEventListener('keydown', handleKeyDown));
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<template>
  <div
    tabindex="1"
    class="flex justify-center items-center top-0 left-0 p-0 m-0 z-40 absolute w-full h-full bg-black/20"
    @click.self="closePopUp()"
  >
    <div
      class="flex flex-col px-10 py-7 z-50 max-h-4/6 max-w-2/5 inset-0 rounded-xl w-full h-fit bg-zinc-900"
      tabindex="0"
      @keypress.esc="closePopUp()"
    >
      <!-- Header -->
      <div class="flex just-content-space-between w-full py-1">
        <div class="flex flex-row w-full">
          <h1
            class="flex justify-start items-center text-center px-2 pt-1 text-5xl font-bold w-full"
          >
            {{ props.title }}
          </h1>
        </div>
      </div>

      <!-- Body -->
      <div class="overflow-y-hidden w-full py-2" :class="[bodyClass]">
        <slot />
      </div>

      <!-- Footer -->
      <div class="w-full p-4">
        <slot name="footer" v-if="$slots.footer" />
        <div class="flex flex-row justify-end gap-3" v-else>
          <ButtonComponent :icon="'pi-times'" :label="'Close'" @click="closePopUp()" />
          <ButtonComponent
            :disable="props.disable_btn_footer"
            :label="props.footer_btn_title"
            :icon="props.icon_button_2 ? props.icon_button_2 : undefined"
            @click="clickBtn2()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
