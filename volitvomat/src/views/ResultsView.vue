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
const firstPlace = computed(() => {
  let winnersNo = 1;
  const winnerPercentage = results.value[0].percentage;
  let secondPercentage = results.value[1].percentage;
  while (secondPercentage === winnerPercentage) {
    winnersNo++;
    // covered all results
    if (winnersNo === results.value.length) {
      break;
    } else {
      secondPercentage = results.value[winnersNo].percentage;
    } 
  }
  return winnersNo;
});

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
  <div v-if="results.length > 0" class="container">
    <header class="header-small">
      <img src="../assets/img/volitvomat-logo.svg" class="header-logo"/>
    </header>

    <div class="single-winner" v-if="firstPlace === 1">

      <p>Najbolj se ujemaš s stranko</p>

      <div class="match">
        <img src="../assets/img/oseba.svg" class="person" />
        <img src="../assets/img/zvezda.svg" class="star" />
        <!-- <img src="../assets/img/podlaga-za-stranke.svg" class="person" /> -->
        <img :src="`${parties[results[0].party_id].image_url}`" class="person" />
      </div>

      <div style="text-align: center;">
        <div class="white-button-border">
          <div>
            <span class="party-name">{{ parties[results[0].party_id].party_name }}:</span>
            <span>{{ results[0].percentage }} %</span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="match-button-group">
        <div class="button">
          <span class="party-name">{{ parties[results[1].party_id].party_name }}:</span>
          <span>{{ results[1].percentage }} %</span>
          <div class="party-img">
            <!-- <img src="../assets/img/podlaga-za-stranke.svg" class="" /> -->
            <img :src="`${parties[results[1].party_id].image_url}`" />
          </div>
        </div>
      </div>

      <div class="match-button-group">
        <div class="button">
          <span class="party-name">{{ parties[results[2].party_id].party_name }}:</span>
          <span>{{ results[2].percentage }} %</span>
          <div class="party-img">
            <!-- <img src="../assets/img/podlaga-za-stranke.svg" class="" /> -->
            <img :src="`${parties[results[2].party_id].image_url}`" />
          </div>
        </div>
      </div>

    </div>

    <p v-if="results[0].percentage === results[1].percentage">Najbolj se ujemaš z več strankami</p>

    <div class="two-winners" v-if="firstPlace === 2">
      <div class="flex">
        <div class="match">
          <img src="../assets/img/oseba.svg" class="person" />
          <img src="../assets/img/zvezda.svg" class="star" />
        </div>
        <div>
          <div class="match-button-group">
            <div class="button">
              <span class="party-name">{{ parties[results[0].party_id].party_name }}:</span>
              <span>{{ results[0].percentage }} %</span>
              <div class="party-img">
                <!-- <img src="../assets/img/podlaga-za-stranke.svg" class="" /> -->
                <img :src="`${parties[results[0].party_id].image_url}`" />
              </div>
            </div>
          </div>
          <div class="match-button-group">
            <div class="button">
              <span class="party-name">{{ parties[results[1].party_id].party_name }}:</span>
              <span>{{ results[1].percentage }} %</span>
              <div class="party-img">
                <!-- <img src="../assets/img/podlaga-za-stranke.svg" class="" /> -->
                <img :src="`${parties[results[1].party_id].image_url}`" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="match-button-group">
        <div class="button">
          <span class="party-name">{{ parties[results[2].party_id].party_name }}:</span>
          <span>{{ results[2].percentage }} %</span>
          <div class="party-img">
            <!-- <img src="../assets/img/podlaga-za-stranke.svg" class="" /> -->
            <img :src="`${parties[results[2].party_id].image_url}`" />
          </div>
        </div>
      </div>
    </div>

    <div class="more-winners" v-if="firstPlace > 2">
      <div class="match">
        <img src="../assets/img/oseba.svg" class="person" />
        <img src="../assets/img/zvezda.svg" class="star" />
      </div>
      <div>
        <div v-for="index in firstPlace" :key="index" class="match-button-group">
          <div class="button">
            <span class="party-name">{{ parties[results[index-1].party_id].party_name }}:</span>
            <span>{{ results[index-1].percentage }} %</span>
            <div class="party-img">
              <img :src="`${parties[results[index-1].party_id].image_url}`" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="yellow-button">
      deli na družbEnih omrežjih <span class="share-icon"></span>
    </div>
    <RouterLink to="/statistika" class="yellow-button">
      poglej podrobne rezultate <span class="search-icon"></span>
    </RouterLink>
    <div class="yellow-button hover-pointer" @click="restartQuiz">
      reši ponovno
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
p {
  font-weight: 600;
  font-size: 21px;
  text-align: center;
}

.match {
  display: flex;
  justify-content: center;
  position: relative;
  margin: 30px 0;
}

.person {
  width: 140px;
  margin: 10px;
  border-radius: 50%;
}

.star {
  width: 60px;
  position: absolute;
}

.divider {
  margin: 20px 0;
}

.white-button-border {
  &>div {
    display: flex;
    align-items: center;
  }
  .party-name {
    font-family: 'Manrope', sans-serif;
    font-size: 20px;
  }
  span:last-of-type {
    letter-spacing: 1.5px;
    padding-left: 10px;
    flex-shrink: 0;
  }
}

.match-button-group {
  text-align: center;
  .button {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    width: 220px;
    // background-color: #fffaf7;
    padding: 10px 0 10px 30px;
    margin: 10px 0;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 600;
    color: #161615;
    background-image: url("@/assets/img/bel-gumb.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .party-name {
    max-width: 40%;
  }
  span:last-of-type {
    font-family: 'Bangers', cursive;
    font-size: 24px;
    letter-spacing: 1.5px;
    padding-left: 10px;
    flex-shrink: 0;
  }
  .party-img {
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
}

.yellow-button span {
  margin-left: 10px;
}

.yellow-button .search-icon {
  width: 30px;
  height: 30px;
}

.white-button-border {
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  padding: 0;
  &>div {
    padding: 30px 50px;
  }
  span {
    font-family: 'Bangers', cursive;
    font-size: 30px;
  }
}

.two-winners {
  margin-top: 30px;
  margin-bottom: 60px; 
  .flex {
    display: flex;
    align-items: center;
  }
  .match {
    margin: 0;
  }
}

.more-winners {
  margin-top: 30px;
  margin-bottom: 60px;
  display: flex;
}

.two-winners,
.more-winners {
  .match {
    justify-content: start;
    align-items: start;
  }

  .match-button-group {
    .button {
      width: 180px;
    }
    .party-img {
      left: -30px;
    }
  }
}
</style>
