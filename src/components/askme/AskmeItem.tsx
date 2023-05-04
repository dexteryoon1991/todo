import { useUtils } from "@/context"
import { Button, Colors, Typo, View } from "@/modules"
import { Askme } from "@/types"
import React, { useEffect, useState } from "react"

interface Props extends Askme {
  index: number
}
export default function AskmeItem({ index, title, body, createdAt, createdDate, id, createdBy }: Props) {
  const { getFromNow } = useUtils()
  const [fromNow, setFromNow] = useState("")
  useEffect(() => {
    getFromNow(createdAt).then((res) => setFromNow(res))
  }, [createdAt])
  return (
    <Button
      css={{
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
        border: `1px solid ${Colors.LIGHTGRAY}`,
        borderRadius: 10,
        "&:hover": {
          boxShadow: "0 3px 6px rgba(0,0,0,.2)",
        },
      }}>
      <View css={{ flex: 1, flexDirection: "row", columnGap: 5 }}>
        <Typo css={{ backgroundColor: Colors.PRIMARY, padding: 3, borderRadius: 5, alignItems: "center", color: Colors.WHITE }}>{index + 1}</Typo> {title}
      </View>
      <Typo>{fromNow}</Typo>
    </Button>
  )
}
