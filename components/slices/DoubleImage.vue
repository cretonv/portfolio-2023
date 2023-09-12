<script setup lang="ts">
import {defineProps} from 'vue'
const props = defineProps<{
  slice: Object
}>()
</script>
<template>
  <div class="flex gap-4 pl-20 pr-10 w-full my-24 -md:my-16 -md:px-4 -md:flex-wrap">
    <div v-for="image in slice.primary" class="h-[436px] w-1/2 -md:w-full -md:h-[264px]">
      <PrismicImage class="object-cover object-center w-full h-full" :field="image" />
    </div>
  </div>
</template>
