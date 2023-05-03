import { useState, useCallback } from "react"
import { View, Button, Colors } from "@/modules"
import { CSSProperties } from "@stitches/react"

interface Props {
  style?: CSSProperties
  state?: boolean
  onPress?: () => void
  color?: string
}

export default function Radio({ style, state, onPress, color }: Props) {
  const [isHovering, setIsHovering] = useState(false)
  const onHover = useCallback(() => setIsHovering(true), [])
  const onLeave = useCallback(() => setIsHovering(false), [])
  return (
    <Button
      css={{
        width: 20,
        minHeight: 20,
        backgroundColor: Colors.WHITE,
        padding: 0,
        borderRadius: 20,
        border: "none",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
      onClick={onPress}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}>
      <View css={{ backgroundColor: color ?? Colors.PRIMARY, opacity: 0.1, width: 20, height: 20, justifyContent: "center", alignItems: "center" }} />
      <View
        as="span"
        css={{
          backgroundColor: color ?? Colors.PRIMARY,
          opacity: state ? (isHovering ? 0.8 : 1) : isHovering ? 0.5 : 0.2,
          width: 10,
          height: 10,
          borderRadius: 10,
          display: "block",
          position: "absolute",
          top: 5,
          left: 5,
        }}
      />
    </Button>
  )
}
