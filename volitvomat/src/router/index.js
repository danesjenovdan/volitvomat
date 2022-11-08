import { createRouter, createWebHistory } from "vue-router";
import QuestionView from "../views/QuestionView.vue";
import IntroductionView from "../views/IntroductionView.vue";
import InstructionsView from "../views/InstructionsView.vue";
import ResultsView from "../views/ResultsView.vue";
import StatisticsView from "../views/StatisticsView.vue";
import ResultsByPartyView from "../views/ResultsByPartyView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "introduction",
      component: IntroductionView,
    },
    {
      path: "/:slug/navodila",
      name: "instructions",
      component: InstructionsView,
    },
    {
      path: "/:slug/vprasanje/:id",
      name: "question",
      component: QuestionView,
    },
    {
      path: "/:slug/rezultati",
      name: "results",
      component: ResultsView,
    },
    {
      path: "/:slug/rezultati/:id",
      name: "resultsByParty",
      component: ResultsByPartyView,
    },
    {
      path: "/:slug/statistika",
      name: "statistics",
      component: StatisticsView,
    },
  ],
});

export default router;
