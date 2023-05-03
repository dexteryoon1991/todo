import { usePopup } from "@/context"
import React from "react"
import PopupLayout from "./PopupLayout"

export default function Confirm() {
  const { confirmProps, closeConfirm } = usePopup()
  return (
    <PopupLayout state={confirmProps.state} closeFn={closeConfirm}>
      Confirm
    </PopupLayout>
  )
}
