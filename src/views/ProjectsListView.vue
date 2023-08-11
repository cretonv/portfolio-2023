<script setup lang="ts">
import ProjectListItem from "~/src/components/ProjectListItem.vue";

const { client } = usePrismic()
const {data: general } = await useAsyncData('general', () => client.getSingle('general'))
const { data: projects } = await useAsyncData('projects', () => client.getAllByType('project'))
</script>
<template>
  <div class="relative bg-black min-h-screen h-full w-screen p-10">
    <h1 class="absolute left-0 top-0 font-title text-white text-4xl pt-12 pl-10">{{general.data.projects_listing_title[0].text}}</h1>
    <div class="flex flex-wrap w-full text-white font-lato" v-if="projects">
      <ProjectListItem :key="project.id" v-for="project in projects" :project="project" />
    </div>
  </div>
</template>
