<script setup lang="ts">
import { ref, onMounted } from "vue";
import { GroupService } from "../services/groupService";
import { StudentDetailsService } from "../services/studentDetailsService";
import { UserService } from "../services/userServices";
import { Group } from "../models/group";
import { StudentDetail } from "../models/studentDetail";
import User from "../models/user";
import { SubjectService } from "../services/subjectService";
import TeacherNav from "../components/TeacherView/TeacherNav.vue";
import ClassComponent from "../components/TeacherView/ClassComponent.vue";

const groupService = new GroupService();
const studentDetailsService = new StudentDetailsService();
const userService = new UserService();
const subjectService = new SubjectService();

const user = ref<User>();
const subject = ref<Subject>();

const students = ref<{ [key: string]: (StudentDetail & { user?: User })[] }>(
  {},
);
const userCache = ref<Map<string, User>>(new Map());

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchUserDetailsSequentially(userIds: string[]): Promise<void> {
  for (const userId of userIds) {
    if (!userCache.value.has(userId)) {
      try {
        const user = await userService.getOtherUserByUserId(userId);
        userCache.value.set(userId, user);
      } catch {
        userCache.value.set(userId, null);
      }
      await delay(500);
    }
  }
}

async function fetchGroupsAndStudents() {
  try {
    const groupIds = await groupService.getGroupIdsByUserId();
    console.log("Fetched Group IDs:", groupIds);

    // Fetch groups data
    const groupPromises = groupIds.map((id) => groupService.getGroupById(id));
    const fetchedGroups = await Promise.all(groupPromises);
    console.log("Fetched Groups:", fetchedGroups);

    // Assign groups to the ref
    groups.value = fetchedGroups.filter(
      (group) => group !== null && group !== undefined,
    );

    // Fetch all students for the groups
    const allStudentDetails: StudentDetail[] = [];
    const studentPromises = groupIds.map(async (groupId) => {
      const studentDetails =
        await studentDetailsService.findStudentsByGroupId(groupId);
      allStudentDetails.push(...studentDetails);
      return { groupId, studentDetails };
    });

    const studentDetailsArray = await Promise.all(studentPromises);
    console.log("Student Details Array:", studentDetailsArray);

    // Ensure that all students are correctly mapped to their groups
    students.value = {};
    studentDetailsArray.forEach(({ groupId, studentDetails }) => {
      if (!students.value[groupId]) {
        students.value[groupId] = [];
      }
      students.value[groupId].push(...studentDetails);
    });

    // Fetch all user details sequentially with delays
    const userIds = Array.from(
      new Set(allStudentDetails.map((student) => student.userId)),
    );
    await fetchUserDetailsSequentially(userIds);

    // Enrich student details with user info
    Object.keys(students.value).forEach((groupId) => {
      students.value[groupId] = students.value[groupId].map((student) => ({
        ...student,
        user: userCache.value.get(student.userId),
      }));
    });
  } catch (error) {
    console.error("Failed to fetch groups or students:", error);
  }
}

onMounted(async () => {
  try {
    const userResponse = await userService.getUserById();
    user.value = userResponse;
    const subjectResponse = await subjectService.getSubjectByTeacherId();
    subject.value = subjectResponse;

    await fetchGroupsAndStudents();
  } catch (error) {
    console.error("Failed to fetch user or subject:", error);
  }
});
</script>

<template>
  <TeacherNav />
  <div class="mt-20 px-52">
    <ClassComponent
      :groups="groups"
      :students="students"
      :subject="subject"
      :user="user"
    />
  </div>
</template>

<style scoped>
.mt-20 {
  margin-top: 5rem;
}
.px-52 {
  padding-left: 13rem;
  padding-right: 13rem;
}
</style>
