import { createStore } from "vuex";
import axios from 'axios'

const store = createStore({
  state() {
    return {
      apiUrl: "https://glas-ljudstva.si",
      parties: {},
      questions: {},
      answers: {}
    };
  },
  getters: {
    getApiUrl(state) {
      return state.apiUrl;
    },
    questionsList(state) {
      return Object.keys(state.questions);
    },
    answers(state) {
      return state.answers;
    },
    parties(state) {
      return state.parties;
    },
    orderedParties(state) {
     return state.parties.sort((a, b) => (a.percentage > b.percentage) ? -1 : 1)
    }
  },
  mutations: {
    addAnswer(state, payload) {
      state.answers[payload.id] = payload.answer;
    },
    calculateResults(state) {
      for (const id in state.answers) { // go through answers
        for (const index in state.parties) { // compare user answer to all parties
          if (state.answers[id] == state.questions[id].party_answers[state.parties[index].id]) {
            state.parties[index].party_agree_count++;
          }
        }
      }
    },
    calculateResultsPercentages(state) {
      const answersNo = Object.keys(state.answers).length;
      console.log(answersNo)
      for (const index in state.parties) {
        state.parties[index]['percentage'] = Math.round(state.parties[index].party_agree_count / answersNo * 100) 
      }
    },
    setQuestions(state, questions) {
      state.questions = questions;
    },
    setParties(state, parties) {
      state.parties = parties;
      for (const index in parties) {
        state.parties[index].party_agree_count = 0
      }
    }
  },
  actions: {
    getUsers({ commit, state }) {
      axios.get(`${state.apiUrl}/api/volitvomat`)
      .then(response => {
          commit('setQuestions', response.data['questions']);
          commit('setParties', response.data['parties']);
      })
    }
  }
});

export default store;
