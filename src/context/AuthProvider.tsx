import { dbService } from "@/lib/firebase"
import { Auth, Collection, User } from "@/types"
import { DefaultSession } from "next-auth"
import { useSession } from "next-auth/react"
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react"
import { getDocs } from "firebase/firestore"

const initialState: Auth = { isLoggedIn: false, user: null }
const data = createContext(initialState)
export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status !== "authenticated") {
      setIsLoggedIn(false)
    } else setIsLoggedIn(true)
  }, [status])

  const [user, setUser] = useState<User | null>(null)

  const fetchUser = useCallback(async (session: DefaultSession): Promise<User | null> => {
    const { email } = session.user!
    const docRef = dbService.collection(Collection.USER).where("email", "==", email)
    const docSnap = await getDocs(docRef)
    const users = docSnap.docs.map((doc) => ({ ...doc.data() })) as User[]

    if (users.length === 0) {
      return null
    }
    return users[0]
  }, [])

  useEffect(() => {
    session && fetchUser(session).then((user) => (user ? setUser(user) : console.log("need to login")))
    // setUser()
  }, [session])

  return (
    <data.Provider
      value={{
        isLoggedIn,
        user,
      }}>
      {children}
    </data.Provider>
  )
}

export function useAuth() {
  return useContext(data)
}
