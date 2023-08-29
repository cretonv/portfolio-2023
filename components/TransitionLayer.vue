<script setup lang="ts">
  import anime from "animejs/lib/anime.es";

  const morphPath = ref()

  const morphing = () => {
    console.log('OUI')
    /*anime({
      targets: morphPath.value,
      d: [
        {value: 'M639.37 650C114.196 650 0 750 0 750V833H1280V750C1280 750 1164.54 650 639.37 650Z'},
        {value: 'M639.37 127C114.196 127 0 584.5 0 584.5V833H1280V584.5C1280 584.5 1164.54 127 639.37 127Z'},
        {value: 'M640 0.5C114.826 0.5 0 6 0 6V833H1280V6C1280 6 1165.17 0.5 640 0.5Z'},
      ],
      easing: 'linear',
      duration: 2000,
      loop: false,
      autoPlay: false
    })*/
    const tl = anime.timeline({
      targets: morphPath.value,
      easing: 'linear',
      loop: false,
      autoplay: false,
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
  }
</script>
<template>
  <div class="transition-layer z-30 fixed left-0 top-0 h-screen w-screen overflow-hidden flex justify-end w-0 pointer-events-none">
    <svg id="morph" class="morph-svg pointer-events-none w-full h-full " height="100%" width="100%" viewBox="0 0 1280 832" preserveAspectRatio="none">
      <path ref="morphPath" class="morph" d="M639.37 828C114.196 828 0 829 0 829V832H1280V829C1280 829 1164.54 828 639.37 828Z" fill="#181618"></path>
    </svg>
  </div>
</template>
