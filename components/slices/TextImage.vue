<script setup lang="ts">
import {defineProps} from 'vue'
const props = defineProps<{
  slice: Object
}>()
</script>
<template>
  <div v-if="slice.primary.text && slice.primary.image" class="flex items-stretch px-10 justify-between my-24">
    <div class="pl-10 w-7/12 pr-4">
      <PrismicImage
          class="object-center w-full"
          :class="slice.primary.img_contain ? 'object-contain h-auto' : 'object-cover'"
          :field="slice.primary.image" />
    </div>
    <div class="w-4/12 flex items-center">
      <PrismicRichText class="rich-text w-full py-10 pr-8" :field="slice.primary.text" />
    </div>
  </div>
</template>
