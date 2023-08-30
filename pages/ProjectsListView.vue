<script setup lang="ts">
import ProjectListItem from "~/components/ProjectListItem.vue";
import Lenis from "@studio-freight/lenis";
import transitionConfig from "~/helpers/transitionConfig";
import SplitType from "split-type";
import {gsap} from "gsap";
import {useFirstVisitComposable} from "~/composables/firstVisitComposable";

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

onMounted(() => {
  const lenis = new Lenis({duration: 1.8})
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
    console.log(item.projectId !== openingItemId)
    console.log(item.open)
    if(item.projectId !== openingItemId && item.open) {
      item.close()
    }
  })
}
</script>
<template>
  <div class="relative bg-black min-h-screen h-full w-screen">
    <TransitionLayer />
    <BackButton class="absolute left-4 top-14 w-10 h-auto z-10" />
    <section ref="mainContent" style="z-index: 1" class="relative main-content bg-black pb-4 p-10 min-h-screen">
      <h1 ref="title" class="absolute left-0 top-0 font-title text-white text-4xl pt-12 pl-16 opacity-0 overflow-hidden">
        {{general.data.projects_listing_title[0].text}}
      </h1>
      <div class="flex flex-wrap w-full text-white font-lato -md:mt-16 pb-8" v-if="projects">
        <ProjectListItem
            :key="project.id"
            v-for="(project, index) in projects"
            :ref="(el) => (itemsComponents[index] = el)"
            :project="project"
            :index="index"
            class="project-list-item"
            @on-open="onItemOpen"
        />
      </div>
    </section>
    <Footer :mainContent="mainContent" style="z-index: 0" class="relative" />
  </div>
</template>
<style>
.project-list-item:first-child > .open {
  padding-top: 80px;
}
</style>
