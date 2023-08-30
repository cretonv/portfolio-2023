<script setup lang="ts">
const props = defineProps<{
  target: string
}>()
const currentColor = ref('#D9D9D9')
const setColor = (hover: false) => {
  if(hover) {
    currentColor.value = '#FFA723'
  } else {
    currentColor.value = '#D9D9D9'
  }
}
const goToTarget = async () => {
  await navigateTo('/')
}
</script>
<template>
  <svg
      @mouseover="setColor(true)"
      @mouseout="setColor(false)"
      @mousedown="goToTarget"
      class="cursor-pointer"
      width="40"
      height="24"
      viewBox="0 0 40 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M28.5713 12.3809L13.3332 12.3809" :stroke="currentColor" stroke-width="0.827143"/>
    <path d="M18.0951 19.0479C18.0951 14.4764 14.2856 12.8574 12.3809 12.3812C14.2856 12.0637 18.0951 9.905 18.0951 5.71452" :stroke="currentColor" stroke-width="0.827143"/>
    <path d="M0.103395 11.9048C0.103395 8.66839 2.30784 5.7203 5.91075 3.57571C9.51147 1.43243 14.4925 0.103437 20 0.103438C25.5075 0.103438 30.4885 1.43243 34.0893 3.57571C37.6922 5.7203 39.8966 8.66839 39.8966 11.9048C39.8966 15.1412 37.6922 18.0893 34.0893 20.2339C30.4885 22.3772 25.5075 23.7062 20 23.7062C14.4925 23.7062 9.51147 22.3772 5.91075 20.2339C2.30784 18.0893 0.103394 15.1412 0.103395 11.9048Z" :stroke="currentColor" stroke-width="0.206786"/>
  </svg>
</template>
