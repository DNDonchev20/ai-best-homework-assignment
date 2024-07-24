<script setup lang="ts">
import { ref, onMounted } from "vue";
import TeacherNav from "../components/TeacherView/TeacherNav.vue";
import AssignmentCard from "../components/ShowHomeworkView/AssignmentCard.vue";
import { HomeworkService } from "../services/homeworkService";
import { HomeworkSubmissionService } from "../services/homeworkSubmissionService";
import { UserService } from "../services/userServices";
import { TeacherService } from "../services/teacherService";
import { StudentDetailsService } from "../services/studentDetailsService";

const homeworks = ref([]);
const userService = new UserService();
const homeworkService = new HomeworkService();
const homeworkSubmissionService = new HomeworkSubmissionService();
const teacherService = new TeacherService();
const studentDetailsService = new StudentDetailsService();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchHomeworks = async () => {
  try {
    const user = await userService.getUserById();
    const userId = user.id;

    const teacher = await teacherService.findTeacherByUserId(userId);
    const teacherId = teacher.id;

    const allHomeworks =
      await homeworkService.getHomeworksByTeacherId(teacherId);

    for (const homework of allHomeworks) {
      await delay(500);
      const submissions =
        await homeworkSubmissionService.findHomeworkSubmissionsByHomeworkId(
          homework.id,
        );

      const ungradedSubmissions = submissions.filter(
        (submission) => !submission.isGraded,
      );

      for (const submission of ungradedSubmissions) {
        const studentUserId = await studentDetailsService.findUserIdByStudentId(
          submission.studentId,
        );
        await delay(500);
        const student = await userService.getOtherUserByUserId(studentUserId);
        homeworks.value.push({
          userId: studentUserId,
          id: homework.id,
          title: homework.title,
          description: homework.description,
          studentFirstName: student.firstName,
          studentLastName: student.lastName,
          title: homework.title,
          description: homework.description,
          studentFirstName: student.firstName,
          studentLastName: student.lastName,
          studentEmail: student.email,
          deadline: submission.submissionDate,
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

onMounted(fetchHomeworks);
</script>

<template>
  <TeacherNav />
  <div class="flex w-full flex-col pl-[10vh] pt-[10vh]">
    <h1 class="pb-[7vh] pt-[5vh] text-4xl font-semibold">All homeworks</h1>
    <div class="h-full w-[90%] bg-[#f9faff] p-10">
      <AssignmentCard
        v-for="homework in homeworks"
        :key="homework.title + homework.studentEmail"
        :title="homework.title"
        :description="homework.description"
        :studentFirstName="homework.studentFirstName"
        :studentLastName="homework.studentLastName"
        :studentEmail="homework.studentEmail"
        :deadline="homework.deadline"
        :homeworkId="homework.id"
        :userId="homework.userId"
      />
    </div>
  </div>
</template>

<style></style>
