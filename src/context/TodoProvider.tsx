import { dbService } from "@/lib/firebase"
import { API, Collection, Todo, TodoProps, EditTodoProps, FetchTodoApi } from "@/types"
import React, { createContext, PropsWithChildren, use, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthProvider"
import { getDoc, getDocs } from "firebase/firestore"
import { usePopup } from "./PopupProvider"
import useUtils from "./useUtils"
import useDates from "./useDates"

const initialState: TodoProps = {
  fetchTodo: async () => ({ success: false }),
  createTodo: async () => ({ success: false }),
  editTodo: async () => ({ success: false }),
  deleteTodo: async () => ({ success: false }),
  doneTodo: async () => ({ success: false }),
  meToo: async () => ({ success: false }),
  todos: [],
}
const data = createContext(initialState)
export function TodoProvider({ children }: PropsWithChildren) {
  const { user } = useAuth()
  const { alert } = usePopup()

  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const listner = dbService
      .collection(Collection.USER)
      .doc(user?.uid)
      .collection(Collection.TODOS)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => ({ ...doc.data() })) as Todo[]
        setTodos(data)
      })
    return () => listner()
  }, [user])

  const fetchTodo = useCallback(
    async (createdDate?: string): Promise<FetchTodoApi> => {
      if (user == null) {
        alert("로그인 해주세요.")
        return { success: false }
      }

      let todos: Todo[] = []

      // const docSnap = await getDocs(dbService.collection(Collection.USER).where("createdBy", "==", user))

      const docRef = dbService.collection(Collection.USER).doc(user.uid).collection(Collection.TODOS)
      const docSnap = await getDocs(createdDate ? docRef.where("createdDate", "==", createdDate) : docRef)
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

      try {
        await docRef.update({ body, title })
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
        console.log("deleting todo")
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

  const doneTodo = useCallback(
    async (id: string): Promise<API> => {
      if (user == null) {
        alert("로그인 해주세요.")
        return { success: false }
      }
      const docRef = dbService.collection(Collection.USER).doc(user.uid).collection(Collection.TODOS).doc(id)
      const docSnap = await getDoc(docRef)
      const doc = docSnap.data() as Todo
      let isDone = true

      console.log(doc)
      if (doc.isDone) {
        isDone = false
      }

      try {
        await docRef.update({ isDone })
        alert(doc.isDone ? "다시 화이팅!" : "할일을 끝냈습니다!", undefined, undefined, doc.isDone ? "alert" : "success")
        return { success: true }
      } catch (error: any) {
        alert(error.message)
        return { success: false }
      }
    },
    [user, alert]
  )

  const { getRandomBytes, getMoment, getMomentDate } = useUtils()
  const { YYMMDD } = useDates()
  const meToo = useCallback(
    async (todo: Todo): Promise<API> => {
      if (user == null) {
        alert("로그인 해주세요.")
        return { success: false }
      }
      const ref = dbService.collection(Collection.USER).doc(user.uid).collection(Collection.TODOS)
      const refSnap = await getDocs(ref.where("orifinalId", "==", todo.id))
      const refItems = refSnap.docs.map((doc) => ({ ...doc.data() })) as Todo[]
      if (refItems.length > 0) {
        alert("이미 추가했습니다.")
        return { success: false }
      }

      const id = await getRandomBytes()
      const docRef = ref.doc(id)
      const createdAt = await getMoment()
      const createdDate = await getMomentDate()

      try {
        await docRef.set({ title: todo.title, body: todo.body, id, createdAt, createdDate, createdBy: user, originalId: todo.id, scheduledDate: YYMMDD })
        alert("추가되었습니다.")
        return { success: true }
      } catch (error: any) {
        alert(error.message)
        return { success: false }
      }
    },
    [user, alert]
  )
  return <data.Provider value={{ fetchTodo, createTodo, deleteTodo, editTodo, doneTodo, todos, meToo }}>{children}</data.Provider>
}

export function useTodo() {
  return useContext(data)
}
