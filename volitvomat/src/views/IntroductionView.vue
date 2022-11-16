<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

// const storeInitialized = computed(() => store.getters.getStoreInitialized);
// const quizFinished = computed(() => store.getters.getQuizFinished);
// const parties = computed(() => store.getters.getParties);

let searchTerm = ref(""); // v-model for input field
let selectedMunicipality = ref(null); // municipality that was chosen from the list
let municipalities = ref([]); // array of all municipalities

// when clicked on municipality from the list
const selectMunicipality = (option) => {
  searchTerm.value = option["name"]; // autocomplete searched term
  selectedMunicipality.value = option; // save chosen municipality
  store.commit("setMunicipality", { slug: option["slug"] }); // save chosen municipality to store
};

// get slug from municipality object { "name": "Ljubljana", "slug": "ljubljana", ... }
const selectedMunicipalitySlug = computed(() => {
  // does selected municipality exist
  if (selectedMunicipality.value) {
    return selectedMunicipality.value["slug"];
  } else {
    return "";
  }
});

// a list of options that shows on municipality search
const searchOptions = computed(() => {
  // if municipality was already chosen and now typed-in name is different,
  // reset the chosen municipality
  if (
    selectedMunicipality.value &&
    selectedMunicipality.value["name"] !== searchTerm.value
  ) {
    selectedMunicipality.value = null;
  }
  // empty list if nothing is typed-in
  if (searchTerm.value === "") {
    return [];
  }

  let matches = 0;
  // compare typed-in input to municipalities' names and return up to 10 matches
  return municipalities.value.filter((municipality) => {
    if (
      municipality["name"]
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase()) &&
      matches < 10
    ) {
      matches++;
      return municipality;
    }
  });
});

onMounted(() => {
  // fetch municipalities list on load
  store.dispatch("getMunicipalities").then((result) => {
    municipalities.value = result;
  });

  // clear all old data
  store.dispatch("clearStore");
});
</script>

<template>
  <div class="container">
    <header class="header-big">
      <img src="../assets/img/volitvomat-znak.svg" class="header-logo" />
      VOLITVOMAT
    </header>
    <h2>
      Kandidatke in kandidati, med katerimi bomo izbirali na lokalnih volitvah
      20. novembra 2022, imajo različne poglede in prioritete. Ker želimo
      volivkam in volivcem olajšati izbiro, smo razvili Volitvomat, s pomočjo
      katerega lahko vsak preveri, s kom se po stališčih in prepričanjih najbolj
      ujema.
    </h2>
    <p>
      Orodje temelji na odgovorih kandidatk in kandidatov na nekatera ključna
      vprašanja, ki so jih pripravile civilnodružbene organizacije, združene v
      iniciativo Glas ljudstva. H konkretnim odzivom smo pozvali prav vse od
      njih, toda nekateri svojih stališč niso želeli prispevati. A ni še
      prepozno – vse kandidatke in kandidate, ki nam bodo posredovali odgovore,
      bomo takoj vključili v Volitvomat.
    </p>
    <p>
      Po tem, ko izbereš svojo občino, v Volitvomatu najdeš zbrane trditve, na
      katere lahko podaš svoj odgovor. Na podlagi rezultatov izveš, kateri od
      sodelujočih kandidatk ali kandidatov najbolj ustreza tvojim stališčem,
      lahko pa tudi podrobneje raziščeš, na katerih točkah so razhajanja
      največja in zakaj. Vprašanja smo navezali na najrazličnejša področja,
      nobena od zapisanih trditev pa ne predstavlja stališč iniciative Glas
      ljudstva.
    </p>
    <p>
      In za konec: ne pozabi deliti povezave do Volitvomata s prijateljicami in
      prijatelji, saj jim lahko tako morda olajšaš odločitev na lokalnih
      volitvah.
    </p>

    <div class="divider-yellow"></div>

    <h3>IZBERI SVOJO OBČINO!</h3>

    <div class="municipality-input-wrapper">
      <input
        type="text"
        id="search"
        class="municipality-input"
        placeholder="Vpiši ime občine..."
        v-model="searchTerm"
      />
      <span class="search-icon"></span>
      <ul v-if="searchOptions.length > 0 && !selectedMunicipality">
        <li
          v-for="municipality in searchOptions"
          :key="municipality['slug']"
          @click="selectMunicipality(municipality)"
        >
          {{ municipality["name"] }}
        </li>
      </ul>
    </div>

    <div class="button-wrapper">
      <RouterLink
        :to="`/${selectedMunicipalitySlug}/navodila`"
        class="white-button-border"
        :class="{ disabled: !selectedMunicipality }"
        >ZAČNI</RouterLink
      >
    </div>

    <div class="divider"></div>

    <footer>
      <div class="logos">
        <img src="../assets/img/ecas.png" class="financer-img ecas" />
        <img src="../assets/img/eu.jpeg" class="financer-img eu" />
      </div>
      <p>
        Sofinancira Evropska unija. Izražena stališča in mnenja ne odražajo
        nujno stališč Evropske unije ali Evropske komisije. Niti Evropska unija
        niti organ, ki dodeli pomoč, zanje ne moreta biti odgovorna.
      </p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 20px;
}

p {
  margin-bottom: 15px;

  a {
    color: #fffaf7;
    font-weight: 600;
  }
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.municipality-input-wrapper {
  position: relative;

  .search-icon {
    position: absolute;
    height: 30px;
    width: 30px;
    right: 10px;
    top: 10px;
  }
}

.municipality-input {
  border: 4px solid #f6c84c;
  font-size: 18px;
  font-weight: 700;
  height: 50px;
  // max-width: 140px;
  width: 100%;
  padding: 10px 50px 10px 15px;
}

h3 {
  text-align: center;
  font-family: "Grandstander", cursive;
  font-style: italic;
  font-size: 24px;
  font-weight: 600;
  color: #fffaf7;
  padding: 20px 0;
}

ul {
  padding: 0;
  border: 4px solid #f6c84c;
  border-top: none;
}

li {
  font-size: 14px;
  font-weight: 700;
  color: #010101;
  background-color: white;
  list-style: none;
  cursor: pointer;
  padding: 8px 15px;

  &:hover {
    background-color: #f6c84c;
  }
}

.divider-yellow {
  border-bottom: 3px solid #f6c84c;
  margin-top: 40px;
  margin-bottom: 10px;
}

.divider {
  margin-bottom: 40px;
  &.bottom {
    margin-top: 40px;
  }
}

footer {
  // background-color: white;
  text-align: center;
  margin: 0 -35px;
  padding: 0 35px;

  p {
    // color: #161615;
    font-size: 12px;
  }

  .logos {
    @media (min-width: 470px) {
      display: flex;
      align-items: start;
      justify-content: center;
    }
  }

  .financer-img {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;

    &.ecas {
      max-width: 160px;
    }

    &.eu {
      max-width: 200px;
    }
  }
}

// @media (min-width: 992px) {
//   .container {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//   }
// }
</style>
