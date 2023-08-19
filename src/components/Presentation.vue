<script setup lang="ts">
import DefaultButton from "~/src/components/DefaultButton.vue";

defineProps<{
  data: object
}>()
const mousePosition = ref({x: 0, y:0})
const container = ref()
const goToProjectsPage = async () => {
  await navigateTo({ name: 'projects-list' })
}
const getMousePosition = (e: MouseEvent) => {
  mousePosition.value.x = e.pageX
  mousePosition.value.y = e.pageY
}
</script>
<template>
  <div @mousemove="getMousePosition" class="flex px-10 items-start">
    <div v-if="data.primary" class="w-2/3 flex flex-wrap justify-center text-white">
      <h2 class="w-full text-4xl font-title">{{data.primary.title[0].text}}</h2>
      <div class="w-3/4 text-xl mt-8 font-lato">
        {{data.primary.text[0].text}}
        <div class="w-fit" ref="container">
          <DefaultButton :container="container" :mouse-position="mousePosition" @click="goToProjectsPage" class="mt-12">Découvrir mes projets</DefaultButton>
        </div>
      </div>
    </div>
    <div class="w-1/3 h-[568px]" v-if="data.primary">
      <img class="object-cover object-center w-full h-full" :src="data.primary.image.url" :alt="data.primary.image.alt">
    </div>
  </div>
</template>
