<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue';

const props = defineProps({
  statName: String,
  iconName: String,
  statNum: Number,
});

const iconComponent = computed(() => {
  console.log(props);

  if (!props.iconName) return null;
  return defineAsyncComponent(() => import(`@/assets/SVGs/statistics/${props.iconName}.svg`));
});
</script>

<template>
  <div class="stat-card">
    <div class="icon-wrapper">
      <component v-if="iconComponent" :is="iconComponent" class="stat-icon" />
      <div v-else class="stat-icon">
        <slot></slot>
      </div>
    </div>

    <div class="info-wrapper">
      <h4>{{ statName }}</h4>
    </div>

    <h1 class="stat-number">{{ statNum }}</h1>
  </div>
</template>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--card-bg);
  border-radius: 12px;
  gap: 1rem;
}

.stat-icon {
  width: 100%;
  height: 100%;
  min-width: 4rem;
  fill: currentColor;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3rem;
  height: 3rem;
  min-width: 3rem;
}

.info-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.stat-number {
  font-weight: 800;
  margin: 0;
  min-width: 3rem;
  text-align: right;

  color: inherit;
}

.stat-icon,
.icon-wrapper :deep(svg) {
  width: 100%;
  height: 100%;
  max-width: 4rem;
  max-height: 4rem;
  /* fill: currentColor; */
  display: block;
}
</style>
