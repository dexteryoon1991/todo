import { useApp } from "@/context"
import { Colors, View } from "@/modules"
import React from "react"
import { AppButton } from "../utils"
import MenuIcon from "./MenuIcon"
import { CSS } from "@stitches/react"

export default function Header({ maxWidth }: { maxWidth?: number }) {
  const { title, activeMenu, menuHandler } = useApp()

  return (
    <View
      as="header"
      css={{
        position: "fixed",
        zIndex: 10000,
        backgroundColor: Colors.WHITE,
        boxShadow: "0 3px 6px rgba(0,0,0, .1)",
        width: "100%",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth,
      }}>
      <View css={{ flexDirection: "row", justifyContent: "center", alignItems: "center", position: "relative", height: 50 }}>
        <AppButton style={{ border: "none", fontSize: 25, fontWeight: 900, color: Colors.PRIMARY }}>{title}</AppButton>
        <MenuIcon
          state={activeMenu}
          onPress={menuHandler}
          style={{ position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)", minHeight: 20 }}
        />
      </View>
    </View>
  )
}
