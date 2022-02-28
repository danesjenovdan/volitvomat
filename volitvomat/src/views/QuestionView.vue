<script setup>
// import TheWelcome from "@/components/TheWelcome.vue";
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter()
const store = useStore();

const questionsList = store.getters.questionsList;
console.log(questionsList)
const idParam = ref(parseInt(route.params.id));
console.log(idParam.value)
const questionId = computed(() => questionsList[idParam.value]);
console.log(questionId.value)
const questionsNo = ref(questionsList.length);
const question = computed(() => store.state.questions[questionId.value]);
const answers = computed(() => store.state.answers);

const saveAnswer = (id, answer) => {
  console.log(id, answer)
  store.commit('addAnswer', {id, answer});
  console.log("idparam", idParam.value);
  console.log("questionId", questionId.value);
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
    // userData.value = await fetchUser(id)
    idParam.value = id;
  }
);

// const questions = ref(data.questions);
const moreInfo = ref(false);
</script>

<template>
  <main>
    <header>
      <img src="../assets/img/volitvomat-logo.svg" class="header-logo"/>
    </header>
    <!-- {{ store.state.questions }} -->
    <div class="white-card">
      {{ question.demand_title }}
    </div>
    
    <div class="button-row">
      <RouterLink :to="`/vprasanje/${idParam - 1}`" v-if="idParam > 0" class="back-button"></RouterLink>
      <div class="yes-button" @click="saveAnswer(questionId, true)"></div>
      <div class="info-button" @click="moreInfo = true"></div>
      <div class="no-button" @click="saveAnswer(questionId, true)"></div>
      <RouterLink
        :to="`/vprasanje/${idParam + 1}`"
        v-if="idParam < questionsNo - 1"
        class="skip-button"
      >
      </RouterLink>
    </div>
    
    <RouterLink to="/rezultati" v-if="idParam == questionsNo - 1">
      rezultati
    </RouterLink>

    {{ answers }}

    <div class="modal white-card" v-if="moreInfo">
      <div style="text-align: right;">
        <img src="../assets/img/zapri.svg" class="close-icon" @click="moreInfo = false" />
      </div>
      <p>{{ question.demand_description }}</p>
    </div>
  </main>
</template>

<style scoped>
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
}

.modal {
  padding: 20px;
}

.modal p {
  font-size: 18px;
  line-height: 27px;
  padding: 10px 30px;
}

.button-row {
  margin: 20px 0;
  text-align: center;
}

.close-icon {
  width: 24px;
}
</style>
