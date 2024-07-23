<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { UserService } from "../services/userServices";
import { ref, onMounted } from "vue";
import StudentView from "../components/StudentView/StudentNav.vue";
import { User } from "../models/user";
import { StudentDetailsService } from "../services/studentDetailsService";
import { GroupService } from "../services/groupService";

const userService = new UserService();
const groupService = new GroupService();
const studentDetailsService = new StudentDetailsService();
const user = ref<User>();
const classes = ref<number>();
const code = ref<string>();

onMounted(async () => {
  try {
    const userResponse = await userService.getUserById();
    user.value = userResponse;
    const studentDetailsResponse =
      await studentDetailsService.getDetailsByUserId(userResponse.id + "");
    const groupsResponse = await groupService.getGroupById(
      studentDetailsResponse.groupIds + "",
    );
    classes.value = groupsResponse.year;
    code.value = groupsResponse.code;
  } catch (error) {
    console.error("Failed to fetch user or subject:", error);
  }
});
</script>

<template>
  <StudentView />
  <div class="flex min-h-[600px] w-full items-center justify-center">
    <div
      class="flex min-w-[400px] flex-col gap-5 border-2 border-solid p-5 pb-10 shadow-xl"
    >
      <p class="pt-5 text-xl">
        <span class="font-semibold">First name:</span> {{ user?.firstName }}
      </p>
      <p class="text-xl">
        <span class="font-semibold">Second name: </span>{{ user?.lastName }}
      </p>
      <p class="text-xl">
        <span class="font-semibold">Email: </span>{{ user?.email }}
      </p>
      <p class="text-xl">
        <span class="font-semibold">Role:</span> {{ user?.role }}
      </p>
      <p class="text-xl">
        <span class="font-semibold">Class:</span> {{ code }}
      </p>
      <p class="text-xl">
        <span class="font-semibold">Year:</span> {{ classes }}
      </p>
    </div>
  </div>
</template>

<style></style>
