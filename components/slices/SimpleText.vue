<script setup lang="ts">
import {defineProps} from 'vue'
import { PrismicRichText } from "@prismicio/vue";
const props = defineProps<{
  slice: Object
}>()
</script>
<template>
  <div class="flex justify-end text-white px-10 my-24">
    <PrismicRichText v-if="slice.primary.text_title.length > 0" class="w-7/12 pl-10 pr-8 text-3xl font-title" :field="slice.primary.text_title" />
    <PrismicRichText v-if="slice.primary.text_content.length > 0" class="w-5/12 text-sm" :field="slice.primary.text_content" />
  </div>
</template>
