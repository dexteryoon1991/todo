import { CSSProperties } from "@stitches/react"
import React, { PropsWithChildren } from "react"
import { View } from "@/modules"

interface Props extends PropsWithChildren {
  style?: CSSProperties
  zIndex?: number
  state: boolean
  closeFn: () => void
}
export default function PopupLayout({ children, style, zIndex, state, closeFn }: Props) {
  return (
    <View
      css={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", zIndex, ...style }}
      style={state ? {} : { opacity: 0, visibility: "hidden" }}>
      <View position="relative">{children}</View>
      <View type="shadow" onClick={closeFn} css={{ backgroundColor: "transparent" }} />
    </View>
  )
}
