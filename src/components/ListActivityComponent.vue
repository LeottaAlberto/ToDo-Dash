<script setup lang="ts">
    import { ref } from 'vue'
    import ActivityComponent from './ActivityComponent.vue';

    const numOfItems = ref<any[]>([]);
    const storedData = localStorage.getItem("activity");
    numOfItems.value = storedData ? JSON.parse(storedData) : [];
    console.log(numOfItems);
</script>
<template>
    <div>
        <div>
            <h1>ToDo List</h1>
            <div v-if="numOfItems.length > 0">
                <div v-for="(item, index) in numOfItems" :key="index">
                    <activity-component 
                    :priority="item.priority"
                    :title="item.title"
                    :duration="item.duration"
                    :type="item.type"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>