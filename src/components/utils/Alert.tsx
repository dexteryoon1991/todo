import { usePopup } from "@/context"
import { Colors, Typo, View, Button } from "@/modules"
import React, { useCallback } from "react"
import PopupLayout from "./PopupLayout"
import TitleSection from "./TitleSection"
import { TbConfetti } from "react-icons/tb"
import { HiBellAlert } from "react-icons/hi2"
import { keyframes } from "@stitches/react"
import { BiCheckCircle } from "react-icons/bi"

export default function Alert() {
  const { alertProps, closeAlert } = usePopup()
  const { state, title, button, message, type } = alertProps
  const onButton = useCallback(() => {
    closeAlert()
    if (button?.onPress) {
      button.onPress()
    }
  }, [closeAlert, button?.onPress])
  return (
    <PopupLayout state={state} zIndex={112} closeFn={closeAlert} style={{ alignItems: "center", justifyContent: "flex-end" }}>
      <View
        css={{
          flexDirection: "row",
          columnGap: 10,
          padding: 10,
          borderRadius: 10,
          backgroundColor: Colors.WHITE,
          marginBottom: 70,
          boxShadow: "0 3px 6px rgba(0,0,0,.1)",
          "&:hover": {
            boxShadow: "0 3px 6px rgba(0,0,0,.2)",
          },
        }}>
        {type ? (
          <TbConfetti />
        ) : (
          <View css={{ animation: `${alertAnimation} 1s infinite` }}>
            <HiBellAlert color={Colors.PRIMARY} />
          </View>
        )}
        {title && <Typo weight="BOLD">{title}</Typo>} {message && <Typo>{message}</Typo>}{" "}
        <Button css={{ border: "none", padding: 0, minHeight: "auto", color: Colors.PRIMARY, fontSize: button ? undefined : 20 }} onClick={onButton}>
          {button?.name ? (
            <>
              <Typo>{button.name} </Typo>
            </>
          ) : (
            <BiCheckCircle />
          )}
        </Button>
      </View>
    </PopupLayout>
  )
}

const alertAnimation = keyframes({
  "0%": {},
  "10%": {
    transform: "rotate(45deg)",
  },
  "20%": {
    transform: "rotate(-45deg)",
  },
  "30%": {
    transform: "rotate(45deg)",
  },
  "40%": {
    transform: "rotate(-45deg)",
  },
  "50%": {
    transform: "rotate(20deg)",
  },
  "55%": {
    transform: "rotate(0deg)",
  },
  //   "50%": {
  //     transform: "rotate(45deg)",
  //   },
  //   "60%": {
  //     transform: "rotate(-45deg)",
  //   },
  //   "70%": {
  //     transform: "rotate(45deg)",
  //   },
  //   "80%": {
  //     transform: "rotate(-45deg)",
  //   },
  //   "90%": {
  //     transform: "rotate(45deg)",
  //   },
  "100%": {
    transform: "rotate(0deg)",
  },
})
