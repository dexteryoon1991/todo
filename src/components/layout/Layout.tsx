import React, { PropsWithChildren, useEffect } from "react"
import Header from "./Header"
import Navbar from "./Navbar"
import Menubar from "./Menubar"
import { globalCss } from "@stitches/react"
import { useSession } from "next-auth/react"
import { Colors, View } from "@/modules"
import { Alert, Confirm, Modal } from "../utils"

export default function Layout({ children }: PropsWithChildren) {
  const style = globalCss({
    "*": {
      padding: 0,
      margin: 0,
    },
    button: {
      cursor: "pointer",
      color: "inherit",
      fontSize: 16,
    },
    a: {
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
    },
    body: {
      backgroundColor: Colors.LIGHTGRAY,
    },
    html: {
      // backgroundColor: Colors.BLACK,
    },
  })

  style()

  const { data: session, status } = useSession()

  useEffect(() => {
    console.log(session, status)
  }, [session, status])

  const maxWidth = 400
  return (
    <View css={{ maxWidth, margin: "0 auto", width: "100%", border: "1px sold" }}>
      <Header maxWidth={maxWidth} />
      <Navbar maxWidth={maxWidth} />
      <Menubar maxWidth={maxWidth} />
      {children}
      <Alert />
      <Confirm />
      <Modal />
    </View>
  )
}
