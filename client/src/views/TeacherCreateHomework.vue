<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import TeacherNav from "../components/TeacherView/TeacherNav.vue";
import { ref, onMounted } from "vue";
import { TeacherService } from "../services/teacherService";
import { UserService } from "../services/userServices";
import { GroupService } from "../services/groupService";

const teacherService = new TeacherService();
const groupService = new GroupService();

const userService = new UserService();
const title = ref<string>("");
const description = ref<string>("");
const deadline = ref<string>("");
const maxPoints = ref<number>("");
const selectClass = ref<string>("");
const displayGroups = ref([]);

async function createHomework() {
  console.log(title);
  console.log(description);
  console.log(deadline);
  console.log(maxPoints);
  console.log(selectClass);
  //should call backend but later
}
onMounted(async () => {
  try {
    const teacher = await teacherService.getTeacherById();
    let arrayName: string[] = teacher.groupIds;
    // const groupsDisplay = ref<string[]>([]);
    // const groups = await teacherService.getTeacherStudentByTeacherGroup(
    //   groupIds[0],
    // );
    arrayName.forEach(async function (value) {
      const group = await groupService.getGroupById(value);
      displayGroups.value.push(group.code);
    });
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <TeacherNav />
  <div
    class="mx-auto mb-20 mt-20 min-h-[700px] max-w-[600px] pb-10 pt-20 shadow"
  >
    <h1 class="text-center text-6xl font-semibold text-accent">
      Create Homework
    </h1>
    <form class="mx-auto max-w-[700px]" @submit.prevent="createHomework">
      <div class="mx-auto mt-10 max-w-[370px]">
        <label for="title" class="block text-2xl">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          required
          class="font- mt-4 block h-[48px] w-full border-2 border-solid pl-4 shadow-md outline-none"
          v-model="title"
        />
      </div>
      <div class="mx-auto mt-5 max-w-[370px]">
        <label for="description" class="block text-2xl">Description</label>
        <textarea
          id="description"
          name="description"
          type="text"
          placeholder="Description"
          required
          class="mt-4 block h-[88px] w-full resize-none border-2 border-solid pl-4 shadow-md outline-none"
          v-model="description"
        ></textarea>
      </div>
      <div class="mx-auto mt-5 max-w-[370px]">
        <label for="deadline" class="block text-2xl">Deadline</label>
        <input
          id="deadline"
          name="deadline"
          type="datetime-local"
          placeholder="Deadline"
          required
          class="font- mt-4 block h-[48px] w-full border-2 border-solid pl-4 shadow-md outline-none"
          v-model="deadline"
        />
      </div>
      <div class="mx-auto mt-5 max-w-[370px]">
        <label for="maxPoints" class="block text-2xl">Max points</label>
        <div class="relative">
          <input
            id="maxPoints"
            name="maxPoints"
            type="number"
            placeholder="Max points"
            required
            class="mt-4 block h-[48px] w-full border-2 border-solid pl-4 shadow-md outline-none"
            v-model="maxPoints"
          />
        </div>
      </div>
      <div class="mx-auto mt-5 max-w-[370px]">
        <label for="selectClass" class="block text-2xl">Select a class</label>
        <select
          name="selectClass"
          required
          id="selectClass"
          class="mt-4 block h-[48px] w-full border-2 border-solid bg-primary pl-4 shadow-md outline-none"
          v-model="selectClass"
        >
          <option value="" disabled selected hidden>
            Please choose a class
          </option>
          <option
            v-for="(item, index) in displayGroups"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <button
        type="submit"
        class="mx-auto mt-5 flex h-[45px] w-[180px] cursor-pointer items-center justify-center bg-accent hover:bg-accent/90"
      >
        <p class="text-lg text-white">Submit</p>
      </button>
    </form>
  </div>
</template>

<style></style>
