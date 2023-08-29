import gsap from 'gsap';
import { useTransitionComposable } from '../composables/transitionComposable'
import anime from "animejs";

const { toggleTransitionComplete } = useTransitionComposable()

const pageTransition = {
    name: 'page-transiton',
    mode: 'out-in',
    /*onBeforeEnter: (el) => {
        Array.from(el.children).find((element) => element.classList.contains('transition-layer'))?.classList.add('w-full')
    },*/
    onEnter: (el, done) => {
        const transitionLayer = Array.from(el.children).find((element) => element.classList.contains('transition-layer'))
        const morphSvg = Array.from(transitionLayer.children).find((element) => element.classList.contains('morph-svg'))
        const morphPath = Array.from(morphSvg.children).find((element) => element.classList.contains('morph'))
        done()
    },
    onLeave: (el, done) => {
        toggleTransitionComplete(false)
        const transitionLayer = Array.from(el.children).find((element) => element.classList.contains('transition-layer'))
        const morphSvg = Array.from(transitionLayer.children).find((element) => element.classList.contains('morph-svg'))
        const morphPath = Array.from(morphSvg.children).find((element) => element.classList.contains('morph'))
        console.log(morphPath)

        const tl = anime.timeline({
            targets: morphPath,
            easing: 'linear',
            loop: false,
            autoplay: false,
            complete: () => {
                done()
            }
        })
        tl.add({
            d: {value: 'M639.37 650C114.196 650 0 750 0 750V833H1280V750C1280 750 1164.54 650 639.37 650Z'},
            duration: 153,
        })
        tl.add({
            d: {value: 'M639.37 127C114.196 127 0 584.5 0 584.5V833H1280V584.5C1280 584.5 1164.54 127 639.37 127Z'},
            duration: 557,
        })
        tl.add({
            d: {value: 'M640 0.5C114.826 0.5 0 6 0 6V833H1280V6C1280 6 1165.17 0.5 640 0.5Z'},
            duration: 300,
        })
        tl.play()
    },
};

export default pageTransition;
