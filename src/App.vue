<script setup lang="ts">
import ToastComponent from './components/b-popup/src/ToastComponent.vue';

// import { RouterLink } from 'vue-router'
</script>

<template>
  <!--
    <RouterLink to="/">Home</RouterLink>
  -->

  <main>
    <RouterView></RouterView>
      <ToastComponent/>
  </main>
</template>

<style scoped>
  main {
    max-width: 100vw;
    max-height: 100vh;
    overflow-x: hidden;
  }
</style>
