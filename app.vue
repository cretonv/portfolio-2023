<script setup lang="ts">
import "~/assets/main.css"
import {useCustomCursorComposable} from "~/composables/customCursorComposable";
import {onMounted} from "@vue/runtime-core";
import {ref} from "vue";

const {initCustomCursor, setXandY} = useCustomCursorComposable()
const pageContainer = ref()
const customCursorElement = ref()
const customCursorHoverShadow = ref()

onMounted(() => {
  initCustomCursor(pageContainer.value, customCursorElement.value, customCursorHoverShadow.value)
})

const setCursorCoordinates = (e: MouseEvent) => {
  setXandY(e.x, e.y)
}
</script>
<template>
  <div ref="pageContainer" @mousemove="setCursorCoordinates" class="relative">
    <div ref="customCursorElement" class="custom-main-cursor">
      <div ref="customCursorHoverShadow" class="cursor-hover-shadow"/>
    </div>
    <NuxtPage/>
  </div>
</template>
