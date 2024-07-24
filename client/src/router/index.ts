import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TeacherView from "../views/TeacherView.vue";
import StudentView from "../views/StudentView.vue";
import TeacherCreateHomework from "../views/TeacherCreateHomework.vue";
import ShowHomeworkView from "../views/ShowHomeworkView.vue";
import HomeworkView from "../views/HomeworkView.vue";
import SubmitHomeworkView from "../views/SubmitHomeworkView.vue";
import GradeHomeworkView from "../views/GradeHomeworkView.vue";
import ProfileView from "../views/ProfileView.vue";
import StudentHomeworkView from "../views/StudentHomeworkView.vue";

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
    {
      path: "/createHomework",
      name: "createHomework",
      component: TeacherCreateHomework,
      meta: {
        title: "Create Homework",
      },
    },
    {
      path: "/showHomework",
      name: "showHomework",
      component: ShowHomeworkView,
      meta: {
        title: "Show Homework",
      },
    },
    {
      path: "/homework",
      name: "homework",
      component: HomeworkView,
      meta: {
        title: "Homework",
      },
    },
    {
      path: "/submitHomework",
      name: "Submit Homework",
      component: SubmitHomeworkView,
      meta: {
        title: "Submit Homework",
      },
    },
    {
      path: "/gradeHomework",
      name: "Grade Homework",
      component: GradeHomeworkView,
      meta: {
        title: "Grade Homework",
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
      meta: {
        title: "Profile",
      },
    },
    {
      path: "/studentHomework/:code",
      name: "StudentHomework",
      component: StudentHomeworkView,
      meta: {
        title: "Student Homework",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + "";
  next();
});

export default router;
