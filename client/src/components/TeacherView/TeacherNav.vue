<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="min-w-full">
    <nav class="flex items-center justify-between px-20">
      <div class="mx-auto pt-8">
        <a href="/teacherHome" class="px-14 text-[22px] font-semibold">Home</a>
        <RouterLink to="/teacherHomework"
          ><a href="/" class="px-14 text-[22px] font-semibold"
            >Homework</a
          ></RouterLink
        >
      </div>
    </nav>
  </header>
</template>

<style></style>
