<script setup>
import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from "@/components/HelloWorld.vue";
</script>

<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="scss">
@import "@/assets/base.css";

.container {
  padding: 0 20px;
  overflow: hidden;

  @media (min-width: 576px) {
    max-width: 540px;
    padding: 0;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  // @media (min-width: 992px) {
  //   max-width: 960px;
  // }

  // @media (min-width: 1200px) {
  //   max-width: 1140px;
  // }
}

</style>
