<script setup lang="ts">
import {defineProps} from "vue"
import {useCustomCursorComposable} from "~/composables/customCursorComposable";

const {toggleMainCursorToHover} = useCustomCursorComposable()
const props = defineProps<{
  uid: string,
  client: object
}>()
const {data: project } = await useAsyncData(props.uid, () => props.client.getByUID('project', props.uid))
const click = async () => {
  toggleMainCursorToHover(false)
  await navigateTo({ name: 'projects-single', params: {uid: props.uid} })
}
</script>
<template>
  <div class="item-container relative px-6">
    <PrismicImage class="absolute left-0 right-0 object-cover object-center w-full h-full" :field="project.data.list_thumbnail" />
    <img class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :src="project.data.logo.url" :alt="project.data.logo.alt">
    <div
        class="hover-circle relative z-20 top-1/2 flex items-center flex-wrap bg-white w-full rounded-full overflow-hidden"
        @mousedown="click"
        @mouseover="toggleMainCursorToHover(true)"
        @mouseleave="toggleMainCursorToHover(false)"
    >
      <div class="hover-content absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-fit h-auto text-center text-black hover:text-orange font-title">
        {{project.data.title[0].text}}
        <svg class="mx-auto mt-2 -scale-x-100" width="57" height="34" viewBox="0 0 57 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40.7144 17.6426L19.0001 17.6426" stroke="#181618" stroke-width="0.827143"/>
          <path d="M25.7859 27.1426C25.7859 20.6283 20.3574 18.3212 17.6431 17.6426C20.3574 17.1902 25.7859 14.114 25.7859 8.14258" stroke="#181618" stroke-width="0.827143"/>
          <path d="M0.103395 16.9644C0.103395 12.3309 3.25924 8.11788 8.40034 5.05771C13.5393 1.99883 20.6453 0.103532 28.5 0.103532C36.3547 0.103533 43.4607 1.99883 48.5997 5.05771C53.7408 8.11789 56.8966 12.3309 56.8966 16.9644C56.8966 21.598 53.7408 25.811 48.5997 28.8711C43.4607 31.93 36.3547 33.8253 28.5 33.8253C20.6453 33.8253 13.5393 31.93 8.40034 28.8711C3.25924 25.811 0.103395 21.598 0.103395 16.9644Z" stroke="#181618" stroke-width="0.206786"/>
          <defs>
            <linearGradient id="paint0_linear_731_94" x1="30" y1="0" x2="57" y2="34" gradientUnits="userSpaceOnUse" data-v-inspector="components/BackButton.vue:24:9" data-v-3f298d0d="">
              <stop stop-color="#953621" data-v-inspector="components/BackButton.vue:25:11" data-v-3f298d0d=""></stop>
              <stop offset="0.510417" stop-color="#FFA723" data-v-inspector="components/BackButton.vue:26:11" data-v-3f298d0d=""></stop>
              <stop offset="1" stop-color="#FFDC5F" data-v-inspector="components/BackButton.vue:27:11" data-v-3f298d0d=""></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>
<style scoped>
.item-container::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.2;
  z-index: 1;
}
.hover-circle {
  transition: all 0.7s;
  aspect-ratio: 1 / 1;
  transform-origin: center 0;
  transform: scale(0) translateY(-50%);
}
.item-container:hover .hover-circle {
  transform: scale(1) translateY(-50%);
}
.hover-content {
  transition: all 0.3s;
}
svg path {
  stroke: #181618;
  transition: stroke 0.3s;
}
.hover-content:hover svg path  {
  stroke: url(#paint0_linear_731_94); /* Couleur du dégradé du masque */
}
</style>
