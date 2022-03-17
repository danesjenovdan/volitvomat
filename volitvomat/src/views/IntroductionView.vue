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
    <h2>Politične stranke, ki bodo sodelovale na prihajajočih državnozborskih volitvah, imajo zelo različne programske usmeritve. Ker je prihodnost Slovenije odvisna od vseh nas, ki jim bomo aprila namenjali glasove, smo razvili orodje Volitvomat. Z njim lahko preveriš, v kolikšni meri se tvoja politična prepričanja skladajo s stališči strank, in tako sprejmeš bolj kakovostno odločitev.</h2>
    <p>
      Volitvomat je nastal na podlagi odgovorov političnih strank na 138 zahtev, ki smo jih v odprtem procesu postavile civilnodružbene organizacije, združene v iniciativo <a href="https://glas-ljudstva.si/" target="_blank">Glas ljudstva</a>. Čeprav smo k podajanju konkretnih odgovorov pozvali vse stranke, ki bodo sodelovale na volitvah, številne med njimi niso želele dati svojih zavez in tako prispevati k boljši informiranosti volivk in volivcev.
    </p>
    <p>V nadaljevanju lahko podaš svoje odgovore na 40 zahtev, na podlagi rezultatov pa ti bomo pokazali, s katero od sodelujočih političnih strank se najbolj ujemajo tvoja stališča. Nato lahko tudi podrobneje raziščeš, na katerih področjih se s posameznimi strankami ne strinjaš in zakaj je temu tako.</p>
    <p>Ko rešiš vprašalnik in pregledaš rezultate pa povezavo do Volitvomata ne pozabi deliti še s prijateljicami in prijatelji, saj jim lahko tako morda olajšaš odločitev.</p>
    <div class="button-wrapper">
      <RouterLink to="/navodila" class="white-button-border">ZAČNI</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 20px;
}

p {
  margin-bottom: 15px;

  a {
    color: #fffaf7;
    font-weight: 600;
  }
}

@media (min-width: 992px) {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
