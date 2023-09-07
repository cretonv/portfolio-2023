<script setup lang="ts">
import transitionConfig from "~/helpers/transitionConfig";
import {usePrismic} from "@prismicio/vue";
import SliderImage from "~/components/slices/SliderImage.vue";
import TextImage from "~/components/slices/TextImage.vue";

const route = useRoute()

definePageMeta({
  pageTransition: transitionConfig,
  name: 'projects-single',
  path: '/projets/:uid',
});

const { client } = usePrismic()
const {data: project } = await useAsyncData('project', () => client.getByUID('project', route.params.uid))
</script>
<template>
  <div class="relative bg-black min-h-screen h-full w-screen">
    <TransitionLayer />
    <div class="text-white">
      Ici on auras le single du projet {{$route.params.uid}} <br>
      En dessous le test des slices
    </div>
    <div>
      <SliceZone
        :slices="project.data.body"
        :components="{slider_image: SliderImage, text_image: TextImage}" />
    </div>
  </div>
</template>
