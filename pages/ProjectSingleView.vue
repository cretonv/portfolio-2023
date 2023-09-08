<script setup lang="ts">
import transitionConfig from "~/helpers/transitionConfig";
import Lenis from "@studio-freight/lenis";
import {usePrismic} from "@prismicio/vue";
import SliderImage from "~/components/slices/SliderImage.vue";
import TextImage from "~/components/slices/TextImage.vue";
import SimpleText from "~/components/slices/SimpleText.vue";
import Image from "~/components/slices/Image.vue";

const route = useRoute()

definePageMeta({
  pageTransition: transitionConfig,
  name: 'projects-single',
  path: '/projets/:uid',
});

onMounted(() => {
  const lenis = new Lenis({duration: 1.8})
  lenis.on('scroll', () => {
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
})

const { client } = usePrismic()
const {data: project } = await useAsyncData('project', () => client.getByUID('project', route.params.uid))
</script>
<template>
  <div class="relative bg-black min-h-screen h-full w-screen">
    <TransitionLayer />
    <div class="absolute z-10 left-10 -md:absolute -md:pl-4 -md:pr-0"><LogoInitial class="mt-8" /></div>
    <BackButton class="absolute z-10 left-24 top-6" target="projects-list" />
    <ProjectHero
        :projectName="project.data.title[0].text"
        :thumbnail="project.data.thumbnail"
        :logo="project.data.logo"
        :detailedYear="project.data.detailed_year"
        :context="project.data.context"
        :expertises="project.data.expertises"
    />
    <div>
      <SliceZone
        :slices="project.data.body"
        :components="{slider_image: SliderImage, text_image: TextImage, simple_text: SimpleText, image: Image}" />
    </div>
  </div>
</template>
