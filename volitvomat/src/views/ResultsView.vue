<script setup>
// import TheWelcome from "@/components/TheWelcome.vue";
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';

const store = useStore();

// calculate results
const results = store.getters.results;
const answersNo = store.getters.answers.length;
const questionsNo = store.getters.questionsList.length;
const resultsArray = []
for (const res in results) {
  console.log(results, res, questionsNo)
  resultsArray.push({
    "party": res,
    "count": results[res],
    "percentage": Math.round(results[res] / questionsNo * 100) 
  })
}
const orderedResults = resultsArray.sort((a, b) => (a.count > b.count) ? -1 : 1)

</script>

<template>
  <div>
    <header class="header-small">
      <img src="../assets/img/volitvomat-logo.svg" class="header-logo"/>
    </header>
    <p>Najbolj se ujemaš s stranko</p>
    <div class="match">
      <img src="../assets/img/oseba.svg" class="person" />
      <img src="../assets/img/zvezda.svg" class="star" />
      <img src="../assets/img/podlaga-za-stranke.svg" class="person" />
    </div>
    <div class="white-button">
      {{ orderedResults[0].party }}: <span>{{ orderedResults[0].percentage }} %</span>
    </div>
    <div class="divider"></div>
    <div class="match-button-group">
      <div class="button">
        {{ orderedResults[1].party }}: <span>{{ orderedResults[1].percentage }} %</span>
        <div class="party-img">
          <img src="../assets/img/podlaga-za-stranke.svg" class="" />
        </div>
      </div>
    </div>
    <div class="match-button-group">
      <div class="button">
        {{ orderedResults[2].party }}: <span>{{ orderedResults[2].percentage }} %</span>
        <div class="party-img">
          <img src="../assets/img/podlaga-za-stranke.svg" class="" />
        </div>
      </div>
    </div>
    <div class="yellow-button">
      deli na družbEnih omrežjih <span class="share-icon"></span>
    </div>
    <RouterLink to="/statistika" class="yellow-button">
      poglej podrobne rezultate <span class="search-icon"></span>
    </RouterLink>
    
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
}

.star {
  width: 60px;
  position: absolute;
}

.divider {
  margin: 20px 0;
}

.match-button-group {
  text-align: center;
  .button {
    position: relative;
    display: inline-block;
    text-align: center;
    width: 220px;
    background-color: #fffaf7;
    padding: 15px 0 15px 60px;
    margin: 10px 0;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 600;
    color: #161615;
  }
  span {
    font-family: 'Bangers', cursive;
    font-size: 24px;
    letter-spacing: 1.5px;
  }
  .party-img {
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    img {
      width: 70px;
      height: 70px;
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
</style>
