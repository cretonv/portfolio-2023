<script setup lang="ts">
defineProps<{
  data: object
}>()
</script>
<template>
  <div v-if="data" class="flex px-10 items-start">
    <div class="w-2/3 flex flex-wrap justify-center text-white">
      <h2 class="w-full text-4xl font-title">{{data.primary.title[0].text}}</h2>
      <div class="w-3/4 text-xl mt-8 font-lato">{{data.primary.text[0].text}}</div>
    </div>
    <div class="w-1/3 h-[568px]">
      <img class="object-cover object-center w-full h-full" :src="data.primary.image.url" :alt="data.primary.image.alt">
    </div>
  </div>
</template>
