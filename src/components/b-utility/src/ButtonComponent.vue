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
  background?: boolean;
  icon?: string;
  label?: string;
  dimension?: string;
  border?: boolean;
  toolTip?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: ButtonType.NORMAL,
  radius: ButtonRadius.STANDARD,
  disable: false,
  background: false,
  direction: undefined,
  icon: undefined,
  label: undefined,
  dimension: ButtonDimension.STANDARD,
  border: false,
});

const isIconOnly = computed(() => props.icon && !props.label);

const buttonBaseClass = computed(() => {
  const base =
    'flex items-center justify-center transition-all duration-200 cursor-pointer font-medium transition-all duration-200';

  const border = props.border && !props.background ? 'outline-0' : 'outline-1 outline-neutral-600';
  const background = props.background
    ? 'bg-violet-600! rounded-[0.35vw]! w-10 h-10 p-2!'
    : iconColorMap[props.icon + ''];

  if (isIconOnly.value && !props.background)
    return `${base} p-3 rounded-full aspect-square text-gray-200`;

  const bg =
    props.icon && iconColorMap[props.icon] && !props.disable
      ? iconColorMap[props.icon]
      : 'bg-purple-500 hover:bg-purple-600 text-gray-100';
  return `${base} ${background} px-4 py-2 text-gray-100 uppercase tracking-wider text-sm ${getSafeEnum(ButtonRadius, props.radius, ButtonRadius.STANDARD)} ${bg} ${border}`;
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
  'pi-check': 'bg-green-700 hover:bg-green-800 text-white',
  'pi-times': 'bg-slate-700 hover:bg-slate-800 text-gray-200',
  '': 'bg-transparent',
};
</script>

<template>
  <div class="flex" :class="props.direction ? props.direction + ' w-full' : ' w-fit'">
    <button
      :class="[buttonBaseClass, stateClasses]"
      :disabled="props.disable"
      :title="props.toolTip"
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
        v-if="props.label && !props.toolTip"
        class="flex justify-center items-center text-base text-center text-gray-200/90 px-2"
      >
        {{ props.label }}
      </span>
    </button>
  </div>
</template>
