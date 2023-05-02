import { Button, Colors, View } from "@/modules"
import { Menu } from "@/types"
import { CSSProperties } from "@stitches/react"
import { useRouter } from "next/router"
import React, { PropsWithChildren, useCallback, useEffect } from "react"
import { AiOutlineUser } from "react-icons/ai"
import { BsHeadset } from "react-icons/bs"

export default function Navbar({ maxWidth }: { maxWidth?: number }) {
  const router = useRouter()
  const { pathname } = router
  useEffect(() => {
    console.log(pathname)
  }, [pathname])
  return (
    <View
      css={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", backgroundColor: Colors.WHITE, maxWidth, zIndex: 100 }}
    >
      <View css={{ height: 50, flexDirection: "row", alignItems: "center" }}>
        {
          {
            "/": (
              <>
                {[
                  { path: "/signin", children: () => <AiOutlineUser />, name: "로그인" },
                  { path: "/askme", children: () => <BsHeadset />, name: "문의사항" },
                ].map((item) => (
                  <NavItem key={item.path} isFocused={item.path === pathname} onPress={() => router.push({ pathname: item.path })}>
                    {item.children()} {item.name}
                  </NavItem>
                ))}
                {/* <NavItem isFocused={pathname}>
                  <AiOutlineUser /> 로그인
                </NavItem>
                <NavItem>
                  <BsHeadset /> 문의하기
                </NavItem> */}
              </>
            ),
          }[pathname]
        }
        {[
          { path: "/signin", children: () => <AiOutlineUser />, name: "로그인" },
          { path: "/askme", children: () => <BsHeadset />, name: "문의사항" },
        ].map((item) => (
          <NavItem key={item.path} isFocused={item.path === pathname} onPress={() => router.push({ pathname: item.path })}>
            {item.children()} {item.name}
          </NavItem>
        ))}
      </View>
    </View>
  )
}

interface NavItemProps extends PropsWithChildren {
  isFocused?: boolean
  onPress?: () => void
  style?: CSSProperties
}
function NavItem({ isFocused, children, onPress, style }: NavItemProps) {
  return (
    <Button
      onClick={onPress}
      css={{
        minHeight: "100%",
        border: "none",
        padding: 0,
        width: "100%",
        backgroundColor: isFocused ? "rgba(0, 173, 181, .05)" : undefined,
        rowGap: 5,
        color: isFocused ? Colors.PRIMARY : undefined,
        borderRadius: 0,
        ...style,
      }}
    >
      {children}
    </Button>
  )
}
