
<template>
    <form class="form" @submit.prevent="handleSubmit">
        <p class="title">{{ login ? 'Register' : 'Login' }}</p>

        <label v-if="login">
            <input required placeholder="" type="text" v-model="userName" class="input" />
            <span>Username</span>
        </label>
        <label>
            <input required placeholder="" type="email" v-model="email" class="input" />
            <span>Email</span>
        </label>
        <label>
            <input required placeholder="" type="password" v-model="password" class="input" />
            <span>Password</span>
        </label>
        <button type="submit" class="submit">{{ login ? 'Register' : 'Login' }}</button>
        <p class="signin">{{ login ? 'Already have an account' : "If you have an account"  }} <a href="#" @click.prevent="toggleLogin"> {{ login ? "Signup in here" : "Signup in here" }}</a></p>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import '../styles.css'

const login = ref(false)
const userName = ref('')
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
    const requestData = {
        userName: userName.value,
        email: email.value,
        password: password.value,
    }

    try {
        let response;
        if (login.value) {

            response = await axios.post('http://localhost:3000/auth/register', requestData);
            toggleLogin();
            alert('User registered successfully');

        } else {
            
            response = await axios.post('http://localhost:3000/auth/login', {
                email: email.value,
                password: password.value,
            });
            
            localStorage.setItem('token', response.data.token); 
            window.location.href = '/todo';
            
        
        }
        console.log(response.data); 
    } catch (error) {
        console.error('Error:', error);
        alert(error.response?.data?.message || 'An error occurred');
    }
}

const toggleLogin = () => {
    login.value = !login.value;
}
</script>




