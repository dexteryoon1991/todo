import { ContentSection, TitleSection } from "@/components"
import { Button, Colors, Typo, View } from "@/modules"
import { RiContactsBookLine } from "react-icons/ri"
import { MdCall } from "react-icons/md"
import { AiFillGithub } from "react-icons/ai"

export default function Home() {
  return (
    <View type="fullPage">
      <View css={{ backgroundColor: Colors.WHITE, borderRadius: 10, boxShadow: "0 3px 6px rgba(0,0,0,.2)" }}>
        <TitleSection title="Dexter Yoon" />
        <ContentSection style={{ rowGap: 20 }}>
          <View css={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
            <RiContactsBookLine /> <Typo>dexteryoon@icloud.com</Typo>
          </View>
          <View css={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
            <AiFillGithub />
            <View
              as="a"
              href="https://github.com/dexteryoon1991/todo"
              target="_blank"
              css={{
                flexDirection: "row",
                alignItems: "center",
                transition: "all .2s ease-out",
                display: "flex",
                justifyContent: "center",
                "&:active": {
                  transform: "scale(.95)",
                },
              }}>
              Available private Repository
            </View>
          </View>
          <View
            as="a"
            href="tel:01075910173"
            css={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              backgroundColor: Colors.PRIMARY,
              color: Colors.WHITE,
              borderRadius: 5,
              padding: 10,
              transition: "all .2s ease-out",
              display: "flex",
              justifyContent: "center",
              "&:active": {
                transform: "scale(.95)",
              },
            }}>
            <MdCall /> <Typo>전화걸기</Typo>
          </View>
        </ContentSection>
      </View>
    </View>
  )
}
