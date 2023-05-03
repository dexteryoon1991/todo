import { Colors, Button } from "@/modules"
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useAuth, useDates, usePopup, useTodo, useUtils } from "@/context"
import { ContentSection, TextArea, TimeSelector } from "../utils"
import Input from "../utils/AppInput"
import moment from "moment"
import { Collection, Todo } from "@/types"
import { dbService } from "@/lib/firebase"
import { getDoc } from "firebase/firestore"

type Props = {
  payload?: Todo
}
export function AddTodoModal({ payload }: Props) {
  const { modalProps, alert, closeModal } = usePopup()
  const dates = useDates()
  const [title, setTitle] = useState("")
  const titleRef = useRef<HTMLInputElement | null>(null)
  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }, [])
  const focusOnTitle = useCallback(() => titleRef.current?.focus(), [])
  const titleText = useMemo(() => {
    if (!title) {
      return "타이틀을 입력해주세요."
    }
    return null
  }, [title])

  useEffect(() => {
    modalProps.state && focusOnTitle()
  }, [modalProps.state, focusOnTitle])

  const [body, setBody] = useState("")
  const bodyRef = useRef<HTMLTextAreaElement | null>(null)
  const onChangeBody = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value), [])
  const focusOnBody = useCallback(() => bodyRef.current?.focus(), [])

  const onTitleKeyDown = useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        focusOnBody()
      }
    },
    [focusOnBody]
  )

  const { createTodo, editTodo } = useTodo()
  const { user } = useAuth()
  const { getMoment, getRandomBytes, getMomentDate } = useUtils()
  const onSubmit = useCallback(async () => {
    if (user == null) {
      return alert("로그인 해주세요.")
    }
    if (payload) {
      const docRef = dbService.collection(Collection.USER).doc(user.uid).collection(Collection.TODOS).doc(payload.id)
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()
      return console.log(data)
      await editTodo({ body, id: payload.id, title }).then((res) => console.log(res))
    } else {
      if (titleText) {
        return alert(titleText, undefined, { onPress: focusOnTitle })
      }
      const createdAt = await getMoment()
      const id = await getRandomBytes()
      const createdDate = await getMomentDate()

      await createTodo({ title, body, createdAt, createdBy: user, createdDate, id }).then((res) => {
        const { success } = res
        if (success) {
          setTitle("")
          setBody("")
          closeModal()
        }
      })
    }
  }, [titleText, title, body, moment, alert, getMoment, getRandomBytes, user, payload, closeModal, editTodo])

  useEffect(() => {
    if (payload) {
      setTitle(payload.title)
      setBody(payload.body)
    }
  }, [payload])
  return (
    <>
      <ContentSection style={{ rowGap: 20 }}>
        <TimeSelector {...dates} />
        <Input
          props={{
            value: title,
            onChange: onChangeTitle,
            ref: titleRef,
            placeholder: "Title of your todo",
            onKeyDown: onTitleKeyDown,
          }}
        />
        <TextArea
          props={{
            value: body,
            onChange: onChangeBody,
            ref: bodyRef,
            placeholder: "The todo is about...",
            style: { padding: 10, width: "calc(100% - 20px)" },
          }}
          style={{ borderRadius: 5, borderColor: Colors.LIGHTGRAY }}
        />
      </ContentSection>
      <Button colors="PRIMARY" css={{ borderRadius: 0 }} type="submit" onClick={onSubmit}>
        {payload ? "할일 수정" : "할일 추가"}
      </Button>
    </>
  )
}
