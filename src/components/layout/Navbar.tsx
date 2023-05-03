import { useAuth, usePopup } from "@/context"
import { Button, Colors, View } from "@/modules"
import { CSSProperties } from "@stitches/react"
import { useRouter } from "next/router"
import React, { PropsWithChildren, useCallback, useEffect, useState } from "react"
import { AiOutlineUser, AiOutlinePlus } from "react-icons/ai"
import { BiCalendarHeart, BiCalendarWeek } from "react-icons/bi"
import { BsHeadset } from "react-icons/bs"
import { AddTodoModal } from "../todo"

interface ItemProps {
  path: string
  children: () => any
  name: string
}
export default function Navbar({ maxWidth }: { maxWidth?: number }) {
  const router = useRouter()
  const { pathname } = router
  useEffect(() => {
    console.log(pathname)
  }, [pathname])

  const { isLoggedIn } = useAuth()

  const [items, setItems] = useState<ItemProps[]>([])
  useEffect(
    () =>
      setItems(
        isLoggedIn
          ? [
              { name: "오늘할일", path: "/mytodos", children: () => <BiCalendarHeart /> },
              { name: "남들할일", path: "/otherstodos", children: () => <BiCalendarWeek /> },
            ]
          : [
              { path: "/signin", children: () => <AiOutlineUser />, name: "로그인" },
              { path: "/askme", children: () => <BsHeadset />, name: "문의하기" },
            ]
      ),
    [isLoggedIn]
  )
  return (
    <View
      css={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", backgroundColor: Colors.WHITE, maxWidth, zIndex: 100 }}>
      <View css={{ height: 50, flexDirection: "row", alignItems: "center", position: "relative" }}>
        {items.map(({ path, name, children }) => (
          <NavItem key={path} isFocused={path === pathname} onPress={() => router.push({ pathname: path })}>
            {children()} {name}
          </NavItem>
        ))}
        {isLoggedIn && <PlusIcon />}
      </View>
    </View>
  )
}

interface NavItemProps extends PropsWithChildren {
  isFocused?: boolean
  onPress?: () => void
  style?: CSSProperties
}
function NavItem({ isFocused, children, onPress, style }: NavItemProps) {
  return (
    <Button
      onClick={onPress}
      css={{
        minHeight: "100%",
        border: "none",
        padding: 0,
        width: "100%",
        backgroundColor: isFocused ? "rgba(0, 173, 181, .05)" : undefined,
        rowGap: 5,
        color: isFocused ? Colors.PRIMARY : undefined,
        borderRadius: 0,
        ...style,
      }}>
      {children}
    </Button>
  )
}

function PlusIcon() {
  const popup = usePopup()
  const onPress = useCallback(() => {
    popup.modal("할일 추가", <AddTodoModal />)
  }, [popup])
  return (
    <>
      <Button css={{ visibility: "hidden" }}>
        <AiOutlinePlus />
      </Button>
      <Button
        css={{
          position: "absolute",
          top: 0,
          right: 10,
          transform: "translateY(-50%)",
          borderRadius: 100,
          fontSize: 25,
          padding: 0,
          width: 40,
          minHeight: 40,
          "&:active": { transform: "translateY(-50%) scale(.9)" },
          color: Colors.PRIMARY,
          borderColor: Colors.PRIMARY,
        }}
        onClick={onPress}>
        <AiOutlinePlus />
      </Button>
    </>
  )
}
