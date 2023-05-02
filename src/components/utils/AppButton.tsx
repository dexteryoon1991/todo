import { Button } from "@/modules"
import { AppColors } from "@/types"
import { CSSProperties } from "@stitches/react"
import React, { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  onPress?: () => void
  color?: AppColors | any
  style?: CSSProperties
  hoverStyle?: CSSProperties
  activeStyle?: CSSProperties
}

export default function AppButton({ color, children, onPress, style, hoverStyle, activeStyle }: Props) {
  return (
    <Button colors={color ?? undefined} onClick={onPress} css={{ "&:hover": { ...hoverStyle }, "&:active": { ...activeStyle } }} style={style}>
      {children}
    </Button>
  )
}
