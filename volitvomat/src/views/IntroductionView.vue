<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const storeInitialized = computed(() => store.getters.getStoreInitialized);
const quizFinished = computed(() => store.getters.getQuizFinished);

onMounted(() => {
  if (!storeInitialized.value) {
    store.dispatch("initializeStore").then((quiz_finished) => {
      if (quiz_finished) {
        router.push("/rezultati");
      }
    })
  }
  if (quizFinished.value) {
    router.push("/rezultati");
  }
});

</script>


<template>
  <div>
    <header class="header-big">
      <img src="../assets/img/volitvomat-logo.svg" class="header-logo"/>
    </header>
    <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
    <p>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus
      error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
      ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
      numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
      quaerat voluptatem.
    </p>
    <div class="button-wrapper">
      <RouterLink to="/navodila" class="white-button-border">ZAČNI</RouterLink>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 20px;
}
</style>
