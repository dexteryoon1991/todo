import { App, Menu } from "@/types"
import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from "react"
import { AuthProvider } from "./AuthProvider"
import { PopupProvider } from "./PopupProvider"
import { TodoProvider } from "./TodoProvider"
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai"
import { BsHeadset } from "react-icons/bs"

const initialMenus: Menu[] = [
  { name: "로그인", path: "/singin", icon: AiOutlineUser },
  { name: "회원가입", path: "/singup", icon: AiOutlineUserAdd },
  { name: "문의하기", path: "/askme", icon: BsHeadset },
]
const initialState: App = { title: "TodayMe", activeMenu: false, menus: initialMenus, menuHandler: () => {} }
const data = createContext(initialState)

export function AppProvider({ children }: PropsWithChildren) {
  const [title, setTitle] = useState(initialState.title)
  const [activeMenu, setActiveMenu] = useState(false)
  const menuHandler = useCallback(() => setActiveMenu((prev) => !prev), [])
  const [menus, setMenus] = useState<Menu[]>(initialState.menus)

  return (
    <data.Provider value={{ title, activeMenu, menuHandler, menus }}>
      <AuthProvider>
        <PopupProvider>
          <TodoProvider>{children}</TodoProvider>
        </PopupProvider>
      </AuthProvider>
    </data.Provider>
  )
}

export function useApp() {
  return useContext(data)
}
