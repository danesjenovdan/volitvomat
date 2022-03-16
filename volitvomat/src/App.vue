<script setup>
import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from "@/components/HelloWorld.vue";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.css";

.container {
  height: 100%;
  padding: 0 35px;
  overflow-y: scroll;

  @media (min-width: 576px) {
    max-width: 540px;
    padding: 0;
    overflow-y: unset;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }
}

</style>
