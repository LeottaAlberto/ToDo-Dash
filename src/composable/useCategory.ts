import type CategoryInterface from '@/core/interface/CategoryInterface';
import { onMounted, onUnmounted, ref } from 'vue';

const globalCategory = ref<CategoryInterface[]>([]);

export function useCategory() {
  const addCategory = (cat: CategoryInterface) => {
    const exists = globalCategory.value.some((c) => c.id === cat.id);

    if (exists) return false;

    globalCategory.value.push(cat);
    localStorage.setItem('global-category', JSON.stringify(globalCategory.value));
    return true;
  };

  onMounted(() => {
    try {
      const storedCategory = localStorage.getItem('global-category');

      if (storedCategory) {
        const parseData = JSON.parse(storedCategory);
        if (Array.isArray(parseData)) globalCategory.value = parseData;
        else globalCategory.value = [parseData];
      }
    } catch {
      globalCategory.value = [];
    }
  });

  onUnmounted(() => {
    localStorage.setItem('global-category', JSON.stringify(globalCategory.value));
  });

  return {
    globalCategory,
    addCategory,
  };
}
