<script setup>
import getSong from "~/helpers/spotifyNowPlaying"
const song = ref()
song.value = await getSong()
</script>
<template>
  <div class="flex gap-3 items-stretch">
    <div v-if="song.albumImageUrl" class="relative w-10 h-10">
      <img :src="song.albumImageUrl" class="relative object-cover w-full h-full" alt="Song album image z-1">
    </div>
    <div class="text-xs">
      <div v-if="song.title" class="font-porpora h-1/2 leading-5">
        {{song.title}}
      </div>
      <div v-if="song.artist" class="font-lato h-1/2 leading-5 font-light">
        {{song.artist}}
      </div>
    </div>
  </div>
</template>
