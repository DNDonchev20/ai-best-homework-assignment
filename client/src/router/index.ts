import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexView,
      meta: {
        title: "Home",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + "";
  next();
});

export default router;
