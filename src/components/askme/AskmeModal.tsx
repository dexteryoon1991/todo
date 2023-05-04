import { useAsk, useAuth, usePopup, useUtils } from "@/context"
import { Button, Colors, View } from "@/modules"
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AppInput, ContentSection, TextArea } from "../utils"
import bcrypt from "bcryptjs"

export default function AskmeModal() {
  const { alert, closeModal } = usePopup()

  const [title, setTitle] = useState("")
  const titleRef = useRef<HTMLInputElement | null>(null)
  const focusOnTitle = useCallback(() => titleRef.current?.focus(), [])
  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), [])
  const titleText = useMemo(() => {
    if (!title) {
      return "타이틀을 입력하세요."
    }
    return null
  }, [title])

  useEffect(() => {
    focusOnTitle()
  }, [])

  const [body, setBody] = useState("")
  const bodyRef = useRef<HTMLTextAreaElement | null>(null)
  const focusOnBody = useCallback(() => bodyRef.current?.focus(), [])
  const onChangeBody = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value), [])
  const bodyText = useMemo(() => {
    if (!body) {
      return "문의 내용을 입력하세요."
    }
    return null
  }, [body])

  const [email, setEmail] = useState("")
  const emailRef = useRef<HTMLInputElement | null>(null)
  const focusOnEmail = useCallback(() => emailRef.current?.focus(), [])
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [])
  const emailText = useMemo(() => {
    if (!email) {
      return "이메일을 입력하세요."
    }
    return null
  }, [email])

  const [password, setPassword] = useState("")
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const focusOnPassword = useCallback(() => passwordRef.current?.focus(), [])
  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [])
  const passwordText = useMemo(() => {
    if (!password) {
      return "비밀번호를 입력하세요."
    }
    if (password.length < 3) {
      return "비밀번호가 너무 짧아요."
    }
    if (password.length > 12) {
      return "비밀번호가 너무 길어요."
    }
    return null
  }, [password])

  const { createAsk } = useAsk()
  const { user } = useAuth()
  const { getMoment, getMomentDate, getRandomBytes } = useUtils()
  const onSubmit = useCallback(async () => {
    if (titleText) {
      focusOnTitle()
      return alert(titleText)
    }

    if (bodyText) {
      focusOnBody()
      return alert(bodyText)
    }

    const createdAt = await getMoment()
    const createdDate = await getMomentDate()
    const id = await getRandomBytes()

    if (user == null) {
      if (emailText) {
        focusOnEmail()
        return alert(emailText)
      }
      if (passwordText) {
        focusOnPassword()
        return alert(passwordText)
      }
    }
    const hashedPassword = await bcrypt.hash(password, 16)
    createAsk({ title, body, id, createdAt, createdDate, createdBy: user ? user : { email, password: hashedPassword } }).then((res) => {
      if (res.success) {
        closeModal()
      }
    })
  }, [createAsk, titleText, passwordText, bodyText, user, closeModal])
  return (
    <>
      <ContentSection style={{ rowGap: 20 }}>
        <AppInput
          props={{
            value: title,
            onChange: onChangeTitle,
            ref: titleRef,
            placeholder: "What is it about?",
          }}
        />
        {user == null && (
          <View css={{ flexDirection: "row", columnGap: 10 }}>
            <AppInput
              props={{
                value: email,
                onChange: onChangeEmail,
                ref: emailRef,
                placeholder: "Enter Email for answer",
              }}
            />
            <AppInput
              props={{
                value: password,
                onChange: onChangePassword,
                ref: passwordRef,
                placeholder: "Create password",
                type: "password",
              }}
            />
          </View>
        )}
        <TextArea
          props={{
            value: body,
            onChange: onChangeBody,
            ref: bodyRef,
            placeholder: "What's in your mind?",
            style: {
              padding: 10,
              minHeight: 100,
              width: "calc(100% - 20px)",
            },
          }}
          style={{ border: `1px solid ${Colors.LIGHTGRAY}`, borderRadius: 5 }}
        />
      </ContentSection>
      <Button colors="PRIMARY" onClick={onSubmit} css={{ borderRadius: 0 }}>
        질문 등록
      </Button>
    </>
  )
}
