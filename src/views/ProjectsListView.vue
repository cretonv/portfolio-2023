<script setup lang="ts">
import ProjectListItem from "~/src/components/ProjectListItem.vue";

const { client } = usePrismic()
const { data: projects } = await useAsyncData('projects', () => client.getAllByType('project'))
</script>
<template>
  <div class="relative bg-black min-h-screen h-full w-screen px-10">
    <div class="flex flex-wrap w-full text-white font-lato" v-if="projects">
      <ProjectListItem :key="project.id" v-for="project in projects" :project="project" />
    </div>
  </div>
</template>
