<script setup lang="ts">
    // import { ref } from 'vue'
</script>

<template>
    <div class="flex" style="flex-direction: column; width: fit-content; max-width: 35%; justify-content: right; align-items: end;">
        <h1 style="position: relative; right: 0;">Dashboard</h1>
        <div class="dashboard-container p-2">
            <div class="flex">
                <div class="row">
                    <h3>Attività Completate</h3>
                    <h4>0</h4>
                </div>
                <div class="row">
                    <h3>Attività Da Completate</h3>
                    <h4>0</h4>
                </div>
            </div>
            <div>
                <!---<img src="/src/assets/sart_bimpson.PNG" alt="Sart Bimpson"> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
    .dashboard-container {
        width: 100%;
        height: 65vh;
        border: solid 2px #4d4d4dd8;
        border-radius: 15px;
        gap: 1vw;
        flex-direction: column;
        justify-content: flex-start;
    }

    .dashboard-container div {
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.3vw;
    }

    .row {
        width: 100%;
        background-color: transparent;
        border: 2px solid #4d4d4dd8;
        border-radius: 15px;
        padding: 0.3vw;
    }

    h3 {
        text-align: center;
    }

    h4 {
        text-align: center;
    }

</style>
