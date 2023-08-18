<script setup lang="ts">
import HomeHero from "~/src/components/HomeHero.vue";
import Presentation from "~/src/components/Presentation.vue";
import Footer from "~/src/components/Footer.vue";

const { client } = usePrismic()
const { data: home } = await useAsyncData('general', () => client.getSingle('home'))

const presentationBlock = computed(() => {
  if (home.value && home.value.data) {
    return home.value.data.body.find((element) => element.slice_type === 'presentation')
  } else {
    return {}
  }
})
</script>
<template>
  <div class="relative bg-black">
    <HomeHero />
    <Presentation :data="presentationBlock" />
    <Footer />
  </div>
</template>
