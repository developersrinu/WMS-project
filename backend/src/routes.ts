
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
        path: '/todo',
        name: 'Todo',
        component: Todo,
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
