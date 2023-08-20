<script setup lang="ts">
import {onMounted} from "@vue/runtime-core";
import SplitType from "split-type";
import {gsap} from "gsap";

const title = ref()
let splitTitle
onMounted(() => {
  splitTitle = SplitType.create(title.value, {types: 'lines, chars'})
  let lineCharCounter: number
  let lineCounter: number = 1

  if(splitTitle.lines) {
    splitTitle.lines.forEach((line) => {
      lineCharCounter = 0
      Array.from(line.children).forEach((char) => {
        gsap.from(char, {
          y: 60 + 10 * lineCharCounter,
          duration: 0.75,
          stagger: { amount: 1.1 * lineCharCounter * lineCounter },
          ease: "sine.out"
        })
        lineCharCounter ++
      })
    })
    lineCounter ++
  }
})
</script>
<template>
  <h1 ref="title" class="text-white"><slot /></h1>
</template>
<style>
h1 {
  font-family: Basteleur Moonlight;
  font-weight: 300;
  font-size: 91px;
  line-height: 123px;
  font-kerning: none;
}
@media (max-width: 768px) {
    h1 {
        font-size: 40px;
        line-height: 56px;
    }
}
.line {
  overflow: hidden;
}
</style>
