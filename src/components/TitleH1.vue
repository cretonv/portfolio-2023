<script setup lang="ts"></script>
<template>
  <h1 class="text-white"><slot /></h1>
</template>
<style>
h1 {
  font-family: Basteleur Moonlight;
  font-weight: 300;
  font-size: 91px;
  line-height: 123px;
}
@media (max-width: 768px) {
    h1 {
        font-size: 40px;
        line-height: 56px;
    }
}
</style>