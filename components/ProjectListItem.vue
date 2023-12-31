<script setup lang="ts">
import {ref} from "vue";
import {gsap} from "gsap";
import LinkInline from "~/components/LinkInline.vue";import {useCustomCursorComposable} from "~/composables/customCursorComposable";

const {toggleMainCursorToHover} = useCustomCursorComposable()
const props =  defineProps<{
  project: object,
  index: number
}>()
const emit = defineEmits(['onOpen'])

const imgContent = ref()
const content = ref()
const buttonHover = ref(false)
const projectId = ref()
const open = ref(false)
const item = ref()
const itemLine = ref()

const toggleOpening = () => {
  if(open.value) {
    close()
  } else {
    emit('onOpen', props.project.id)
    imgContent.value.parentElement.classList.add('open')
    const tl = gsap.timeline()
    tl.to(content.value, {duration: 0.7, height: "auto"}).to(imgContent.value, {duration: 0.7, height: "100%"})
    open.value = true
  }
}
const close = () => {
  if(open) {
    imgContent.value.parentElement.classList.remove('open')
    gsap.to(imgContent.value, {duration: 0.7, height: 0})
    gsap.to(content.value, {duration: 0.7, height: 0})
    open.value = false
  }
}


const clickOnImage = async () => {
  if(props.project.data.body.length > 0) {
    await goToProjectPage()
  } else if(props.project.data.url.url) {
    await navigateTo(props.project.data.url.url ,{
      external: true,
      open: {
        target: '_blank'
      }
    })
  }
  toggleMainCursorToHover(false);
}

onMounted(() => {
  projectId.value = props.project.id
  gsap.from(item.value, {
    opacity: 0,
    duration: 0.25,
    delay: 1.5 + 0.35 * props.index,
    ease: "sine.out"
  })
})

defineExpose({
  close,
  open,
  projectId
})
</script>
<template>
  <div ref="item" class="flex w-full items-stretch opacity-100">
    <div class="w-5/12 py-8 pr-12  -md:hidden">
      <div
          class="h-0 overflow-hidden float-right"
          ref="imgContent"
          @mousedown="clickOnImage"
          @mouseleave="buttonHover = false; toggleMainCursorToHover(false);"
          @mouseover="buttonHover = true; toggleMainCursorToHover(true);"
      >
        <div
            class="relative w-80 h-full bg-white transition-all duration-1000"
            :class="buttonHover ? 'grayscale-0' : 'grayscale'"
        >
          <img
              v-if="project.data.list_thumbnail"
              class="absolute top-0 left-0 w-full h-full object-cover object-top"
              :src="project.data.list_thumbnail.url"
              alt="Thumbnail"
          >
          <img class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-auto" :src="project.data.logo.url" :alt="project.data.logo.alt">
        </div>
      </div>
    </div>
    <div class="w-7/12 pt-4 px-4 flex-1 -md:w-full -md:px-0">
      <!-- HEADING -->
      <div class="flex items-end" @click="toggleOpening">
        <h2
          v-if="project.data.title"
          class="grow font-title text-4xl"
          @mouseover="toggleMainCursorToHover(true)"
          @mouseleave="toggleMainCursorToHover(false)"
        >
          {{project.data.title[0].text}}
        </h2>
        <div v-if="project.data.year" class="w-fit font-light">{{project.data.year}}</div>
      </div>
      <!-- CONTENT -->
      <div class="relative transition-all duration-700 overflow-hidden h-auto item-content pb-4">
        <div ref="content" class="h-0">
          <div class="flex gap-10 pt-8 h-auto -md:flex-wrap -md:gap-6">
            <div v-if="project.data.resume" class="w-1/2 -md:w-full">
              <div class="font-light text-xs mb-3">Présentation</div>
              <p class="text-sm">{{project.data.resume[0].text}}</p>
            </div>
            <div v-if="project.data.challenges" class="w-1/2 -md:w-full">
              <div class="font-light text-xs mb-3">Enjeux</div>
              <ul class="pl-3">
                <li v-for="challenge in project.data.challenges" class="list-disc text-sm leading-6">
                  {{challenge.challenge}}
                </li>
              </ul>
            </div>
          </div>
          <div class="flex gap-10 pt-8 h-auto items-stretch -md:flex-wrap -md:gap-6">
            <div v-if="project.data.technologies" class="w-1/2 -md:w-full">
              <div class="font-light text-xs mb-3">Technologies</div>
              <ul class="flex flex-wrap gap-2">
                <li v-for="technologie in project.data.technologies" class="techno-item text-sm leading-4">
                  {{technologie.technologie}}
                </li>
              </ul>
            </div>
            <div class="w-1/2 flex items-end justify-between gap-4 -md:flex-wrap -md:justify-start -md:w-full">
              <LinkInline
                  v-if="project.data.body.length > 0"
                  :dynamicPage="{ name: 'projects-single', params: {uid: props.project.uid} }"
                  @mouseleave="buttonHover = false"
                  @mouseover="buttonHover = true"
                  @mousedown="toggleMainCursorToHover(false)"
                  dot-type="300"
              >
                Voir le projet
              </LinkInline>
              <LinkInline
                  v-if="project.data.url.url"
                  :link="project.data.url.url"
                  @mouseleave="buttonHover = false"
                  @mouseover="buttonHover = true"
                  target="_blank"
                  rel=“noreferrer”
                  dot-type="600"
              >
                Voir le site
              </LinkInline>
            </div>
          </div>
        </div>
        <div ref="itemLine" class="item-line absolute bottom-0 left-0 w-full h-px bg-white" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.techno-item:not(:last-child)::after  {
  content: "·";
  margin-left: 8px;
}
</style>
