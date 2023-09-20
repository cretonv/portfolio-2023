<script setup lang="ts">
import {defineProps} from 'vue'
import { PrismicImage } from "@prismicio/vue";
const props = defineProps<{
  slice: Object
}>()
</script>
<template>
  <div class="relative pr-10 pl-20 my-24 h-screen overflow-hidden -md:my-16 -md:px-4 -md:h-1/2">
    <PrismicImage
        v-if="slice.primary.image.url"
        class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 object-contain object-center w-full h-full max-w-[80%] max-h-[80%]"
        :field="slice.primary.image" />
    <PrismicImage
        v-if="slice.primary.bg_img.url"
        class="object-cover object-center w-full h-full"
        :field="slice.primary.bg_img"
    />
  </div>
</template>
