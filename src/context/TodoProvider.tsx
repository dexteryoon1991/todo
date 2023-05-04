import { dbService } from "@/lib/firebase"
import { API, Collection, Todo, TodoProps, EditTodoProps, FetchTodoApi } from "@/types"
import axios from "axios"
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect } from "react"
import { useAuth } from "./AuthProvider"
import { getDoc, getDocs } from "firebase/firestore"
import { usePopup } from "./PopupProvider"

const initialState: TodoProps = {
  fetchTodo: async () => ({ success: false }),
  createTodo: async () => ({ success: false }),
  editTodo: async () => ({ success: false }),
  deleteTodo: async () => ({ success: false }),
}
const data = createContext(initialState)
export function TodoProvider({ children }: PropsWithChildren) {
  const { user } = useAuth()
  const { alert } = usePopup()

  useEffect(() => {
    const fetch = dbService
      .collection(Collection.USER)
      .doc(user?.uid)
      .collection(Collection.TODOS)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => ({ ...doc.data() }))
        console.log(data)
      })

    return () => fetch()
  }, [])

  const fetchTodo = useCallback(
    async (createdDate: string): Promise<FetchTodoApi> => {
      if (user == null) {
        alert("로그인 해주세요.")
        return { success: false }
      }

      let todos: Todo[] = []

      // const docSnap = await getDocs(dbService.collection(Collection.USER).where("createdBy", "==", user))

      const docSnap = await getDocs(dbService.collection(Collection.USER).doc(user.uid).collection(Collection.TODOS))
      const result = docSnap.docs.map((doc) => ({ ...doc.data() })) as Todo[]

      if (result.length > 0) {
        todos = result
      }

      alert("할일을 가져왔습니다.", undefined, undefined, "success")
      return { success: true, payload: todos }
    },
    [user]
  )

  const createTodo = useCallback(
    async (props: Todo): Promise<API> => {
      if (user == null) {
        alert("로그인 해주세요.")
        return { success: false }
      }

      const docRef = dbService.collection(Collection.USER).doc(user.uid).collection(Collection.TODOS)

      try {
        await docRef.doc(props.id).set(props)
        alert("추가 되었습니다.", undefined, undefined, "success")
        return { success: true }
      } catch (error: any) {
        alert(error.message)
        return { success: false }
      }
    },
    [alert, user]
  )

  const editTodo = useCallback(
    async (props: EditTodoProps): Promise<API> => {
      if (user == null) {
        alert("로그인 해주세요.")
        return { success: false }
      }
      const { id, body, title } = props
      const docRef = dbService.collection(Collection.USER).doc(user.uid).collection(Collection.TODOS).doc(id)
      const docSnap = await getDoc(docRef)

      console.log(docSnap.data())

      try {
        await docRef.update({ body })
        alert("업데이트 되었습니다.", undefined, undefined, "success")
        return { success: true }
      } catch (error: any) {
        return { success: false }
      }
    },
    [user, alert]
  )

  const deleteTodo = useCallback(
    async (id: string): Promise<API> => {
      if (user == null) {
        alert("로그인 해주세요.")
        return { success: false }
      }

      const docRef = dbService.collection(Collection.USER).doc(user.uid).collection(Collection.TODOS).doc(id)

      try {
        await docRef.delete()
        alert("삭제 되었습니다.", undefined, undefined, "success")
        return { success: true }
      } catch (error: any) {
        alert(error.message)
        return { success: false }
      }
    },
    [alert, user]
  )
  return <data.Provider value={{ fetchTodo, createTodo, deleteTodo, editTodo }}>{children}</data.Provider>
}

export function useTodo() {
  return useContext(data)
}
