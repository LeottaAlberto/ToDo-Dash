import { ToastType } from '@/enums/toast.enum';

export const APP_MESSAGE = {
  ACTIVITY: {
    ADD_SUCCESS: { text: 'Activity added with successfully', type: ToastType.SUCCESS },
    ADD_ERROR: { text: 'Failed to add activity', type: ToastType.ERROR },
    DELETE_SUCCESS: { text: 'Activity deleted', type: ToastType.SUCCESS },
    DELETE_ERROR: { text: 'Unable to delete activity', type: ToastType.ERROR },
    COMPLETED_SUCCESS: { text: 'Successfully completed task', type: ToastType.SUCCESS },
    COMPLETED_ERROR: { text: 'Unable to complete task', type: ToastType.ERROR },
  },
  AUTH: {
    LOGIN_SUCCESS: { text: 'Login successful', type: ToastType.SUCCESS },
    LOGIN_ERROR: { text: 'Unable to log in', type: ToastType.ERROR },
    LOGIN_WARNING: {
      text: "Something's wrong, try entering the data again",
      type: ToastType.ERROR,
    },
  },
} as const;
