<script setup lang="ts">
import ProjectListItem from "~/components/ProjectListItem.vue";
import Lenis from "@studio-freight/lenis";
import transitionConfig from "~/helpers/transitionConfig";

definePageMeta({
  pageTransition: transitionConfig,
  name: 'projects-list',
  path: '/projets',
});

const { client } = usePrismic()
const {data: general } = await useAsyncData('general', () => client.getSingle('general'))
const { data: projects } = await useAsyncData('projects', () => client.getAllByType('project', {
  orderings: {
    field: 'my.project.year',
    direction: 'desc',
  },
}))

const itemsComponents = ref([])

onMounted(() => {
  const lenis = new Lenis({duration: 1.8})
  lenis.on('scroll', () => {})

  function raf(time:number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
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
  <div class="relative bg-black min-h-screen h-full w-screen p-10">
    <div class="transition-layer z-20 fixed left-0 top-0 bg-black h-screen" />
    <h1 class="absolute left-0 top-0 font-title text-white text-4xl pt-12 pl-10">{{general.data.projects_listing_title[0].text}}</h1>
    <div class="flex flex-wrap w-full text-white font-lato -md:mt-16" v-if="projects">
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
  </div>
</template>
<style>
.project-list-item:first-child > .open {
  padding-top: 80px;
}
</style>
