<script setup lang="ts">
    // import { ref } from 'vue'
    interface Activity {
    priority: string
    title: string
    duration: number
    type: string
    }
    const props = defineProps<{ activity: Activity[] | null }>();
    console.log(props);

</script>
<template>
  <div v-if="props.activity != null" class="w-100">
    <div v-for="(a, index) in props.activity" :key="index">
      <div class="flex">
        <h3>{{ a.title }}</h3>
        <div class="flex">
          <h1>Priority: {{ a.priority }}</h1>
          <h2>Duration: {{ a.duration }}</h2>
          <h2>Type: {{ a.type }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
