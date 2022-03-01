<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter()
const store = useStore();

const questionsList = store.getters.questionsList;
const idParam = ref(parseInt(route.params.id));
const questionId = computed(() => questionsList[idParam.value]);
const questionsNo = ref(questionsList.length);
const progress = computed(() => Math.round(idParam.value / questionsNo.value * 100));
const question = computed(() => store.state.questions[questionId.value]);
const answers = computed(() => store.state.answers);
const moreInfo = ref(false);

const saveAnswer = (id, answer) => {
  store.commit('addAnswer', {id, answer});
  if (idParam.value < questionsNo.value - 1) {
    router.push(`/vprasanje/${parseInt(idParam.value) + 1}`);
  } else {
    router.push("/rezultati");
  }
};

watch(
  () => route.params.id,
  async (id) => {
    idParam.value = id;
    console.log(idParam.value, questionsNo.value, progress.value)
  }
);

</script>

<template>
  <main>
    <header>
      <img src="../assets/img/volitvomat-logo.svg" class="header-logo"/>
    </header>
    <div class="progress">
      <div class="progress-bar" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" :aria-valuemax="100" :style="{ width: `${progress}%`}"></div>
    </div>
    <div class="white-card">
      {{ question.demand_title }}
    </div>
    
    <div class="button-row">
      <RouterLink to="/navodila" v-if="idParam == 0" class="back-button"></RouterLink>
      <RouterLink :to="`/vprasanje/${parseInt(idParam) - 1}`" v-if="idParam > 0" class="back-button"></RouterLink>
      <div class="yes-button hover-pointer" @click="saveAnswer(questionId, true)"></div>
      <div class="info-button hover-pointer" @click="moreInfo = true"></div>
      <div class="no-button hover-pointer" @click="saveAnswer(questionId, false)"></div>
      <RouterLink
        :to="`/vprasanje/${parseInt(idParam) + 1}`"
        v-if="idParam < questionsNo - 1"
        class="skip-button"
      >
      </RouterLink>
      <RouterLink
        to="/rezultati"
        v-if="idParam == questionsNo - 1"
        class="skip-button"
      >
      </RouterLink>
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
