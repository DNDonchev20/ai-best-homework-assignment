import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TeacherView from "../views/TeacherView.vue";
import StudentView from "../views/StudentView.vue";

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
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        title: "Register",
      },
    },
    {
      path: "/teacherHome",
      name: "teacherHome",
      component: TeacherView,
      meta: {
        title: "Teacher Home",
      },
    },
    {
      path: "/studentHome",
      name: "studentHome",
      component: StudentView,
      meta: {
        title: "Student Home",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + "";
  next();
});

export default router;
