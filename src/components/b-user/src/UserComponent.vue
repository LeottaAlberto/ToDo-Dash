<script lang="ts" setup>
import { useUser } from '@/composable/useUser';
import { computed } from 'vue';

const { activeUser } = useUser();
const imgUrl = computed(() => {
  return activeUser.value?.srcImg
    ? activeUser.value?.srcImg
    : 'https://primefaces.org/cdn/primevue/images/organization/walter.jpg';
});

const userButtonState = computed(() => {
  return 'hover:outline-1 hover:outline-white active:scale-95';
});
</script>

<template>
  <div class="flex flex-col w-full h-fit py-7">
    <div class="flex flex-row justify-start items-center gap-10 w-full px-10">
      <div
        class="flex flex-row justify-start items-center gap-5 w-fit h-fit"
        @click="$router.push({ name: 'accountProfile' })"
      >
        <OverlayBadge value="10" severity="warn" class="inline-flex">
          <Avatar :image="imgUrl" shape="circle" class="w-15! h-15!" :class="userButtonState" />
        </OverlayBadge>

        <p class="text-center text-2xl font-semibold">
          {{ activeUser?.username }}
        </p>
      </div>
    </div>
  </div>
</template>
