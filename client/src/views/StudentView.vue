<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import StudentView from "../components/StudentView/StudentNav.vue";

import { UserService } from "../services/userServices";
import { ref, onMounted } from "vue";
import { User } from "../models/user";
import { StudentDetailsService } from "../services/studentDetailsService";
import { GroupService } from "../services/groupService";
import { Group } from "../models/group";

const userService = new UserService();
const groupService = new GroupService();
const studentDetailsService = new StudentDetailsService();
const user = ref<User>();
const groups = ref<Group[]>([]);
const classes = ref<number>();
const code = ref<string>();

onMounted(async () => {
  try {
    const userResponse = await userService.getUserById();
    user.value = userResponse;
    const studentDetailsResponse =
      await studentDetailsService.getDetailsByUserId(userResponse.id + "");

    for (let group of studentDetailsResponse.groupIds) {
      const groupsResponse = await groupService.getGroupById(group + "");
      groups.value.push(groupsResponse);
    }
  } catch (error) {
    console.error("Failed to fetch user or subject:", error);
  }
});
</script>

<template>
  <StudentView />
  <div class="flex w-full flex-col pl-[10vh] pt-[10vh]">
    <h1 class="text-4xl font-semibold">Courses</h1>
    <div
      class="flex h-[700px] w-[80%] flex-wrap items-start gap-20 pl-10 pt-10"
    >
      <div
        class="flex min-h-[200px] min-w-[200px] cursor-pointer flex-col flex-wrap items-center justify-center gap-5 border-2 border-solid text-center shadow-xl"
        v-for="group in groups"
      >
        <RouterLink
          :to="{ name: 'StudentHomework', params: { code: group.id } }"
        >
          <p class="text-3xl">{{ group.name }}</p>
          <p class="text-3xl">{{ group.code }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style></style>
