<script setup lang="ts">
import ProjectListItem from "~/components/ProjectListItem.vue";
import Lenis from "@studio-freight/lenis";

definePageMeta({
  pageTransition: {
    name: 'page-transiton',
    mode: 'out-in',
    onEnter: (el, done) => {
      console.log('ENTER')
      console.log(el)
      done()
    },
    onLeave: (el, done) => {
      console.log('LEAVE')
      console.log(el)
      done()
    },
  },
  name: 'projects-list',
  path: '/projets',
});

const { client } = usePrismic()
const {data: general } = await useAsyncData('general', () => client.getSingle('general'))
const { data: projects } = await useAsyncData('projects', () => client.getAllByType('project'))

onMounted(() => {
  const lenis = new Lenis({duration: 1.8})
  lenis.on('scroll', () => {})

  function raf(time:number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
})
</script>
<template>
  <div class="relative bg-black min-h-screen h-full w-screen p-10">
    <h1 class="absolute left-0 top-0 font-title text-white text-4xl pt-12 pl-10">{{general.data.projects_listing_title[0].text}}</h1>
    <div class="flex flex-wrap w-full text-white font-lato" v-if="projects">
      <ProjectListItem :key="project.id" v-for="project in projects" :project="project" />
    </div>
  </div>
</template>
