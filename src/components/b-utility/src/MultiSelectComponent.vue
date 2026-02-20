<script setup lang="ts">
import type { Option } from '@/core/interface/MultiSelectInterface';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  options: Option[];
  modelValue: Option[];
  placeholder?: string;
  addNew?: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'addNew', 'removeAll']);

const isOpen = ref(false);
const searchQuery = ref('');
const containerRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => (isOpen.value = !isOpen.value);

// Filtro delle opzioni in base alla ricerca
const filteredOptions = computed(() => {
  return props.options.filter((opt) =>
    opt.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

// Selezione visiva
const toggleOption = (value: Option) => {
  const newValue = [...props.modelValue];
  const index = newValue.findIndex((val) => val.id === value.id);

  if (index > -1) newValue.splice(index, 1);
  else newValue.push(value);

  emit('update:modelValue', newValue);
};

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

const isSelected = (userId: string | number) => {
  return props.modelValue.some((i) => i.id === userId);
};

onMounted(() => window.addEventListener('click', handleClickOutside));
onUnmounted(() => window.removeEventListener('click', handleClickOutside));
</script>

<template>
  <div class="relative w-full md:w-80" ref="containerRef">
    <div
      @click="toggleDropdown"
      class="flex items-center justify-between bg-neutral-800 border border-zinc-700 p-2.5 cursor-pointer hover:border-violet-500 transition-all"
      :class="isOpen ? 'rounded-b-none rounded-t-md' : 'rounded-md'"
    >
      <!-- Placeholder -->
      <span v-if="modelValue.length === 0" class="text-zinc-500 text-sm">
        {{ placeholder || 'Select users...' }}
      </span>
      <div v-else class="flex flex-wrap gap-1">
        <span
          v-for="item in modelValue"
          :key="item.id"
          class="text-zinc-200 text-sm font-medium px-2 rounded-md"
          :style="{ backgroundColor: item.color }"
          >{{ item.name }}</span
        >
      </div>
      <!-- Arrow Icon -->
      <i
        class="pi pi-chevron-down text-zinc-500 text-xs transition-transform"
        :class="{ 'rotate-180': isOpen }"
      ></i>
    </div>

    <!-- Selection Panel -->
    <div
      v-if="isOpen"
      class="absolute z-50 w-full min-h-fit mt-2 bg-neutral-900 border border-zinc-700 border-t-none rounded-t-none rounded-b-md animate-in fade-in zoom-in duration-200 overflow-hidden"
    >
      <!-- Header  -->
      <!-- Research Input -->
      <div class="p-2 border-b border-zinc-800 bg-neutral-800/50">
        <div class="relative flex items-center">
          <!-- Icon -->
          <i class="pi pi-search absolute left-3 text-zinc-500 text-sm"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full bg-neutral-950 border border-zinc-700 text-white text-sm pl-9 pr-3 py-2 rounded-md focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      <!-- Body -->
      <!-- Item List -->
      <ul class="flex flex-col gap-1 p-2 custom-scrollbar max-h-25 overflow-auto">
        <li
          v-for="user in filteredOptions"
          :key="user.id"
          @click="toggleOption(user)"
          class="flex items-center p-2 gap-2 rounded-lg cursor-pointer transition-colors group"
          :class="isSelected(user.id) ? 'bg-violet-900/20' : 'hover:bg-neutral-800'"
        >
          <div
            class="w-5 h-5 border rounded flex items-center justify-center transition-all"
            :class="
              isSelected(user.id)
                ? 'bg-violet-600 border-violet-600'
                : 'border-zinc-600 bg-zinc-800'
            "
          >
            <i v-if="isSelected(user.id)" class="pi pi-check text-[10px] text-white"></i>
          </div>

          <!-- Item Img -->
          <img
            v-if="user.srcImg"
            :src="user.srcImg"
            class="w-8 h-8 rounded-full object-cover border border-zinc-700"
          />

          <!-- Name & Surname -->
          <span
            :style="{ backgroundColor: user.color }"
            class="text-sm text-zinc-300 group-hover:text-white transition-colors gap-1 px-2 py-0.5 rounded-md"
          >
            {{ user.name }}
          </span>
        </li>

        <li
          v-if="filteredOptions.length === 0"
          class="p-4 text-center text-zinc-500 text-sm italic"
        >
          No users found.
        </li>
      </ul>

      <!-- Footer -->
      <div
        :class="props.addNew ? 'justify-between' : 'justify-end'"
        class="p-2 border-t border-zinc-800 bg-zinc-800 flex gap-2"
      >
        <button
          v-if="props.addNew"
          @click="emit('addNew')"
          class="text-xs font-semibold text-violet-400 hover:bg-violet-500/10 px-3 py-1.5 rounded-md flex items-center gap-1 transition-all"
        >
          <i class="pi pi-plus text-[10px]"></i> ADD NEW
        </button>
        <button
          @click="emit('removeAll')"
          class="text-xs font-semibold text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-md flex items-center gap-1 transition-all"
        >
          <i class="pi pi-trash text-[10px]"></i> CLEAR ALL
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #3f3f46;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #52525b;
}
</style>
