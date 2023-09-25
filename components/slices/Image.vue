<script setup lang="ts">
import {defineProps} from 'vue'
import { PrismicImage } from "@prismicio/vue";
import {onMounted} from "@vue/runtime-core";
import {useFirstVisitComposable} from "~/composables/firstVisitComposable";
import {gsap} from "gsap";

const {transitionState} = useTransitionComposable()
const {firstVisitState} = useFirstVisitComposable()
const props = defineProps<{
  slice: Object,
  context: Object
}>()
const captureImage = ref()
const container = ref()
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
  if(captureImage.value && props.slice.primary.parallax) {
    gsap.to(captureImage.value, {
      yPercent: -5,
      ease: "none",
      scrollTrigger: {
        trigger: container.value,
        scrub: 1
      },
    });
  }
}
</script>
<template>
  <div ref="container" class="relative pr-10 pl-20 my-24 h-screen overflow-hidden -md:my-16 -md:px-4 -md:h-1/2">
    <div
      ref="captureImage"
      class="absolute pr-10 pl-20 top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <PrismicImage
          v-if="slice.primary.image.url"
          class="relative object-contain object-center w-full h-full max-w-[80%] max-h-[80%]"
          :class="slice.parallax ?  'translate-y-[2.5%]' : ''"
          :field="slice.primary.image" />
    </div>
    <PrismicImage
        v-if="slice.primary.bg_img.url"
        class="object-cover object-center w-full h-full"
        :field="slice.primary.bg_img"
    />
  </div>
</template>
