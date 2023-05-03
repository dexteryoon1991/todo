import { TimeSelector, TodoItem } from "@/components"
import { useDates } from "@/context"
import { momentFormat, View } from "@/modules"
import React from "react"
import moment from "moment"

export default function Mytodos() {
  const dates = useDates()
  return (
    <View type="page" css={{ rowGap: 20 }}>
      <TimeSelector {...dates} style={{ marginTop: 20 }} />
    </View>
  )
}
