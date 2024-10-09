
<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Rendering Todos</h1>

        <form @submit.prevent="addTask" class="d-flex justify-content-center mb-4">
            <input type="text" v-model="task" class="form-control me-2 w-50" placeholder="Enter a task" />
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

        <ul class="list-group col-6 ">
            <li v-for="(item, index) in tasks" :key="index"
                class="list-group-item d-flex justify-content-between align-items-center py-2 px-2 mb-3 border border-black">
                <!-- <span class="bold">{{ item.title }}</span> -->
                <span class="text" >{{ item.title }}</span>
                <div><span class=" btn btn-primary  p-2" @click="updateTodo(item)">update</span> <span
                        class="btn btn-danger p-2" @click="deleteTodo(item.id)">Delete</span>
                </div>
            </li>
        </ul>

    </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Task to be added
const task = ref<string>('');

// Tasks list
interface Todo {
    title: string;
}
const tasks = ref<Todo[]>([]);



const addTask = async (): Promise<void> => {
    try {
        if (task.value.trim() !== '') {
            const response = await axios.post(
                'http://localhost:3000/todos/create',
                { title: task.value },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,// Bearer token
                        'Content-Type': 'application/json',
                    },
                }
            
            );

            if (response) {
                // Successfully added the task
                alert('Task created successfully');
                window.location.reload(true);

                task.value = ''; // Clear input after task is added
            } else {
                alert('Task not created successfully');
            }
        }
    } catch (error) {
        console.error('Error creating task:', error);
    }
};



const fetchTodos = async (): Promise<void> => {
    try {
        const response = await axios.get<{ todos: Todo[] }>('http://localhost:3000/todos', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,// Bearer token
                'Content-Type': 'application/json',
            },
        });
        tasks.value = response.data.todos; // Assign fetched todos to reactive tasks
    } catch (error) {
        console.log('Error fetching todos:', error);
    }
};


const updateTodo = async (item) => { 
    try {
        const task = prompt()
        const response = await axios.put(`http://localhost:3000/todos/${item.id}`, { title: task }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,// Bearer token
                'Content-Type': 'application/json',
            },
        })
        console.log(response)
        if (response) { 
            alert('task is update successfully')
            window.location.reload(true);
        }

     } catch (error)
    { 
        console.log(error)
    }
}



const deleteTodo = async (id) => {
    try {
        console.log(id)
        const response = await axios.delete(`http://localhost:3000/todos/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,// Bearer token
                'Content-Type': 'application/json',
            },
        })
        console.log(response)
        if (response.data) {
            alert('task is deleted successfully')
            window.location.reload(true);
        }

    } catch (error) {
        console.log(error)
    }
}



onMounted(fetchTodos);
</script>

<style scoped>
form {
    margin-bottom: 20px;
}

input {
    padding: 5px;
    margin-right: 10px;
}

button {
    padding: 5px 10px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 5px 0;
}
</style>


