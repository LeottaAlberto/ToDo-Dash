<script lang="ts" setup>
import { useToast } from '@/composable/useToast';
import { ToastType } from '@/core/enum/toast.enum';

const { activeToast } = useToast();

const getBorderColor = (type: ToastType) => {
  switch (type) {
    case ToastType.SUCCESS:
      return 'border-l-5 border-lime-500';
    case ToastType.ERROR:
      return 'border-l-5 border-red-700';
    case ToastType.WARNING:
      return 'border-l-5 border-amber-400';
  }
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="activeToast"
      class="flex justify-end w-74 fixed top-3 right-5 z-50 bg-neutral-700"
      :class="[getBorderColor(activeToast.type)]"
    >
      <div class="px-3 py-3 w-full">
        <div class="toast-content">
          <p>{{ activeToast.text }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(40rem);
}
</style>
