<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { UserService } from "../services/userServices";
import { HomeworkService } from "../services/homeworkService";
import { HomeworkSubmissionService } from "../services/homeworkSubmissionService";

const route = useRoute();
const homeworkId = ref<string>("clyx9o0m60003mlvqdnyg4755");
const studentId = ref<string>("");
const homework = ref<any>(null);
const feedback = ref<string>("");
const selectedFile = ref<File | null>(null);
const filePreview = ref<string | null>(null);
const error = ref<string>("");
const submission = ref<any>(null);
const submissionExists = ref<boolean>(false);

const userService = new UserService();
const homeworkService = new HomeworkService();
const homeworkSubmissionService = new HomeworkSubmissionService();

const fetchHomework = async () => {
  const user = await userService.getUserById();
  studentId.value = user.id;

  console.log("User id:", studentId.value);

  try {
    homework.value = await homeworkService.getHomeworkById(homeworkId.value);
  } catch (err) {
    error.value = "Failed to fetch homework details";
  }

  try {
    submissionExists.value =
      await homeworkSubmissionService.checkSubmissionExists(
        studentId.value,
        homeworkId.value,
      );
    if (submissionExists.value) {
      await fetchSubmissionDetails(studentId.value, homeworkId.value);
    }
  } catch (err) {
    error.value = "Failed to check submission existence";
  }
};

const fetchSubmissionDetails = async (userId: string, homeworkId: string) => {
  try {
    submission.value =
      await homeworkSubmissionService.getHomeworkSubmissionByUserIdAndHomeworkId(
        userId,
        homeworkId,
      );
    console.log(submission.value.filePath);
  } catch (err) {
    error.value = "Failed to fetch homework submission details";
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
    error.value = "Please select a file to upload";
    return;
  }

  try {
    const submissionResponse =
      await homeworkSubmissionService.createHomeworkSubmission({
        homeworkId: homeworkId.value,
        studentId: studentId.value,
        feedback: feedback.value,
      });

    await homeworkSubmissionService.uploadHomeworkFile(
      submissionResponse.id,
      selectedFile.value,
    );

    alert("Homework submitted successfully");
    window.location.reload(); // Refresh the page
  } catch (err) {
    error.value = "Failed to submit homework";
  }
};

const deleteSubmission = async () => {
  if (!submission.value?.id) return;

  try {
    await homeworkSubmissionService.deleteHomeworkSubmission(
      submission.value.id,
    );

    submission.value = null;
    submissionExists.value = false;

    alert("Homework submission deleted successfully");
  } catch (err) {
    error.value = "Failed to delete homework submission";
  }
};

onMounted(fetchHomework);
</script>

<template>
  <div class="flex w-full justify-center pt-8">
    <a href="/studentHome"
      ><p class="px-14 text-[26px] font-semibold">Go back</p></a
    >
  </div>
  <div
    class="container mx-auto mt-10 max-w-[700px] rounded-lg border-2 border-solid p-6 shadow-lg"
  >
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-accent">{{ homework?.title }}</h1>
      <p class="mt-2 text-lg">{{ homework?.description }}</p>
    </div>

    <div
      v-if="submissionExists && submission"
      class="mb-6 flex flex-col rounded-lg p-6 shadow-md"
    >
      <h2 class="mb-7 text-2xl font-semibold text-accent">
        Submission Details
      </h2>

      <p v-if="submission.filePath" class="mb-2 text-lg">
        <strong>File:</strong>
        <a
          :href="submission.filePath"
          target="_blank"
          class="text-accent hover:underline"
          >{{ submission.filePath }}</a
        >
      </p>

      <p v-if="submission.feedback" class="mb-2 text-lg">
        <strong>Feedback:</strong> {{ submission.feedback }}
      </p>

      <p v-if="submission.submissionDate" class="mb-2 text-lg">
        <strong>Submission Date:</strong>
        {{ new Date(submission.submissionDate).toLocaleString() }}
      </p>

      <p v-if="submission.isGraded !== undefined" class="mb-14 text-lg">
        <strong>Graded:</strong> {{ submission.isGraded ? "Yes" : "No" }}
      </p>

      <button
        @click="deleteSubmission"
        class="mx-auto w-[300px] rounded-md bg-red-600 py-3 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete Submission
      </button>
    </div>

    <div v-else class="rounded-lg p-6 shadow-md">
      <h2 class="mb-7 text-2xl font-semibold text-accent">
        Submit Your Homework
      </h2>

      <div class="mb-7">
        <label for="feedback" class="block text-lg font-medium">Feedback</label>
        <textarea
          v-model="feedback"
          id="feedback"
          placeholder="Enter your feedback"
          class="mt-2 h-32 w-[70%] rounded-md border border-gray-300 p-3 shadow-sm"
        ></textarea>
      </div>

      <div class="mb-7">
        <label for="file" class="block text-lg font-medium">File Upload</label>
        <input
          type="file"
          id="file"
          @change="handleFileChange"
          class="mt-2 w-[70%] rounded-md border border-gray-300 p-3 shadow-sm"
        />
      </div>

      <div v-if="filePreview" class="mb-7">
        <label class="block text-lg font-medium">File Preview:</label>
        <a
          :href="filePreview"
          target="_blank"
          class="text-accent hover:underline"
          >{{ selectedFile?.name }}</a
        >
        <iframe
          v-if="selectedFile?.type === 'application/pdf'"
          :src="filePreview"
          width="100%"
          height="600px"
          class="rounded-md border border-gray-300 shadow-sm"
        ></iframe>
        <img
          v-else-if="selectedFile?.type.startsWith('image/')"
          :src="filePreview"
          class="rounded-md border border-gray-300 shadow-sm"
          style="max-width: 100%; height: auto"
        />
      </div>

      <button
        @click="submitHomework"
        class="text-md mx-auto rounded bg-accent/100 px-5 py-2 font-semibold text-white hover:bg-accent/90"
      >
        Submit Homework
      </button>

      <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
    </div>
  </div>
</template>
