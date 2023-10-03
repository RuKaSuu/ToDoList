<script setup lang="ts">
import { useTodoListStore } from '@/stores/todoList.store'
import { useRoute } from 'vue-router'

const route = useRoute()
const todoListStore = useTodoListStore()

const changeTaskStatus = (id: number, taskId: number) => {
  todoListStore.changeTaskStatus(id, taskId)
}
</script>

<template>
  <div class="place-content-center flex flex-col items-center">
    <div v-for="todo in todoListStore.todos" :key="todo.id">
      <div v-if="(route.params.id as number) === (todo.id as number)">
        {{ todo.name }}
        <div v-for="task in todo.tasks" :key="task.id">
          {{ task.name }} -
          <span @click="changeTaskStatus(todo.id, task.id)" class="cursor-pointer">
            {{ task.completed ? '👍' : '👎' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
