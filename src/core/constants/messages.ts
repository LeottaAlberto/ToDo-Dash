import { ToastType } from "../enum/toast.enum";

export const APP_MESSAGE = {
  ACTIVITY : {
    ADD_SUCCESS: { text: "Activity added with succesflully", type: ToastType.SUCCESS} ,
    ADD_ERROR: { text: "Failed to add activity", type: ToastType.ERROR },
    DELETE_WARNING: { text: "Activity deleted", type: ToastType.WARNING },
  },
  AUTH : {
    LOGIN_SUCCESS: { text: "Login successful", type: ToastType.SUCCESS },
    LOGIN_ERROR: { text: "Unable to log in", type: ToastType.ERROR },
    LOGIN_WARNING: { text: "Something's wrong, try entering the data again", type: ToastType.ERROR },
  }
}
