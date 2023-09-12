<script setup lang="ts">
import {defineProps} from 'vue'
const props = defineProps<{
  slice: Object
}>()
</script>
<template>
  <div class="flex gap-4 pl-20 pr-10 w-full my-12">
    <div v-for="image in slice.primary" class="h-[436px] w-1/2">
      <PrismicImage class="object-cover object-center w-full h-full" :field="image" />
    </div>
  </div>
</template>
