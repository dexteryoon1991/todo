import { Auth } from "@/types"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"

const initialState: Auth = { isLoggedIn: false, user: null }
const data = createContext(initialState)
export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data: session, status } = useSession()

  useEffect(() => {
    setIsLoggedIn((prev) => (status !== "authenticated" ? false : true))
  }, [status])

  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    console.log(session?.user)
    // setUser()
  }, [session])

  return (
    <data.Provider
      value={{
        isLoggedIn,
      }}>
      {children}
    </data.Provider>
  )
}

export function useAuth() {
  return useContext(data)
}
