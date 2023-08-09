<script setup lang="ts">
const { client } = usePrismic()
//const { data: home } = await useAsyncData('home', () => client.getByUID('project', 'journiz'))
const { data: projects } = await useAsyncData('projects', () => client.getAllByType('project'))
</script>
<template>
  <div>Project List here </div>
</template>
