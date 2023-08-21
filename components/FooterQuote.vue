<script setup lang="ts">
defineProps<{
  quote: object
}>()
</script>
<template>
  <div class="flex justify-between items-center border-t border-black pt-2 pb-8 text-xs font-porpora -md:flex-wrap -md:items-start">
    <img class="-md:w-1/12 -md:pr-4 -md:mt-1" src="/svg/quote.svg" alt="Quote icon">
    <span class="-md:w-11/12" v-if="quote.content">{{quote.content}}</span>
    <span class="-md:w-full -md:pl-[8.333333%] -md:mt-1" v-if="quote.author">- {{quote.author}}</span>
  </div>
</template>
