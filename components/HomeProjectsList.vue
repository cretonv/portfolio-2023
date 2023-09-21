<script setup lang="ts">
import {defineProps, watch} from "vue"
import {usePrismic} from "@prismicio/vue";
import {useTransitionComposable} from "~/composables/transitionComposable";
import {useFirstVisitComposable} from "~/composables/firstVisitComposable";
import {onMounted} from "@vue/runtime-core";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

defineProps<{
  data: object
}>()
const { client } = usePrismic()
const {transitionState} = useTransitionComposable()
const {firstVisitState} = useFirstVisitComposable()
const container = ref()
const btnContainer = ref()
const slider = ref()
const mousePosition = ref({x: 0, y:0})
onMounted(() => {
  if (transitionState.transitionComplete || firstVisitState.isFirstVisit) {
    initGsap()
  }
})
watch(
    () => transitionState.transitionComplete,
    (state) => {
      if (state) {
        initGsap()
      }
    }
)
const initGsap = () => {
  gsap.registerPlugin(ScrollTrigger)
  if(window.innerWidth > 768) {
    const percent = 100 - 100 * container.value.offsetHeight / slider.value.offsetHeight - 100 * 182 / slider.value.offsetHeight

    gsap.to(slider.value, {
      yPercent: -percent,
      ease: "linear",
      duration: 3,
      scrollTrigger: {
        trigger: container.value,
        start: 'true true',
        end : '+=80%',
        scrub: true,
        pin: true,
      }
    })
  } else {
    // On cherche le nombre d'éléments contenus dans le slider (et on enleve les 2 commentaires ajoutés par Vue)
    const sliderChildCount = slider.value.childNodes.length - 2
    // On calcule la taille d'un item
    const itemWidth = (60 * window.innerWidth / 100)
    console.log(itemWidth)
    // On calcule la taille du slider car width: fit-content ne marche pas dans ce cas, et on ajoute les marges entre les items
    const sliderWidth = itemWidth * (sliderChildCount / 2) + 16 * (sliderChildCount / 2 - 1)
    // Puis on retire la largeur de l'écran sans les padding horizontaux (32px) et un demi item
    const sliderToTranslate = sliderWidth - (window.innerWidth  - 32) - (itemWidth / 2)
    gsap.to(slider.value, {
      x: -sliderToTranslate,
      ease: "linear",
      duration: 3,
      scrollTrigger: {
        trigger: container.value,
        start: 'true true',
        end : '+=80%',
        scrub: true,
        pin: true,
      }
    })
  }
}
const goToProjectsPage = async () => {
  await navigateTo({ name: 'projects-list' })
}
const getMousePosition = (e: MouseEvent) => {
  mousePosition.value.x = e.pageX
  mousePosition.value.y = e.pageY
}
</script>
<template>
  <div
    ref="container"
    @mousemove="getMousePosition"
    class="flex justify-between h-screen overflow-hidden mt-24 px-10 -md:px-4 -md:flex-col -md:py-4"
  >
    <div ref="slider" class="projects-slider w-6/12 h-fit flex flex-wrap gap-4 -md:w-full -md:h-[60vh] -md:flex-col">
      <ProjectSliderItem
          v-if="data.items.length > 5"
          v-for="item in data.items"
          :uid="item.project.uid"
          :client="client"
          class="project-item min-h-[364px] h-[22vw] -md:min-h-[150px]"
      />
      <ProjectSliderItem
          v-if="data.items.length > 5 && data.items.length % 2 === 0"
          :uid="data.items[0].project.uid"
          :client="client"
          class="project-item min-h-[364px] h-[22vw] -md:min-h-[150px]"
      />
      <ProjectSliderItem
          v-if="data.items.length > 5"
          :uid="data.items[1].project.uid"
          :client="client"
          class="project-item min-h-[364px] h-[22vw] -md:min-h-[150px]"
      />
    </div>
    <div class="w-5/12 flex items-center pb-32 -md:w-full -md:grow -md:pb-0">
      <div>
        <PrismicRichText v-if="data.primary.text" :field="data.primary.text" class="w-3/5 rich-text -md:w-4/5" />
        <div class="w-fit" ref="btnContainer">
          <DefaultButton :container="btnContainer" :mouse-position="mousePosition" @click="goToProjectsPage" class="mt-6">
            {{ data.primary.btn_text }}
          </DefaultButton>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.project-item {
  width: calc(50% - 8px);
}
.project-item:nth-child(2n) {
  transform: translateY(-50%);
}
@media (max-width: 768px) {
  .project-item {
    width: 60vw;
    height: calc(50% - 8px);
  }
  .project-item:nth-child(2n) {
    transform: translateX(-50%);
  }
}
</style>
