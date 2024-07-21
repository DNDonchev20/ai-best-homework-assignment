<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import TeacherNav from "../components/TeacherView/TeacherNav.vue";
import { ref, onMounted } from "vue";
import { TeacherService } from "../services/teacherService";
import { UserService } from "../services/userServices";

const teacherService = new TeacherService();

const userService = new UserService();

// onMounted(async () => {
//   try {
//     const teacher = await teacherService.getTeacherById();
//     const groupIds = teacher.groupIds;
//     const groups = await teacherService.getTeacherStudentByTeacherGroup(
//       groupIds[0],
//     );
//     console.log(teacher);
//     console.log(groups);

//     let arrayOfNames: string[] = [];
//     groups.forEach((gr) => {
//       try {
//         const user = await userService.getUserById(gr.studentId);
//         console.log(user);
//         //arrayOfNames.push(user.email);
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//       }
//     });
//     //console.log(arrayOfNames);

//     // console.log(arrayOfNames);
//   } catch (error) {
//     console.error("Failed to fetch user or subject:", error);
//   }
// });

onMounted(async () => {
  try {
    const teacher = await teacherService.getTeacherById();
    const groupIds = teacher.groupIds;
    const groupsDisplay = ref<string[]>([]);
    const groups = await teacherService.getTeacherStudentByTeacherGroup(
      groupIds[0],
    );
    // console.log(groups);

    let arrayOfNames: string[] = [];

    // Use a for...of loop for async operations
    for (const gr of groups) {
      try {
        // Await the asynchronous call
        const user = await userService.getOtherUserByUserId(gr.userId);
        arrayOfNames.push(user.email);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    groupsDisplay.value = ref(arrayOfNames);
    console.log(groupsDisplay.value);
  } catch (error) {
    console.error("Failed to fetch teacher or students:", error);
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
    <form class="mx-auto max-w-[700px]">
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
      <div v-for="(item, index) in groupsDisplay" :key="index">
        {{ item }}
      </div>

      <div class="mx-auto mt-5 max-w-[370px]">
        <label for="role" class="block text-2xl">Select a role</label>
        <select
          name="role"
          required
          id="role"
          class="mt-4 block h-[48px] w-full border-2 border-solid bg-primary pl-4 shadow-md outline-none"
          v-model="role"
        >
          <option value="" disabled selected hidden>Please choose</option>
          <option value="USER" selected>Student</option>
          <option value="TEACHER">Teacher</option>
        </select>
      </div>
      <button
        type="submit"
        class="mx-auto mt-5 flex h-[45px] w-[180px] cursor-pointer items-center justify-center bg-accent hover:bg-accent/90"
      >
        <p class="text-lg text-white">Submit</p>
      </button>
    </form>
    <p class="mt-14 text-center text-lg text-gray-500">
      You have an account,
      <RouterLink to="/login">
        <span
          class="cursor-pointer underline decoration-accent decoration-solid decoration-2"
        >
          use it now!
        </span>
      </RouterLink>
    </p>
  </div>
</template>

<style></style>
