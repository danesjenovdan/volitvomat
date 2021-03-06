<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const router = useRouter();

const screenWidth = ref(window.innerWidth);
const desktop = computed(() => screenWidth.value > 992);

const storeInitialized = computed(() => store.getters.getStoreInitialized);
const quizFinished = computed(() => store.getters.getQuizFinished);

const startQuiz = () => {
  router.push("/vprasanje/0");
}

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
  <div class="container" @click="startQuiz">
    <header>
      <h1>Kako rešujem?</h1>
    </header>
    <div class="divider"></div>
    <div style="display: flex; justify-content: center;">
      <div class="instruction-swipe">
        <h2>SE NE<br />STRINJAŠ?</h2>
        <p v-if="!desktop">Povleci kartico<br />v levo</p>
      </div>
      <div class="instruction-swipe">
        <h2>SE<br />STRINJAŠ?</h2>
        <p v-if="!desktop">Povleci kartico<br />v desno</p>
      </div>
    </div>
    <div class="scheme" v-if="!desktop">
      <img src="../assets/img/kartici-shema.svg" class="" />
    </div>
    <div style="display: flex; justify-content: space-around;">
      <div class="instruction-click">
        <img v-if="!desktop" src="../assets/img/puscica-levo.svg" class="" />
        <p><span v-if="!desktop">ali k</span><span v-else>K</span>likni na</p>
        <div class="no-button"></div>
      </div>
      <div class="instruction-click">
        <img v-if="!desktop" src="../assets/img/puscica-desno.svg" class="" />
        <p><span v-if="!desktop">ali k</span><span v-else>K</span>likni na</p>
        <div class="yes-button"></div>
      </div>
    </div>
    <div class="divider bottom"></div>
    <div style="display: flex; justify-content: center;">
      <div class="button">
        <div class="back-button"></div>
        <p>Popravi<br />prejšnjo izbiro</p>
      </div>
      <div class="button">
        <div class="skip-button"></div>
        <p>Preskoči vprašanje</p>
      </div>
    </div>
    <div class="button-wrapper">
      <RouterLink to="/vprasanje/0" class="white-button-border">
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
  padding: 20px 0 10px;
  font-family: 'Grandstander', cursive;
  font-size: 38px;
  text-align: center;
}

@media (min-width: 992px) {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.white-button-border {
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
    font-family: 'Grandstander', cursive;
    font-size: 24px;
    font-style: italic;
    margin-bottom: 5px;    
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
