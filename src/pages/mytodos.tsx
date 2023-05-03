import { TimeSelector, TodoItem } from "@/components"
import { useAuth, useDates, useTodo } from "@/context"
import { momentFormat, View } from "@/modules"
import React, { useEffect, useState } from "react"
import moment from "moment"
import { Todo } from "@/types"

export default function Mytodos() {
  const dates = useDates()
  const [todos, setTodos] = useState<Todo[]>([])
  useEffect(() => {
    console.log(todos)
  }, [todos])

  const { fetchTodo } = useTodo()
  const { user } = useAuth()
  useEffect(() => {
    if (user == null) {
      return
    } else
      fetchTodo().then((res) => {
        console.log(res)
        setTodos(res?.payload ? res.payload : [])
      })
  }, [user])

  const emptyItem: Todo = {
    body: "아래의 버튼을 눌러 할일을 추가해 주세요.",
    createdAt: moment().format(momentFormat),
    createdBy: { uid: "123123", email: "random", name: "Your Name" },
    createdDate: "",
    id: "123123",
    title: "123123",
  }

  return (
    <View type="page" css={{ rowGap: 20 }}>
      <TimeSelector {...dates} style={{ marginTop: 20 }} />
      {todos && todos.length > 0 ? todos.map((todo) => <TodoItem key={todo.id} {...todo} />) : <TodoItem {...emptyItem} />}
    </View>
  )
}
