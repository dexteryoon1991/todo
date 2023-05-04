import { TimeSelector, TodoItem } from "@/components"
import { useAuth, useDates } from "@/context"
import { dbService } from "@/lib/firebase"
import { momentFormat, View } from "@/modules"
import { Collection, Todo, User } from "@/types"
import { getDocs } from "firebase/firestore"
import moment from "moment"
import React, { useEffect, useState } from "react"

export default function Otherstodos() {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    const unsubscribeUsers = dbService.collection(Collection.USER).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data() })) as User[]
      setUsers(data)
    })

    return () => unsubscribeUsers()
  }, [])

  const dates = useDates()

  const [todos, setTodos] = useState<Todo[]>([])

  const { user } = useAuth()
  useEffect(() => {
    let copiedUsers = users.filter((item) => item.email !== user?.email)
    console.log(copiedUsers)

    copiedUsers.map(async (user) => {
      const userRef = dbService.collection(Collection.USER).doc(user.uid).collection(Collection.TODOS).where("scheduledDate", "==", dates.YYMMDD)
      const userSnap = await getDocs(userRef)
      const data = userSnap.docs.map((doc) => ({ ...doc.data() })) as Todo[]
      setTodos((prev) => {
        let copy = [...prev]
        const check = copy.find((item) => item.id === data[0].id)
        !check && copy.push(data[0])
        return copy
      })
    })
  }, [users, dates.YYMMDD, user])

  const emptyItem: Todo = {
    body: "아래의 버튼을 눌러 할일을 추가해 주세요.",
    createdAt: moment().format(momentFormat),
    createdBy: { uid: "123123", email: "random", name: "Your Name" },
    createdDate: "",
    id: "123123",
    title: "할일이 없습니다.",
    scheduledDate: "20230503",
  }

  return (
    <View type="page" css={{ rowGap: 20 }}>
      <TimeSelector {...dates} style={{ marginTop: 20 }} />
      {todos && todos.length > 0 ? todos.map((todo) => <TodoItem key={todo.id} {...todo} isOthers />) : <TodoItem {...emptyItem} />}
    </View>
  )
}
