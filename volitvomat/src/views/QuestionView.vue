<script setup>
// import TheWelcome from "@/components/TheWelcome.vue";
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();

const questionId = ref(route.params.id);
const questionsNo = ref(store.state.questions.length);
const question = computed(() => store.state.questions[questionId.value]);


watch(
  () => route.params.id,
  async (id) => {
    // userData.value = await fetchUser(id)
    questionId.value = id;
  }
);

// const questions = ref(data.questions);
const moreInfo = ref(false);
</script>

<template>
  <main>
    {{ questionId }}
    <!-- {{ store.state.questions }} -->
    <h4>{{ question.demand_title }}</h4>
    <p v-if="moreInfo">{{ question.demand_description }}</p>
    <RouterLink :to="`/vprasanje/${questionId - 1}`" v-if="questionId > 0">
      prejšnje vprašanje
    </RouterLink>
    <button>ne strinjam</button>
    <button @click="moreInfo = true">i</button>
    <button>se strinjam</button>
    <RouterLink
      :to="`/vprasanje/${parseInt(questionId) + 1}`"
      v-if="questionId < questionsNo - 1"
    >
      naslednje vprašanje
    </RouterLink>

    <RouterLink to="/rezultati" v-if="questionId == questionsNo - 1">
      rezultati
    </RouterLink>
  </main>
</template>
