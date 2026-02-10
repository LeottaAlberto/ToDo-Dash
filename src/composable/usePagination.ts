import { computed, ref } from 'vue';
import { useActivity } from '@/composable/useActivity';

const { totalActivities } = useActivity();
const currentPage = ref(1);
const itemPerPage = ref(-1);

export function usePagination(item: number = 5) {
  const totalPages = computed(() => Math.ceil(totalActivities.value / item));
  const startIndex = computed(() => (currentPage.value - 1) * totalActivities.value);
  const endIndex = computed(() => startIndex.value + totalActivities.value);

  const nextPage = () => {
    if (currentPage.value < totalPages.value - 1) currentPage.value++;
  };
  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemPerPage,
    nextPage,
    prevPage,
  };
}
