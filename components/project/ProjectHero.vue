<script setup lang="ts">
import {defineProps} from "vue"
import {useFirstVisitComposable} from "~/composables/firstVisitComposable";
import {useTransitionComposable} from "~/composables/transitionComposable";
import {onMounted} from "@vue/runtime-core";
import {gsap} from "gsap";
import SplitType from "split-type";

const {firstVisitState} = useFirstVisitComposable()
const {transitionState} = useTransitionComposable()
const props = defineProps<{
  projectName: string,
  thumbnail: object,
  logo: object,
  detailedYear: string,
  context: string,
  expertises: [object],
  projectUrl: string,
}>()

const container = ref()
const btnContainer = ref()
const logoElement = ref()
const projectNameElement = ref()
const infoElements = ref([])
const mousePosition = ref({x: 0, y:0})

watch(
    () => transitionState.transitionComplete,
    (state) => {
      if (state) {
        initGsap()
      }
    }
)

onMounted(() => {
  if (transitionState.transitionComplete || firstVisitState.isFirstVisit) {
    initGsap()
  }
})

const initGsap = () => {
  const tl = gsap.timeline()
  const splitName = SplitType.create(projectNameElement.value, {types: 'words, chars'})
  const line = Array.from(projectNameElement.value.childNodes).find((element) => {
    if(element.classList && element.classList.contains('line')) {
      return element
    }
  })
  let lineCharCounter = 0
  projectNameElement.value.classList.remove('opacity-0')
  tl.to(logoElement.value, {opacity: 1, duration: 1.5})
  if(splitName.chars) {
    Array.from(splitName.chars).forEach((char) => {
      tl.from(char, {
        y: 100 + 20 * lineCharCounter,
        duration: 0.7,
        delay: 0.05,
        stagger: { amount: 1 * lineCharCounter },
        ease: "sine.out"
      }, "<")
      lineCharCounter ++
    })
  }
  tl.to(line, {width: '100%', duration: 1.5}, ">-0.3")
  if(infoElements.value) {
    infoElements.value.forEach((info) => {
      tl.to(info, {opacity: 1, duration: 0.7}, ">-0.25")
    })
  }
  tl.to(btnContainer.value, {opacity: 1, duration: 0.7}, ">-0.25")
}
const getMousePosition = (e: MouseEvent) => {
  mousePosition.value.x = e.pageX
  mousePosition.value.y = e.pageY
}
const goToProject = async () => {
  if(props.projectUrl){
    await navigateTo(props.projectUrl, {
      external: true,
      open: {
        target: '_blank'
      }
    })
  }
}
const xTranslate = computed(() => {
  if(container.value) {
    return ((mousePosition.value.x - container.value.offsetWidth / 2) / 150)
  } else {
    return 0
  }
})
const yTranslate = computed(() => {
  if(container.value) {
    return ((mousePosition.value.y - container.value.offsetHeight / 2) / 150)
  } else {
    return 0
  }
})
</script>
<template>
  <div @mousemove="getMousePosition" ref="container" class="relative min-h-screen text-white flex flex-col justify-end mb-24 -md:mb-16">
    <div class="thumbnail absolute top-0 left-0 w-full h-full">
      <img
          v-if="thumbnail.url"
          class="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
          :src="thumbnail.url"
          :alt="thumbnail.alt">
    </div>
    <div
      v-if="logo"
      ref="logoElement"
      class="logo absolute top-1/2 -translate-y-[90%] w-screen opacity-0"
    >
      <img class="icon-logo mx-auto h-[200px] w-auto" :src="logo.url" :alt="logo.alt" :style="`transform: translate(${xTranslate}px, ${yTranslate}px)`">
    </div>
    <div class="hero-infos relative px-10 pt-24 w-screen h-auto -md:px-4">
      <div
          ref="projectNameElement"
          class="relative ml-10 pb-9 font-title text-6xl text-white overflow-hidden opacity-0 -md:text-4xl -md:ml-0 -md:pb-4"
      >
        <h1 class="overflow-hidden leading-tight">{{projectName}}</h1>
        <div class="line absolute bottom-0 left-0 bg-white h-[1px] w-0" />
      </div>
      <div class="flex items-start justify-between ml-10 py-8 -md:ml-0 -md:pt-5 -md:pb-4">
        <div class="flex gap-20 -md:gap-4 -md:flex-wrap">
          <div
              class="font-lato text-xs opacity-0 -md:w-full"
              v-if="detailedYear"
              :ref="(el) => {infoElements[0] = el}"
          >
            <span class="font-light">Date</span> <br>
            <p class="font-medium mt-1">{{ detailedYear }}</p>
          </div>
          <div
              class="font-lato text-xs opacity-0 -md:w-full"
              v-if="context"
              :ref="(el) => {infoElements[1] = el}"
          >
            <span class="font-light">Context</span> <br>
            <p class="font-medium mt-1">{{ context }}</p>
          </div>
          <div
              class="font-lato text-xs opacity-0 -md:w-full"
              v-if="expertises"
              :ref="(el) => {infoElements[2] = el}"
          >
            <span class="font-light">Expertises</span> <br>
            <p class="font-medium mt-1">
              <span v-for="expertise in expertises" class="expertise">{{ expertise.expertise }}</span>
            </p>
          </div>
        </div>
        <div class="w-fit opacity-0" ref="btnContainer">
          <DefaultButton
              v-if="projectUrl"
              :container="btnContainer"
              :mouse-position="mousePosition"
              @click="goToProject"
          >
            Voir le site
          </DefaultButton>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.expertise:not(:last-child)::after {
  content: '  ·  ';
}
.hero-infos {
  background: linear-gradient(0deg, #181618 0%, rgba(24, 22, 24, 0.00) 100%);
}
.thumbnail::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #000;
  opacity: 0.45;
}
.icon-logo {
  transition: all 0.3s;
}
</style>
