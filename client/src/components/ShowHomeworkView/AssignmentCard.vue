<template>
    <div class="mb-14 flex min-h-[260px] w-full content-between border-2 border-solid pb-7 pl-7 pt-5 shadow-xl">
      <div>
        <h2 class="pb-4 text-2xl font-semibold">{{ title }}</h2>
        <p class="w-4/5 text-lg">Description: {{ description }}</p>
      </div>
      <div class="flex flex-col items-end justify-between ml-auto mr-4">
        <div>
          <p class="pb-2 text-xl font-semibold">Student: {{ studentFirstName }} {{ studentLastName }}</p>
          <p class="pb-2 text-xl font-semibold">Email: {{ studentEmail }}</p>
          <p class="w-72 text-lg font-semibold">Deadline: {{ deadline }}</p>
        </div>
        <a class="text-md mt-20 cursor-pointer rounded bg-accent/100 px-5 py-2 font-semibold text-white hover:bg-accent/90">Grade</a>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  defineProps<{
    title: string;
    description: string;
    studentFirstName: string;
    studentLastName: string;
    studentEmail: string;
    deadline: string;
  }>();
</script>
  
<style scoped>
</style>
  