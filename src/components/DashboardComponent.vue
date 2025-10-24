<script setup lang="ts">
    import { ref } from 'vue'
</script>

<template>
    <div class="dashboard-container p-2">
        <div>
            <h1>Dashboard</h1>
            <div>
                <!-- <div v-for="value in source">

                </div> -->
            </div>
        </div>
        <div>
            <img src="/src/assets/sart_bimpson.PNG" alt="Sart Bimpson">
        </div>
    </div>
</template>

<style scoped>
    .dashboard-container {
        max-width: 35%;
        height: 70vh;
        border: solid 2px #4d4d4dd8;
        border-radius: 15px;
        gap: 1vw;
        flex-direction: column;
        justify-content: flex-start;
    }

</style>
