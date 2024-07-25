<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
  <div>
    <header>
      <nav class="flex items-center justify-between px-20" aria-label="Global">
        <div class="mx-auto pt-8">
          <a href="#start" class="px-14 text-[22px] font-semibold">Start</a>
          <a href="#features" class="px-14 text-[22px] font-semibold"
            >Features</a
          >
          <a href="#roles" class="px-14 text-[22px] font-semibold">Roles</a>
        </div>
      </nav>
    </header>
  </div>
  <div class="flex flex-row items-start justify-between" id="start">
    <div class="max-w-3xl pl-20 pr-20 pt-40 2xl:pt-56">
      <h1 class="text-4xl font-bold tracking-tight xl:text-6xl">
        Homework assignments made easy
      </h1>
      <p class="max-w-2xl pt-10 text-lg xl:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
        numquam! In tenetur blanditiis ab fuga labore exercitationem eligendi
        dicta adipisci.
      </p>
      <div class="mt-10 flex">
        <RouterLink to="/login">
          <a
            href="#"
            class="text-md rounded bg-accent/100 px-5 py-2 font-semibold text-white hover:bg-accent/90"
            >Start now
          </a>
        </RouterLink>
      </div>
    </div>
    <img
      src="../assets/images/heroImage.png"
      alt="image of our app"
      class="h-auto min-w-[700px] pr-20 2xl:min-w-[800px] 2xl:pt-24"
    />
  </div>
  <div class="mt-48 bg-secondary pb-20 pt-20" id="features">
    <h2 class="text-center font-semibold text-white md:text-5xl">
      Lorem ipsum dolor sit amet.
    </h2>
    <div class="m-auto flex flex-wrap justify-center pt-20">
      <div class="min-w-[250px] max-w-[400px] flex-1 py-6 text-center">
        <p class="text-4xl text-white">3%</p>
        <p class="text-xl text-white">Lorem, ipsum dolor.</p>
      </div>
      <div class="min-w-[250px] max-w-[400px] flex-1 py-6 text-center">
        <p class="text-4xl text-white">&#36;70M</p>
        <p class="text-xl text-white">Lorem ipsum dolor sit.</p>
      </div>
      <div class="min-w-[250px] max-w-[400px] flex-1 py-6 text-center">
        <p class="text-4xl text-white">8,000</p>
        <p class="text-xl text-white">Lorem, ipsum dolor.</p>
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-center gap-40 pt-48" id="roles">
    <img
      src="../assets/images/rolesImage1.png"
      alt="image of our app"
      class="h-auto max-w-[600px]"
    />
    <div class="flex max-w-[500px] flex-col pt-16">
      <h2 class="text-5xl font-semibold">Student role</h2>
      <p class="pt-10 text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
        laudantium quia incidunt ad et quo recusandae ipsum quidem corporis
        atque. Possimus harum, cupiditate doloribus fuga animi deleniti ipsum
        cum ducimus.
      </p>
    </div>
  </div>
  <div class="flex flex-row-reverse justify-center gap-40 pt-48">
    <img
      src="../assets/images/rolesImage2.png"
      alt="image of our app"
      class="h-auto max-w-[600px]"
    />
    <div class="flex max-w-[500px] flex-col pt-16">
      <h2 class="text-5xl font-semibold">Teacher role</h2>
      <p class="pt-10 text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
        laudantium quia incidunt ad et quo recusandae ipsum quidem corporis
        atque. Possimus harum, cupiditate doloribus fuga animi deleniti ipsum
        cum ducimus.
      </p>
    </div>
  </div>
  <div class="mt-28 flex justify-between bg-secondary pb-20 pt-10">
    <p class="pl-28 text-lg text-white">
      &#169;Deffenders, All rights reserved.
    </p>
    <div class="flex cursor-pointer gap-8 pb-10 pr-28">
      <a href="#">
        <img
          src="../assets/images/linkedInLogo.png"
          alt="linkedInLogo logo"
          class="h-auto w-8"
        />
      </a>
      <a href="#">
        <img
          src="../assets/images/instagramLogo.png"
          alt="instagram logo"
          class="h-auto w-8"
        />
      </a>
      <a href="#">
        <img
          src="../assets/images/facebookLogo.png"
          alt="facebook logo"
          class="h-auto w-8"
        />
      </a>
    </div>
  </div>
</template>

<style></style>
