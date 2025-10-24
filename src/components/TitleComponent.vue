<template>
  <div class="title-component-container flex">
    <div class="flex">
      <h1>My ToDo-Dashhhh</h1>
      <input type="button" value="Add Activity" @click="addActivityClicked()" class="btn"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['clicked']);

  function addActivityClicked() {
    // alert('aggingi activity');
    emit('clicked');
  }
</script>

<style scoped>
  .title-component-container{
    width: 80%;
    height: 20%;
    z-index: 1;
  }
  
  .title-component-container div {
    width: 100%;
    height: max-content;
    padding: 0.5vw;
    padding-inline: 2vw;
    flex-direction: row;
    background-color: #4D4D4D;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
  }

  .btn {
    width: 12%;
    height: 4vh;
    background-color: #6D6D6D;
    font-size: large;
    border-radius: 5px;
  }
</style>
