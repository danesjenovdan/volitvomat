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
})
</script>

<template>
  <div>
    <header>
      <h1>Kako rešujem?</h1>
    </header>
    <div class="divider"></div>
    <div style="display: flex; justify-content: center;">
      <div class="instruction-swipe">
        <h2>SE NE<br />STRINJAŠ?</h2>
        <p>Povleci kartico<br />v levo</p>
      </div>
      <div class="instruction-swipe">
        <h2>SE<br />STRINJAŠ?</h2>
        <p>Povleci kartico<br />v desno</p>
      </div>
    </div>
    <div class="scheme">
      <img src="../assets/img/kartici-shema.svg" class="" />
    </div>
    <div style="display: flex;">
      <div class="instruction-click">
        <img src="../assets/img/puscica-levo.svg" class="" />
        <p>ali klikni na</p>
        <div class="no-button"></div>
      </div>
      <div class="instruction-click">
        <img src="../assets/img/puscica-desno.svg" class="" />
        <p>ali klikni na</p>
        <div class="yes-button"></div>
      </div>
    </div>
    <div class="divider bottom"></div>
    <div style="display: flex; justify-content: center;">
      <div class="button">
        <div class="back-button"></div>
        <p>Popravi<br />prejšnjo izbiro</p>
      </div>
      <div>
        <div class="info-button"></div>
      </div>
      <div class="button">
        <div class="skip-button"></div>
        <p>Preskoči vprašanje</p>
      </div>
    </div>
    <div class="button-wrapper">
      <RouterLink to="/vprasanje/0" class="white-button">
        <div>
          Razumem, pokaži mi<br />prvo vprašanje.
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
header h1 {
  text-transform: uppercase;
  padding: 20px 0;
  font-family: 'Bangers', cursive;
  font-size: 38px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 3px;
}
.white-button {
  font-size: 24px;
}

.divider {
  margin-bottom: 20px;
  &.bottom {
    margin-top: 20px;
  }
}

.instruction-swipe {
  text-align: center;
  margin: 0 20px;
  h2 {
    font-family: Bangers;
    font-size: 24px;
    letter-spacing: 2px;
    
  }
}

.instruction-click {
  margin: 0 20px;
  text-align: center;
  p {
    margin: 5px 0;
  }
  img {
    width: 120px;
    margin-top: 20px;
  }
}

.scheme {
  display: flex;
  justify-content: center;
  img {
    max-width: 80%;
  }
}

.button {
  text-align: center;
  width: 120px;
}

.back-button,
.skip-button {
  margin-top: 10px;
  width: 60px;
  height: 60px;
}

.info-button {
  width: 70px;
  height: 70px;
}

</style>
