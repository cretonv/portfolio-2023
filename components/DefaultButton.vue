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
  return (((props.mousePosition.y - props.container.offsetTop) - props.container.offsetHeight / 2) / props.container.offsetHeight * 20)
})
</script>
<template>
  <button
      v-if="mousePosition && container"
      class="relative block px-4 py-2 border border-white rounded-full text-sm font-porpora bg-white-secondary/[.05]"
      @mousedown="toggleMainCursorToHover(false)"
      @mouseover="toggleMainCursorToHover(true)"
      @mouseleave="toggleMainCursorToHover(false)"
  >
    <span class="hover-bg" :style="`transform: translate(${xTranslate}px, ${yTranslate}px)`" />
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
