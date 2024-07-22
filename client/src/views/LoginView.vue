<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { UserService } from "../services/userServices";

const userService = new UserService();
const router = useRouter();

const email = ref<string>("");
const password = ref<string>("");

async function login(event: Event) {
  event.preventDefault();
  try {
    await userService.login(email.value, password.value);
    const userResponse = await userService.getUserById();

    if (userResponse.role == "USER") {
      router.push("/studentHome");
    } else if (userResponse.role == "TEACHER") {
      router.push("/teacherHome");
    } else {
      throw new Error("Role not defined");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
}

const switchVisibility = () => {
  const passwordField = document.getElementById(
    "password",
  ) as HTMLInputElement | null;
  if (passwordField) {
    const fieldType = passwordField.getAttribute("type");
    passwordField.setAttribute(
      "type",
      fieldType === "password" ? "text" : "password",
    );
  } else {
    console.error("Password field not found.");
  }
};
</script>

<template>
  <div class="mx-auto mt-20 min-h-[700px] max-w-[600px] pt-20 shadow">
    <h1 class="text-center text-6xl font-semibold text-accent">Log in</h1>
    <form @submit="login" class="mx-auto max-w-[700px]">
      <div class="mx-auto mt-10 max-w-[370px]">
        <label for="email" class="block text-2xl">Email address</label>
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autocomplete="email"
          required
          class="font- mt-4 block h-[48px] w-full border-2 border-solid pl-4 shadow-md outline-none"
        />
      </div>
      <div class="mx-auto mt-5 max-w-[370px]">
        <label for="password" class="block text-2xl">Password</label>
        <div class="relative">
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            class="font- mt-4 block h-[48px] w-full border-2 border-solid pl-4 shadow-md outline-none"
          />
          <div
            @click="switchVisibility"
            class="absolute right-[20px] top-[10px] z-50 cursor-pointer"
          >
            <img
              class="h-[25px] w-[25px]"
              src="../assets/images/eye.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="mx-auto mt-10 flex h-[45px] w-[180px] cursor-pointer items-center justify-center bg-accent hover:bg-accent/90"
      >
        <p class="text-lg text-white">Submit</p>
      </button>
    </form>
    <p class="mt-14 text-center text-lg text-gray-500">
      If you don't have an account,
      <RouterLink to="/register"
        ><span
          class="cursor-pointer underline decoration-accent decoration-solid decoration-2"
          >create one now!</span
        ></RouterLink
      >
    </p>
  </div>
</template>

<style></style>
