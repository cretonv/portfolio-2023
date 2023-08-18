<script setup lang="ts">
import DefaultButton from "~/src/components/DefaultButton.vue";
defineProps<{
  data: object
}>()
const goToProjectsPage = async () => {
  await navigateTo({ name: 'projects-list' })
}
</script>
<template>
  <div class="flex px-10 items-start">
    <div v-if="data.primary" class="w-2/3 flex flex-wrap justify-center text-white">
      <h2 class="w-full text-4xl font-title">{{data.primary.title[0].text}}</h2>
      <div class="w-3/4 text-xl mt-8 font-lato">
        {{data.primary.text[0].text}}
        <DefaultButton @click="goToProjectsPage" class="mt-12">Découvrir mes projets</DefaultButton>
      </div>
    </div>
    <div class="w-1/3 h-[568px]" v-if="data.primary">
      <img class="object-cover object-center w-full h-full" :src="data.primary.image.url" :alt="data.primary.image.alt">
    </div>
  </div>
</template>
