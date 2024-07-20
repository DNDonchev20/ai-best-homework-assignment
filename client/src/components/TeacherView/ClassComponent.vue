<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { Group } from '../../models/group';
import { StudentDetail } from '../../models/studentDetail';
import User from '../../models/user';

const props = defineProps<{
  groups: Group[];
  students: { [key: string]: (StudentDetail & { user?: User })[] };
  subject?: { name: string };
  user?: User;
}>();

const sortedStudents = computed(() => {
  const sorted: { [key: string]: (StudentDetail & { user?: User })[] } = {};
  for (const [groupId, studentList] of Object.entries(props.students)) {
    sorted[groupId] = [...studentList].sort((a, b) => a.classNumber - b.classNumber);
  }
  return sorted;
});
</script>

<template>
  <div>
    <div v-for="group in props.groups" :key="group.id" class="mb-10">
      <div class="flex justify-between mb-4">
        <h1 class="text-5xl font-semibold">{{ group.name }} - {{ group.year }}</h1>
        <div>
          <p class="text-xl font-semibold">
            {{ props.user?.firstName }} {{ props.user?.lastName }}
          </p>
          <p>{{ props.user?.email }}</p>
        </div>
      </div>
      <div class="mt-10 w-full bg-[#F9FAFF] px-8">
        <div class="border-b-4 border-[#CACACA] mt-10 flex py-8">
          <div class="flex-grow min-w-[180px] text-2xl font-semibold">Class name - {{ group.code }}</div>
          <div class="min-w-[100px] text-2xl">№</div>
          <div class="min-w-[180px] text-2xl font-semibold">First name</div>
          <div class="min-w-[180px] text-2xl font-semibold">Last name</div>
        </div>
        <div v-for="(student, index) in sortedStudents[group.id]" :key="student.userId" class="flex py-4 border-b border-gray-300">
          <div class="flex-grow min-w-[180px]">{{ student.user.email }}</div>
          <div class="min-w-[100px]">{{ student.classNumber }}</div>
          <div class="min-w-[180px]">{{ student.user?.firstName || 'Loading...' }}</div>
          <div class="min-w-[180px]">{{ student.user?.lastName || 'Loading...' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mb-10 {
  margin-bottom: 2.5rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.border-b {
  border-bottom-width: 1px;
}
.border-gray-300 {
  border-color: #D1D5DB;
}
.text-xl {
  font-size: 1.25rem;
}
.text-2xl {
  font-size: 1.5rem;
}
.font-bold {
  font-weight: 700;
}
.font-semibold {
  font-weight: 600;
}
.min-w-[100px] {
  min-width: 100px;
}
.min-w-[180px] {
  min-width: 180px;
}
</style>