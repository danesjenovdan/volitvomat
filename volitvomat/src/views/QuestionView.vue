<script setup>
import SwipeCard from "@/components/SwipeCard.vue";
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const idParam = ref(parseInt(route.params.id));
const moreInfo = ref(false);

const screenWidth = ref(window.innerWidth);
const desktop = computed(() => screenWidth.value > 992);

const storeInitialized = computed(() => store.getters.getStoreInitialized);
const questionsList = computed(() => store.getters.getQuestionsList);
const questionsNo = computed(() => questionsList.value.length);
const questionId = computed(() => questionsList.value[idParam.value]);
const progress = computed(() => Math.round(idParam.value / questionsNo.value * 100));
const question = computed(() => store.state.questions[questionId.value]);
// console.log('questionsList', questionsList.value)
// console.log('questionid', questionId.value)
// console.log('question', question.value)
const answers = computed(() => store.getters.getAnswers);

const skipQuestion = (id, answer) => {
  // remove saved answer
  store.commit('removeAnswer', {id, answer});
  if (idParam.value < questionsNo.value - 1) {
    router.push(`/vprasanje/${parseInt(idParam.value) + 1}`);
  } else {
    store.commit('calculateResults');
    router.push("/rezultati");
  }
};
 
const saveAnswer = (id, answer) => {
  store.commit('addAnswer', {id, answer});
  if (idParam.value < questionsNo.value - 1) {
    router.push(`/vprasanje/${parseInt(idParam.value) + 1}`);
  } else {
    store.commit('calculateResults');
    router.push("/rezultati");
  }
};

watch(
  () => route.params.id,
  async (id) => {
    idParam.value = id;
    // console.log(idParam.value, questionsNo.value, progress.value)
  }
);

onMounted(() => {
  if (!storeInitialized.value) {
    store.dispatch("initializeStore").then((quiz_finished) => {
      if (quiz_finished) {
        router.push("/rezultati");
      }
    })
  }
})

</script>

<template>
  <main>
    <header>
      <img src="../assets/img/volitvomat-logo.svg" class="header-logo"/>
    </header>
    <div class="progress">
      <div class="progress-bar" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" :aria-valuemax="100" :style="{ width: `${progress}%`}"></div>
    </div>

    <SwipeCard
      v-if="question"
      :title="question.demand_title" 
      :description="question.demand_description"
      :swiping="!desktop"
      @yes="saveAnswer(questionId, true)"
      @no="saveAnswer(questionId, false)"
    />
    
    <div class="button-row">
      <RouterLink to="/navodila" v-if="idParam == 0" class="back-button"></RouterLink>
      <RouterLink :to="`/vprasanje/${parseInt(idParam) - 1}`" v-if="idParam > 0" class="back-button"></RouterLink>
      <div class="no-button hover-pointer" @click="saveAnswer(questionId, false)"></div>
      <div class="info-button hover-pointer" @click="moreInfo = true"></div>
      <div class="yes-button hover-pointer" @click="saveAnswer(questionId, true)"></div>
      <div
        @click="skipQuestion(questionId, true)"
        class="skip-button"
      >
      </div>
    </div>

    <!-- {{ answers }} -->

    <div class="modal white-card" v-if="moreInfo">
      <div style="text-align: right;">
        <img src="../assets/img/zapri.svg" class="close-icon hover-pointer" @click="moreInfo = false" />
      </div>
      <p>{{ question.demand_description }}</p>
    </div>
  </main>
</template>

<style scoped lang="scss">
header {
  text-align: center;
  padding: 20px 0;
}

@media (min-width: 768px) {
  main {
    width: 720px;
  }
}

.header-logo {
  width: 200px;
}

.white-card {
  background-color: #fffaf7;
  border-radius: 3px;
  box-shadow: 0 0 4px 1px rgba(22, 22, 21, 0.7);
  color: #212121;
  font-size: 22px;
  font-weight: 500;
  line-height: 30px;
  padding: 60px 30px;
  min-height: 400px;
  display: flex;
  align-items: center;

  .card-description {
    display: none;
  }

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    min-height: 550px;
    h4 {
      margin-bottom: 20px;
    }
    .card-description {
      display: block;
    }
  }
}

.modal {
  padding: 20px;
  display: block;
}

.modal p {
  font-size: 18px;
  line-height: 27px;
  padding: 10px 30px;
}

.progress {
  margin: 20px 0;
}

.button-row {
  margin: 20px 0;
  text-align: center;
  .info-button {
    width: 70px;
    height: 70px;
    margin-bottom: 12px;
    @media (min-width: 768px) {
      display: none;
    }
  }
  .yes-button,
  .no-button {
    width: 70px;
    height: 70px;
    margin: 0 5px;
  }
  .back-button,
  .skip-button {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
}

.close-icon {
  width: 24px;
}
</style>
