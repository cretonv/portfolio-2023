<script setup lang="ts">
import {defineProps} from 'vue'
import { PrismicImage } from "@prismicio/vue";
const props = defineProps<{
  slice: Object
}>()
</script>
<template>
  <div class="pr-10 pl-20 my-24 h-screen overflow-hidden -md:my-16 -md:px-4 -md:h-1/2">
    <PrismicImage class="object-cover object-center w-full h-full" :field="slice.primary.image" />
  </div>
</template>