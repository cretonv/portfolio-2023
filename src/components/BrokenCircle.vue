<script lang="ts" setup>
import {onUpdated, ref} from "vue";
import {gsap} from "gsap";

const topCircle = ref()
const bottomCircle = ref()
const line = ref()

const props = defineProps({
    container: {
        required: true,
    }
})

onUpdated(() => {
    if(props.container) {
        props.container.addEventListener('mousemove', (e) => {
            parallaxIt(e, topCircle.value, -20);
            parallaxIt(e, bottomCircle.value, 10);
            parallaxIt(e, line.value, -5);
        })
    }
})
function parallaxIt(e: MouseEvent, target, movement: number) {
    const container = props.container;
    if(container) {
        let relX = e.pageX - container.offsetLeft;
        let relY = e.pageY - container.offsetTop;
        gsap.to(target, {
            duration: 1,
            x: (relX - container.offsetWidth / 2) / container.offsetWidth * movement,
            y: (relY - container.offsetHeight / 2) / container.offsetHeight * movement
        })
    }
}
</script>
<template>
    <svg class="overflow-visible" width="420" height="410" viewBox="0 0 420 410" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path ref='topCircle' d="M95.2188 373.394C38.6265 337.756 1 274.558 1 202.535C1 91.2302 90.8626 1 201.714 1C280.846 1 349.282 46.981 381.968 113.785" stroke="#D9D9D9" stroke-width="0.5"/>
        <path ref='bottomCircle' d="M396.766 142.752C403.621 163.064 407.338 184.829 407.338 207.465C407.338 318.77 317.475 409 206.624 409C176.717 409 148.339 402.432 122.84 390.655" stroke="#D9D9D9" stroke-width="0.5"/>
        <g ref='line'><line y1="-0.25" x2="458.121" y2="-0.25" transform="matrix(-0.743605 0.668619 -0.665596 -0.746312 419 98.9939)" stroke="#D9D9D9" stroke-width="0.5"/></g>
    </svg>
</template>
<style scoped>
@media (max-width: 768px) {
    svg {
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(20%) translateY(-45%);
        width: 275px;
        height: auto;
    }
}
</style>
