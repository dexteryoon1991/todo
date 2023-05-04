import { usePopup } from "@/context"
import { Button } from "@/modules"
import { Askme } from "@/types"
import React, { useState, useRef, useCallback, ChangeEvent, useMemo } from "react"
import { AppInput, ContentSection } from "../utils"
import bcrypt from "bcryptjs"

export default function ConfirmPassword() {
  const { modal, alert, modalProps } = usePopup()
  const { payload } = modalProps as { payload: Askme }

  const [email, setEmail] = useState("")
  const emailRef = useRef<HTMLInputElement | null>(null)
  const focusOnEmail = useCallback(() => emailRef.current?.focus(), [])
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [])
  const emailText = useMemo(() => {
    if (!email) {
      return "이메일을 입력하세요."
    }
    if (payload?.createdBy?.email !== email) {
      console.log(payload?.createdBy?.email)
      return "이메일이 일치하지 않습니다."
    }
    return null
  }, [email, payload])

  const [password, setPassword] = useState("")
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const focusOnPassword = useCallback(() => passwordRef.current?.focus(), [])
  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [])
  const passwordText = useMemo(async () => {
    const { password: originalPassword } = payload?.createdBy as { password: string }
    if (!originalPassword) {
      alert("로그인해주세요.")
      return null
    } else {
      if (!password) {
        return "비밀번호를 입력하세요."
      }
      if (password.length < 3) {
        return "비밀번호가 너무 짧아요."
      }
      if (password.length > 12) {
        return "비밀번호가 너무 길어요."
      }
      if (!payload?.createdBy) {
        return
      }
      const check = await bcrypt.compare(originalPassword, password)
      if (!check) {
        return "비밀번호가 일치하지 않습니다."
      }
      return null
    }
  }, [password, payload, alert])

  const onSubmit = useCallback(async () => {
    if (emailText) {
      focusOnEmail()
      return alert(emailText)
    }
    if (await passwordText) {
      focusOnPassword()
      return alert("비밀번호를 확인해주세요.")
    }
  }, [modal, emailText, passwordText, alert, focusOnEmail, focusOnPassword])
  return (
    <>
      <ContentSection style={{ rowGap: 20 }}>
        <AppInput
          props={{
            value: email,
            onChange: onChangeEmail,
            ref: emailRef,
            placeholder: "Enter Email for answer",
          }}
          inputType="email"
          onPressIcon={focusOnEmail}
        />
        <AppInput
          props={{
            value: password,
            onChange: onChangePassword,
            ref: passwordRef,
            placeholder: "Create password",
            type: "password",
          }}
          inputType="password"
          onPressIcon={focusOnPassword}
        />
      </ContentSection>
      <Button colors="PRIMARY" css={{ borderRadius: 0 }} onClick={onSubmit}>
        문의 확인
      </Button>
    </>
  )
}
