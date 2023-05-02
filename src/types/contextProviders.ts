import { IconType } from "react-icons"

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
