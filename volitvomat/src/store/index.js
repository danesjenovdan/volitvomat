import { createStore } from "vuex";
import axios from 'axios'

const store = createStore({
  state() {
    return {
      apiUrl: "https://glas-ljudstva.si",
      storeInitialized: false,
      parties: {},
      questions: {},
      answers: {},
      results: {},
      desus: {},
      quizFinished: false
    };
  },
  getters: {
    getApiUrl(state) {
      return state.apiUrl;
    },
    getStoreInitialized(state) {
      return state.storeInitialized;
    },
    getQuestions(state) {
      return state.questions;
    },
    getQuestionsList(state) {
      return Object.keys(state.questions);
    },
    getAnswers(state) {
      return state.answers;
    },
    getParties(state) {
      return state.parties;
    },
    getDesus(state) {
      return state.desus;
    },
    getResults(state) {
      return state.results;
    },
    getQuizFinished(state) {
      return state.quizFinished
    }
  },
  mutations: {
    clearStore(state) {
      state.parties = {};
      state.desus = {};
      state.questions = {};
      state.answers = {};
      state.results = {};
      state.quizFinished = false;
      state.storeInitialized = true;
    },
    initializeStore(state) {
      state.storeInitialized = true;
    },
    addAnswer(state, payload) {
      state.answers[payload.id] = payload.answer;
      localStorage.setItem('answers', JSON.stringify(state.answers))
    },
    removeAnswer(state, payload) {
      delete state.answers[payload.id];
      localStorage.setItem('answers', JSON.stringify(state.answers))
    },
    calculateResults(state) {
      const answers_party_matches = {}
      const answersNo = Object.keys(state.answers).length;

      // setup (count and percentage to 0 for every party)
      for (const key in state.parties) {
        answers_party_matches[key] = {
          'count': 0,
          'percentage': 0
        };
      }
      if (answersNo > 0) {
        // count matching answers for each party
        for (const id in state.answers) { // go through answers
          for (const party_id in answers_party_matches) { // compare user answer to all parties
            if (state.answers[id] == (state.questions[id].twisted?.party_answers[party_id] || state.questions[id].party_answers[party_id])) {
              answers_party_matches[party_id].count++;
              answers_party_matches[party_id].percentage =  Math.round(answers_party_matches[party_id].count / answersNo * 100)
            }
          }
        }
      }
      // console.log('party matches filled', answers_party_matches)

      // create an array with counting results
      const ordered_results = []
      for (const party_id in answers_party_matches) {
        if (party_id === '5') { // DeSUS is separated
          state.desus = {
            'party_id': party_id,
            'count': answers_party_matches[party_id].count,
            'percentage': answers_party_matches[party_id].percentage,
          }
        } else {
          ordered_results.push({
            'party_id': party_id,
            'count': answers_party_matches[party_id].count,
            'percentage': answers_party_matches[party_id].percentage,
          })
        }
      }
      // sort the array (descending by percentage) and save to state.results
      state.results = ordered_results.sort((a, b) => (a.percentage > b.percentage) ? -1 : 1);
      state.quizFinished = true;
      localStorage.setItem('quizFinished', 'true');
    },
    setQuestions(state, questions) {
      state.questions = questions;
      localStorage.setItem('questions', JSON.stringify(state.questions))
    },
    setParties(state, parties) {
      state.parties = {}
      // TODO: pripravi da api endpoint vrne take podatke
      for (const index in parties) {
        state.parties[parties[index].id] = {
          "party_name": parties[index].party_name,
          "image_url": parties[index].image_url,
          "url":  parties[index].url
        }
      }
      localStorage.setItem('parties', JSON.stringify(state.parties))
    }
  },
  actions: {
    async initializeStore({ commit, dispatch, state }) {
      // check if data exists in local storage
      const parties = localStorage.getItem('parties');
      const questions = localStorage.getItem('questions');
      const answers = localStorage.getItem('answers');
      const finished = localStorage.getItem('quizFinished');
      if (parties && questions) {
        commit('setQuestions', JSON.parse(questions));
        state.parties = JSON.parse(parties); // TODO: change to commit when api is fixed
        // commit('setParties', response.data['parties']);
        if (answers) {
          state.answers = JSON.parse(answers);
        }
        if (finished) {
          state.quizFinished = finished === 'true';
          if (state.quizFinished) {
            store.commit('calculateResults');
          }
        }
      } else { // no data
        await dispatch('getData');
      }
      commit('initializeStore')
      return state.quizFinished;
    },
    async getData({ commit, state }) {
      const response = await axios.get(`${state.apiUrl}/api/volitvomat`);
      commit('setQuestions', response.data['questions']);
      commit('setParties', response.data['parties']);
    },
    clearStore({ commit, dispatch }) {
      // localStorage.clear();
      localStorage.removeItem('parties');
      localStorage.removeItem('questions');
      localStorage.removeItem('answers');
      localStorage.removeItem('quizFinished');
      commit('clearStore');
      dispatch('getData');
    },
    initializeQuizFinished({ state }) {
      finished = localStorage.getItem('quizFinished');
      state.quizFinished = finished === 'true';
      return state.quizFinished;
    }
  }
});

export default store;
