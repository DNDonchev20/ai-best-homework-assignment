<template>
  <div class="flex w-full justify-center pt-8">
    <a href="/studentHome"
      ><p class="px-14 text-[26px] font-semibold">Go back</p></a
    >
  </div>
  <div class="w-full pl-[10vh] pt-[10vh]">
    <h1 class="text-4xl font-semibold">Homework for {{ group?.name }}</h1>
    <div
      class="mb-[60px] flex min-h-[170px] w-[80%] flex-row justify-between border-2 border-solid pb-5 pl-7 pr-7 pt-5 shadow-xl"
      v-for="homework in homeworkDisplat"
    >
      <div>
        <p class="text-2xl">
          {{ homework.title }}
        </p>
        <p class="max-w-[500px] pt-3 text-lg">{{ homework.description }}</p>
      </div>
      <div class="min-w-[150px]">
        <p class="text-lg">{{ homework.dueDate }}</p>
        <p>Max points: {{ homework.maxPoints }}</p>
        <div class="pt-10">
          <RouterLink to="/submitHomework">
            <a
              href="#"
              class="text-md rounded bg-accent/100 px-5 py-2 font-semibold text-white hover:bg-accent/90"
              >Submit
            </a>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { GroupService } from "../services/groupService";
import { Group } from "../models/group";
import { HomeworkService } from "../services/homeworkService";
import { Homework } from "../models/homework";

const route = useRoute();
const groupCode = route.params.code as string;
const groupService = new GroupService();
const homeworkService = new HomeworkService();
const group = ref<Group | null>(null);
const homeworkDisplat = ref<Homework[]>([]);

onMounted(async () => {
  try {
    group.value = await groupService.getGroupById(groupCode);
    const homework = await homeworkService.getHomeworkByGroupId(
      group.value?.id,
    );
    homeworkDisplat.value = homework;
  } catch (error) {
    console.error("Failed to fetch group details:", error);
  }
});
</script>
