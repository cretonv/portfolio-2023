<script setup lang="ts">
import {defineProps} from "vue"
defineProps<{
  projectName: string,
  thumbnail: object,
  logo: object,
  detailedYear: string,
  context: string,
  expertises: [object]
}>()
</script>
<template>
  <div class="relative min-h-screen text-white flex flex-col justify-end mb-10">
    <!--<div
      v-if="thumbnail.url"
      class="absolute top-0 left-0 w-full h-full"
      :style="
        'background: linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url('
        + thumbnail.url
        + '), lightgray 50% / cover no-repeat;'
      "
    />-->
    <div class="thumbnail absolute top-0 left-0 w-full h-full">
      <img
          v-if="thumbnail.url"
          class="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
          :src="thumbnail.url"
          :alt="thumbnail.alt">
    </div>
    <div v-if="logo" class="logo absolute top-1/2 -translate-y-1/2 w-screen">
      <img class="mx-auto h-[200px] w-auto" :src="logo.url" :alt="logo.alt">
    </div>
    <div class="hero-infos relative px-10 pt-24 w-screen h-auto">
      <div class="ml-10 pb-9 font-title text-6xl text-white border-white border-solid border-b-[0.5px]">{{projectName}}</div>
      <div class="flex ml-10 py-8 gap-20">
        <div class="font-lato text-xs" v-if="detailedYear">
          <span class="font-light">Date</span> <br>
          <p class="font-medium mt-1">{{ detailedYear }}</p>
        </div>
        <div class="font-lato text-xs" v-if="context">
          <span class="font-light">Context</span> <br>
          <p class="font-medium mt-1">{{ context }}</p>
        </div>
        <div class="font-lato text-xs" v-if="expertises">
          <span class="font-light">Expertises</span> <br>
          <p class="font-medium mt-1">
            <span v-for="expertise in expertises" class="expertise">{{ expertise.expertise }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.expertise:not(:last-child)::after {
  content: '  ·  ';
}
.hero-infos {
  background: linear-gradient(0deg, #181618 0%, rgba(24, 22, 24, 0.00) 100%);
}
.thumbnail::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #000;
  opacity: 0.45;
}
</style>
