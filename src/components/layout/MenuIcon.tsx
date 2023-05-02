import React, { useState, useCallback } from "react"
import { Button, Colors, View } from "@/modules"
import { CSSProperties } from "@stitches/react"
import { AppColors } from "@/types"

interface Props {
  state: boolean
  onPress?: () => void
  style?: CSSProperties
}
export default function MenuIcon({ state, onPress, style }: Props) {
  const [isHovering, setIsHovering] = useState(false)
  const onHover = useCallback(() => setIsHovering(true), [])
  const onLeave = useCallback(() => setIsHovering(false), [])

  const spanStyle: CSSProperties = {
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    height: 2,
    display: "block",
    position: "absolute",
    transition: "all .2s ease-out",
  }
  const spanHoverStyle: CSSProperties = { backgroundColor: Colors.PRIMARY }
  const spanActiveStyle: CSSProperties = { backgroundColor: Colors.PRIMARY }

  return (
    <Button
      onClick={onPress}
      css={{ width: 25, height: 20, position: "relative", border: "none", ...style, "&:active": { transform: "translateY(-50%) scale(.9)" } }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}>
      <View as="span" css={{ ...spanStyle, top: 0 }} style={state ? { top: "50%", transform: "translateY(-50%) rotate(45deg)" } : {}} />
      <View as="span" css={{ ...spanStyle, top: "50%", transform: "translateY(-50%)" }} style={state ? { opacity: 0 } : {}} />
      <View as="span" css={{ ...spanStyle, bottom: 0 }} style={state ? { bottom: "50%", transform: "translateY(50%) rotate(-45deg" } : {}} />
    </Button>
  )
}
