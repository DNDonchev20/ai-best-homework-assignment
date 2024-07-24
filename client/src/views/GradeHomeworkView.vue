<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { HomeworkService } from "../services/homeworkService";
import { HomeworkSubmissionService } from "../services/homeworkSubmissionService";
import { GradeService } from "../services/gradeService";
import { UserService } from "../services/userServices";

const userId = 'clytwbh5d0000jvqnbuplclvz';  
const homeworkId = 'clyx9o0m60003mlvqdnyg4755';

const route = useRoute();
const homework = ref<any>(null);
const selectedSubmission = ref<any>(null);
const gradeData = ref({
  id: '',
  grade: 0,
  percentage: 0,
  feedback: '',
});
const error = ref<string>('');

const homeworkService = new HomeworkService();
const homeworkSubmissionService = new HomeworkSubmissionService();
const gradeService = new GradeService();
const userService = new UserService();

const fetchHomework = async () => {
  try {
    const teacher = await userService.getUserById();
    const teacherId = teacher.id;  
    homework.value = await homeworkService.getHomeworkById(homeworkId);
    
    selectedSubmission.value = await homeworkSubmissionService.getHomeworkSubmissionByUserIdAndHomeworkId(userId, homeworkId);
    
    if (selectedSubmission.value) {
      const student = await userService.getOtherUserByUserId(selectedSubmission.value.studentId);
      selectedSubmission.value.studentName = student.name;

      try {
        const grades = await gradeService.getGradesByHomeworkSubmissionId(selectedSubmission.value.id);
        if (grades) {
          gradeData.value.id = grades.id;
          gradeData.value.grade = grades.grade;
          gradeData.value.percentage = grades.percentage;
          gradeData.value.feedback = grades.feedback;
          selectedSubmission.value.isGraded = true;
        } else {
          selectedSubmission.value.isGraded = false;
        }
      } catch (gradeError) {
        console.error('Failed to fetch grades:', gradeError);
      }
    }
  } catch (err) {
    error.value = 'Failed to fetch data';
  }
};

const postGrade = async (event: Event) => {
  event.preventDefault();
  if (!selectedSubmission.value?.id) {
    error.value = 'No valid submission ID found for grading';
    return;
  }

  try {
    const teacher = await userService.getUserById();
    const teacherId = teacher.id;  

    await gradeService.createGrade({
      teacherId: teacherId,  
      studentId: selectedSubmission.value.studentId,
      homeworkSubmissionId: selectedSubmission.value.id,
      grade: gradeData.value.grade,
      percentage: gradeData.value.percentage,
      feedback: gradeData.value.feedback,
    });

    await fetchHomework();
    alert('Grade posted successfully');
  } catch (err) {
    error.value = 'Failed to post grade';
  }
};

const deleteGrade = async () => {
  if (!gradeData.value.id) {
    error.value = 'No valid grade ID found for deletion';
    return;
  }

  try {
    await gradeService.deleteGradeById(gradeData.value.id);
    await fetchHomework();
    alert('Grade deleted successfully');
  } catch (err) {
    error.value = 'Failed to delete grade';
  }
};

onMounted(fetchHomework);
</script>

<template>
  <div class="container mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-blue-600">{{ homework?.title }}</h1>
      <p class="mt-2 text-lg text-gray-700">{{ homework?.description }}</p>
    </div>

    <div v-if="selectedSubmission" class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-blue-500 mb-4">Submission Details</h2>
      
      <p v-if="selectedSubmission.filePath" class="text-lg text-gray-700">
        <strong>File:</strong>
        <a :href="selectedSubmission.filePath" target="_blank" class="text-blue-500 hover:underline">{{ selectedSubmission.filePath }}</a>
      </p>

      <p v-if="selectedSubmission.feedback" class="text-lg text-gray-700">
        <strong>Feedback:</strong> {{ selectedSubmission.feedback }}
      </p>

      <p v-if="selectedSubmission.submissionDate" class="text-lg text-gray-700">
        <strong>Submission Date:</strong> {{ new Date(selectedSubmission.submissionDate).toLocaleString() }}
      </p>

      <div v-if="selectedSubmission.isGraded" class="mt-6">
        <h2 class="text-2xl font-semibold text-blue-500 mb-4">Grade Details</h2>
        <p class="text-lg text-gray-700"><strong>Grade:</strong> {{ gradeData.grade }}</p>
        <p class="text-lg text-gray-700"><strong>Percentage:</strong> {{ gradeData.percentage }}%</p>
        <p class="text-lg text-gray-700"><strong>Feedback:</strong> {{ gradeData.feedback }}</p>
        <button
          @click="deleteGrade"
          class="mt-4 w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete Grade
        </button>
      </div>

      <div v-else class="mt-6">
        <h2 class="text-2xl font-semibold text-blue-500 mb-4">Grade the Submission</h2>

        <form @submit="postGrade">
          <div class="mb-4">
            <label for="grade" class="block text-lg font-medium text-gray-700">Grade</label>
            <input
              v-model.number="gradeData.grade"
              id="grade"
              type="number"
              min="0"
              max="100"
              placeholder="Enter grade"
              class="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="mb-4">
            <label for="percentage" class="block text-lg font-medium text-gray-700">Percentage</label>
            <input
              v-model.number="gradeData.percentage"
              id="percentage"
              type="number"
              min="0"
              max="100"
              placeholder="Enter percentage"
              class="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="mb-4">
            <label for="feedback" class="block text-lg font-medium text-gray-700">Feedback</label>
            <textarea
              v-model="gradeData.feedback"
              id="feedback"
              placeholder="Enter feedback"
              class="mt-2 w-full h-32 p-3 border border-gray-300 rounded-md shadow-sm"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Grade
          </button>
        </form>
      </div>

      <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
    </div>
  </div>
</template>
