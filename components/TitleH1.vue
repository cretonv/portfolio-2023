<script setup lang="ts">
import {onMounted, onBeforeUnmount} from "@vue/runtime-core";
import SplitType from "split-type";
import {gsap} from "gsap";

const title = ref()
let splitTitle
let charAnimPlay = ref(false)
const inTimeline = gsap.timeline({paused: false})
const outTimeline = gsap.timeline({paused: false})
const prevTimelineArray = []
const nextTimelineArray = []
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
      word.addEventListener('mouseleave', (e) => {
        inTimeline.paused()
        inTimeline.clear()
        charAnimPlay.value = false
        const childTarget = e.target.childNodes[Math.round(e.target.childNodes.length / 2) - 1]
        animLetterScaleOut(childTarget)
        const prev = childTarget.previousSibling
        const next = childTarget.nextSibling
        if(prev) {
          triggerLetterScale(prev, 'prev', true)
        }
        if(next) {
          triggerLetterScale(next, 'next', true)
        }
      })
      Array.from(word.children).forEach((char) => {
        inTimeline.play()
        char.addEventListener('mouseover', (e) => {
          if(e.target.classList.contains('char')) {
            charAnimPlay.value = true
            prevTimelineArray.push(e.target)
            animLetterScale(e.target)
            const prev = e.target.previousSibling
            const next = e.target.nextSibling
            if(prev && charAnimPlay.value) {
              triggerLetterScale(prev,'prev', false)
            }
            if(next && charAnimPlay.value) {
              triggerLetterScale(next, 'next', false)
            }
          }
        })
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
const triggerLetterScale = (element, direction, isOut) => {
  if(isOut) {
    animLetterScaleOut(element)
  } else {
    animLetterScale(element)
  }
  if(direction === 'prev') {
    const prev = element.previousSibling
    if(prev && (charAnimPlay.value || isOut)) {
      prevTimelineArray.push(prev)
      triggerLetterScale(prev, 'prev', isOut)
    }
  } else if(direction === 'next') {
    const next = element.nextSibling
    if(next && (charAnimPlay.value || isOut)) {
      nextTimelineArray.push(next)
      triggerLetterScale(next, 'next', isOut)
    }
  }
}
const animLetterScale = (element) => {
  inTimeline.to(element, {scale: 0.91, duration: 0.15}, '-=0.10')
}
const animLetterScaleOut = (element) => {
  outTimeline.to(element, {scale: 1, duration: 0.15}, '-=0.10')
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
