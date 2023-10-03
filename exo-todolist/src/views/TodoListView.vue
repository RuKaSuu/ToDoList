<script setup lang="ts">
import { useTodoListStore } from '@/stores/todoList.store'
import router from '@/router'

const todoListStore = useTodoListStore()
todoListStore.fetchTodoList()

const goToTodo = (id: number) => {
  router.push({ name: 'list', params: { id: id } })
  // router.push(`list/${id}`)
}
</script>

<template>
  <div class="place-content-center flex flex-col items-center">
    <div
      v-for="todo in todoListStore.todos"
      :key="todo.id"
      @click="goToTodo(todo.id)"
      class="cursor-pointer hover:bg-[#1da1f2]/90"
    >
      {{ todo.name }}
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
