<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const storeInitialized = computed(() => store.getters.getStoreInitialized);
const quizFinished = computed(() => store.getters.getQuizFinished);
const parties = computed(() => store.getters.getParties);
const results = computed(() => store.getters.getResults);

const restartQuiz = () => {
  store.dispatch("clearStore");
  router.push("/");
}

onMounted(() => {
  if (!storeInitialized.value) {
    store.dispatch("initializeStore").then((quiz_finished) => {
      if (!quiz_finished) {
        router.push("/");
      }
    })
  }
  if (!quizFinished.value) {
    router.push("/");
  }
})

</script>

<template>
  <div>
    <header class="header-small">
      <img src="../assets/img/volitvomat-logo.svg" class="header-logo"/>
    </header>
    <p>
      Tvoje ujemanje
    </p>
    <div class="party-list">
      <div v-for="party in results" :key="parties[party.party_id].party_name" class="party">
        <img :src="`${parties[party.party_id].image_url}`" class="party-image" />
        <div class="party-description">
          <p><span>{{ parties[party.party_id].party_name }}</span><span>{{ party.percentage }} %</span></p>
          <div class="progress">
            <div class="progress-bar" role="progressbar" :aria-valuenow="party.percentage" aria-valuemin="0" :aria-valuemax="100" :style="{ width: `${party.percentage}%`}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <p>
      Stranke, ki niso sodelovale
    </p>
    <div class="partys-not-included">
      <div>SDS</div>
      <div>NSi</div>
      <div>SAB</div>
    </div>
    <a href="https://glas-ljudstva.si" target="_blank" class="yellow-button">
      Preveri odgovore strank na vprašanja <span class="search-icon"></span>
    </a>
    <div class="yellow-button hover-pointer" @click="restartQuiz">
      reši ponovno
    </div>
  </div>
</template>

<style scoped lang="scss">
p {
  font-weight: 600;
  font-size: 21px;
  text-align: center;
  margin: 10px 0;
}

.divider {
  margin: 20px 0;
}

.party {
  display: flex;
  margin: 10px 0;
}

.party-description {
  flex-grow: 1;
  p {
    display: flex;
    justify-content: space-between;
    font-weight: 300;
    font-size: 14px;
    line-height: 26px;
    margin: 0;
  }
}

.party-image {
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
