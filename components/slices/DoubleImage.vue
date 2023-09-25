<script setup lang="ts">
import {defineProps} from 'vue'
import {onMounted} from "@vue/runtime-core";
import {useFirstVisitComposable} from "~/composables/firstVisitComposable";
import {gsap} from "gsap";

const {transitionState} = useTransitionComposable()
const {firstVisitState} = useFirstVisitComposable()

const props = defineProps<{
  slice: Object
}>()

const captureImages = ref([])
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
  if(props.slice.primary.parallax) {
    captureImages.value.forEach((item) => {
      if(item) {
        gsap.to(item, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: container.value,
            scrub: 1
          },
        });
      }
    })
  }
}
</script>
<template>
  <div ref="container" class="flex gap-4 pl-20 pr-10 w-full my-24 -md:my-16 -md:px-4 -md:flex-wrap">
    <div class="relative h-[436px] w-1/2 -md:w-full -md:h-[264px]">
      <div
          :ref="(el) => (captureImages[0] = el)"
          class="absolute top-1/2 left-1/2 w-full h-full  max-w-[80%] max-h-[80%]"
      >
        <PrismicImage
            v-if="slice.primary.left_img.url"
            class="object-contain object-center w-full h-full -translate-x-1/2"
            :class="slice.primary.parallax ?  '-translate-y-[55%]' : '-translate-y-1/2'"
            :field="slice.primary.left_img"
        />
      </div>
      <PrismicImage v-if="slice.primary.bg_img_left.url" class="object-cover object-center w-full h-full" :field="slice.primary.bg_img_left" />
    </div>
    <div class="relative h-[436px] w-1/2 -md:w-full -md:h-[264px]">
      <div
          :ref="(el) => (captureImages[1] = el)"
          class="absolute top-1/2 left-1/2 w-full h-full  max-w-[80%] max-h-[80%]"
      >
        <PrismicImage
            v-if="slice.primary.right_img.url"
            class="object-contain object-center w-full h-full -translate-x-1/2"
            :class="slice.primary.parallax ?  '-translate-y-[55%]' : '-translate-y-1/2'"
            :field="slice.primary.right_img"
        />
      </div>
      <PrismicImage v-if="slice.primary.bg_img_right.url" class="object-cover object-center w-full h-full" :field="slice.primary.bg_img_right" />
    </div>
  </div>
</template>
