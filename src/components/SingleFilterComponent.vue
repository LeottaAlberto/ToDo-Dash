<script setup lang="ts">
// import { onMounted } from 'vue';

    import { ref } from 'vue'
    const props = defineProps({
        name_filter: String
    });

    const isClicked = ref(false);
</script>

<template>
    <div class="single-filter-container" 
    @click="isClicked = !isClicked">
        <div class="single-filter flex"
        :class="{select:isClicked}"
        >
            <h3>{{ props.name_filter }}</h3>
        </div>
    </div>
</template>

<style scoped>
    .single-filter-container {
        height: fit-content;
    }

    .single-filter {
        width: 10vw;
        height: 5vh;
        border: solid 2px #4d4d4dd8;
        border-radius: 15px;
        gap: 1vw;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
    }

    .single-filter:hover{
        transform: scale(1.02, 1.02);
    }
    .select {
        background-color: green;
    }
</style>