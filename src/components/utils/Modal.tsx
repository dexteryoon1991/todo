import { usePopup } from "@/context"
import { Button, Colors, View } from "@/modules"
import React from "react"
import PopupLayout from "./PopupLayout"
import TitleSection from "./TitleSection"

export default function Modal() {
  const { modalProps, closeModal } = usePopup()
  const { state, payload, title, children, buttons } = modalProps

  return (
    <PopupLayout state={modalProps.state} zIndex={110} closeFn={closeModal} style={{ alignItems: "center", justifyContent: "flex-end" }}>
      <View
        css={{
          marginBottom: "-100%",
          backgroundColor: Colors.WHITE,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          overflow: "hidden",
          transition: "all .2s ease-out",
          width: "100%",
          boxShadow: "0 -3px 10px rgba(0,0,0,.2)",
        }}
        style={state ? { marginBottom: 0 } : {}}>
        <TitleSection title={title} onPress={closeModal} />
        {children}
        {buttons && (
          <View css={{ flexDirection: "row", columnGap: 10 }}>
            {buttons?.map(({ name, onPress, style }, index) => (
              <Button key={index} onClick={onPress} style={{ width: "100%", ...style }}>
                {name ?? "BUTTON"}
              </Button>
            ))}
          </View>
        )}
      </View>
    </PopupLayout>
  )
}
