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
      path: "/navodila",
      name: "instructions",
      component: InstructionsView,
    },
    {
      path: "/vprasanje/:id",
      name: "question",
      component: QuestionView,
    },
    {
      path: "/rezultati",
      name: "results",
      component: ResultsView,
    },
    {
      path: "/rezultati/:id",
      name: "resultsByParty",
      component: ResultsByPartyView,
    },
    {
      path: "/statistika",
      name: "statistics",
      component: StatisticsView,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
