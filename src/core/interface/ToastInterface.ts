import type { ToastType } from '@/enums/toast.enum';

export interface ToastMessage {
  text: string;
  type: ToastType;
  duration?: number;
}
