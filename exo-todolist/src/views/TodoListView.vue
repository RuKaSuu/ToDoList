<script setup lang="ts">
import { useTodoListStore } from '@/stores/todoList.store'
import router from '@/router'
import {ref} from "vue";

const todoListStore = useTodoListStore()

const goToTodo = (id: number) => {
  router.push({ name: 'list', params: { id: id } })
  // router.push(`list/${id}`)
}
const todoListName = ref('')
const addTodo = () => {
  todoListStore.addTodoList(todoListName.value)
}

const removeTodoList = (id:number) => {
  todoListStore.removeTodoList(id)
}
</script>

<template>
  <div class="place-content-center flex flex-col items-center">
    <div>
      <input type="text" placeholder="Add a todo" class="mr-3" v-model="todoListName" />
      <button @click="addTodo()">＋</button>
    </div>
    <div v-for="todo in todoListStore.todos" :key="todo.id">
     <p class="m-2">
       <span @click="goToTodo(todo.id)" class="cursor-pointer hover:bg-[#1da1f2]/90 p-2">{{ todo.name }}</span>
       <button @click="removeTodoList(todo.id)">🗑</button>
     </p>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
