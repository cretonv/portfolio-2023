<script setup lang="ts">
import {defineProps} from 'vue'
import { PrismicRichText } from "@prismicio/vue";
const props = defineProps<{
  slice: Object
}>()
</script>
<template>
  <div class="flex justify-end text-white px-10 my-24 -md:px-4 -md:my-16 -md:flex-wrap">
    <PrismicRichText
        v-if="slice.primary.text_title.length > 0"
        class="w-7/12 pl-10 pr-8 text-3xl font-title -md:w-full -md:pl-0 -md:mb-6"
        :field="slice.primary.text_title"
    />
    <PrismicRichText
        v-if="slice.primary.text_content.length > 0"
        class="rich-text w-5/12 text-sm -md:w-full"
        :field="slice.primary.text_content"
    />
  </div>
</template>
