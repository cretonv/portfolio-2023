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
  <div class="back-button flex items-center gap-3 cursor-pointer" @mousedown="goToTarget">
    <svg width="57" height="34" viewBox="0 0 57 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40.7144 17.6426L19.0001 17.6426" stroke="#D9D9D9" stroke-width="0.827143"/>
        <path d="M25.7859 27.1426C25.7859 20.6283 20.3574 18.3212 17.6431 17.6426C20.3574 17.1902 25.7859 14.114 25.7859 8.14258" stroke="#D9D9D9" stroke-width="0.827143"/>
        <path d="M0.103395 16.9644C0.103395 12.3309 3.25924 8.11788 8.40034 5.05771C13.5393 1.99883 20.6453 0.103532 28.5 0.103532C36.3547 0.103533 43.4607 1.99883 48.5997 5.05771C53.7408 8.11789 56.8966 12.3309 56.8966 16.9644C56.8966 21.598 53.7408 25.811 48.5997 28.8711C43.4607 31.93 36.3547 33.8253 28.5 33.8253C20.6453 33.8253 13.5393 31.93 8.40034 28.8711C3.25924 25.811 0.103395 21.598 0.103395 16.9644Z" stroke="#D9D9D9" stroke-width="0.206786"/>
      <defs>
        <linearGradient id="paint0_linear_731_94" x1="30" y1="0" x2="57" y2="34" gradientUnits="userSpaceOnUse" data-v-inspector="components/BackButton.vue:24:9" data-v-3f298d0d="">
          <stop stop-color="#953621" data-v-inspector="components/BackButton.vue:25:11" data-v-3f298d0d=""></stop>
          <stop offset="0.510417" stop-color="#FFA723" data-v-inspector="components/BackButton.vue:26:11" data-v-3f298d0d=""></stop>
          <stop offset="1" stop-color="#FFDC5F" data-v-inspector="components/BackButton.vue:27:11" data-v-3f298d0d=""></stop>
        </linearGradient>
      </defs>
    </svg>

    <div class="relative overflow-hidden font-lato font-light text-sm text-white"><span class="opacity-0">Retour</span></div>
  </div>
</template>
<style scoped>
svg path {
  stroke: #D9D9D9;
  transition: stroke 0.4s;
}
.back-button:hover svg path  {
  stroke: url(#paint0_linear_731_94); /* Couleur du dégradé du masque */
}
.back-button div::before {
  content: "Retour";
  position: absolute;
  top: -100%;
  left: 0;
  color: #FFA723;
  transition: all 0.5s;
}
.back-button div::after {
  content: "Retour";
  position: absolute;
  top: 0;
  left: 0;
  color: #D9D9D9;
  transition: all 0.5s;
}
.back-button:hover div::before {
  top: 0;
}
.back-button:hover div::after {
  top: 100%;
}
</style>
