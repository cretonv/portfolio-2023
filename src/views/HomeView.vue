<script setup lang="ts">
import HomeHero from "~/src/components/HomeHero.vue";
import Presentation from "~/src/components/Presentation.vue";
import Footer from "~/src/components/Footer.vue";
import Lenis from "@studio-freight/lenis";


onMounted(() => {
  const lenis = new Lenis()
  lenis.on('scroll', () => {})

  function raf(time:number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
})

const { client } = usePrismic()
const { data: home } = await useAsyncData('home', () => client.getSingle('home'))

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
    <Presentation class="mt-8" :data="presentationBlock" />
    <Footer />
  </div>
</template>
