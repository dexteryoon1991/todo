import { UseDates, TimeAction } from "@/types"
import React, { useState, useCallback, useEffect } from "react"

export default function useDates(): UseDates {
  const time = new Date()

  const [year, setYear] = useState(time.getFullYear())
  const [month, setMonth] = useState(time.getMonth() + 1)
  const [date, setDate] = useState(time.getDate())

  const [YYMMDD, setYYMMDD] = useState("")
  const [MMDD, setMMDD] = useState("")

  useEffect(() => {
    setYYMMDD(`${year}. ${month}. ${date}`)
    setMMDD(`${month}. ${date}`)
  }, [year, month, date])

  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const [dates, setDates] = useState<number[]>([])
  const getDates = useCallback(
    (month: number, year: number): number[] => {
      const isOddYear = year % 4 === 0
      let length: number = 0
      const evenMonth = [4, 6, 9, 11]
      const oddMonth = [1, 3, 5, 7, 8, 10, 12]

      if (evenMonth.find((item) => item === month)) {
        length = 30
      } else if (oddMonth.find((item) => item === month)) {
        length = 31
      } else if (month === 2) {
        if (isOddYear) {
          length = 29
        } else length = 28
      }

      return Array.from({ length }, (_, i) => i + 1)
    },
    [year, month]
  )
  useEffect(() => {
    setDates(getDates(month, year))
  }, [month, year, getDates])

  useEffect(() => setYear(time.getFullYear()), [time.getFullYear()])

  const yearHandler = useCallback(
    (action?: TimeAction) =>
      setYear((prev) => {
        if (action === "dec") {
          return prev - 1
        } else if (action === "inc") {
          return prev + 1
        } else if (action === "reset") {
          return time.getFullYear()
        } else return prev
      }),
    [time.getFullYear()]
  )

  const monthHandler = useCallback(
    (action?: TimeAction) =>
      setMonth((prev) => {
        if (action === "dec") {
          if (prev === 1) {
            yearHandler("dec")
            return 12
          } else return prev - 1
        } else if (action === "inc") {
          if (prev === 12) {
            yearHandler("inc")
            return 1
          } else return prev + 1
        } else if (action === "reset") {
          return time.getMonth() + 1
        } else return prev
      }),
    [time.getMonth(), month, yearHandler]
  )

  const dateHandler = useCallback(
    (action?: TimeAction) =>
      setDate((prev) => {
        if (action === "dec") {
          if (prev === 1) {
            monthHandler("dec")
            return getDates(month - 1, year)[getDates(month - 1, year).length - 1]
          } else return prev - 1
        } else if (action === "inc") {
          if (prev === dates[dates.length - 1]) {
            monthHandler("inc")
            return 1
          } else return prev + 1
        } else if (action === "reset") {
          return time.getDate()
        } else return prev
      }),
    [time.getDate(), monthHandler, yearHandler, month, dates]
  )

  return {
    year,
    month,
    date,
    dates,
    dateHandler,
    monthHandler,
    yearHandler,
    YYMMDD,
    MMDD,
  }
}
