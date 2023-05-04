import { AskmeItem, AskmeModal } from "@/components"
import { useAuth, usePopup } from "@/context"
import { dbService } from "@/lib/firebase"
import { Button, Colors, Typo, View } from "@/modules"
import { Askme, Collection } from "@/types"
import React, { useCallback, useEffect, useState } from "react"

export default function Askme() {
  const { modal } = usePopup()

  const onAskme = useCallback(() => modal("무엇이든 물어보세요!", <AskmeModal />), [modal])

  const [items, setItems] = useState<Askme[]>([])

  const { user } = useAuth()

  useEffect(() => {
    const unsubscribe = dbService
      .collection(Collection.ASKME)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => ({ ...doc.data() })) as Askme[]
        console.log(data)
        setItems(data)
      })

    const userUnsubscribe = dbService
      .collection(Collection.ASKME)
      .where("createdBy", "==", user)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => ({ ...doc.data() })) as Askme[]
        console.log(data)
        setItems(data)
      })
    return () => {
      if (user == null) {
        unsubscribe()
      } else userUnsubscribe()
    }
  }, [user])

  return (
    <View type="page" css={{ rowGap: 20 }}>
      <View
        css={{
          padding: 20,
          borderRadius: 20,
          backgroundColor: Colors.WHITE,
          border: `1px solid ${Colors.LIGHTGRAY}`,
          rowGap: 20,
          boxShadow: "0 3px 6px rgba(0,0,0,.2)",
          marginTop: 20,
        }}>
        <Typo weight="BOLD" size="LARGE" textAlign={"center"}>
          " 무엇이든 물어보세요! "
        </Typo>
        <Button colors="PRIMARY" onClick={onAskme}>
          ASK ME WATEVA
        </Button>
      </View>
      <View css={{ rowGap: 10 }}>
        {items?.map((item, index) => (
          <AskmeItem key={item.id} {...item} index={index} />
        ))}
      </View>
    </View>
  )
}
