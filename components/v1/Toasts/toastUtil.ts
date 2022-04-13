import { ListToast } from "../../../store/ToastStore";

export const findIndex = (arr: Array<ListToast>, id: number) => arr.findIndex((toast) => toast.id === id)
