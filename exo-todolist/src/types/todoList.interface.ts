export interface TodoListInterface {
  id: number
  name: string
  tasks: TaskInterface[]
}

export interface TaskInterface {
  id: number
  name: string
  completed: boolean | false
}
