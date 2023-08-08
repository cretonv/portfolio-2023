<template>
  <div class="origin-bottom-right" style="transform: rotate(-90deg) translateX(100%);">
      <div class="name-text text-2xl text-white" ><slot/></div>
  </div>
</template>
<style>
.name-text{
    cursor: default;
    opacity: 0.15;
    font-family: Basteleur Moonlight;
    transition: none;
}
.name-text:hover {
    opacity: 1;
    background: -webkit-linear-gradient(-180deg, #953621 0%, #FFA723 51.04%, #FFDC5F 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.5s;
}
</style>