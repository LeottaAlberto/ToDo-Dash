<script setup lang="ts">
import ToastComponent from './components/b-popup/src/ToastComponent.vue';
import { useActivity } from '@/composable/useActivity';

import { onMounted, onUnmounted } from 'vue';

const { allActivities } = useActivity();

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  saveData();
  event.preventDefault();
};

const handleBlur = () => {
  saveData();
  console.log("L'utente ha lasciato la pagina o cambiato tab");
};

// 3. Ritorno del Focus
const handleFocus = () => {
  saveData();
  console.log("L'utente è tornato sulla pagina");
};

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
  window.addEventListener('blur', handleBlur);
  window.addEventListener('focus', handleFocus);
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
  window.removeEventListener('blur', handleBlur);
  window.removeEventListener('focus', handleFocus);
});

function saveData() {
  localStorage.setItem('user-activity', JSON.stringify(allActivities.value));
}

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
