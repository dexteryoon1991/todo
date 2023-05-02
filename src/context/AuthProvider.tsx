import React, { createContext, PropsWithChildren, useContext } from "react"

const initialState = {}
const data = createContext(initialState)
export function AuthProvider({ children }: PropsWithChildren) {
  return <data.Provider value={{}}>{children}</data.Provider>
}

export function useAuth() {
  return useContext(data)
}
