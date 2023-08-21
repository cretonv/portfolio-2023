<script setup lang="ts">
import {onMounted} from "@vue/runtime-core";
import SplitType from "split-type";
import {gsap} from "gsap";

const title = ref()
let splitTitle
onMounted(() => {
  // To don't display h1 before load (without style)
  title.value.classList.remove('opacity-0')
  splitTitle = SplitType.create(title.value, {types: 'words, chars'})
  // Var use to make delay and stagger
  let lineCharCounter: number
  let lineCounter: number = 0

  if(splitTitle.words) {
    splitTitle.words.forEach((word) => {
      lineCharCounter = 0
      Array.from(word.children).forEach((char) => {
        gsap.from(char, {
          y: 100 + 20 * lineCharCounter,
          duration: 0.75,
          delay: 0.25 * lineCounter,
          stagger: { amount: 1.3 * lineCharCounter },
          ease: "sine.out"
        })
        lineCharCounter ++
      }, )
      lineCounter ++
    })
  }
})
onBeforeUnmount(() => {
  SplitType.revert(title.value)
})
</script>
<template>
  <h1 ref="title" class="h1-title text-white opacity-0"><slot /></h1>
</template>
<style>
h1.h1-title {
  font-family: Basteleur Moonlight;
  font-weight: 300;
  font-size: 91px;
  line-height: 123px;
  font-kerning: none;
}
@media (max-width: 768px) {
    h1.h1-title {
        font-size: 40px;
        line-height: 56px;
    }
}
.word {
  overflow: hidden;
}
</style>
