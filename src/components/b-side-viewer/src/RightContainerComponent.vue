<script lang="ts" setup>
import { useActivity } from '@/composable/useActivity';
import { Position } from '@/enums';
import { ButtonRadius } from '@/enums/ButtonEnum';

const { allActivities } = useActivity();

const props = defineEmits(['isVisible']);
</script>

<template>
  <div class="w-fit min-w-1/5 h-full p-4">
    <SideContainerComponent title="Overview">
      <template v-slot:header>
        <ButtonComponent
          :direction="Position.RIGHT"
          :icon="'pi-plus'"
          :label="'New Activity'"
          :radius="ButtonRadius.SMALL"
          @click="props('isVisible', true)"
        />
      </template>
      <template v-slot:body>
        <DashboardComponent :activities="allActivities" />
      </template>
    </SideContainerComponent>
  </div>
</template>
