<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const router = useRouter();

const partyId = ref(route.params.id);
const storeInitialized = computed(() => store.getters.getStoreInitialized);
const quizFinished = computed(() => store.getters.getQuizFinished);
const parties = computed(() => store.getters.getParties);
const result = computed(() => {
  if (partyId.value === '5') { // desus
    return store.getters.getDesus;
  } else {
    for (const res of store.getters.getResults) {
      if (res.party_id === partyId.value) {
        return res;
      }
    }
  }
  return {};
});
const questions = computed(() => store.getters.getQuestions);
const answers = computed(() => store.getters.getAnswers);

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

watch(
  () => route.params.id,
  async (id) => {
    partyId.value = id;
  }
);

</script>

<template>
  <div class="container" v-if="Object.keys(parties).length > 0">
    <div style="text-align: center;">
      <img :src="`${parties[partyId].image_url}`" class="person" />
    </div>
    
    <p class="title">Kako se tvoji odgovori razlikujejo od stranke {{ parties[partyId].party_name }}?</p>

    <div v-if="result" class="match">
      <p>Ujemanje: <span>{{ result.percentage }} %</span></p>
      <div class="progress">
        <div class="progress-bar" role="progressbar" :aria-valuenow="result.percentage" aria-valuemin="0" :aria-valuemax="100" :style="{ width: `${result.percentage}%`}"></div>
      </div>
    </div>
    
    <div class="divider"></div>
    <div v-for="(question, question_id) in questions" :key="question_id" class="question">
      <div v-if="question_id in answers && question.party_answers[partyId] !== answers[question_id]">
        <div class="card">
          <h4>{{ question.demand_title }}</h4>
          <p>{{ question.demand_description }}</p>
        </div>
        <div class="answers">
          <div class="answer">
            <h4>Odgovor stranke:</h4>
            <div>
              <span v-if="question.party_answers[partyId]">DA</span>
              <div v-if="question.party_answers[partyId]" class="yes-button hover-pointer"></div>
              <span v-if="!question.party_answers[partyId]">NE</span>
              <div v-if="!question.party_answers[partyId]" class="no-button hover-pointer"></div>
            </div>
          </div>
          <div class="answer">
            <h4>Tvoj odgovor:</h4>
            <div>
              <span v-if="answers[question_id]">DA</span>
              <div v-if="answers[question_id]" class="yes-button hover-pointer"></div>
              <span v-if="!answers[question_id]">NE</span>
              <div v-if="!answers[question_id]" class="no-button hover-pointer"></div>
            </div>
          </div>
        </div>
        <div v-if="question.party_comments[partyId]">
            <h4>Komentar stranke:</h4>
            <p>{{ question.party_comments[partyId] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.person {
  width: 140px;
  margin: 10px;
  border-radius: 50%;
}

p.title {
  font-weight: 600;
  font-size: 21px;
  text-align: center;
}

.divider {
  margin: 30px auto;
}

.match {
  margin: 10px auto 40px; 
  max-width: 400px; 
  text-align: center;
  p {
    text-align: center;
    margin-bottom: 10px;
  }
}

.question {
  margin-bottom: 40px;
}

.card {
  background-color: #fffaf7;
//   border-radius: 3px;
//   box-shadow: 0 0 4px 1px rgba(22, 22, 21, 0.7);
  color: #212121;
  font-weight: 500;
  padding: 20px;
  h4 {
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 24px;
  }
  p {
    font-size: 14px;
    line-height: 18px;
  }

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.answers {
  display: flex;
  justify-content: space-between;
}

.answer {
  &>div {
    display: flex;
    align-items: center;
  }
  margin: 10px 0;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
  span {
    margin: 0 5px;
    font-size: 20px;
    font-weight: 600;
  }
}

</style>
