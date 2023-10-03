<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { useTodoListStore } from '@/stores/todoList.store'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const todoListStore = useTodoListStore()

const changeTaskStatus = (id: number, taskId: number) => {
  todoListStore.changeTaskStatus(id, taskId)
}
const name = ref('')
const addTask = () => {
  todoListStore.addTask(name.value, route.params.id as number)
  name.value = ''
}
const removeTask = (taskId: number) => {
  todoListStore.removeTask(route.params.id as number, taskId)
}
</script>

<template>
  <div class="place-content-center flex flex-col items-center">
    <div v-for="todo in todoListStore.todos" :key="todo.id">
      <div v-if="(route.params.id as number) === (todo.id as number)" class="text-center">
        <p class="font-bold text-2xl mb-4">{{ todo.name }}</p>
        <div class="mb-3">
          <input type="text" placeholder="Add a task" class="mr-3" v-model="name" />
          <button @click="addTask()">＋</button>
        </div>
        <div v-if="todo.tasks.length > 0">
          <div v-for="task in todo.tasks" :key="task.id" class="flex">
            <p>
              {{ task.name }} -
              <span @click="changeTaskStatus(todo.id, task.id)" class="cursor-pointer">
                {{ task.completed ? '👍 - ' : '👎 - ' }}
              </span>
            </p>
            <button @click="removeTask(task.id)">🗑</button>
          </div>
        </div>
        <div v-else>
          <p>No tasks yet</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
