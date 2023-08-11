<script setup lang="ts">
import {ref} from "vue";
import {gsap} from "gsap";
import LinkInline from "~/src/components/LinkInline.vue";

defineProps<{
  project: object
}>()
const imgContent = ref()
const content = ref()
const buttonHover = ref(false)
let open = false

const toggleOpening = () => {
  if(open) {
    gsap.to(imgContent.value, {duration: 0.7, height: 0})
    gsap.to(content.value, {duration: 0.7, height: 0})
    open = false
  } else {
    const tl = gsap.timeline()
    tl.to(content.value, {duration: 0.7, height: "auto"}).to(imgContent.value, {duration: 0.7, height: "100%"})
    open = true
  }
}
</script>
<template>
  <div class="flex w-full items-stretch">
    <div class="w-5/12 py-8 pr-12">
      <div
          class="h-0 overflow-hidden float-right"
          ref="imgContent"
      >
        <div
            class="relative w-80 h-full bg-white transition-all duration-1000"
            :class="buttonHover ? 'grayscale-0' : 'grayscale'"
        >
          <img
              v-if="project.data.thumbnail"
              class="absolute top-0 left-0 w-full h-full object-cover object-top"
              :src="project.data.thumbnail.url"
              alt="Thumbnail"
          >
        </div>
      </div>
    </div>
    <div class="w-7/12 pt-4 px-4 flex-1">
      <!-- HEADING -->
      <div class="flex items-end" @click="toggleOpening">
        <h2 v-if="project.data.title" class="grow font-title text-4xl cursor-pointer">{{project.data.title[0].text}}</h2>
        <div v-if="project.data.year" class="w-fit font-light">{{project.data.year}}</div>
      </div>
      <!-- CONTENT -->
      <div class="transition-all duration-700 overflow-hidden h-auto item-content pb-4">
        <div ref="content" class="h-0">
          <div class="flex gap-10 pt-8 h-auto">
            <div v-if="project.data.resume" class="w-1/2">
              <div class="font-light text-xs mb-3">Présentation</div>
              <p class="text-sm">{{project.data.resume[0].text}}</p>
            </div>
            <div v-if="project.data.challenges" class="w-1/2">
              <div class="font-light text-xs mb-3">Enjeux</div>
              <ul class="pl-3">
                <li v-for="challenge in project.data.challenges" class="list-disc text-sm leading-6">
                  {{challenge.challenge}}
                </li>
              </ul>
            </div>
          </div>
          <div class="flex gap-10 pt-8 h-auto items-stretch">
            <div v-if="project.data.technologies" class="w-1/2">
              <div class="font-light text-xs mb-3">Technologies</div>
              <ul class="flex flex-wrap gap-2">
                <li v-for="technologie in project.data.technologies" class="techno-item text-sm leading-4">
                  {{technologie.technologie}}
                </li>
              </ul>
            </div>
            <div class="w-1/2 flex items-end justify-end gap-4">
              <LinkInline
                  v-if="project.data.body.length > 0"
                  @mouseleave="buttonHover = false"
                  @mouseover="buttonHover = true"
                  link="#"
                  dot-type="300">
                Voir la page du projet`
              </LinkInline>
              <LinkInline
                  v-if="project.data.url"
                  :link="project.data.url.url"
                  @mouseleave="buttonHover = false"
                  @mouseover="buttonHover = true"
                  target="_blank"
                  dot-type="600">
                Voir le projet
              </LinkInline>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.item-content {
  border-bottom: solid 1px #FFFFFF;
}
.techno-item:not(:last-child)::after  {
  content: "·";
  margin-left: 8px;
}
</style>
