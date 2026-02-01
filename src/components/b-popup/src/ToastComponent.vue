<script lang="ts" setup>
import { useToast } from '@/composable/useToast';
import { ToastType } from '@/core/enum/toast.enum';

const { activeToast } = useToast();

const getBorderColor = (type: ToastType) => {
  switch (type) {
    case ToastType.SUCCESS:
      return 'border-success';
    case ToastType.ERROR:
      return 'border-error';
    case ToastType.WARNING:
      return 'border-warning';
  }
};
</script>

<template>
  <Transition name="fade">
    <div v-if="activeToast" :class="['toast-container', getBorderColor(activeToast.type)]">
      <div class="toast-card">
        <div class="toast-content">
          <p>{{ activeToast.text }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.border-success {
  border-left: solid 5px #4caf50;
}
.border-error {
  border-left: solid 5px #f44336;
}
.border-warning {
  border-left: solid 5px #ff9800;
}

.toast-container {
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
  background-color: var(--vt-c-black-soft);
  width: 300px;
}

.toast-card {
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
