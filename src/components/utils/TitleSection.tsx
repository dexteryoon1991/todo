import { CSSProperties } from "@stitches/react"
import React from "react"
import { View, Button, Colors } from "@/modules"

interface Props {
  title?: string
  onPress?: () => void
  style?: CSSProperties
  buttonSize?: number
}
export default function TitleSection({ onPress, title, style, buttonSize }: Props) {
  return (
    <View
      css={{
        width: "100%",
        height: 40,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `1px solid ${Colors.LIGHTGRAY}`,
        minWidth: 200,
      }}>
      {title ?? "타이틀을 입력해주세요."}
      <Button
        onClick={onPress}
        css={{
          width: buttonSize ?? 10,
          minHeight: buttonSize ?? 10,
          borderRadius: buttonSize ?? 10,
          backgroundColor: Colors.PRIMARY,
          border: "none",
          padding: 0,
          position: "absolute",
          top: "50%",
          right: 10,
          transition: "all .2s ease-out",
          transform: "translateY(-50%)",
          "&:hover": {
            transform: "translateY(-50%) scale(1.3)",
          },
          "&:active": {
            transform: "translateY(-50%) scale(.9)",
          },
        }}
      />
    </View>
  )
}
