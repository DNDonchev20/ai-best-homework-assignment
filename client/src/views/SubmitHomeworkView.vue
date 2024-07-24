<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UserService } from "../services/userServices";
import { HomeworkService } from "../services/homeworkService";
import { HomeworkSubmissionService } from "../services/homeworkSubmissionService";
import { GradeService } from "../services/gradeService";

const route = useRoute();
const router = useRouter();
const homeworkIdParam = route.params.homeworkId as string;
const homeworkId = ref<string>(homeworkIdParam);
const studentId = ref<string>("");
const homework = ref<any>(null);
const feedback = ref<string>("");
const selectedFile = ref<File | null>(null);
const filePreview = ref<string | null>(null);
const error = ref<string>("");
const submission = ref<any>(null);
const submissionExists = ref<boolean>(false);
const grade = ref<any>(null);

const userService = new UserService();
const homeworkService = new HomeworkService();
const homeworkSubmissionService = new HomeworkSubmissionService();
const gradeService = new GradeService();

const fetchHomework = async () => {
  const user = await userService.getUserById();
  studentId.value = user.id;

  try {
    homework.value = await homeworkService.getHomeworkById(homeworkId.value);
    submissionExists.value =
      await homeworkSubmissionService.checkSubmissionExists(
        studentId.value,
        homeworkId.value,
      );
    if (submissionExists.value) {
      await fetchSubmissionDetails(studentId.value, homeworkId.value);
      await fetchGrade();
    }
  } catch (err) {
    error.value = "Failed to fetch details";
  }
};

const fetchSubmissionDetails = async (userId: string, homeworkId: string) => {
  try {
    submission.value =
      await homeworkSubmissionService.getHomeworkSubmissionByUserIdAndHomeworkId(
        userId,
        homeworkId,
      );
  } catch (err) {
    error.value = "Failed to fetch submission details";
  }
};

const fetchGrade = async () => {
  try {
    const fetchedGrade =
      await gradeService.getGradeByHomeworkSubmissionIdAndStudentId(
        submission.value.id,
        studentId.value,
      );
    if (fetchedGrade) {
      grade.value = fetchedGrade;
    }
  } catch (err) {
    error.value = "Failed to fetch grade";
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
  } catch (err) {
    error.value = "Failed to submit homework";
  }
};

const deleteSubmission = async () => {
  try {
    await homeworkSubmissionService.deleteHomeworkSubmission(
      submission.value.id,
    );
    submission.value = null;
    submissionExists.value = false;
    alert("Submission deleted successfully");
  } catch (err) {
    error.value = "Failed to delete homework submission";
  }
};

onMounted(fetchHomework);
</script>

<template>
  <div class="flex w-full justify-center pt-8">
    <a href="/studentHome">
      <p class="px-14 text-[26px] font-semibold">Go back</p>
    </a>
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
      class="mb-6 rounded-lg bg-white p-6 shadow-md"
    >
      <h2 class="mb-4 text-2xl font-semibold text-blue-500">
        Submission Details
      </h2>

      <p v-if="submission.filePath" class="text-lg text-gray-700">
        <strong>File:</strong>
        <a
          :href="submission.filePath"
          target="_blank"
          class="text-accent hover:underline"
          >{{ submission.filePath }}</a
        >
      </p>

      <p v-if="submission.feedback" class="text-lg text-gray-700">
        <strong>Feedback:</strong> {{ submission.feedback }}
      </p>

      <p v-if="submission.submissionDate" class="mb-2 text-lg">
        <strong>Submission Date:</strong>
        {{ new Date(submission.submissionDate).toLocaleString() }}
      </p>

      <p v-if="submission.isGraded !== undefined" class="mb-14 text-lg">
        <strong>Graded:</strong> {{ submission.isGraded ? "Yes" : "No" }}
      </p>

      <div v-if="grade" class="mt-4">
        <h2 class="mb-4 text-2xl font-semibold text-blue-500">Grade Details</h2>
        <p class="text-lg text-gray-700">
          <strong>Grade:</strong> {{ grade.grade }}
        </p>
        <p class="text-lg text-gray-700">
          <strong>Percentage:</strong> {{ grade.percentage }}%
        </p>
        <p class="text-lg text-gray-700">
          <strong>Feedback:</strong> {{ grade.feedback }}
        </p>
      </div>

      <!-- Hide the delete button if grade is present -->
      <button
        v-if="!grade"
        @click="deleteSubmission"
        class="mt-4 w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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
