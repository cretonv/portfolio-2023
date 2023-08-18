<script setup lang="ts">
import DotDark300 from "~/src/components/svg/dot/dotDark300.vue";
import DotDark600 from "~/src/components/svg/dot/dotDark600.vue";
import FooterQuote from "~/src/components/FooterQuote.vue";
import LinkInline from "~/src/components/LinkInline.vue";

const { client } = usePrismic()
const { data: footer } = await useAsyncData('footer', () => client.getSingle('footer'))
</script>
<template>
  <footer class="h-[75vh] w-full bg-white-secondary mt-4 px-10 flex flex-col justify-end">
    <div class="flex mb-8">
      <div class="w-1/2">
        <img src="/svg/name.svg" alt="Name text" class="w-full h-auto">
        <div class="flex flex-col float-right">
          <a :href="'mailto' + footer.data.email" class="mt-7 block font-porpora">{{footer.data.email}}</a>
          <div class="mt-12">
            <div class="uppercase text-sm font-porpora flex flex-col">
              <span>Réseaux</span>
              <div class="mt-4 flex gap-4">
                <a v-for="social in footer.data.socials" :href="social.url.url" :target="social.url.target">
                  <img class="h-13 w-auto" :src="social.icon.url" :alt="social.icon.alt">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <div class="w-2/3 float-right">
          <div class="mb-8">
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
          <div>
            <div class="flex items-center">
              <dotDark600 class="mr-2" />
              <span class="uppercase text-sm font-porpora">Formations</span>
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
    <FooterQuote
        v-if="footer.data.quotes"
        :quote="footer.data.quotes[Math.floor(Math.random()*footer.data.quotes.length)]"
    />
  </footer>
</template>
