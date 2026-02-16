<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col justify-between items-center gap-2 w-1/5 h-full my-10 rounded-2xl bg-zinc-800/50"
  >
    <header class="flex flex-col justify-center items-center w-full p-5">
      <slot name="header" />
    </header>

    <div class="flex flex-col justify-baseline items-center w-full h-3/4">
      <slot name="body" />
    </div>

    <footer class="flex flex-col justify-center items-center w-full">
      <slot name="footer" />
    </footer>
  </div>
</template>
