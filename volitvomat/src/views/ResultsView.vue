<script setup>
// import TheWelcome from "@/components/TheWelcome.vue";
import { ref, watch, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.commit('calculateResults');
  store.commit('calculateResultsPercentages');
})

const parties = computed(() => store.getters.orderedParties);

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
      <!-- <img src="../assets/img/podlaga-za-stranke.svg" class="person" /> -->
      <img :src="`${store.getters.getApiUrl}${parties[0].image}`" class="person" />
    </div>
    <div style="text-align: center;">
      <div class="white-button">
        <div>
          {{ parties[0].party_name }}: <span>{{ parties[0].percentage }} %</span>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="match-button-group">
      <div class="button">
        {{ parties[1].party_name }}: <span>{{ parties[1].percentage }} %</span>
        <div class="party-img">
          <!-- <img src="../assets/img/podlaga-za-stranke.svg" class="" /> -->
          <img :src="`${store.getters.getApiUrl}${parties[1].image}`" />
        </div>
      </div>
    </div>
    <div class="match-button-group">
      <div class="button">
        {{ parties[2].party_name }}: <span>{{ parties[2].percentage }} %</span>
        <div class="party-img">
          <!-- <img src="../assets/img/podlaga-za-stranke.svg" class="" /> -->
          <img :src="`${store.getters.getApiUrl}${parties[2].image}`" />
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
  border-radius: 50%;
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
    padding: 15px 0 15px 30px;
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

.white-button {
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
</style>
