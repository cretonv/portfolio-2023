<script setup lang="ts">
import {onMounted, onBeforeUnmount} from "@vue/runtime-core";
import SplitType from "split-type";
import {gsap} from "gsap";

const title = ref()
let splitTitle
let lastHoverChar: HTMLElement
const inTimeline = gsap.timeline({paused: false})
const outTimeline = gsap.timeline({paused: false})

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
      word.addEventListener('mouseover', charHover)
      word.addEventListener('mouseleave', wordLeave)
      Array.from(word.children).forEach((char) => {
        inTimeline.play()
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
const charHover = (e) => {
  if (e.target.classList.contains('char')) {
    lastHoverChar = e.target
    inTimeline.clear()
    let goodIndex
    e.target.parentNode.childNodes.forEach((element: HTMLElement, index: number) => {
      if (element === e.target) {
        goodIndex = index
      }
    })
    inTimeline.to(e.target.parentNode.childNodes, {
      scale: 0.94,
      ease: "back.out(1.7)",
      stagger: {amount: 0.4, from: goodIndex},
    });
    inTimeline.play()
  }
}
const wordLeave = (e) => {
  if (e.target.classList.contains('word')) {
    inTimeline.pause()
    outTimeline.clear()
    let goodIndex: number
    let fromValue: string
    e.target.childNodes.forEach((element, index) => {
      if (element === lastHoverChar) {
        goodIndex = index
      }
    })
    if(goodIndex) {
      fromValue = goodIndex.toString()
    } else (
      fromValue = "center"
    )
    outTimeline.to(e.target.childNodes, {
      scale: 1,
      ease: "back.out(1.7)",
      stagger: {amount: 0.4, from: fromValue},
    });
    outTimeline.play()
  }
}
</script>
<template>
  <h1
      ref="title"
      class="h1-title text-white opacity-0"
  >
    <slot />
  </h1>
</template>
<style>
h1.h1-title {
  font-family: Basteleur Moonlight;
  font-weight: 300;
  font-size: 91px;
  line-height: 123px;
  font-kerning: none;
}
@media (min-width: 1450px) {
  h1.h1-title {
    font-size: 104px;
    line-height: 136px;
  }
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
