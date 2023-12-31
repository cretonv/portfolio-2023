<script setup lang="ts">
import ProjectListItem from "~/components/ProjectListItem.vue";
import Lenis from "@studio-freight/lenis";
import transitionConfig from "~/helpers/transitionConfig";
import SplitType from "split-type";
import {gsap} from "gsap";
import {useFirstVisitComposable} from "~/composables/firstVisitComposable";
import {usePrismic} from "@prismicio/vue";

definePageMeta({
  pageTransition: transitionConfig,
  name: 'projects-list',
  path: '/projets',
});

const {firstVisitState, firstVisitComplete} = useFirstVisitComposable()

const { client } = usePrismic()
const {data: general } = await useAsyncData('general', () => client.getSingle('general'))
const { data: projects } = await useAsyncData('projects', () => client.getAllByType('project', {
  orderings: {
    field: 'my.project.year',
    direction: 'desc',
  },
}))

const title = ref()
const itemsComponents = ref([])
const mainContent = ref()
let splitTitle
let lenis

onMounted(() => {
  lenis = new Lenis({duration: 1.8})
  lenis.on('scroll', () => {})

  function raf(time:number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  // To don't display h1 before load (without style)
  title.value.classList.remove('opacity-0')
  splitTitle = SplitType.create(title.value, {types: 'words, chars'})
  // Var use to make delay and stagger
  let lineCharCounter: number

  if(splitTitle.chars) {
    lineCharCounter = 0
    splitTitle.chars.forEach((char) => {
      gsap.from(char, {
        scrollTrigger: title.value,
        y: 100 + 20 * lineCharCounter,
        duration: 1.25,
        delay: 0.25,
        stagger: { amount: 1.3 * lineCharCounter },
        ease: "sine.out"
      })
      lineCharCounter ++
    })
  }
})
onBeforeUnmount(() => {
  if(firstVisitState.isFirstVisit) {
    firstVisitComplete()
  }
})
/**
 * Method use to close open element when other element is open, trigger on opening element event
 * @param openingItemId
 */
const onItemOpen = (openingItemId) => {
  itemsComponents.value.forEach((item) => {
    if(item.projectId !== openingItemId && item.open) {
      item.close()
    }
  })
}
const scrollToClickedItem = (e) => {
  if(window.innerWidth < 768) {
    const targetElement = e.target
    setTimeout((target = targetElement) => {lenis.scrollTo(target, {offset: -32})}, 700)
  }
}
</script>
<template>
  <div class="relative bg-black min-h-screen h-full w-screen">
    <TransitionLayer />
    <section ref="mainContent" style="z-index: 1" class="relative main-content bg-black pb-4 p-10 min-h-screen pt-13">
      <!--<div class="pl-10 pr-14 -md:absolute -md:pl-4 -md:pr-0"><LogoInitial class="mt-8" /></div>-->
      <BackButton class="absolute left-16 top-2 z-10 -md:left-10"/>
      <h1 ref="title" class="left-0 top-1 font-title text-white text-4xl pt-8 pl-8 opacity-0 overflow-hidden -md:pl-0">
        {{general.data.projects_listing_title[0].text}}
      </h1>
      <div class="flex flex-wrap w-full text-white font-lato -md:mt-4 pb-8" v-if="projects">
        <ProjectListItem
            :key="project.id"
            v-for="(project, index) in projects"
            :ref="(el) => (itemsComponents[index] = el)"
            :project="project"
            :index="index"
            class="project-list-item"
            @on-open="onItemOpen"
            @mousedown="scrollToClickedItem"
        />
      </div>
    </section>
    <Footer :mainContent="mainContent" style="z-index: 0" class="relative" />
  </div>
</template>
