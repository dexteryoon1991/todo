import { useUtils, usePopup, useAuth } from "@/context"
import { Button, Colors, Typo, View } from "@/modules"
import { Askme } from "@/types"
import React, { useCallback, useEffect, useState } from "react"
import ConfirmPassword from "./ConfirmPassword"
import AskItemModal from "./AskItemModal"

interface Props extends Askme {
  index: number
}

export default function AskmeItem(props: Props) {
  const { index, title, body, createdAt, createdDate, id, createdBy } = props
  const { getFromNow } = useUtils()
  const { user } = useAuth()
  const [fromNow, setFromNow] = useState("")
  useEffect(() => {
    getFromNow(createdAt).then((res) => setFromNow(res))
  }, [createdAt])

  const { modal, alert } = usePopup()

  const onClick = useCallback(() => {
    if (user == null) {
      console.log("confirm password")
      return modal("비밀번호를 입력해주세요.", <ConfirmPassword />, undefined, props)
    }
    if (user.email !== createdBy?.email) {
      return alert("회원님께서 남기신 문의사항이 아닙니다.")
    }
    modal(title, <AskItemModal {...props} />)
  }, [modal, createdBy, user, ConfirmPassword, AskItemModal, alert])

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
      }}
      onClick={onClick}>
      <View css={{ flex: 1, flexDirection: "row", columnGap: 5 }}>
        <Typo css={{ backgroundColor: Colors.PRIMARY, padding: 3, borderRadius: 5, alignItems: "center", color: Colors.WHITE, opacity: 0.5 }}>{index + 1}</Typo>
        <Typo css={{ padding: 3 }}>{title}</Typo>
      </View>
      <Typo size="SMALL" color="GRAY">
        {fromNow}
      </Typo>
    </Button>
  )
}
