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
    <h2>Politične stranke, med katerimi bomo izbirali na volitvah 24. 4. 2022, imajo različne programe in prioritete. Ker želimo volivkam in volivcem olajšati odločitev, smo razvili Volitvomat, s pomočjo katerega lahko vsak preveri, s katerimi strankami se po stališčih in prepričanjih najbolj ujema.</h2>
    <p>
      Orodje temelji na odgovorih strank na 138 zahtev, ki so jih skupaj postavile civilnodružbene organizacije, združene v iniciativo Glas ljudstva. H konkretnim odzivom smo večkrat pozvali prav vse stranke, toda številne svojih zavez niso želele prispevati. A ni še prepozno – vse stranke, ki nam bodo posredovale svoje zaveze, bomo takoj vključili v Volitvomat.
    </p>
    <p>V Volitvomatu je zbranih 40 zahtev, na katere lahko podaš svoj odgovor. Na podlagi rezultatov izveš, katera izmed sodelujočih strank najbolj ustreza tvojim stališčem, lahko pa tudi podrobneje raziščeš, na katerih točkah so razhajanja največja in zakaj.</p>
    <p>In za konec: ne pozabi deliti povezave do Volitvomata s prijateljicami in prijatelji, saj jim lahko tako olajšaš odločitev.</p>
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
