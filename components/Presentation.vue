<script setup lang="ts">
import DefaultButton from "~/components/DefaultButton.vue";
import {onMounted, onBeforeUnmount} from "@vue/runtime-core";
import SplitType from "split-type";
import {gsap} from "gsap";

defineProps<{
  data: object
}>()

const mousePosition = ref({x: 0, y:0})
const container = ref()
const title = ref()
const text = ref()
const photo = ref()
let splitTitle

onMounted(() => {
  // To don't display h1 before load (without style)
  title.value.classList.remove('opacity-0')
  splitTitle = SplitType.create(title.value, {types: 'lines, chars'})
  // Var use to make delay and stagger
  let lineCharCounter: number

  if(splitTitle.lines) {
    splitTitle.lines.forEach((line) => {
      lineCharCounter = 0
      Array.from(line.children).forEach((char) => {
        gsap.from(char, {
          scrollTrigger: line,
          y: 100 + 20 * lineCharCounter,
          duration: 1.25,
          delay: 0.25,
          stagger: { amount: 1.3 * lineCharCounter },
          ease: "sine.out"
        })
        lineCharCounter ++
      }, )
    })
  }

  gsap.to(text.value, {
    scrollTrigger: title.value,
    opacity: 1,
    duration: 1.5,
    delay: 1.75,
  })
  gsap.from(photo.value, {
    scrollTrigger: title.value,
    height: 0,
    delay: 2.25,
    duration: 1.5,
  })
})

onBeforeUnmount(() => {
  SplitType.revert(title.value)
})
const goToProjectsPage = async () => {
  await navigateTo({ name: 'projects-list' })
}
const getMousePosition = (e: MouseEvent) => {
  mousePosition.value.x = e.pageX
  mousePosition.value.y = e.pageY
}
</script>
<template>
  <div @mousemove="getMousePosition" class="flex px-10 items-start flex-wrap h-[568px]">
    <div v-if="data.primary" class="w-2/3 flex flex-wrap justify-center text-white -md:w-full -md:order-2">
      <h2 ref="title" class="w-full text-4xl font-title">{{data.primary.title[0].text}}</h2>
      <div ref="text" class="w-3/4 text-xl mt-8 font-lato -md:w-full -md:text-lg opacity-0">
        {{data.primary.text[0].text}}
        <div class="w-fit" ref="container">
          <DefaultButton :container="container" :mouse-position="mousePosition" @click="goToProjectsPage" class="mt-12 -md:mt-8">Découvrir mes projets</DefaultButton>
        </div>
      </div>
    </div>
    <div
        ref="photo"
        class="w-1/3 h-[568px] -md:w-full -md:order-1 -md:h-[284px] -md:mb-8 overflow-hidden"
        v-if="data.primary"
    >
      <img class="object-cover object-center w-full h-[568px]" :src="data.primary.image.url" :alt="data.primary.image.alt">
    </div>
  </div>
</template>
<style scoped>
h2 {
  font-kerning: none;
  overflow: hidden;
}
</style>
