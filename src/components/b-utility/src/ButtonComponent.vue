<script lang="ts" setup>
import { getSafeEnum } from '@/enums/enumUtils';
import { Position } from '@/enums';
import { ButtonDimension, ButtonRadius, ButtonType } from '@/enums/ButtonEnum';
import { computed } from 'vue';

const emits = defineEmits(['click']);

interface Props {
  type?: ButtonType;
  radius?: string;
  disable?: boolean;
  direction?: Position;
  icon?: string;
  label?: string;
  dimension?: string;
  border?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: ButtonType.NORMAL,
  radius: ButtonRadius.STANDARD,
  disable: false,
  direction: undefined,
  icon: undefined,
  label: undefined,
  dimension: ButtonDimension.STANDARD,
  border: false,
});

const isIconOnly = computed(() => props.icon && !props.label);

const buttonBaseClass = computed(() => {
  const base =
    'flex items-center justify-center transition-all duration-200 border-0 cursor-pointer font-medium transition-all duration-200 p-0.5';

  const border = !props.border ? 'outline-0' : 'outline-1 outline-neutral-600';

  if (isIconOnly.value)
    return `${base} p-3 rounded-full aspect-square bg-transparent text-gray-200`;
  else {
    const bg =
      props.icon && iconColorMap[props.icon] && !props.disable
        ? iconColorMap[props.icon]
        : 'bg-purple-500 hover:bg-purple-600 text-gray-100';
    return `${base} px-4 py-2 text-gray-100 uppercase tracking-wider text-sm ${getSafeEnum(ButtonRadius, props.radius, ButtonRadius.STANDARD)} ${bg} ${border}`;
  }
});

const stateClasses = computed(() => {
  const disabled = 'disabled:opacity-30 disabled:cursor-not-allowed disabled:filter-none';
  const active = 'active:scale-95';

  let hover = '';
  if (isIconOnly.value) hover = 'hover:bg-gray-500/20 hover:text-white';
  else hover = 'hover:brightness-110 hover:shadow-lg';

  return `${hover} ${active} ${disabled}`;
});

const iconColorMap: Record<string, string> = {
  'pi-trash': 'bg-red-500 hover:bg-red-600 text-white',
  'pi-check': 'bg-green-500 hover:bg-green-800 text-white',
  'pi-times': 'bg-slate-700 hover:bg-slate-600 text-gray-200',
};
</script>

<template>
  <div class="flex" :class="props.direction ? props.direction + ' w-full' : ' w-fit'">
    <button
      :class="[buttonBaseClass, stateClasses]"
      :disabled="props.disable"
      @click="emits('click', $event)"
    >
      <i
        v-if="props.icon"
        class="pi text-center"
        :class="[
          props.icon,
          { 'mr-2': props.label },
          props.dimension,
          { 'p-3': !props.label && props.dimension == ButtonDimension.BIG },
        ]"
      ></i>
      <span
        v-if="props.label"
        class="flex justify-center items-center text-base text-center text-gray-200/90 px-2"
      >
        {{ props.label }}
      </span>
    </button>
  </div>
</template>
