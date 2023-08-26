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
        gsap
            .timeline({
                paused: true,
                onComplete() {
                    toggleTransitionComplete(true)
                    done();
                },
            })
            .fromTo(transitionLayer, { width: '100vw'}, {width: 0, duration: 1.5})
            .play();
    },
    onLeave: (el, done) => {
        toggleTransitionComplete(false)
        const transitionLayer = Array.from(el.children).find((element) => element.classList.contains('transition-layer'))
        gsap
            .timeline({ paused: true, onComplete: done })
            .to(transitionLayer, { width: '100vw', duration: 1.5 })
            .play();
    },
};

export default pageTransition;
