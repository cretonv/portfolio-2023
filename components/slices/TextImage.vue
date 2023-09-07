<script setup lang="ts">
import {defineProps} from 'vue'
const props = defineProps<{
  slice: Object
}>()
</script>
<template>
  <div class="flex">
    Ici j'aurais mon composant text + image.
  </div>
</template>
