<script setup>
// import TheWelcome from "@/components/TheWelcome.vue";
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// calculate results
const parties = store.getters.parties;
const answersNo = store.getters.answers.length;
const questionsNo = store.getters.questionsList.length;
const results = []
for (const index in parties) {
  results.push({
    "party": parties[index].party_name,
    "count": parties[index].party_agree_count,
    "percentage": Math.round(parties[index].party_agree_count / questionsNo * 100) 
  })
}
const orderedResults = results.sort((a, b) => (a.count > b.count) ? -1 : 1)

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
