<script setup lang="ts">
defineProps<{
  quote: object
}>()
</script>
<template>
  <div class="flex justify-between items-center border-t border-black pt-2 pb-8 text-xs font-porpora">
    <img src="/svg/quote.svg" alt="Quote icon">
    <span v-if="quote.content">{{quote.content}}</span>
    <span v-if="quote.author">- {{quote.author}}</span>
  </div>
</template>
