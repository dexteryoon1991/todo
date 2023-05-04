import { TimeSelector, TodoItem } from "@/components"
import { useAuth, useDates, useTodo } from "@/context"
import { momentFormat, View } from "@/modules"
import React, { useEffect, useState } from "react"
import moment from "moment"
import { Collection, Todo } from "@/types"
import { dbService } from "@/lib/firebase"

export default function Mytodos() {
  const dates = useDates()
  const { todos: data } = useTodo()
  const [todos, setTodos] = useState<Todo[]>(data)

  useEffect(() => {
    const newTodos = data.filter((item) => item.scheduledDate === dates.YYMMDD)
    console.log(newTodos)
    setTodos(newTodos)
  }, [dates.YYMMDD, data])

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
      {todos && todos.length > 0 ? todos.map((todo) => <TodoItem key={todo.id} {...todo} />) : <TodoItem {...emptyItem} />}
    </View>
  )
}
