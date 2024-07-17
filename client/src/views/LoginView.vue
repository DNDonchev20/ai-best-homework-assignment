<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="mx-auto mt-20 min-h-[700px] max-w-[600px] pt-20 shadow">
    <h1 class="text-center text-6xl font-semibold text-accent">Log in</h1>
    <form action="#" class="mx-auto max-w-[700px]">
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
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          class="font- mt-4 block h-[48px] w-full border-2 border-solid pl-4 shadow-md outline-none"
        />
      </div>
      <button
        type="submit"
        class="mx-auto mt-10 flex h-[45px] w-[180px] cursor-pointer items-center justify-center bg-accent hover:bg-accent/90"
      >
        <p class="text-lg text-white">Submit</p>
      </button>
    </form>
    <p class="mt-14 text-center text-lg text-gray-500">
      If you don't have account,
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
