<template>
  <div class="title-component-container flex box-shadow">
    <div class="flex">
      <h1 class="text-bolder font-size-big">My ToDo-Dash</h1>
      <ButtonComponent @click="emit('clicked')"> Add Activity </ButtonComponent>
      <!-- <input type="button" value="Add Activity" @click="addActivityClicked()" class="btn" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';

const emit = defineEmits(['clicked']);
</script>

<style scoped>
.title-component-container {
  width: 80%;
  height: 20%;
  z-index: 1;
}

.title-component-container > div {
  width: 100%;
  height: max-content;
  padding: 0.5vw;
  padding-inline: 2vw;
  flex-direction: row;
  background-color: transparent;
  border: 2px solid #4d4d4d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
}

.btn {
  width: 12%;
  height: 4vh;
  border-radius: 5px;
  color: var(--text-color);
}
</style>
