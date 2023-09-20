<script setup lang="ts">
import {defineProps} from 'vue'
const props = defineProps<{
  slice: Object
}>()
</script>
<template>
  <div class="flex gap-4 pl-20 pr-10 w-full my-24 -md:my-16 -md:px-4 -md:flex-wrap">
    <div class="relative h-[436px] w-1/2 -md:w-full -md:h-[264px]">
      <PrismicImage
          v-if="slice.primary.left_img.url"
          class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 object-contain object-center w-full h-full max-w-[80%] max-h-[80%]"
          :field="slice.primary.left_img"
      />
      <PrismicImage v-if="slice.primary.bg_img_left.url" class="object-cover object-center w-full h-full" :field="slice.primary.bg_img_left" />
    </div>
    <div class="relative h-[436px] w-1/2 -md:w-full -md:h-[264px]">
      <PrismicImage
          v-if="slice.primary.right_img.url"
          class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 object-contain object-center w-full h-full max-w-[80%] max-h-[80%]"
          :field="slice.primary.right_img"
      />
      <PrismicImage v-if="slice.primary.bg_img_right.url" class="object-cover object-center w-full h-full" :field="slice.primary.bg_img_right" />
    </div>
  </div>
</template>
