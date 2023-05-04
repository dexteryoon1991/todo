import { usePopup } from "@/context"
import { Button, Colors, Typo, View } from "@/modules"
import { CSSProperties } from "@stitches/react"
import React, { useCallback } from "react"
import ContentSection from "./ContentSection"
import PopupLayout from "./PopupLayout"

export default function Confirm() {
  const { confirmProps, closeConfirm } = usePopup()
  const { title, message, button, onPress } = confirmProps

  const onCancel = useCallback(() => closeConfirm(), [closeConfirm])

  const onOk = useCallback(() => {
    closeConfirm()
    if (onPress) {
      onPress()
    }
  }, [onPress, closeConfirm])
  return (
    <PopupLayout state={confirmProps.state} zIndex={111} closeFn={closeConfirm} style={{ alignItems: "center", justifyContent: "center" }}>
      <ContentSection style={{ backgroundColor: Colors.WHITE, borderRadius: 10, border: `1px solid ${Colors.LIGHTGRAY}`, rowGap: 20 }}>
        <Typo>{message}</Typo>
        <View css={{ flexDirection: "row", justifyContent: "flex-end", columnGap: 10 }}>
          {button && button.length > 1 ? (
            button.map((btn, index) => (
              <Button key={index} onClick={btn.onPress} css={{ ...buttonStyle }} colors={index === 1 ? "PRIMARY" : undefined}>
                {btn.name}
              </Button>
            ))
          ) : (
            <>
              <Button css={{ ...buttonStyle, flex: 1 }} onClick={onCancel}>
                취소
              </Button>
              <Button css={{ ...buttonStyle, flex: 3 }} colors="PRIMARY" onClick={onOk}>
                {button && button[0].name ? button[0].name : "확인"}
              </Button>
            </>
          )}
        </View>
      </ContentSection>
    </PopupLayout>
  )
}

const buttonStyle: CSSProperties = { padding: 5, minHeight: "auto" }
