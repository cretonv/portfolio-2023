import gsap from 'gsap';
import { useTransitionComposable } from '../composables/transitionComposable'

const { toggleTransitionComplete } = useTransitionComposable()

const pageTransition = {
    name: 'page-transiton',
    mode: 'out-in',
    onBeforeEnter: (el) => {
        Array.from(el.children).find((element) => element.classList.contains('transition-layer'))?.classList.add('w-full')
    },
    onEnter: (el, done) => {
        const transitionLayer = Array.from(el.children).find((element) => element.classList.contains('transition-layer'))
        const transitionLayerChilds = Array.from(transitionLayer.children)
        const blackLayer = transitionLayerChilds.find((element) => element.classList.contains('black-layer'))
        const brickLayer = transitionLayerChilds.find((element) => element.classList.contains('brick-layer'))
        const orangeLayer = transitionLayerChilds.find((element) => element.classList.contains('orange-layer'))
        const yellowLayer = transitionLayerChilds.find((element) => element.classList.contains('yellow-layer'))
        gsap
            .timeline({
                paused: true,
                onComplete() {
                    toggleTransitionComplete(true)
                    done();
                },
            })
            .fromTo(blackLayer, { width: '65vw'}, {width: 0, duration: 1.5})
            .fromTo(yellowLayer, { width: '80vw'}, {width: 0, duration: 1.5}, '<')
            .fromTo(orangeLayer, { width: '90vw'}, {width: 0, duration: 1.5}, '<')
            .fromTo(brickLayer, { width: '100vw'}, {width: 0, duration: 1.5}, '<')
            .play();
    },
    onLeave: (el, done) => {
        toggleTransitionComplete(false)
        const transitionLayer = Array.from(el.children).find((element) => element.classList.contains('transition-layer'))
        const transitionLayerChilds = Array.from(transitionLayer.children)
        const blackLayer = transitionLayerChilds.find((element) => element.classList.contains('black-layer'))
        const brickLayer = transitionLayerChilds.find((element) => element.classList.contains('brick-layer'))
        const orangeLayer = transitionLayerChilds.find((element) => element.classList.contains('orange-layer'))
        const yellowLayer = transitionLayerChilds.find((element) => element.classList.contains('yellow-layer'))
        gsap
            .timeline({ paused: true, onComplete: done })
            .to(blackLayer, { width: '65vw', duration: 1.5 })
            .to(yellowLayer, { width: '80vw', duration: 1.5 }, '<')
            .to(orangeLayer, { width: '90vw', duration: 1.5 }, '<')
            .to(brickLayer, { width: '100vw', duration: 1.5 }, '<')
            .play();
    },
};

export default pageTransition;
