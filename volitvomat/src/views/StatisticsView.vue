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
const desus = computed(() => store.getters.getDesus);

// images
import Konkretno from '@/assets/img/parties/konkretno.jpg';
import NasaDezela from '@/assets/img/parties/nasa-dezela.jpg';
import NSi from '@/assets/img/parties/nsi.jpg';
import PovezimoSlovenijo from '@/assets/img/parties/povezimo-slovenijo.jpg';
import SDS from '@/assets/img/parties/sds.jpg';
import SNS from '@/assets/img/parties/sns.jpg';

const missingParties = [
  {
    'name': 'SDS',
    'image': SDS
  },
  {
    'name': 'NSi',
    'image': NSi
  },
  {
    'name': 'Konkretno',
    'image': Konkretno
  },
  {
    'name': 'SNS',
    'image': SNS
  },
  {
    'name': 'Naša dežela',
    'image': NasaDezela
  },
  {
    'name': 'Povežimo Slovenijo',
    'image': PovezimoSlovenijo
  }
]

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
  <div class="container">
    <header class="header-small">
      <img src="../assets/img/volitvomat-logo.svg" class="header-logo"/>
    </header>
    <p>
      Tvoje ujemanje
    </p>
    <div class="party-list">
      <div v-for="party in results" :key="parties[party.party_id].party_name" class="party">
        <RouterLink :to="`/rezultati/${party.party_id}`">
          <img :src="`${parties[party.party_id].image_url}`" class="party-image" />
        </RouterLink>
        <div class="party-description">
          <p>
            <RouterLink :to="`/rezultati/${party.party_id}`">
              <span>{{ parties[party.party_id].party_name }}</span>
            </RouterLink>
            <span>{{ party.percentage }} %</span>
          </p>
          <div class="progress">
            <div class="progress-bar" role="progressbar" :aria-valuenow="party.percentage" aria-valuemin="0" :aria-valuemax="100" :style="{ width: `${party.percentage}%`}"></div>
          </div>
        </div>
      </div>
      <!-- DeSUS -->
      <div class="party" v-if="results.length > 0">
        <RouterLink :to="`/rezultati/${desus.party_id}`">
          <img :src="`${parties[desus.party_id].image_url}`" class="party-image" />
        </RouterLink>
        <div class="party-description">
          <p>
            <RouterLink :to="`/rezultati/${desus.party_id}`">
              <span>{{ parties[desus.party_id].party_name }} *</span>
            </RouterLink>
            <span>{{ desus.percentage }} %</span></p>
          <div class="progress">
            <div class="progress-bar" role="progressbar" :aria-valuenow="desus.percentage" aria-valuemin="0" :aria-valuemax="100" :style="{ width: `${desus.percentage}%`}"></div>
          </div>
        </div>
      </div>
    </div>
    <p class="fine-print">
      * Zaradi trenutnega nedoslednega in nestabilnega delovanja ter kršitve ključnih predvolilnih zavez zadnjih volitev, stranke DESUS nismo mogli umestiti med priporočene izbire VOLITVOMATA.
    </p>
    <div class="divider"></div>
    <p>
      Stranke, ki niso sodelovale
    </p>
    <div class="parties-not-included">
      <div v-for="party in missingParties" :key="party.name" class="party">
        <img :src="party.image" class="party-image" />
        <div class="party-description">
          <p>{{ party.name }}</p>
        </div>
      </div>
    </div>
    <a href="https://glas-ljudstva.si" target="_blank" class="yellow-button">
      Preveri odgovore strank na vprašanja <span class="search-icon"></span>
    </a>
    <div class="yellow-button hover-pointer" @click="restartQuiz">
      reši ponovno
    </div>
  </div>
</template>

<style scoped lang="scss">
p {
  font-weight: 600;
  font-size: 21px;
  text-align: center;
  margin: 10px 0;
}

p.fine-print {
  font-weight: 400;
  font-size: 12px;
  text-align: left;
  margin: 10px 0;
}

.divider {
  margin: 20px 0;
}

.party {
  display: flex;
  margin: 10px 0;
}

.party-description {
  flex-grow: 1;
  a {
    color: #fffaf7;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  p {
    display: flex;
    justify-content: space-between;
    font-weight: 300;
    font-size: 14px;
    line-height: 26px;
    margin: 0;
  }
}

.party-image {
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.parties-not-included {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
  .party {
    align-items: center;
    padding-right: 20px;
    flex-basis: 50%;
    @media (min-width: 768px) {
      flex-basis: 30%;
    }
    .party-description p {
      line-height: 16px;
      text-align: left;
    }
  }
}
</style>
