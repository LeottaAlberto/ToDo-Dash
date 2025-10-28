<script setup lang="ts">
    import { ref } from 'vue'
    import SingleFilterComponent from './SingleFilterComponent.vue';

    const filters = ref<string[]>([]);
</script>

<template>
    <div class="filters-group-container flex">
        <h2 class="w-100">Filters</h2>
        <div class="flex filters-group p-2">
            <!-- <line x1="40" y1="162" x2="260" y2="162" stroke="#eee" stroke-width="1"></line> -->
            <SingleFilterComponent 
                :name_filter="'Tutti'"
            />
            <SingleFilterComponent 
                :name_filter="'Attive'"
            />
            <SingleFilterComponent 
                :name_filter="'Completate'"
            />
            <div v-if="filters.length>0">
                <div v-for="item in filters" :key="item">
                    <SingleFilterComponent 
                        :name_filter="item"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .filters-group-container {
        max-width: 15%;
        width: 35%;
        height: 70vh;
        margin: 0;
        padding: 0;
        flex-direction: column;
    }
    .filters-group {
        width: 100%;
        height: 70vh;
        background-color: transparent;
        border: 2px solid #4d4d4dd8;
        border-radius: 15px;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        gap: 0.3vw;
    }
</style>