<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import TeacherNav from "../components/TeacherView/TeacherNav.vue";
import { ref, onMounted } from "vue";
</script>

<template>
  <TeacherNav />
  <div class="flex w-full flex-col pl-[10vh] pt-[10vh]">
    <h1 class="pb-[7vh] pt-[5vh] text-4xl font-semibold">All homeworks</h1>
    <div class="h-full w-[90%] bg-[#f9faff] p-10">
      <div
        class="mb-14 flex min-h-[260px] w-[100%] content-between border-2 border-solid pb-7 pl-7 pt-5 shadow-xl"
      >
        <div>
          <h2 class="pb-4 text-2xl font-semibold">Title of the assignment</h2>
          <p class="w-[80%] text-lg">
            Description: Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Vitae est illum, veniam delectus consectetur nam aliquid
            architecto, autem quasi incidunt laborum tempore alias accusamus
            aut! Hic iure deserunt ullam deleniti! lorem60
          </p>
        </div>
        <div class="flex h-full flex-col items-end justify-between">
          <div>
            <p class="pb-2 text-xl font-semibold">Class: 9v</p>
            <p class="pb-2 text-xl font-semibold">Student: mincho@gmail.com</p>
            <p class="w-[300px] text-lg font-semibold">
              Deadline: 24-09-2024 24:00 PM
            </p>
          </div>
          <a
            class="text-md mr-12 mt-20 cursor-pointer rounded bg-accent/100 px-5 py-2 font-semibold text-white hover:bg-accent/90"
            >Grade</a
          >
        </div>
      </div>
      <div
        class="mb-14 flex min-h-[260px] w-[100%] content-between border-2 border-solid pb-7 pl-7 pt-5 shadow-xl"
      >
        <div>
          <h2 class="pb-4 text-2xl font-semibold">Title of the assignment</h2>
          <p class="w-[80%] text-lg">
            Description: Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Vitae est illum, veniam delectus consectetur nam aliquid
            architecto, autem quasi incidunt laborum tempore alias accusamus
            aut! Hic iure deserunt ullam deleniti! lorem60
          </p>
        </div>
        <div class="flex h-full flex-col items-end justify-between">
          <div>
            <p class="pb-2 text-xl font-semibold">Class: 9v</p>
            <p class="pb-2 text-xl font-semibold">Student: mincho@gmail.com</p>
            <p class="w-[300px] text-lg font-semibold">
              Deadline: 24-09-2024 24:00 PM
            </p>
          </div>
          <a
            class="text-md mr-12 mt-20 cursor-pointer rounded bg-accent/100 px-5 py-2 font-semibold text-white hover:bg-accent/90"
            >Grade</a
          >
        </div>
      </div>
      <div
        class="mb-14 flex min-h-[260px] w-[100%] content-between border-2 border-solid pb-7 pl-7 pt-5 shadow-xl"
      >
        <div>
          <h2 class="pb-4 text-2xl font-semibold">Title of the assignment</h2>
          <p class="w-[80%] text-lg">
            Description: Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Vitae est illum, veniam delectus consectetur nam aliquid
            architecto, autem quasi incidunt laborum tempore alias accusamus
            aut! Hic iure deserunt ullam deleniti! lorem60
          </p>
        </div>
        <div class="flex h-full flex-col items-end justify-between">
          <div>
            <p class="pb-2 text-xl font-semibold">Class: 9v</p>
            <p class="pb-2 text-xl font-semibold">Student: mincho@gmail.com</p>
            <p class="w-[300px] text-lg font-semibold">
              Deadline: 24-09-2024 24:00 PM
            </p>
          </div>
          <a
            class="text-md mr-12 mt-20 cursor-pointer rounded bg-accent/100 px-5 py-2 font-semibold text-white hover:bg-accent/90"
            >Grade</a
          >
        </div>
      </div>
      <div
        class="mb-14 flex min-h-[260px] w-[100%] content-between border-2 border-solid pb-7 pl-7 pt-5 shadow-xl"
      >
        <div>
          <h2 class="pb-4 text-2xl font-semibold">Title of the assignment</h2>
          <p class="w-[80%] text-lg">
            Description: Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Vitae est illum, veniam delectus consectetur nam aliquid
            architecto, autem quasi incidunt laborum tempore alias accusamus
            aut! Hic iure deserunt ullam deleniti! lorem60
          </p>
        </div>
        <div class="flex h-full flex-col items-end justify-between">
          <div>
            <p class="pb-2 text-xl font-semibold">Class: 9v</p>
            <p class="pb-2 text-xl font-semibold">Student: mincho@gmail.com</p>
            <p class="w-[300px] text-lg font-semibold">
              Deadline: 24-09-2024 24:00 PM
            </p>
          </div>
          <a
            class="text-md mr-12 mt-20 cursor-pointer rounded bg-accent/100 px-5 py-2 font-semibold text-white hover:bg-accent/90"
            >Grade</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
