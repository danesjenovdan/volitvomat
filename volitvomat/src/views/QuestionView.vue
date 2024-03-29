<script setup>

import SwipeCard from "@/components/SwipeCard.vue";
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

// vue stuff
const route = useRoute();
const router = useRouter();
const store = useStore();

// get question id
const idParam = ref(parseInt(route.params.id));
// get municipality slug
const municipalitySlug = ref(route.params.slug);

const moreInfo = ref(false);
const playAnimationLeft = ref(false);
const playAnimationRight = ref(false);

const screenWidth = ref(window.innerWidth);
const desktop = computed(() => screenWidth.value > 992);

const storeInitialized = computed(() => store.getters.getStoreInitialized);
const questionsList = computed(() => store.getters.getQuestionsList);
const questionsNo = computed(() => questionsList.value.length);
const questionId = computed(() => questionsList.value[idParam.value]);
const progress = computed(() => Math.round(idParam.value / questionsNo.value * 100));
const question = computed(() => store.state.questions[questionId.value]);
// const answers = computed(() => store.getters.getAnswers);

const skipQuestion = (id, answer) => {
  // remove saved answer
  store.commit('removeAnswer', {id, answer});
  if (idParam.value < questionsNo.value - 1) {
    router.push(`/${municipalitySlug.value}/vprasanje/${parseInt(idParam.value) + 1}`);
  } else {
    store.commit('calculateResults');
    router.push(`/${municipalitySlug.value}/rezultati`);
  }
};
 
const saveAnswer = (id, answer) => {
  // animation
  playAnimationLeft.value = !answer;
  playAnimationRight.value = answer;
  setTimeout(function() {
    playAnimationLeft.value = false;
    playAnimationRight.value = false;
    // save answer
    store.commit('addAnswer', {id, answer});
    // navigate to next question
    if (idParam.value < questionsNo.value - 1) {
      router.push(`/${municipalitySlug.value}/vprasanje/${parseInt(idParam.value) + 1}`);
    } else {
      // last question -> calculate results and navigate to results
      store.commit('calculateResults');
      router.push(`/${municipalitySlug.value}/rezultati`);
    }
  }, 400 );
};

watch(
  () => route.params.id,
  async (id) => {
    idParam.value = id;
    // console.log(idParam.value, questionsNo.value, progress.value)
  }
);

onMounted(() => {
  store.commit("setMunicipality", { slug: municipalitySlug.value });

  if (!storeInitialized.value) {
    store.dispatch("initializeStore").then((quiz_finished) => {
      if (quiz_finished) {
        router.push(`/${municipalitySlug.value}/rezultati`);
      }
    })
  }
});

router.beforeEach((to, from) => {
  if (moreInfo.value) {
    moreInfo.value = false;
    return false;
  }
});

</script>

<template>
  <div class="container">
    <main>
      <header v-if="desktop" class="header-big">
        <img src="../assets/img/volitvomat-znak.svg" class="header-logo"/>
        VOLITVOMAT
      </header>
      <div class="progress-bar-wrapper">
        <div class="progress">
          <div class="progress-bar" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" :aria-valuemax="100" :style="{ width: `${progress}%`}"></div>
        </div>
      </div>
      <div class="swipe-card-wrapper">
        <SwipeCard
          v-if="question"
          :title="question.demand_title" 
          :description="question.demand_description"
          image-url="1"
          :swiping="!desktop"
          @yes="saveAnswer(questionId, true)"
          @no="saveAnswer(questionId, false)"
          @more="moreInfo = true"
          class="swipe-card"
          :class="{'play-animation-right': playAnimationRight, 'play-animation-left': playAnimationLeft}"
        />
        <div
          v-for="i in 2" :key="i"
          class="swipe-card-background white-card" 
          :style="`top: ${5-i}%; bottom: ${5+i}%; left:${20+i*4}px; right:${20+i*4}px; z-index:${-1*i}`"
        >
          <img src="../assets/img/volitvomat-logo.svg" />
        </div>
      </div>
      
      <div class="button-row">
        <RouterLink :to="`/${municipalitySlug}/navodila`" v-if="idParam == 0" class="back-button"></RouterLink>
        <RouterLink :to="`/${municipalitySlug}/vprasanje/${parseInt(idParam) - 1}`" v-if="idParam > 0" class="back-button"></RouterLink>
        <div 
          class="no-button hover-pointer"
          :class="{'disabled': playAnimationRight || playAnimationLeft}"
          @click="saveAnswer(questionId, false)"
        ></div>
        <!-- <div class="info-button hover-pointer" @click="moreInfo = true"></div> -->
        <div 
          class="yes-button hover-pointer" 
          :class="{'disabled': playAnimationRight || playAnimationLeft}"
          @click="saveAnswer(questionId, true)"
        ></div>
        <div
          @click="skipQuestion(questionId, true)"
          class="skip-button hover-pointer"
        >
        </div>
      </div>

      <div class="modal white-card" v-if="moreInfo" @click="moreInfo = false">
        <!-- <div style="text-align: right;">
          <img src="../assets/img/zapri.svg" class="close-icon hover-pointer" @click="moreInfo = false" />
        </div> -->
        <div>
          <h4>{{ question.demand_title }}</h4>
          <p>{{ question.demand_description }}</p>
        </div>
        <div class="show-less">
          <img src="../assets/img/close.png"/>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
@keyframes animate-right {
  to {
    transform: translateX(100vw) rotate(5deg);
    // background-color: green;
  }
}

@keyframes animate-left {
  to {
    transform: translateX(-100vw) rotate(-5deg);
  }
}

.play-animation-right {
  animation-name: animate-right;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier();
}

.play-animation-left {
  animation-name: animate-left;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier();
}

.disabled {
  pointer-events: none;
}

.container {
  padding: 0;

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

// @media (min-width: 768px) {
//   main {
//     width: 720px;
//   }
// }

.swipe-card-wrapper {
  position: relative; 
  flex-grow: 1; 
  display: flex; 
  align-items: center;
  overflow: hidden;
  padding: 0 20px;
  max-height: 600px;
}

.swipe-card-background {
  position: absolute;
  img {
    display: block;
    margin: 0 auto;
    max-height: 80%;
  }
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
  display: flex;
  align-items: center;

  .card-description {
    display: none;
  }

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

.modal p {
  font-size: 16px;
  line-height: 24px;
  padding: 0;
  margin-bottom: 20px;
}

.modal h4 {
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 20px;
}

.show-less {
  text-align: center;
  img {
    height: 50px;
  }
}

.progress-bar-wrapper {
  min-height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.button-row {
  min-height: 80px;
  padding: 0 20px;
  text-align: center;
  display: flex;
  align-items: start;
  justify-content: center;
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
    // margin: 0 5px;
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
