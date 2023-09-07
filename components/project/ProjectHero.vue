<script setup lang="ts">
import {defineProps} from "vue"
defineProps<{
  thumbnail: object
}>()
</script>
<template>
  <div class="relative min-h-screen">
    <img
        v-if="thumbnail.url"
        class="absolute top-0 left-0 w-full h-full object-cover object-center"
        :src="thumbnail.url"
        :alt="thumbnail.alt">
  </div>
</template>
