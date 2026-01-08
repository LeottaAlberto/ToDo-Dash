<script setup lang="ts">
import type ActivityInterface from '@/core/interface/ActivityInterface'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  activities: ActivityInterface[]
}>()

const num_stats = ref({
  active: 0,
  uncompleated: 0,
  completed: 0,
})

watch(
  () => props.activities,
  () => {
    changeNumberStat()
  },
)

onMounted(() => {
  changeNumberStat()
})

function changeNumberStat() {
  if (!props.activities) return

  resetStat()

  props.activities.forEach((activity) => {
    activity.filters.forEach((stat) => {
      if (stat.filter_name == 'active') num_stats.value.active++
      else if (stat.filter_name == 'uncompleted') num_stats.value.uncompleated++
      else if (stat.filter_name == 'completed') num_stats.value.completed++
    })
  })
}

function resetStat() {
  num_stats.value.active = 0
  num_stats.value.completed = 0
  num_stats.value.uncompleated = 0
}
</script>

<template>
  <div class="flex f-row w-100">
    <div class="flex">
      <!-- Number Activity -->
      <div class="flex f-col min-h-100 just-content-start" title="Number Activity ">
        <div class="flex align-items-baseline pt-1 w-100 dash-item">
          <svg
            fill="#ebebeba3"
            width="48px"
            height="48px"
            viewBox="-3.5 0 19 19"
            xmlns="http://www.w3.org/2000/svg"
            class="cf-icon-svg"
            data-darkreader-inline-fill=""
            style="--darkreader-inline-fill: var(--darkreader-background-000000, #000000)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <path
                d="M10.05 3.828a1.112 1.112 0 0 1 1.11 1.108v10.562a1.112 1.112 0 0 1-1.11 1.108h-8.1a1.112 1.112 0 0 1-1.11-1.108V4.936a1.112 1.112 0 0 1 1.11-1.108h.415v1.108h-.414l-.002.002v10.558l.002.002h8.098l.002-.002V4.938l-.002-.002h-.414V3.828h.416zm-.98 4.076H2.82v1.108h6.25zm0 2.337H2.82v1.108h6.25zm0 2.337H2.82v1.108h6.25zm-.543-8.935v1.25a.476.476 0 0 1-.475.476H3.948a.476.476 0 0 1-.475-.475v-1.25a.476.476 0 0 1 .475-.476h.697V1.87a.476.476 0 0 1 .475-.475h1.76a.476.476 0 0 1 .475.475v1.3h.697a.476.476 0 0 1 .475.474zM6.55 2.67a.554.554 0 1 0-.554.554.554.554 0 0 0 .554-.554z"
              />
            </g>
          </svg>
        </div>
        <h1 class="text-bolder">{{ num_stats.active }}</h1>
      </div>

      <!-- Number Activity Completed -->
      <div class="flex f-col min-h-100 just-content-start" title="Number Activity Completed">
        <div class="flex align-items-baseline pt-1 w-100 dash-item">
          <svg
            width="48px"
            height="48px"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <rect
                width="48"
                height="48"
                fill="none"
                fill-opacity="0.01"
                data-darkreader-inline-fill=""
                style="--darkreader-inline-fill: var(--darkreader-background-ffffff, #181a1b)"
              />
              <path
                d="M14 24L15.25 25.25M44 14L24 34L22.75 32.75"
                stroke="#ebebeba3"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                data-darkreader-inline-stroke=""
                style="--darkreader-inline-stroke: var(--darkreader-text-000000, #e8e6e3)"
              />
              <path
                d="M4 24L14 34L34 14"
                stroke="#ebebeba3"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                data-darkreader-inline-stroke=""
                style="--darkreader-inline-stroke: var(--darkreader-text-000000, #e8e6e3)"
              />
            </g>
          </svg>
        </div>
        <h1 class="text-bolder">{{ num_stats.completed }}</h1>
      </div>

      <!-- Number Activity Not Completed -->
      <div class="flex f-col min-h-100 just-content-start" title="Number Activity Uncompleted">
        <div class="flex align-items-baseline pt-1 w-100 dash-item">
          <svg
            fill="#ebebeba3"
            width="40px"
            height="40px"
            viewBox="0 0 64 64"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xml:space="preserve"
            xmlns:serif="http://www.serif.com/"
            style="
              fill-rule: evenodd;
              clip-rule: evenodd;
              stroke-linejoin: round;
              stroke-miterlimit: 2;
              --darkreader-inline-fill: var(--darkreader-background-000000, #ebebeba3);
            "
            data-darkreader-inline-fill=""
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <rect
                id="Icons"
                x="-704"
                y="-64"
                width="1280"
                height="800"
                style="fill: none; --darkreader-inline-fill: none"
                data-darkreader-inline-fill=""
              />
              <g id="Icons1" serif:id="Icons">
                <g id="Strike"></g>
                <g id="H1"></g>
                <g id="H2"></g>
                <g id="div"></g>
                <g id="list-ul"></g>
                <g id="hamburger-1"></g>
                <g id="hamburger-2"></g>
                <g id="list-ol"></g>
                <g id="list-task"></g>
                <g id="trash"></g>
                <g id="vertical-menu"></g>
                <g id="horizontal-menu"></g>
                <g id="sidebar-2"></g>
                <g id="Pen"></g>
                <g id="Pen1" serif:id="Pen"></g>
                <g id="clock"></g>
                <g id="external-link"></g>
                <g id="hr"></g>
                <g id="info"></g>
                <g id="warning"></g>
                <path
                  id="error-circle"
                  d="M32.085,56.058c6.165,-0.059 12.268,-2.619 16.657,-6.966c5.213,-5.164 7.897,-12.803 6.961,-20.096c-1.605,-12.499 -11.855,-20.98 -23.772,-20.98c-9.053,0 -17.853,5.677 -21.713,13.909c-2.955,6.302 -2.96,13.911 0,20.225c3.832,8.174 12.488,13.821 21.559,13.908c0.103,0.001 0.205,0.001 0.308,0Zm-0.282,-4.003c-9.208,-0.089 -17.799,-7.227 -19.508,-16.378c-1.204,-6.452 1.07,-13.433 5.805,-18.015c5.53,-5.35 14.22,-7.143 21.445,-4.11c6.466,2.714 11.304,9.014 12.196,15.955c0.764,5.949 -1.366,12.184 -5.551,16.48c-3.672,3.767 -8.82,6.016 -14.131,6.068c-0.085,0 -0.171,0 -0.256,0Zm-12.382,-10.29l9.734,-9.734l-9.744,-9.744l2.804,-2.803l9.744,9.744l10.078,-10.078l2.808,2.807l-10.078,10.079l10.098,10.098l-2.803,2.804l-10.099,-10.099l-9.734,9.734l-2.808,-2.808Z"
                />
                <g id="plus-circle"></g>
                <g id="minus-circle"></g>
                <g id="vue"></g>
                <g id="cog"></g>
                <g id="logo"></g>
                <g id="radio-check"></g>
                <g id="eye-slash"></g>
                <g id="eye"></g>
                <g id="toggle-off"></g>
                <g id="shredder"></g>
                <g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"></g>
                <g id="react"></g>
                <g id="check-selected"></g>
                <g id="turn-off"></g>
                <g id="code-block"></g>
                <g id="user"></g>
                <g id="coffee-bean"></g>
                <g id="coffee-beans"><g id="coffee-bean1" serif:id="coffee-bean"></g></g>
                <g id="coffee-bean-filled"></g>
                <g id="coffee-beans-filled"><g id="coffee-bean2" serif:id="coffee-bean"></g></g>
                <g id="clipboard"></g>
                <g id="clipboard-paste"></g>
                <g id="clipboard-copy"></g>
                <g id="Layer1"></g>
              </g>
            </g>
          </svg>
        </div>
        <h1 class="text-bolder">{{ num_stats.uncompleated }}</h1>
      </div>
    </div>
    <div></div>
  </div>
</template>

<style scoped>
.dash-item {
  min-height: 8vh;
  min-width: 3vw;
}
</style>
