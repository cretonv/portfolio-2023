<script setup lang="ts">
import DotDark300 from "~/components/svg/dot/dotDark300.vue";
import DotDark600 from "~/components/svg/dot/dotDark600.vue";
import FooterQuote from "~/components/FooterQuote.vue";
import LinkInline from "~/components/LinkInline.vue";
import {onMounted, onUpdated} from "@vue/runtime-core";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useCustomCursorComposable} from "~/composables/customCursorComposable";
import {useTransitionComposable} from "~/composables/transitionComposable";
import {useFirstVisitComposable} from "~/composables/firstVisitComposable";
import {watch} from "vue";

const {transitionState} = useTransitionComposable()
const {firstVisitState} = useFirstVisitComposable()
const {toggleMainCursorToHover} = useCustomCursorComposable()

const props = defineProps<{
  mainContent: HTMLElement
}>()

const { client } = usePrismic()
const { data: footer } = await useAsyncData('footer', () => client.getSingle('footer'))

const footerContainer = ref()
gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  if (transitionState.transitionComplete || firstVisitState.isFirstVisit) {
    initGsap()
  }
})
watch(
    () => transitionState.transitionComplete,
    (state) => {
      if (state) {
        initGsap()
      }
    }
)
onUpdated(() => {
  initGsap()
})

const initGsap = () => {
  if(window.innerWidth > 768) {
    gsap.set(footerContainer.value, { yPercent: -50 })
    const uncover = gsap.timeline({ paused:true })
    uncover.to(footerContainer.value, { yPercent: 0, ease: 'none' })
    ScrollTrigger.create({
      trigger: props.mainContent,
      start: 'bottom bottom',
      end: '+=75%',
      animation: uncover,
      scrub: true,
    })
  }
}
</script>
<template>
  <footer class="h-[75vh] w-full -md:h-fit">
    <section
        ref="footerContainer"
        class="footer-container h-[75vh] bg-white-secondary px-10 flex flex-col justify-end -md:h-fit -md:pt-8 -md:px-8"
    >
      <div class="flex mb-10 -md:flex-wrap -md:mb-6">
        <!-- TODO: Refacto cette div avec des composants -->
        <div class="w-1/2 -md:w-full -md:mb-6">
          <img src="/svg/name.svg" alt="Name text" class="w-full h-auto">
          <div class="flex flex-col float-right -md:float-left">
            <a :href="'mailto:' + footer.data.email" class="mt-7 block font-porpora -md:mt-6">
              {{footer.data.email}}
            </a>
            <div class="mt-12 -md:mt-6">
              <div class="uppercase text-sm font-porpora flex flex-col">
                <span>Réseaux</span>
                <div class="mt-4 flex gap-4">
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
          </div>
        </div>
        <div v-if="footer" class="w-1/2 -md:w-full">
          <div class="w-2/3 float-right -md:w-full">
            <div class="mb-8 -md:mb-6">
              <div class="flex items-center">
                <dotDark300 class="mr-2" />
                <span class="uppercase text-sm font-porpora">Formations</span>
              </div>
              <div class="pl-4 pt-4">
                <div v-for="training in footer.data.trainings" class="flex gap-8 font-lato text-xs mb-4">
                  <div>{{training.year}}</div>
                  <div>
                    <div>{{training.name}}</div>
                    <div class="font-light">{{training.place}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="-md:hidden">
              <div class="flex items-center">
                <dotDark600 class="mr-2" />
                <span class="uppercase text-sm font-porpora">Loisirs</span>
              </div>
              <div class="pl-4 pt-3">
                <div v-for="hobby in footer.data.hobbies" class="flex gap-8 font-lato text-sm mb-2">
                  {{hobby.hobby}}
                </div>
              </div>

            </div>
            <LinkInline
                class="mt-8"
                link="/pdf/CV.pdf"
                target="_blank"
                dotType="dark600"
                :dark-mode="true"
            >
              Télécharger le CV complet
            </LinkInline>
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
