import React, { createContext, PropsWithChildren, useContext } from "react"

const initialState = {}
const data = createContext(initialState)
export function TodoProvider({ children }: PropsWithChildren) {
  return <data.Provider value={{}}>{children}</data.Provider>
}

export function useTodo() {
  return useContext(data)
}
