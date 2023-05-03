import { AppInput, ContentSection, TitleSection } from "@/components"
import { Button, Colors, Typo, View } from "@/modules"
import { signIn } from "next-auth/react"
import React, { ChangeEvent, FormEvent, useCallback, useMemo, useRef, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { RiKakaoTalkFill } from "react-icons/ri"

export default function Signin() {
  const [email, setEmail] = useState("")
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [])
  const emailRef = useRef<HTMLInputElement | null>(null)
  const focusOnEmail = useCallback(() => emailRef.current?.focus(), [])
  const emailText = useMemo(() => {
    if (!email) {
      return "이메일을 입력하세요."
    }
    const pattern = /[a-zA-Z0-9]+/
    if (!pattern.test(email)) {
      return "영어 또는 숫자로만 입력해주세요."
    }
    if (!email.includes("@")) {
      return "'@'를 반드시 포함해야 합니다."
    }
    const surfixes = email.split("@")[1]
    if (!surfixes.includes(".")) {
      return "'올바른 이메일 형식이 아닙니다.'"
    }
    return null
  }, [email])

  const [password, setPassword] = useState("")
  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [])
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const focusOnPassword = useCallback(() => passwordRef.current?.focus(), [])
  const passwordText = useMemo(() => {
    if (!password) {
      return "비밀번호를 입력하세요."
    }
    if (password.length < 6) {
      return "6자리 이상이어야 합니다."
    }
    if (password.length > 18) {
      return "18자리 이하이어야 합니다."
    }
    return null
  }, [password])

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    },
    [email, password, focusOnEmail, focusOnPassword]
  )

  const onGoogle = useCallback(() => {
    signIn("google", { redirect: true })
  }, [signIn])

  const onKatalk = useCallback(() => {
    signIn("kakao", { redirect: true })
  }, [signIn])
  return (
    <View type="fullPage">
      <View css={{ backgroundColor: Colors.WHITE, borderRadius: 10, overflow: "hidden" }}>
        <TitleSection title="로그인 해주세요." />
        <ContentSection style={{ rowGap: 20 }}>
          <View css={{ rowGap: 10 }} as="form" onSubmit={onSubmit}>
            <AppInput
              props={{
                value: email,
                onChange: onChangeEmail,
                ref: emailRef,
                placeholder: "Enter Your Email",
              }}
              inputType="email"
              onPressIcon={focusOnEmail}
            />
            <AppInput
              props={{
                value: password,
                onChange: onChangePassword,
                ref: passwordRef,
                placeholder: "Enter Your Password",
              }}
              onPressIcon={focusOnPassword}
              inputType="password"
            />
          </View>
          <Button colors="PRIMARY">로그인</Button>
          <View css={{ position: "relative", width: "100%", margin: "10px 0" }}>
            <Typo css={{ padding: 10, backgroundColor: Colors.WHITE, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              OR
            </Typo>
            <View css={{ width: "100%", backgroundColor: Colors.BLACK, height: 1 }} />
          </View>
          <View css={{ rowGap: 10 }}>
            <Button
              css={{ border: `1px solid ${Colors.PRIMARY}`, flexDirection: "row", columnGap: 10, "&:hover": { boxShadow: "0 3px 6px rgba(0,0,0,.2)" } }}
              onClick={onGoogle}>
              <FcGoogle /> Google
            </Button>
            <Button
              css={{ border: `1px solid ${Colors.PRIMARY}`, flexDirection: "row", columnGap: 10, "&:hover": { boxShadow: "0 3px 6px rgba(0,0,0,.2)" } }}
              onClick={onKatalk}>
              <RiKakaoTalkFill /> Kakaotalk
            </Button>
          </View>
        </ContentSection>
      </View>
    </View>
  )
}
