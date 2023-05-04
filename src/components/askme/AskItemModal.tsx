import { Button, Typo, View } from "@/modules"
import { Askme } from "@/types"
import { CSSProperties } from "@stitches/react"
import React from "react"
import { ContentSection } from "../utils"

export default function AskItemModal({ title, body }: Askme) {
  return (
    <>
      <ContentSection style={{ rowGap: 10 }}>
        <Typo weight="BOLD">{title}</Typo>
        <Typo>{body}</Typo>
      </ContentSection>
      <View css={{ flexDirection: "row" }}>
        <Button colors="LIGHTGRAY" css={{ ...buttonStyle }}>
          EDIT
        </Button>
        <Button colors="PRIMARY" css={{ ...buttonStyle }}>
          DELETE
        </Button>
      </View>
    </>
  )
}

const buttonStyle: CSSProperties = { width: "100%", padding: 5, minHeight: "auto", borderRadius: 0 }
