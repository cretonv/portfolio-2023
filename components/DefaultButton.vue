<script setup lang="ts">
import {useCustomCursorComposable} from "~/composables/customCursorComposable";

const {toggleMainCursorToHover} = useCustomCursorComposable()
const props = defineProps({
  mousePosition: {
    required: true,
  },
  container: {
    required: true,
  }
})
const xTranslate = computed(() => {
  return (((props.mousePosition.x - props.container.offsetLeft) - props.container.offsetWidth / 2) / props.container.offsetWidth * 20)
})
const yTranslate = computed(() => {
  return (((props.mousePosition.y - (window.pageYOffset + props.container.getBoundingClientRect().top)) - props.container.offsetHeight / 2) / props.container.offsetHeight * 20)
})
</script>
<template>
  <button
      v-if="mousePosition && container"
      class="relative z-20 block px-4 py-2 border border-white rounded-full text-sm text-white font-porpora bg-white-secondary/[.05] cursor-none whitespace-nowrap"
      @mousedown="toggleMainCursorToHover(false)"
      @mouseover="toggleMainCursorToHover(true)"
      @mouseleave="toggleMainCursorToHover(false)"
  >
    <div class="hover-bg" :style="`transform: translate(${xTranslate}px, ${yTranslate}px)`" />
    <slot />
  </button>
</template>
<style scoped>
  button:hover .hover-bg {
    opacity: 0.75;
  }
  .hover-bg {
    transition: all 0.5s;
    position: absolute;
    opacity: 0;
    inset: -1px; /* control the spread */
    z-index: -1; /* place the element behind */
    background: -webkit-linear-gradient(-180deg, #953621 0%, #FFA723 51.04%, #FFDC5F 100%);
    filter: blur(15px); /* control the blur */
  }
</style>
