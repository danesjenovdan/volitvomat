import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      questions: {
        173: {
          demand_title:
            "OMOGOČI NAJ SE ENAK DOSTOP DO OPLODITVE Z BIOMEDICINSKO POMOČJO IN POSVOJITEV ZA SAMSKE OSEBE TER OSEBE V ISTOSPOLNIH PARTNERSKIH ZVEZAH",
          demand_description:
            "Na podlagi ustavno varovane pravice do svobodnega odločanja o rojstvu otrok so z zakonom opredeljeni zdravstveni ukrepi, s katerimi se ženski in moškemu pomaga pri spočetju otroka. Ta pravica mora biti priznana tudi samskim ženskam in ženskam v istospolnih partnerskih zvezah. Prav tako mora biti pravica do posvojitve priznana samskim osebam in osebam v istospolnih partnerskih zvezah.",
          party_answers: {
            "levica": true,
            "pirati": true,
            "dobradrzava": false
          },
        },
        137: {
          demand_title:
            "ODPRAVITI JE TREBA VSA ŠKODLJIVA DOLOČILA IN POSLEDICE PROTIKORONSKE ZAKONODAJE",
          demand_description:
            "Potrebna je analiza t. i. PKP-jev in odprava členov, ki niso povezani z reševanjem epidemije ali njenih posledic, ter druge zakonodaje, ki je bila v tem času sprejeta brez vključevanja javnosti, stroke ali po nujnih postopkih in pomeni nazadovanje v varstvu demokratičnih načel, človekovih pravic, varovanja okolja ali drugih svoboščin.",
          party_answers: {
            "levica": true,
            "pirati": true,
            "dobradrzava": true
          },
        },
        148: {
          demand_title:
            "POLITIČNO VPLIVANJE NA NEODVISNE INSTITUCIJE MORA BITI PREPOVEDANO",
          demand_description:
            "Vsakršno politično vplivanje na delo policije, tožilstva, sodstva in drugih neodvisnih institucij mora biti odločno sankcionirano. Prepovedati je treba vsakršno politično poseganje, ustrahovanje, napade, blatenje ali izvajanje pritiskov s strani političnih predstavnic in predstavnikov oblasti.",
          party_answers: {
            "levica": false,
            "pirati": false,
            "dobradrzava": false
          },
        },
      },
      answers: {},
      party_agree_count: {
        "levica": 0,
        "pirati": 0,
        "dobradrzava": 0
      }
    };
  },
  getters: {
    questionsList(state) {
      return Object.keys(state.questions);
    },
    results(state) {
      return state.party_agree_count;
    },
    answers(state) {
      return state.answers;
    }
  },
  mutations: {
    addAnswer(state, payload) {
      state.answers[payload.id] = payload.answer;
    },
    calculateResults(state) {
      for (const id in state.answers) { // go through answers
        for (const party in state.party_agree_count) { // compare user answer to all parties
          if (state.answers[id] == state.questions[id].party_answers[party]) {
            state.party_agree_count[party]++;
          }
        }
      }
    }
  },
});

export default store;
