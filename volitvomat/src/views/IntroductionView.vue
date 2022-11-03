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
    <h2>Pozdravljeni!</h2>
    <p>
      Tukaj boste našli lokalne Volitvomate pripravljene za vsako slovensko občino. Vprašalnike smo vašim kandidatom in kandidatkam za župana oz. županjo že poslali in še čakamo njihove odzive. Brez njihovih odzivov Volitvomat namreč ne more delovati, saj se morajo do ključnih vprašanj najprej opredeliti oni, vi pa potem svoja stališča primerjate z njihovimi.
    </p>
    <p>Vabimo vas, da kandidate in kandidatke za župana oz. županjo v vaši občini tudi sami spomnite na izpolnjevanje vprašalnika ter s tem pomagate pri krepitvi politične odgovornosti izvoljenih posameznikov in posameznic.</p>
    <p>Objavo lokalnih Volitvomatov načrtujemo 14. novembra, tako da se takrat ponovno srečamo tukaj.</p>
    <!-- 
    <p>In za konec: ne pozabi deliti povezave do Volitvomata s prijateljicami in prijatelji, saj jim lahko tako olajšaš odločitev.</p>
    <div class="button-wrapper">
      <RouterLink to="/navodila" class="white-button-border">ZAČNI</RouterLink>
    </div>
    -->
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
