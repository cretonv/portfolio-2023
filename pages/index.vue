<script setup lang="ts">
import HomeHero from "~/components/HomeHero.vue";
import Presentation from "~/components/Presentation.vue";
import Footer from "~/components/Footer.vue";
import Lenis from "@studio-freight/lenis";
import {definePageMeta} from "#imports";
import transitionConfig from "~/helpers/transitionConfig";
import {useFirstVisitComposable} from "../composables/firstVisitComposable"

definePageMeta({
  pageTransition: transitionConfig
})

const {firstVisitState, firstVisitComplete} = useFirstVisitComposable()

const mainContent = ref<HTMLElement>()

onMounted(() => {
  const lenis = new Lenis({duration: 1.8})
  lenis.on('scroll', () => {})

  function raf(time:number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

})

onBeforeUnmount(() => {
  if(firstVisitState.isFirstVisit) {
    firstVisitComplete()
  }
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
  <div class="relative bg-black overflow-hidden">
    <div class="transition-layer z-20 fixed left-0 top-0 h-screen overflow-hidden flex justify-end w-0 pointer-events-none">
      <div class="brick-layer bg-brick absolute left-0 top-0 h-screen w-0 origin-center z-1"/>
      <div class="orange-layer bg-orange absolute left-0 top-0 h-screen w-0 blur-md z-1"/>
      <div class="yellow-layer bg-yellow absolute left-0 top-0 h-screen w-0 blur-md z-1"/>
      <div class="black-layer bg-black absolute left-0 top-0 h-screen w-0 blur-md z-10 scale-125 orgin-center"/>
      <!-- <div class="colors-layer absolute right-[8.333333%] top-0 w-24 h-full flex blur-md w-1/12 z-1">
        <div class="h-full bg-brick"/>
        <div class="h-full bg-orange"/>
        <div class="h-full bg-yellow"/>
      </div> -->
    </div>
    <section ref="mainContent" style="z-index: 1" class="relative main-content bg-black pb-4">
      <HomeHero />
      <Presentation class="mt-8" :data="presentationBlock" />
    </section>
    <Footer :mainContent="mainContent" style="z-index: 0" class="relative" />
  </div>
</template>
