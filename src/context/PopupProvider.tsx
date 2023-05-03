import { Alert, AlertType, Confirm, Modal, Popup, PopupButton } from "@/types"
import { AnyRecord } from "dns"
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react"

const initialState: Popup = {
  alertProps: { state: false },
  confirmProps: { state: false },
  modalProps: { state: false },
  modal: () => {},
  alert: () => {},
  confirm: () => {},
  closeAlert: () => {},
  closeConfirm: () => {},
  closeModal: () => {},
  closeAll: () => {},
}
const data = createContext(initialState)
export function PopupProvider({ children }: PropsWithChildren) {
  const [alertProps, setAlertProps] = useState<Alert>(initialState.alertProps)

  const [confirmProps, setConfirmProps] = useState<Confirm>(initialState.confirmProps)
  const [modalProps, setModalProps] = useState<Modal>(initialState.modalProps)

  const alert = useCallback(
    (message?: string, title?: string, button?: PopupButton, type?: AlertType) => setAlertProps({ state: true, message, title, button, type }),
    []
  )

  const confirm = useCallback((message?: string, title?: string, button?: PopupButton[]) => setConfirmProps({ state: true, message, title, button }), [])

  const modal = useCallback(
    (title?: string, content?: any, buttons?: PopupButton[], payload?: any) => setModalProps({ state: true, title, payload, children: content, buttons }),
    []
  )

  const closeAlert = useCallback(() => setAlertProps(initialState.alertProps), [initialState])
  const closeConfirm = useCallback(() => setConfirmProps(initialState.confirmProps), [initialState])
  const closeModal = useCallback(() => setModalProps(initialState.modalProps), [initialState])
  const closeAll = useCallback(() => {
    closeAlert()
    closeConfirm()
    closeModal()
  }, [closeAlert, closeConfirm, closeModal])

  return (
    <data.Provider value={{ alert, alertProps, closeAlert, closeConfirm, closeModal, closeAll, confirmProps, modalProps, confirm, modal }}>
      {children}
    </data.Provider>
  )
}

export function usePopup() {
  return useContext(data)
}
