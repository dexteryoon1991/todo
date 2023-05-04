import { useApp, usePopup } from "@/context"
import { Button, Colors, View } from "@/modules"
import { Menu } from "@/types"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useCallback } from "react"

export default function Menubar({ maxWidth }: { maxWidth?: number }) {
  const { menus, activeMenu } = useApp()
  return (
    <View
      css={{ position: "fixed", top: 50, zIndex: 101, left: "50%", transform: "translateX(-50%)", maxWidth, width: "100%" }}
      style={activeMenu ? {} : { opacity: 0, visibility: "hidden" }}>
      <View css={{ backgroundColor: Colors.BLACK, width: "100%", rowGap: 10, height: "100vh" }}>
        {menus.map((menu, index) => (
          <MenubarItem key={index} {...menu} />
        ))}
      </View>
    </View>
  )
}

function MenubarItem(props: Menu) {
  const { menuHandler } = useApp()
  const { name } = props
  const router = useRouter()
  const { confirm } = usePopup()

  const onClick = useCallback(() => {
    menuHandler("off")

    const { name, path } = props

    if (!path) {
      console.log(name)

      if (name === "로그아웃") {
        return confirm("로그아웃 하시겠습니까?", () => signOut(), [{ name }])
      }
      return
    }

    return router.push({ pathname: path })
  }, [props, menuHandler, confirm, signOut])
  return (
    <Button
      css={{ color: Colors.PRIMARY, backgroundColor: "transparent", border: "none", "&:hover": { backgroundColor: "rgba(255, 255, 255, .1)" } }}
      onClick={onClick}>
      {name}
    </Button>
  )
}
