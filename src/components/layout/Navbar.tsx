import { Button, Colors, View } from "@/modules"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

export default function Navbar({ maxWidth }: { maxWidth?: number }) {
  const router = useRouter()
  const { pathname } = router
  useEffect(() => {
    console.log(pathname)
  }, [pathname])
  return (
    <View
      css={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", backgroundColor: Colors.WHITE, maxWidth, zIndex: 100 }}>
      <View css={{ height: 50, flexDirection: "row", alignItems: "center" }}>
        {
          {
            "/": <>home</>,
          }[pathname]
        }
      </View>
    </View>
  )
}

interface NavItemProps {
  name: string
  onPress?: () => void
  isFocused?: boolean
}
function NavItem({ name, onPress, isFocused }: NavItemProps) {
  return <Button onClick={onPress}>{name}</Button>
}
