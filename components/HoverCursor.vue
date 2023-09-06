<script setup>
import {useCustomCursorComposable} from "~/composables/customCursorComposable";
const {toggleMainCursorToHover} = useCustomCursorComposable()
</script>
<template>
  <!-- Renderless component -->
  <slot @mouseover="toggleMainCursorToHover(true)" @mouseleave="toggleMainCursorToHover(false)" />
</template>
