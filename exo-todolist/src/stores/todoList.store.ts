import type { TodoListInterface } from '@/types/todoList.interface'
import { defineStore } from 'pinia'

interface TodoListState {
  todos: TodoListInterface[]
}

export const useTodoListStore = defineStore('todoList', {
  state: (): TodoListState => ({
    todos: []
  }),
  actions: {
    addTodoList(todoList: TodoListInterface) {
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
    }
  }
})
