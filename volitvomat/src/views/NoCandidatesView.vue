<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import kandidat from '@/assets/img/kandidat.svg';

// vue stuff
const store = useStore();
const route = useRoute();
const router = useRouter();

// responsive design
const screenWidth = ref(window.innerWidth);
const desktop = computed(() => screenWidth.value > 992);

const missingParties = ref([]);

// get municipality slug
const municipalitySlug = ref(route.params.slug);

const imageNotFound = (e) => {
    const img = e.srcElement;
    img.src = kandidat;
    img.onerror = null; 
}

onMounted(() => {
  store.commit("setMunicipality", { slug: municipalitySlug.value });

  store.dispatch("getMissingParties").then((result) => {
    missingParties.value = result;
  });
});
</script>

<template>
  <div class="container">
    <header class="header-big">
      <img src="../assets/img/volitvomat-znak.svg" class="header-logo"/>
      VOLITVOMAT
    </header>
    <div class="divider"></div>
    <h3>Slaba novica ...</h3>
    <p>Žal odgovorov nismo prejeli od nobenega županskega kandidata oziroma kandidatke v izbrani občini. Sporoči jim, da svoja stališča čim prej delijo z nami, mi pa jih bomo takoj vključili v Volitvomat.</p>
    <div class="parties-not-included">
      <div v-for="party in missingParties" :key="party.name" class="party">
        <img :src="party.image" class="party-image" @error="imageNotFound" />
        <div class="party-description">
          <p>{{ party.party_name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
header h1 {
  text-transform: uppercase;
  padding: 20px 0 10px;
  font-family: "Grandstander", cursive;
  font-size: 38px;
  text-align: center;
}

// @media (min-width: 992px) {
//   .container {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//   }
// }

.divider {
  margin-bottom: 20px;
  &.bottom {
    margin-top: 20px;
  }
}

h3 {
  font-family: "Grandstander", cursive;
  font-size: 32px;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
}

p {
  // font-weight: 600;
  // font-size: 21px;
  // text-align: center;
  margin: 10px 0;
}

p.subtitle {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 30px;
}

.party {
  display: flex;
  margin: 10px 0;
  color: #fffaf7;
  text-decoration: none;
}

.party-description {
  flex-grow: 1;
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
