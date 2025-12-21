import { ToastType } from '../enum/toast.enum'

export const APP_MESSAGE = {
  ACTIVITY: {
    ADD_SUCCESS: { text: 'Activity added with succesflully', type: ToastType.SUCCESS },
    ADD_ERROR: { text: 'Failed to add activity', type: ToastType.ERROR },
    DELETE_WARNING: { text: 'Activity deleted', type: ToastType.WARNING },
    COMPLETED_SUCCESS: { text: 'Successfully completed task' , type: ToastType.SUCCESS },
    COMPLETED_ERROR: { text: 'Unable to complete task' , type: ToastType.ERROR },
  },
  AUTH: {
    LOGIN_SUCCESS: { text: 'Login successful', type: ToastType.SUCCESS },
    LOGIN_ERROR: { text: 'Unable to log in', type: ToastType.ERROR },
    LOGIN_WARNING: { text: "Something's wrong, try entering the data again", type: ToastType.ERROR },
  },
} as const
