<script setup lang="ts">
import {defineProps} from "vue"
const props = defineProps<{
  uid: string,
  client: object
}>()
const {data: project } = await useAsyncData(props.uid, () => props.client.getByUID('project', props.uid))
</script>
<template>
  <div class="item-container relative">
    <PrismicImage class="absolute left-0 right-0 object-cover object-center w-full h-full" :field="project.data.list_thumbnail" />
    <img class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :src="project.data.logo.url" :alt="project.data.logo.alt">
  </div>
</template>
<style scoped>
.item-container::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.2;
  z-index: 1;
}
</style>
