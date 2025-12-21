import type { ToastMessage } from '@/core/interface/toast.interface'
import { ref } from 'vue'

const activeToast = ref<ToastMessage | null>(null)

export function useToast() {
  const showToast = (config: ToastMessage) => {
    activeToast.value = config

    setTimeout(() => {
      activeToast.value = null
    }, config.duration || 3000)
  }

  const hideToast = () => {
    activeToast.value = null
  }

  return {
    activeToast, // Il componente Toast.vue leggerà questo
    showToast,   // Le tue pagine chiameranno questo
    hideToast
  }
}
