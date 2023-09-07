import {gsap} from "gsap";
import { reactive } from 'vue';

const cursorAttributes = reactive({
    cursorElement: null,
    container: null,
    cursorHoverShadow: null,
    visible: true,
    hover: false,
    cursorAnimComplete: true,
})

const mouse = { x: 0, y: 0 }

export const useCustomCursorComposable =  () => {
    const initCustomCursor = (container, cursorElement, cursorHoverShadow) => {
        if(cursorElement && container) {
            cursorAttributes.cursorElement = cursorElement
            cursorAttributes.container = container
            cursorAttributes.cursorHoverShadow = cursorHoverShadow

            gsap.set( cursorAttributes.cursorElement, {xPercent: -50, yPercent: -50});

            const pos = { x: cursorAttributes.container.offsetWidth / 2, y: cursorAttributes.container.offsetHeight / 2 };
            const speed = 0.2;

            const xSet = gsap.quickSetter(cursorAttributes.cursorElement, "x", "px");
            const ySet = gsap.quickSetter(cursorAttributes.cursorElement, "y", "px");

            mouse.x = pos.x
            mouse.y = pos.y

            gsap.ticker.add(() => {

                // adjust speed for higher refresh monitors
                const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
                pos.x += (mouse.x - pos.x) * dt;
                pos.y += (mouse.y - pos.y) * dt;
                xSet(pos.x);
                ySet(pos.y);
            });
        }
    }

    const setXandY = (x, y) => {
        mouse.x = x;
        mouse.y = y;
    }

    const toggleMainCursorVisibility = (newState) => {
        cursorAttributes.visible = newState
        if(cursorAttributes.visible) {
            gsap.to(cursorAttributes.cursorElement,{opacity: 1, duration: 0.2})
        } else {
            gsap.to(cursorAttributes.cursorElement,{opacity: 0, duration: 0.2})
        }
    }

    const toggleMainCursorToHover = (newState) => {
        cursorAttributes.hover = newState
        if(cursorAttributes.hover) {
            cursorAttributes.cursorAnimComplete = false
            gsap.set(cursorAttributes.cursorHoverShadow, {opacity: 0.5})
            gsap.to(cursorAttributes.cursorHoverShadow, {scale: 4, duration: 0.3})
            gsap.to(
                cursorAttributes.cursorElement,
                {
                    backgroundColor: "#FFA723",
                    scale: 0.5,
                    duration: 0.3,
                    onComplete: () => {
                        cursorAttributes.cursorAnimComplete = true
                    }
                }
            )
        } else {
            gsap.to(
                cursorAttributes.cursorHoverShadow,
                {
                    scale: 1,
                    duration: 0.3,
                    onComplete: () => {
                        if(cursorAttributes.cursorAnimComplete) {
                            gsap.set(cursorAttributes.cursorHoverShadow, {opacity: 0})
                        }
                    }
                })
            gsap.to(
                cursorAttributes.cursorElement,
                {
                    backgroundColor: "#FFF",
                    scale: 1,
                    duration: 0.3,
                }
            )
        }
    }

    return {
        initCustomCursor,
        setXandY,
        toggleMainCursorVisibility,
        toggleMainCursorToHover
    };
}
