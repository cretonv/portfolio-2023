<script setup lang="ts">
import TitleH1 from "./TitleH1.vue";
import LogoInitial from "./LogoInitial.vue";
import Name from "./Name.vue";
import BrokenCircle from "./BrokenCircle.vue";
import {ref, reactive} from "vue";
import {onMounted} from "@vue/runtime-core";
import {useTransitionComposable} from "~/composables/transitionComposable";
import {useFirstVisitComposable} from "~/composables/firstVisitComposable";
import {useCustomCursorComposable} from "~/composables/customCursorComposable";
import {gsap} from "gsap";
import CursorBorder from "~/components/svg/cursorBorder.vue";

const {transitionState} = useTransitionComposable()
const {firstVisitState} = useFirstVisitComposable()
const {toggleMainCursorVisibility} = useCustomCursorComposable()

const container = ref(null)
const cursorFilter = ref(null)
const cursorState = reactive({visible: false})
const mouse = { x: 0, y: 0 }


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
  if(cursorFilter.value && container.value) {

    gsap.set(cursorFilter.value, {xPercent: -50, yPercent: -50, scaleX: 0.12, scaleY: 0.12});


    const pos = { x: container.value.offsetWidth / 2, y: container.value.offsetHeight / 2 };
    const speed = 0.2;

    const xSet = gsap.quickSetter(cursorFilter.value, "x", "px");
    const ySet = gsap.quickSetter(cursorFilter.value, "y", "px");

    mouse.x = pos.x
    mouse.y = pos.y

    gsap.ticker.add(() => {

      // adjust speed for higher refresh monitors
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });
  }
}
const setXandY = (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
}
const toggleCursorVisibility = (newState: boolean) => {
  cursorState.visible = newState
  if(cursorState.visible) {
    gsap.to(cursorFilter.value, {scaleX: 1, scaleY: 1, duration: 0.5});
    toggleMainCursorVisibility(false)
  } else {
    gsap.to(cursorFilter.value, {scaleX: 0.12, scaleY: 0.12, duration: 0.5});
    toggleMainCursorVisibility(true)
  }
}
</script>
<template>
  <div ref="container" @mousemove="setXandY" class="relative bg-black w-full h-full min-h-screen flex item-stretch -md:overflow-hidden">
    <div class="pl-10 pr-14 -md:absolute -md:pl-4 -md:pr-0"><LogoInitial :go-home="false" class="mt-8" /></div>
    <div class="flex flex-col justify-center -md:pl-12 -md:pr-12 z-10">
      <TitleH1
          class="mb-14 select-none"
          @mouseover="toggleCursorVisibility(true)"
          @mouseleave="toggleCursorVisibility(false)"
      >
        Développeur <br/> FRONT-END <br/> créatif
      </TitleH1>
    </div>
    <BrokenCircle class="absolute top-[20%] right-[7.5%] z-0" :container="container" />
    <Name class="absolute bottom-6 right-4"> vincent creton </Name>
    <div ref="cursorFilter" class="cursor" :class="cursorState.visible ? 'opacity-90' : 'opacity-0'">
      <cursorBorder />
    </div>
  </div>
</template>
<style scoped>
.cursor {
  pointer-events: none;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  position: fixed;
  left: 0;
  top: 0;
  mix-blend-mode: difference;
  z-index: 99999;
  background-color: #fff;
  transition: scale 2s, opacity 0.2s;
  overflow: visible;
}
.cursor svg {
  position: absolute;
  left: -12px;
  top: -12px;
  height: 144px;
  width: 144px;
  z-index: 0;
}
.cursor::after {
  content: "";
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  border-radius: 50%;
  height: 120px;
  width: 120px;
}
</style>
