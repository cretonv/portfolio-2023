import gsap from 'gsap';

const pageTransition = {
    name: 'page-transiton',
    mode: 'out-in',
    onEnter: (el, done) => {
        console.log('ENTER')
        console.log(el)
        /*gsap.set(el, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
        gsap
            .timeline({
                paused: true,
                onComplete() {
                    toggleTransitionComplete(true);
                    done();
                },
            })
            .to(el, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
            .to(el, { scale: 1, duration: 0.25 })
            .play(); */
    },
    onLeave: (el, done) => {
        console.log('LEAVE')
        console.log(el)
        /*toggleTransitionComplete(false);
        gsap
            .timeline({ paused: true, onComplete: done })
            .to(el, { scale: 0.8, duration: 0.2 })
            .to(el, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
            .play(); */
    },
};

export default pageTransition;
