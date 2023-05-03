import { CSSProperties } from "@stitches/react"
import React, { PropsWithChildren } from "react"
import { View } from "@/modules"

interface Props extends PropsWithChildren {
  style?: CSSProperties
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}
export default function ContentSection({ style, children, onMouseEnter, onMouseLeave }: Props) {
  return (
    <View css={{ padding: 20, ...style }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </View>
  )
}
