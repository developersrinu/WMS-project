
<template>
    <div>
        <button @click="increment">Increment Count</button>
        <p>Current Count: {{ count }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

const increment = ():void => {
    count.value++;
};
</script>
