import React, { createContext, PropsWithChildren, useContext } from "react"

const initialState = {}
const data = createContext(initialState)
export function PopupProvider({ children }: PropsWithChildren) {
  return <data.Provider value={{}}>{children}</data.Provider>
}

export function usePopup() {
  return useContext(data)
}
