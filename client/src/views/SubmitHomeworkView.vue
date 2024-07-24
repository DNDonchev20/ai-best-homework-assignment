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
const filePreview = ref<string | null>(null);
const error = ref<string>('');
const submission = ref<any>(null);
const submissionExists = ref<boolean>(false);

const userService = new UserService();
const homeworkService = new HomeworkService();
const homeworkSubmissionService = new HomeworkSubmissionService();

const fetchHomework = async () => {
  const user = await userService.getUserById();
  studentId.value = user.id;

  console.log('User id:', studentId.value);

  try {
    homework.value = await homeworkService.getHomeworkById(homeworkId.value);
  } catch (err) {
    error.value = 'Failed to fetch homework details';
  }

  try {
    submissionExists.value = await homeworkSubmissionService.checkSubmissionExists(studentId.value, homeworkId.value);
    if (submissionExists.value) {
      await fetchSubmissionDetails(studentId.value, homeworkId.value);
    }
  } catch (err) {
    error.value = 'Failed to check submission existence';
  }
};

const fetchSubmissionDetails = async (userId: string, homeworkId: string) => {
  try {
    submission.value = await homeworkSubmissionService.getHomeworkSubmissionByUserIdAndHomeworkId(userId, homeworkId);
    console.log(submission.value.filePath);
  } catch (err) {
    error.value = 'Failed to fetch homework submission details';
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    selectedFile.value = target.files[0];
    filePreview.value = URL.createObjectURL(selectedFile.value);
  }
};

const submitHomework = async (event: Event) => {
  event.preventDefault();
  if (!selectedFile.value) {
    error.value = 'Please select a file to upload';
    return;
  }

  try {
    const submissionResponse = await homeworkSubmissionService.createHomeworkSubmission({
      homeworkId: homeworkId.value,
      studentId: studentId.value,
      feedback: feedback.value,
    });

    await homeworkSubmissionService.uploadHomeworkFile(submissionResponse.id, selectedFile.value);

    alert('Homework submitted successfully');
    window.location.reload(); // Refresh the page
  } catch (err) {
    error.value = 'Failed to submit homework';
  }
};

const deleteSubmission = async () => {
  if (!submission.value?.id) return;

  try {
    await homeworkSubmissionService.deleteHomeworkSubmission(submission.value.id);

    submission.value = null;
    submissionExists.value = false;

    alert('Homework submission deleted successfully');
  } catch (err) {
    error.value = 'Failed to delete homework submission';
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

    <div v-if="submissionExists && submission" class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-2xl font-semibold text-blue-500 mb-4">Submission Details</h2>

      <p v-if="submission.filePath" class="text-lg text-gray-700">
        <strong>File:</strong>
        <a :href="submission.filePath" target="_blank" class="text-blue-500 hover:underline">{{ submission.filePath }}</a>
      </p>

      <p v-if="submission.feedback" class="text-lg text-gray-700">
        <strong>Feedback:</strong> {{ submission.feedback }}
      </p>

      <p v-if="submission.submissionDate" class="text-lg text-gray-700">
        <strong>Submission Date:</strong> {{ new Date(submission.submissionDate).toLocaleString() }}
      </p>

      <p v-if="submission.isGraded !== undefined" class="text-lg text-gray-700">
        <strong>Graded:</strong> {{ submission.isGraded ? 'Yes' : 'No' }}
      </p>

      <button
        @click="deleteSubmission"
        class="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete Submission
      </button>
    </div>

    <div v-else class="bg-white p-6 rounded-lg shadow-md">
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

      <div v-if="filePreview" class="mb-4">
        <label class="block text-lg font-medium text-gray-700">File Preview:</label>
        <a :href="filePreview" target="_blank" class="text-blue-500 hover:underline">{{ selectedFile?.name }}</a>
        <iframe v-if="selectedFile?.type === 'application/pdf'" :src="filePreview" width="100%" height="600px" class="border border-gray-300 rounded-md shadow-sm"></iframe>
        <img v-else-if="selectedFile?.type.startsWith('image/')" :src="filePreview" class="border border-gray-300 rounded-md shadow-sm" style="max-width: 100%; height: auto;" />
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
