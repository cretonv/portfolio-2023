<script setup lang="ts">
import TitleH1 from "../components/TitleH1.vue";
import LogoInitial from "../components/LogoInitial.vue";
import LinkInline from "../components/LinkInline.vue";
import Name from "../components/Name.vue";
import BrokenCircle from "../components/BrokenCircle.vue";
import {ref} from "vue";

const container = ref(null)

</script>

<template>
  <div ref="container" class="relative bg-black w-full h-full min-h-screen flex item-stretch -md:overflow-hidden">
    <div class="pl-10 pr-14 -md:absolute -md:pl-4 -md:pr-0"><LogoInitial class="mt-8" /></div>
    <div class="flex flex-col justify-center -md:pl-12 -md:pr-12">
      <TitleH1 class="mb-14">Développeur <br> FRONT-END <br> créatif</TitleH1>
      <p class="text-sm text-white-secondary max-w-[540px]">
        Mon portfolio est en cours de création... <br>
        Encore un peu de patience, le temps pour moi de vous fournir une expérience en ligne qui reflète ma passion pour le développement et mon engagement envers la qualité.
      </p>
      <p class="text-white-secondary mb-2 mt-8 max-w-[540px] font-light">Pour en savoir plus sur mon profil :</p>
      <div class="max-w-[540px] flex justify-between pr-4 -md:flex-wrap -md:gap-3">
        <LinkInline class="-md:w-full" link="/pdf/CV.pdf" target="_blank" dotType="600"> Télécharger le CV complet </LinkInline>
        <LinkInline class="-md:w-full" link="https://www.linkedin.com/in/vincentcreton/" target="_blank" dotType="300"> Linkedin </LinkInline>
        <LinkInline class="-md:w-full" link="https://unsplash.com/@vcreton" target="_blank" dotType="100"> Unsplash </LinkInline>
      </div>
    </div>
    <BrokenCircle class="absolute top-[20%] right-[7.5%]" :container="container" />
    <Name class="absolute bottom-6 right-4"> vincent creton </Name>
    <!--<Suspense>
    <TestQueryTina class="absolute top-0 left-0" />
    </Suspense>-->
  </div>
</template>

<style scoped>

</style>
