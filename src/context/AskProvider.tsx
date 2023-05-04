import { dbService } from "@/lib/firebase"
import { API, Ask, Askme, Collection } from "@/types"
import React, { createContext, PropsWithChildren, useCallback, useContext } from "react"
import { usePopup } from "./PopupProvider"

const initialState: Ask = {
  createAsk: async () => ({ success: false }),
}
const data = createContext(initialState)

export function AskProvider({ children }: PropsWithChildren) {
  const { alert } = usePopup()
  const createAsk = useCallback(
    async (askme: Askme): Promise<API> => {
      const docRef = dbService.collection(Collection.ASKME)

      try {
        await docRef.add(askme)
        alert("문의사항이 등록되었습니다.", undefined, undefined, "success")
        return { success: true }
      } catch (error: any) {
        return { success: false, message: error.message }
      }
    },
    [alert]
  )
  return <data.Provider value={{ createAsk }}>{children}</data.Provider>
}

export function useAsk() {
  return useContext(data)
}
