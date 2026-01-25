<script lang="ts" setup>
import { Position } from '@/enums';
import { ButtonType } from '@/enums/ButtonEnum';
import { computed, useSlots } from 'vue';

const slots = useSlots();
const emits = defineEmits(['click']);

interface Props {
  type?: ButtonType;
  radius?: number;
  disable?: boolean;
  direction?: Position;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: ButtonType.NORMAL,
  radius: 0.5,
  disable: false,
  direction: Position.CENTER,
  icon: undefined,
});

const getIconUrl = (name: string) => {
  return new URL(`../../../assets/SVGs/button/${name}.svg`, import.meta.url).href;
};

const isIconOnly = computed(() => {
  return !slots.default && props.icon;
});

const buttonClass = computed(() => {
  return [
    'btn-base',
    isIconOnly.value ? 'btn-svg' : 'btn-text',
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
      :aria-label="props.icon ? props.icon : undefined"
      @click="emits('click')"
      class="btn-base radius-cummed"
      :style="{
        borderRadius: `${props.radius}rem`,
      }"
    >
      <img
        v-if="props.icon"
        :src="getIconUrl(props.icon)"
        class="btn-icon-img"
        aria-hidden="true"
      />

      <span v-if="$slots.default">
        <slot></slot>
      </span>
    </button>
  </div>
</template>

<style scoped>
.btn-container {
  border: 0;
  outline: 0;
}

.btn-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: var(--radius);
}

.btn-svg {
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
  /* transform: rotate(90deg); */
}
</style>
