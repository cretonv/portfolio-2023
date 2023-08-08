<script lang="ts" setup>
import dotsTypes from '../assets/dotsTypes.ts'
import {computed, defineAsyncComponent} from "vue";
const props = defineProps({
    dotType: {
        type: String,
        required: true,
        validator(value: string): boolean {
          if(Object.keys(dotsTypes).includes(value)){
            return true;
          }
          console.warn(
              '⚠️ The dot type' +
              value +
              "of the props doesn't exist, correct string"
          )
          return false
        }
    },
    link: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        default: "_self"
    }
})
const Svg = computed(() => {
    return defineAsyncComponent(() => import(`./svg/dot/${dotsTypes[props.dotType as keyof typeof dotsTypes]}.vue`));
})
</script>
<template>
  <a class="flex items-center" :href="link" :target="target">
      <Svg class="mr-2" />
      <div class="relative text-beige uppercase text-sm"><slot /></div>
  </a>
</template>
<style>
a > div::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #FFF4E4;
  transform: scaleX(0);
  transition: transform 0.4s;
}
a:hover > div::after {
  transform: scaleX(1);
}
</style>