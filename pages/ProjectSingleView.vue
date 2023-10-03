<script setup lang="ts">
import transitionConfig from "~/helpers/transitionConfig";
import Lenis from "@studio-freight/lenis";
import {usePrismic} from "@prismicio/vue";
import SliderImage from "~/components/slices/SliderImage.vue";
import TextImage from "~/components/slices/TextImage.vue";
import SimpleText from "~/components/slices/SimpleText.vue";
import Image from "~/components/slices/Image.vue";
import QuoteLine from "~/components/slices/QuoteLine.vue";
import DoubleImage from "~/components/slices/DoubleImage.vue";
import {useFirstVisitComposable} from "../composables/firstVisitComposable"

const {firstVisitState, firstVisitComplete} = useFirstVisitComposable()


const route = useRoute()

definePageMeta({
  pageTransition: transitionConfig,
  name: 'projects-single',
  path: '/projets/:uid',
});

const pageContainer = ref()
const mainContent = ref()

onMounted(() => {
  const lenis = new Lenis({duration: 1.8})
  lenis.on('scroll', () => {
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  if(project) {
    console.log(project)
  }
})

onBeforeUnmount(() => {
  if(firstVisitState.isFirstVisit) {
    firstVisitComplete()
  }
})

const { client } = usePrismic()
const {data: project } = await useAsyncData('project', () => client.getByUID('project', route.params.uid))
</script>
<template>
  <div v-if="project" ref="pageContainer" class="relative bg-black min-h-screen h-full w-screen">
    <TransitionLayer />
    <section ref="mainContent" style="z-index: 1" class="relative main-content bg-black min-h-screen">
      <div class="absolute z-10 left-10 -md:absolute -md:pl-2 -md:pr-0 -md:left-4">
        <LogoInitial :go-home="true" class="mt-8" />
      </div>
      <BackButton class="absolute z-10 left-24 top-6 -md:left-4 -md:top-16" target="projects-list" />
      <ProjectHero
          :projectName="project.data.title[0].text"
          :thumbnail="project.data.thumbnail"
          :logo="project.data.logo"
          :detailedYear="project.data.detailed_year"
          :context="project.data.context"
          :expertises="project.data.expertises"
          :projectUrl="project.data.url.url"
      />
      <div class="pb-24 -md:pb-0">
        <SliceZone
            :slices="project.data.body"
            :components="{
          slider_image: SliderImage,
          text_image: TextImage,
          simple_text: SimpleText,
          image: Image,
          quote_line: QuoteLine,
          double_image: DoubleImage,
        }"
            :context="{pageContainer: pageContainer}"
        />
      </div>
    </section>
    <FooterLight :mainContent="mainContent" style="z-index: 0" class="relative" />
  </div>
</template>
