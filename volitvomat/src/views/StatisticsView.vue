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
    <p>
      Tvoje ujemanje
    </p>
    <div class="party-list">
      <div v-for="party in orderedResults" :key="party.party" class="party">{{ party.party }}: {{ party.percentage }} %</div>
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
  </div>
</template>

<style scoped>
p {
  font-weight: 600;
  font-size: 21px;
  text-align: center;
}
</style>
