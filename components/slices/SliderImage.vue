<script setup lang="ts">
import {defineProps, watch} from 'vue'
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {onMounted} from "@vue/runtime-core";
import {useTransitionComposable} from "~/composables/transitionComposable";
import {useFirstVisitComposable} from "~/composables/firstVisitComposable";

const {transitionState} = useTransitionComposable()
const {firstVisitState} = useFirstVisitComposable()

const props = defineProps<{
  slice: Object,
  context: Object
}>()

const container = ref()
const slider = ref()

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

  const percent = 100 - 100 * (window.innerWidth - 40) / slider.value.offsetWidth

  gsap.to(slider.value, {
    xPercent: -percent,
    ease: "none",
    scrollTrigger: {
      trigger: slider.value,
      start: "bottom bottom",
      end: "top 40px",
      scrub: true,
      /* end: () => (slider.value.offsetWidth),
      pin: container.value,
      invalidateOnRefresh: true,
      anticipatePin: 1 */
    }
  })
}
</script>
<template>
  <div ref="container" class="overflow-hidden">
    <div ref="slider" class="flex w-fit pl-20 gap-4">
      <div v-for="slide in slice.items" class="h-56 w-80">
        <PrismicImage class="object-cover object-center w-full h-56 w-80" :field="slide.image" />
      </div>
    </div>
  </div>
</template>
