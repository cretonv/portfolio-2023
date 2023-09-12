<script setup lang="ts">
import FooterQuote from "~/components/FooterQuote.vue";
import {onUpdated} from "@vue/runtime-core";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useCustomCursorComposable} from "~/composables/customCursorComposable";

const {toggleMainCursorToHover} = useCustomCursorComposable()

const props = defineProps<{
  mainContent: HTMLElement
}>()

const { client } = usePrismic()
const { data: footer } = await useAsyncData('footer', () => client.getSingle('footer'))

const footerContainer = ref()
gsap.registerPlugin(ScrollTrigger)
onUpdated(() => {
  if(window.innerWidth > 768) {
    gsap.set(footerContainer.value, { yPercent: -50 })
    const uncover = gsap.timeline({ paused:true })
    uncover.to(footerContainer.value, { yPercent: 0, ease: 'none' })
    ScrollTrigger.create({
      trigger: props.mainContent,
      start: 'bottom bottom',
      end: '+=40%',
      animation: uncover,
      scrub: true,
    })
  }
})
</script>
<template>
  <footer class="h-[40vh] w-full -md:h-fit">
    <section
        ref="footerContainer"
        class="footer-container h-[40vh] bg-white-secondary px-10 flex flex-col justify-end -md:h-fit -md:pt-8 -md:px-8"
    >
      <div class="flex mb-16 items-end justify-between -md:flex-wrap -md:mb-6">
        <img src="/svg/name.svg" alt="Name text" class="w-1/2 h-auto">
        <a
            :href="'mailto:' + footer.data.email"
            class="mt-7 block font-porpora cursor-none -md:mt-6"
            @mouseover="toggleMainCursorToHover(true)"
            @mouseleave="toggleMainCursorToHover(false)"
        >
          {{footer.data.email}}
        </a>
        <div class="mt-12 -md:mt-6">
          <div class="text-sm font-porpora flex gap-4">
            <a
                v-for="social in footer.data.socials"
                :href="social.url.url"
                :target="social.url.target"
                class="cursor-none"
                @mouseover="toggleMainCursorToHover(true)"
                @mouseleave="toggleMainCursorToHover(false)"
            >
              <img class="h-13 w-auto" :src="social.icon.url" :alt="social.icon.alt">
            </a>
          </div>
        </div>
      </div>
      <div class="mb-6 -md:mb-4 w-full">
        <ClientOnly fallback-tag="div" fallback="Loading spotify component...">
          <Spotify />
        </ClientOnly>
      </div>
      <FooterQuote
          v-if="footer.data.quotes"
          :quote="footer.data.quotes[Math.floor(Math.random()*footer.data.quotes.length)]"
      />
    </section>
  </footer>
</template>
