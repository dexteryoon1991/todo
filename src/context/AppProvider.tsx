import { App, Menu } from "@/types"
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react"
import { AuthProvider } from "./AuthProvider"
import { PopupProvider } from "./PopupProvider"
import { TodoProvider } from "./TodoProvider"
import { AiOutlineUser, AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai"
import { IoExitOutline } from "react-icons/io5"
import { BsHeadset } from "react-icons/bs"
import { useSession } from "next-auth/react"

const initialMenus: Menu[] = [
  { name: "로그인", path: "/signin", icon: AiOutlineUser },
  { name: "회원가입", path: "/signup", icon: AiOutlineUserAdd },
  { name: "문의하기", path: "/askme", icon: BsHeadset },
]
const userMenus: Menu[] = [
  { name: "오늘할일", path: "/mytodos", icon: AiOutlineUser },
  { name: "남들할일", path: "/otherstodos", icon: AiOutlineUsergroupAdd },
  { name: "문의하기", path: "/askme", icon: BsHeadset },
  { name: "로그아웃", icon: IoExitOutline },
]
const initialState: App = { title: "TodayMe", activeMenu: false, menus: initialMenus, menuHandler: () => {} }

const data = createContext(initialState)

export function AppProvider({ children }: PropsWithChildren) {
  const [title, setTitle] = useState(initialState.title)

  const [activeMenu, setActiveMenu] = useState(false)

  const menuHandler = useCallback((action?: "on" | "off") => setActiveMenu((prev) => (action === "on" ? true : action === "off" ? false : !prev)), [])

  const [menus, setMenus] = useState<Menu[]>(initialState.menus)
  const { status } = useSession()
  useEffect(() => {
    setMenus(status === "authenticated" ? userMenus : initialMenus)
  }, [status])

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
