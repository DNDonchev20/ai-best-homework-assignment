import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import LoginView from "../views/LoginView.vue";

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
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        title: "Login",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + "";
  next();
});

export default router;
