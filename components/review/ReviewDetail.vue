<template>
  <div class="max-w-full mx-auto space-y-8 py-6 pt-8">
    <h2
      v-if="reviews.length > 0"
      class="text-2xl font-semibold text-gray-900 mb-6"
    >
      Review About {{ reviews[0].schoolDetailName }}
    </h2>
    <div v-for="review in reviews" :key="review.id" class="flex gap-4">
      <!-- Profile Picture - Left Column -->
      <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <img
          v-if="review.image && review.image.length > 0"
          :src="review.image"
          :alt="review.username"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="w-16 h-16 rounded-full bg-[#76685A] flex items-center justify-center text-white font-bold"
        >
          {{ getInitials(review.username) }}
        </div>
      </div>

      <!-- Content - Right Column -->
      <div class="flex-1">
        <!-- User Info -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ review.username }}
          </h3>
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <!-- Faculty Info -->
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
              <span>{{ review.schoolDetailName }}</span>
            </div>
            <!-- Enrollment Info -->
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"
                ></path>
              </svg>
              <span>Enrolled in {{ getYear(review.createdAt) }}</span>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <hr class="border-gray-200 mb-6" />

        <!-- Rating and Date Section -->
        <div class="flex items-center gap-4 mb-4">
          <!-- Rating Score -->
          <span class="text-lg font-semibold text-gray-900">{{
            review.rating
          }}</span>
          <!-- Stars -->
          <div class="flex items-center gap-1">
            <svg
              v-for="star in 5"
              :key="star"
              class="w-5 h-5"
              :class="
                star <= Math.floor(review.rating)
                  ? 'fill-[#FFB800] text-[#FFB800]'
                  : 'fill-[#28190C1F]/[0.12] text-[#28190C1F]/[0.12]'
              "
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </div>
          <!-- Date -->
          <span class="text-sm text-gray-500">{{
            formatDate(review.createdAt)
          }}</span>
        </div>

        <!-- Review Title -->
        <h4 class="text-xl font-semibold text-gray-900 mb-4">Comment:</h4>

        <!-- Review Content -->
        <p class="text-gray-700 leading-relaxed mb-6">
          {{ review.reviewText }}
        </p>

        <!-- Rating Categories -->
        <div class="grid grid-cols-5 gap-4 mb-6">
          <div
            v-for="category in review.reviewDetails"
            :key="category.questionId"
            class="bg-[#F2ECE3] rounded-lg p-4 h-28 flex flex-col justify-between"
          >
            <div class="text-lg font-semibold text-gray-900 mb-1">
              {{ parseFloat(category.score)
              }}<span class="text-sm text-gray-500">/5</span>
            </div>
            <div class="text-sm text-gray-600">
              {{ getQuestionName(category.questionId) }}
            </div>
          </div>
        </div>

        <!-- Helpful Section -->
        <!-- <div class="flex items-center gap-2 text-sm text-gray-600">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.60L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            ></path>
          </svg>
          <span>Was this review helpful?</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/lib/axios";
import { useRoute } from "vue-router";

// Get route params
const route = useRoute();

// Reactive data
const reviews = ref([]);
const questions = ref({});

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Get initials
const getInitials = (username) => {
  if (!username) return "U";
  const nameParts = username.split(" ");
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials || "U";
};

// Get question name from API data
const getQuestionName = (questionId) => {
  return questions.value[questionId] || `Question ${questionId}`;
};

// Fetch questions from API
const fetchQuestions = async () => {
  try {
    const response = await axios.get('/questions');
    const questionsData = response.data.data;
    
    // Convert array to object for easy lookup
    questions.value = questionsData.reduce((acc, question) => {
      acc[question.id] = question.question;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

// Fetch reviews
const fetchReviews = async () => {
  try {
    const schoolId = route.params.id;
    const response = await axios.get(`/schools/${schoolId}/reviews`);
    const reviewsData = response.data.data.datas;

    // No mapping, langsung assign
    reviews.value = reviewsData;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

const getYear = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.getFullYear();
};

// Fetch on mount
onMounted(async () => {
  await fetchQuestions();
  await fetchReviews();
});
</script>