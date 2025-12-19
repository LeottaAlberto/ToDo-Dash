import type { ToastType } from "../enum/toast.enum";

export interface ToastMessage {
  text: string,
  type: ToastType,
  duration?: number
}
