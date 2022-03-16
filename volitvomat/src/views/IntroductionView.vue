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
  <div class="container">
    <header class="header-big">
      <img src="../assets/img/volitvomat-znak.svg" class="header-logo"/>
      VOLITVOMAT
    </header>
    <h2>Niso vsi isti, mi bomo odločali, preveri kako.</h2>
    <p>
      Volitvomat je nastal na podlagi zahtev, ki so jih pripravile civilnodružbene organizacije
      v odprtem procesu, ki je trajal zadnje mesece 2021. Stranke smo pozvali, naj se do zahtev
      konkretno opredelijo. Nekatere stranke se niso. Buuuuuuu.
    </p>
    <p>Tukaj boš odgovarjal_a na 40 zahtev od 138, na koncu zveš s katero stranko se najbolj ujemaš in lahko podrobneje raziščeš kje in zakaj se s katero stranko ne strinjaš. Ko rešiš, ne pozabi volitvomata deliti naprej.</p>
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
