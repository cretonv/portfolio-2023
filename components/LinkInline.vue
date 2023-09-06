<script lang="ts" setup>
import dotsTypes from '../assets/dotsTypes.ts'
import {computed, defineAsyncComponent} from "vue";
import {useCustomCursorComposable} from "~/composables/customCursorComposable";

const {toggleMainCursorToHover} = useCustomCursorComposable()
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
    },
    darkMode: {
        type: Boolean,
        default: false
    }
})
const Svg = computed(() => {
    return defineAsyncComponent(() => import(`./svg/dot/${dotsTypes[props.dotType as keyof typeof dotsTypes]}.vue`));
})
</script>
<template>
    <a
        class="flex items-center"
        :class="darkMode? 'text-black dark' : 'text-beige'"
        :href="link"
        :target="target"
        @mouseover="toggleMainCursorToHover(true)"
        @mouseleave="toggleMainCursorToHover(false)"
    >
        <Svg class="mr-2" />
        <div class="relative uppercase text-sm"><slot /></div>
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
a.dark > div::after {
  background-color: #181618;
}
</style>
