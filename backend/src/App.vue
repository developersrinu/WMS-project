



<!-- src/App.vue -->
<template>
  <div class="mainComp">
    <router-view /> 
  </div>
</template>

<script setup lang="ts">
import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue'; 
import Todo from './views/Todo.vue';
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/todos',
    name: 'Todo',
    component: Todo,
  },

];

// Create the router instance with history mode
const router = createRouter({
  history: createWebHistory(),
  routes,
});

</script>

<style scoped>
nav {
  margin-bottom: 1em;
}
</style>
