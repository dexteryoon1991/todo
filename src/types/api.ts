import { Todo } from "./components"

export interface API {
  success: boolean
  message?: string
}

export interface FetchTodoApi extends API {
  payload?: Todo[]
}
