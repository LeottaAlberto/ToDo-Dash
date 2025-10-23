<script setup lang="ts">
    import { ref } from 'vue'

    const optionStored = ref();

    const title = ref('');
    const category = ref('');
    const priority = ref('');
    const note = ref('');
    
    const formRef = ref<HTMLFormElement | null>(null);

    const emit = defineEmits(['submit']);

    optionStored.value = JSON.parse(localStorage.getItem('priority-option') || '{}');

    const optionsArray = optionStored.value.option 
        ? Object.values(optionStored.value.option) 
        : []; 

    for (const option of optionsArray) {
        console.log('Elemento nel ciclo:', option);
    }

    function closeCreateActivity() {

    }

    function submit() {
        // Verifica validità del form nativo
        if (formRef.value && !formRef.value.checkValidity()) {
            formRef.value.reportValidity();
            return;
        }

        const obj = [];
        obj.push(title.value, category.value, priority.value, note.value);
        emit('submit', obj);
    }
</script>
<template>
    <div class="create-activity-container flex">
        <div class="flex field-container">
            <form class="w-100" ref="" @submit.prevent="submit">
                <h1>Dettaglio attivita'</h1>
                <div class="w-100">
                    <h3>Titolo*</h3>
                    <input type="text" v-model="title" required>
                </div>
                <div class="flex category-center w-100">
                    <h3>Categoria*</h3>
                    <h3>Priorita'*</h3>
                    <input type="text" v-model="category" required>
                    <select class="w-100 btn select" v-model="priority" required>
                        <option v-for="opt in optionsArray" :value="opt" :key="opt">
                            {{ opt }} 
                        </option>
                    </select>
                </div>
                <div class="txt-area-container w-100">
                    <h3>Note'</h3>
                    <textarea v-model="note" id="txt" class="txt-area"></textarea>
                </div>
                <p>* campi obbligatori</p>
                <div class="w-100 px-2" style="display: flex; justify-content: space-between; gap: 10vw; margin-top: 1vw;">
                    <input type="button" value="Annulla" class="btn" @click="closeCreateActivity()">
                    <input type="submit" value="Aggiungi" class="btn" @click="submit()">
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
    .create-activity-container {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 999;
    }

    .create-activity-container input {
        border-radius: 7px;
        border: none;
        height: 2.5vw;
        width: 100%;
        background-color: var(--color-background);
        color: whitesmoke;
        padding-inline: 0.3vw;
        font-size: large;
    }

    
    .field-container {
        width: 40%;
        height: fit-content;
        max-height: 60vh;
        max-width: 100%;

        background-color: #4d4d4dd8;

        padding: 4vw;
        
        flex-direction: column;
        justify-content: left;
        align-items: baseline;
        border-radius: 15px;
        
        gap: 1vh;
    }
    
    .txt-area {
        width: 100%;
        height: 10vh;
        resize: none;
        border-radius: 8px;
        background-color: var(--color-background);
        color: whitesmoke;
    }

    .txt-area-container {
        width: 100%;
    }

    .category-center {
        background-color: transparent !important;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5vw;
    }

    .select{
        border-radius: 8px;
        background-color: var(--color-background);
        color: whitesmoke;
        height: 2.5vw;
        padding-inline: 0.5vw;
    }
</style>