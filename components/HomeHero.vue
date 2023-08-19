<script setup lang="ts">
import TitleH1 from "./TitleH1.vue";
import LogoInitial from "./LogoInitial.vue";
import Name from "./Name.vue";
import BrokenCircle from "./BrokenCircle.vue";
import {ref} from "vue";

const container = ref(null)
</script>
<template>
  <div ref="container" class="relative bg-black w-full h-full min-h-screen flex item-stretch -md:overflow-hidden">
    <div class="pl-10 pr-14 -md:absolute -md:pl-4 -md:pr-0"><LogoInitial class="mt-8" /></div>
    <div class="flex flex-col justify-center -md:pl-12 -md:pr-12">
      <TitleH1 class="mb-14">Développeur <br> FRONT-END <br> créatif</TitleH1>
    </div>
    <BrokenCircle class="absolute top-[20%] right-[7.5%]" :container="container" />
    <Name class="absolute bottom-6 right-4"> vincent creton </Name>
  </div>
</template>
