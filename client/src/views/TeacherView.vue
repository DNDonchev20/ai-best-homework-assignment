<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import TeacherNav from "../components/TeacherNav.vue";
import { onMounted } from "vue";
import { UserService } from "../services/userServices";
import { ref, defineComponent } from "vue";
import User from "../models/user";
import { SubjectService } from "../services/subjectService";

const userService = new UserService();
const subjectService = new SubjectService();
const user = ref<User>();
const subject = ref<Subject>();

onMounted(async () => {
  try {
    const userResponse = await userService.getUserById();
    user.value = userResponse;
    const subjectResponse = await subjectService.getSubjectByTeacherId();
    subjectResponse.value = subjectResponse;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
});
</script>

<template>
  <TeacherNav />
  <div class="mt-20 px-52">
    <div class="flex justify-between">
      <h1 class="text-5xl font-semibold">{{ subjectResponse?.name }}</h1>
      <div>
        <p class="text-xl font-semibold">
          {{ user?.firstName }} {{ user?.lastName }}
        </p>
        <p class="">{{ user?.email }}</p>
      </div>
    </div>
    <div class="mt-10 w-full bg-[#F9FAFF] px-8">
      <div
        class="border-b-solid mt-10 flex max-w-full gap-20 border-b-4 border-b-[#CACACA] py-8"
      >
        <h2 class="flex-grow-1 min-w-[180px] text-2xl font-semibold">
          Class name - 8G
        </h2>
        <h3 class="min-w-[100px] text-2xl">№</h3>
        <h3 class="min-w-[180px] text-2xl font-semibold">First name</h3>
        <h3 class="min-w-[180px] text-2xl font-semibold">Last name</h3>
      </div>
      <div
        class="border-b-solid my-4 flex max-w-full gap-20 border-b-2 border-b-[#CACACA] py-4"
      >
        <div class="min-w-[180px]"></div>
        <h3 class="min-w-[100px] text-2xl">7</h3>
        <h3 class="min-w-[180px] text-2xl">Deivid</h3>
        <h3 class="min-w-[180px] text-2xl">Donchev</h3>
        <div class="m ml-auto flex cursor-pointer items-center">
          <p class="text-2xl">See more &rarr;</p>
        </div>
      </div>
      <div
        class="border-b-solid my-4 flex max-w-full gap-20 border-b-2 border-b-[#CACACA] py-4"
      >
        <div class="min-w-[180px]"></div>
        <h3 class="min-w-[100px] text-2xl">7</h3>
        <h3 class="min-w-[180px] text-2xl">Deivid</h3>
        <h3 class="min-w-[180px] text-2xl">Donchev</h3>
        <div class="m ml-auto flex cursor-pointer items-center">
          <p class="text-2xl">See more &rarr;</p>
        </div>
      </div>
      <div
        class="border-b-solid my-4 flex max-w-full gap-20 border-b-2 border-b-[#CACACA] py-4"
      >
        <div class="min-w-[180px]"></div>
        <h3 class="min-w-[100px] text-2xl">7</h3>
        <h3 class="min-w-[180px] text-2xl">Deivid</h3>
        <h3 class="min-w-[180px] text-2xl">Donchev</h3>
        <div class="m ml-auto flex cursor-pointer items-center">
          <p class="text-2xl">See more &rarr;</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
