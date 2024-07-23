<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { UserService } from "../services/userServices";
import { HomeworkService } from "../services/homeworkService";
import { HomeworkSubmissionService } from "../services/homeworkSubmissionService";

const route = useRoute();
const homeworkId = ref<string>('clyx9o0m60003mlvqdnyg4755');
const studentId = ref<string>('');
const homework = ref<any>(null);
const feedback = ref<string>('');
const selectedFile = ref<File | null>(null);
const error = ref<string>('');

const userService = new UserService();
const homeworkService = new HomeworkService();
const homeworkSubmissionService = new HomeworkSubmissionService();

const fetchHomework = async () => {
  const user = await userService.getUserById();
  studentId.value = user.id;

  try {
    homework.value = await homeworkService.getHomeworkById(homeworkId.value);
  } catch (err) {
    error.value = 'Failed to fetch homework details';
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    selectedFile.value = target.files[0];
  }
};

const submitHomework = async (event: Event) => {
  event.preventDefault();
  if (!selectedFile.value) {
    error.value = 'Please select a file to upload';
    return;
  }

  try {
    // Step 1: Create the homework submission metadata
    const submissionResponse = await homeworkSubmissionService.createHomeworkSubmission({
      homeworkId: homeworkId.value,
      studentId: studentId.value,
      feedback: feedback.value,
    });

    console.log(submissionResponse.id);

    // Step 2: Upload the file
    await homeworkSubmissionService.uploadHomeworkFile(submissionResponse.id, selectedFile.value);

    alert('Homework submitted successfully');
  } catch (err) {
    error.value = 'Failed to submit homework';
  }
};

onMounted(fetchHomework);
</script>

<template>
  <div class="container mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
    <!-- Homework Details -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-blue-600">{{ homework?.title }}</h1>
      <p class="mt-2 text-lg text-gray-700">{{ homework?.description }}</p>
    </div>

    <!-- Submission Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-blue-500 mb-4">Submit Your Homework</h2>

      <div class="mb-4">
        <label for="feedback" class="block text-lg font-medium text-gray-700">Feedback</label>
        <textarea
          v-model="feedback"
          id="feedback"
          placeholder="Enter your feedback"
          class="mt-2 w-full h-32 p-3 border border-gray-300 rounded-md shadow-sm"
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="file" class="block text-lg font-medium text-gray-700">File Upload</label>
        <input
          type="file"
          id="file"
          @change="handleFileChange"
          class="mt-2 w-full border border-gray-300 rounded-md p-3 shadow-sm"
        />
      </div>

      <button
        @click="submitHomework"
        class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit Homework
      </button>

      <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
