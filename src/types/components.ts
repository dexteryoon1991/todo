import { User } from "./contextProviders"

export type AppColors = "PRIMARY" | "WHITE" | "BLACK" | "GRAY" | "LIGHTGRAY"

export interface Todo {
  body: string
  title: string
  createdBy: User
  createdAt: string
  createdDate: string
  id: string
}
