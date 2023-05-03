import { CSSProperties } from "@stitches/react"
import { PropsWithChildren } from "react"
import { IconType } from "react-icons"
import { API, FetchTodoApi } from "./api"
import { Todo } from "./components"

export interface App {
  title: string
  activeMenu: boolean
  menus: Menu[]
  menuHandler: (action?: "on" | "off") => void
}

export interface Menu {
  name: string
  icon?: IconType
  path?: string
}

export interface Auth {
  isLoggedIn: boolean
  user: User | null
}

export interface UseDates {
  year: number
  month: number
  date: number
  dates: number[]
  dateHandler: (action?: TimeAction) => void
  monthHandler: (action?: TimeAction) => void
  yearHandler: (action?: TimeAction) => void
  YYMMDD: string
  MMDD: string
}

export type TimeAction = "dec" | "inc" | "reset"

export interface User {
  email: string
  uid: string
  name: string
  profileImage?: string
}

export type AlertType = "alert" | "success"

export interface Popup {
  alertProps: Alert
  confirmProps: Confirm
  modalProps: Modal
  alert: (message?: string, title?: string, button?: PopupButton, type?: AlertType) => void
  confirm: (message?: string, title?: string, button?: PopupButton[]) => void
  modal: (title?: string, content?: any, buttons?: PopupButton[], payload?: any) => void
  closeAlert: () => void
  closeConfirm: () => void
  closeModal: () => void
  closeAll: () => void
}

export interface State {
  state: boolean
}

export interface TitleAndMessage {
  title?: string
  message?: string
}
export interface Alert extends State, TitleAndMessage {
  button?: PopupButton
  type?: "success" | "alert"
}

export interface PopupButton {
  name?: string
  onPress?: () => void
  style?: CSSProperties
}

export interface Confirm extends State, TitleAndMessage {
  button?: PopupButton[]
}

export interface Modal extends State, PropsWithChildren {
  title?: string
  payload?: any
  buttons?: PopupButton[]
}

export interface EditTodoProps {
  body: string
  id: string
  title: string
}
export interface TodoProps {
  createTodo: (todo: Todo) => Promise<API>
  fetchTodo: () => Promise<FetchTodoApi>
  editTodo: (props: EditTodoProps) => Promise<API>
  deleteTodo: (id: string) => Promise<API>
}
