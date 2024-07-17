<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

const switchVisibility = async () => {
  const passwordField = document.getElementById(
    "password",
  ) as HTMLInputElement | null;
  if (passwordField) {
    if (passwordField.getAttribute("type") === "password") {
      passwordField.setAttribute("type", "text");
    } else {
      passwordField.setAttribute("type", "password");
    }
  } else {
    console.error("Password field not found.");
  }
};
</script>

<template>
  <div
    class="mx-auto mb-20 mt-20 min-h-[700px] max-w-[600px] pb-10 pt-20 shadow"
  >
    <h1 class="text-center text-6xl font-semibold text-accent">Register</h1>
    <form action="#" class="mx-auto max-w-[700px]">
      <div class="mx-auto mt-10 max-w-[370px]">
        <label for="email" class="block text-2xl">First name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First name"
          required
          class="font- mt-4 block h-[48px] w-full border-2 border-solid pl-4 shadow-md outline-none"
        />
      </div>
      <div class="mx-auto mt-10 max-w-[370px]">
        <label for="email" class="block text-2xl">Second name</label>
        <input
          id="secondName"
          name="secondName"
          type="text"
          placeholder="Second name"
          required
          class="font- mt-4 block h-[48px] w-full border-2 border-solid pl-4 shadow-md outline-none"
        />
      </div>
      <div class="mx-auto mt-10 max-w-[370px]">
        <label for="email" class="block text-2xl">Email address</label>
        <input
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
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            class="font- mt-4 block h-[48px] w-full border-2 border-solid pl-4 shadow-md outline-none"
          />
          <div
            @click="switchVisibility()"
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
      You have an account,
      <RouterLink to="/login"
        ><span
          class="cursor-pointer underline decoration-accent decoration-solid decoration-2"
          >use it now!</span
        ></RouterLink
      >
    </p>
  </div>
</template>

<style></style>
