<script setup lang="ts">
import {defineProps, watch} from 'vue'
import {gsap} from "gsap";
import {onMounted} from "@vue/runtime-core";
import {useTransitionComposable} from "~/composables/transitionComposable";
import {useFirstVisitComposable} from "~/composables/firstVisitComposable";
import Dot600 from "~/components/svg/dot/dot600.vue";

const {transitionState} = useTransitionComposable()
const {firstVisitState} = useFirstVisitComposable()

const props = defineProps<{
  slice: Object
}>()

const container = ref()
const line = ref()

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
  // const percent = 100 - 100 * (container.value.offsetWidth) / line.value.offsetWidth
  const percent = 100 - 100 * (line.value.childNodes[1].offsetWidth) / line.value.offsetWidth
  gsap.to(line.value, {
    xPercent: -percent,
    duration: 16,
    ease: "linear",
    repeat: -1
  })
}
</script>
<template>
  <div ref="container" class="quote-line overflow-hidden w-full -my-12">
    <div ref="line" v-if="slice.items.length > 0" class="flex w-fit gap-6 leading-loose font-title text-white text-6xl">
      <div v-for="quote in slice.items" class="quote w-fit whitespace-nowrap flex items-center">
        <div>{{quote.quote}}</div>
        <dot600 class="ml-6 h-10 w-auto" />
      </div>
      <div class="quote w-fit whitespace-nowrap flex items-center">
        <div>{{slice.items[0].quote}}</div>
        <dot600 class="ml-6 h-10 w-auto" />
      </div>
    </div>
  </div>
</template>
