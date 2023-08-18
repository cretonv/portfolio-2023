<script setup lang="ts">
const { client } = usePrismic()
const { data: footer } = await useAsyncData('general', () => client.getSingle('footer'))
</script>
<template>
  <footer>
    <h2>{{footer.data.title[0].text}}</h2>
  </footer>
</template>
