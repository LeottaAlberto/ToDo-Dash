<script lang="ts" setup>
import { Position } from '@/enums';
import { ButtonType, ButtonWidth } from '@/enums/ButtonEnum';
import { computed } from 'vue';

interface Props {
  type?: ButtonType;
  w?: ButtonWidth;
  radius?: number;
  disable?: boolean;
  is_svg?: boolean;
  direction?: Position;
}

const props = withDefaults(defineProps<Props>(), {
  type: ButtonType.NORMAL,
  w: ButtonWidth.MEDIUM,
  radius: 0.5,
  disable: false,
  is_svg: false,
  direction: Position.CENTER,
});

const emits = defineEmits(['click']);

const buttonClass = computed(() => {
  return [
    'btn-base',
    `btn-${props.is_svg ? 'svg' : 'text'}`,
    `btn-${props.type.toString().toLocaleLowerCase()}`,
  ];
});

const containerClass = computed(() => {
  return [`btn-${Position[props.direction].toLocaleLowerCase()}`];
});
</script>

<template>
  <div class="btn-container flex" :class="containerClass">
    <button
      :class="buttonClass"
      :disabled="props.disable"
      @click="emits('click')"
      class="btn-base radius-cummed"
      :style="{
        // minWidth: `${props.w}rem`,
        borderRadius: `${props.radius}rem`,
        backgroundColor: `${props.is_svg}`,
      }"
    >
      <slot></slot>
    </button>
  </div>
</template>

<style scoped>
.btn-container {
  border: 0 !important;
  outline: 0 !important;
}

.btn-base {
  border: none;
  outline: none;
  cursor: pointer;

  transition: all 0.2s ease;
}

.btn-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  aspect-ratio: 1 / 1;
  border-radius: 50% !important;
  background-color: transparent;
}

.btn-text {
  padding: 0.75rem 2rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-size: medium;
  color: var(--color-text);
}

.btn-text.btn-normal:not(:disabled):hover {
  filter: brightness(1.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.btn-svg.btn-normal:not(:disabled):hover {
  filter: brightness(1.2);
}

.btn-base:not(:disabled):active {
  transform: scale(0.97, 0.97);
  font-weight: bolder;
}

.btn-base:disabled {
  background-color: #777777;
  color: #9ca3af;
  cursor: not-allowed;
  filter: none;
}

.btn-text.btn-normal {
  background-color: var(--btn-background-n);
}

.btn-cancel {
  background-color: var(--btn-background-d);
}

.btn-right {
  justify-content: right;
}

.btn-center {
  justify-content: center;
}

.btn-left {
  justify-content: left;
}

.btn-svg:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}
</style>
