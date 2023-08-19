<script setup lang="ts">
import HomeHero from "~/components/HomeHero.vue";
import Presentation from "~/components/Presentation.vue";
import Footer from "~/components/Footer.vue";
import Lenis from "@studio-freight/lenis";


onMounted(() => {
  const lenis = new Lenis({duration: 1.8})
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
    <section style="z-index: 1" class="relative main-content bg-black pb-4">
      <HomeHero />
      <Presentation class="mt-8" :data="presentationBlock" />
    </section>
    <Footer style="z-index: 0" class="relative" />
  </div>
</template>
