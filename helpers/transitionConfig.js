import gsap from 'gsap';

const pageTransition = {
    name: 'page-transiton',
    mode: 'out-in',
    onBeforeEnter: (el) => {
        Array.from(el.children).find((element) => element.classList.contains('transition-layer'))?.classList.add('w-full')
    },
    onEnter: (el, done) => {
        const transitionLayer = Array.from(el.children).find((element) => element.classList.contains('transition-layer'))
        console.log(transitionLayer)
        gsap
            .timeline({
                paused: true,
                onComplete() {
                    done();
                },
            })
            .fromTo(transitionLayer, { width: '100vw'}, {width: 0, duration: 1.5})
            .play();
    },
    onLeave: (el, done) => {
        const transitionLayer = Array.from(el.children).find((element) => element.classList.contains('transition-layer'))
        gsap
            .timeline({ paused: true, onComplete: done })
            .to(transitionLayer, { width: '100vw', duration: 1.5 })
            .play();
    },
};

export default pageTransition;
