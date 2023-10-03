import type {TaskInterface, TodoListInterface} from '@/types/todoList.interface'
import { defineStore } from 'pinia'

interface TodoListState {
  todos: TodoListInterface[]
}

export const useTodoListStore = defineStore('todoList', {
  state: (): TodoListState => ({
    todos: []
  }),
  actions: {
    addTodoList(todoListName:string) {
        const todoList: TodoListInterface = {
            id: 0,
            name: todoListName,
            tasks: []
        }
      let id: number = 0

      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id > id) {
          id = this.todos[i].id
        }
      }
      todoList.id = id + 1

      this.todos.push(todoList)
    },

    async fetchTodoList() {
      const data = await fetch('../../public/list.json').then((res) => res.json())
      console.log(data)
      this.todos = data.todolists
    },

    changeTaskStatus(id: number, taskId: number) {
      const todoList = this.todos.find((todoList) => todoList.id === id)
      const task = todoList?.tasks.find((task) => task.id === taskId)
      if (task) {
        task.completed = !task.completed
      }
    },

    addTask(name:string,todoListId:number) {
        const task: TaskInterface = {
            id: 0,
            name,
            completed: false
        }
      const todoList = this.todos.find((todoList) => todoList.id === todoListId)
      if (todoList) {
        let id: number = 0
        for (let i = 0; i < todoList.tasks.length; i++) {
            if (todoList.tasks[i].id > id) {
                id = todoList.tasks[i].id
            }
        }
        task.id = id + 1
        todoList.tasks.push(task)
      }
    },

    removeTask(todoListId: number, taskId: number) {
        const todoList = this.todos.find((todoList) => todoList.id === todoListId)
        const taskIndex:number|undefined = todoList?.tasks.findIndex((task) => task.id === taskId)
        console.log(taskIndex)
        if (taskIndex !== -1) {
            todoList?.tasks.splice(taskIndex as number, 1)
        }
    },
      removeTodoList(todoListId: number) {
        const todoListIndex:number|undefined = this.todos.findIndex((todoList) => todoList.id === todoListId)
        console.log(todoListIndex)
        if (todoListIndex !== -1) {
            this.todos.splice(todoListIndex as number, 1)
        }
      }

    }
})
