import { Button, View, Colors } from "@/modules"
import { UseDates } from "@/types"
import { CSSProperties } from "@stitches/react"
import React, { useCallback } from "react"
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi"

interface Props extends UseDates {
  style?: CSSProperties
}
export default function TimeSelector({ year, month, date, dateHandler, monthHandler, style }: Props) {
  const buttonStyle: CSSProperties | any = {
    boxShadow: "0 3px 6px rgba(0,0,0,.1)",
    "&:hover": {
      boxShadow: "0 3px 6px rgba(0,0,0,.2)",
    },
    border: `none`,
    // backgroundColor: Colors.WHITE,
  }

  const onReset = useCallback(() => {
    dateHandler("reset")
    monthHandler("reset")
  }, [dateHandler, monthHandler])
  return (
    <View css={{ flexDirection: "row", columnGap: 10, justifyContent: "center", ...style }}>
      <Button css={{ ...buttonStyle }} onClick={() => monthHandler("dec")}>
        <FiChevronsLeft />
      </Button>
      <Button css={{ ...buttonStyle }} onClick={() => dateHandler("dec")}>
        <FiChevronLeft />
      </Button>
      <Button css={{ ...buttonStyle }} onClick={onReset}>
        {year}년 {month}월 {date}일
      </Button>
      <Button css={{ ...buttonStyle }} onClick={() => dateHandler("inc")}>
        <FiChevronRight />
      </Button>
      <Button css={{ ...buttonStyle }} onClick={() => monthHandler("inc")}>
        <FiChevronsRight />
      </Button>
    </View>
  )
}
