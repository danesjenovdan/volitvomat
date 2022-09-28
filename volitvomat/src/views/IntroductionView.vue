<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const storeInitialized = computed(() => store.getters.getStoreInitialized);
const quizFinished = computed(() => store.getters.getQuizFinished);
const parties = computed(() => store.getters.getParties);

onMounted(() => {
  // this is here to clear old data
  // from parliamentary elections 2022
  // it actually clears all data always
  store.dispatch('clearStore');
  // this used to be used to only clear parliamentary
  // election data, but it doesn't work reliably
  // if (Object.keys(parties.value).includes('5')) {
  //   store.dispatch('clearStore');
  // }
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
    <h2>Kandidatke in kandidati, med katerimi bomo izbirali na predsedniških volitvah 23. 10. 2022, imajo različne poglede in prioritete. Ker želimo volivkam in volivcem olajšati odločitev, smo razvili Volitvomat, s pomočjo katerega lahko vsak preveri, s katerimi kandidatkami in kandidati se po stališčih in prepričanjih najbolj ujema.</h2>
    <p>
      Orodje temelji na odgovorih kandidatk in kandidatov na 30 vprašanj, ki so jih skupaj postavile civilnodružbene organizacije, združene v iniciativo Glas ljudstva. H konkretnim odzivom smo večkrat pozvali prav vse kandidate in kandidatke, toda nekateri svojih stališč niso želeli prispevati. A ni še prepozno – vse kandidatke in kandidati, ki nam bodo posredovali svoje stališča, bomo takoj vključili v Volitvomat.
    </p>
    <p>V Volitvomatu je zbranih 30 trditev, na katere lahko podaš svoj odgovor. Na podlagi rezultatov izveš, kateri izmed sodelujočih kandidatk ali kandidatov najbolj ustreza tvojim stališčem, lahko pa tudi podrobneje raziščeš, na katerih točkah so razhajanja največja in zakaj.</p>
    <p>Vprašanja smo namenoma podali iz različnih svetovnih in vrednotnih nazorov ter zato posebej poudarjamo, da to niso stališča iniciative Glas ljudstva.</p>
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
