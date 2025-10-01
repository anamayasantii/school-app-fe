<template>
  <div class="max-w-full mx-auto space-y-8 py-6 pt-1">
    <!-- Showing Results and Sort By -->
    <div class="flex justify-between items-center mb-6">
      <!-- Showing Results -->
      <div class="text-md font-manrope-semibold text-gray-700">
        Showing {{ startIndex }} - {{ endIndex }} of {{ totalResults }} Results
      </div>

      <!-- Sort By Dropdown -->
      <div class="relative">
        <button
          @click="toggleSortDropdown"
          class="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg"
        >
          Sort By: {{ sortBy }}
        </button>
        <div
          v-if="isSortDropdownOpen"
          class="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          <ul class="text-sm">
            <li
              @click="changeSort('Newest')"
              class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              Newest
            </li>
            <li
              @click="changeSort('Oldest')"
              class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              Oldest
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-for="review in reviews" :key="review.id" class="flex gap-4">
      <!-- Profile Picture - Left Column -->
      <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <img
          v-if="review.image"
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
          <span class="text-sm font-semibold text-gray-900">{{
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
              ></path>
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
            <div class="text-xs font-semibold text-gray-900 mb-1">
              {{ parseFloat(category.score)
              }}<span class="text-xs text-gray-500">/5</span>
            </div>
            <div class="text-xs text-gray-600">
              {{ getQuestionName(category.questionId) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Paginasi -->
    <!-- Paginasi -->
    <div class="flex justify-center items-center space-x-2">
      <!-- Previous Button -->
      <button
        :disabled="page <= 1"
        @click="changePage(page - 1)"
        class="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:bg-gray-200"
      >
        Previous
      </button>

      <!-- Page Numbers -->
      <button
        v-for="n in totalPages"
        :key="n"
        :class="{
          'bg-[#28190C] text-white': page === n,
          'text-[#28190C]': page !== n,
        }"
        @click="changePage(n)"
        class="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#F5F5F5]"
      >
        {{ n }}
      </button>

      <!-- Next Button -->
      <button
        :disabled="page >= totalPages"
        @click="changePage(page + 1)"
        class="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:bg-gray-200"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "@/lib/axios";
import { useRoute } from "vue-router";

// Get route params
const route = useRoute();

// Reactive data
const reviews = ref([]);
const questions = ref({});
const totalResults = ref(0);  // Total results from API
const startIndex = computed(() => (page.value - 1) * 12 + 1);  // Index mulai
const endIndex = computed(() => Math.min(page.value * 12, totalResults.value));  // Index selesai
const page = ref(1);  // Current page
const totalPages = ref(1);  // Total pages
const sortBy = ref('Newest');  // Current sort option
const isSortDropdownOpen = ref(false);  // Control dropdown visibility

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
    const response = await axios.get("/questions");
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
const fetchReviews = async (pageNumber = 1, sortOption = 'Newest') => {
  try {
    const response = await axios.get(`/all-reviews?page=${pageNumber}&sort=${sortOption}`);
    reviews.value = response.data.data.datas || [];
    totalResults.value = response.data.data.meta.total;
    totalPages.value = response.data.data.meta.last_page;
    page.value = response.data.data.meta.current_page;
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

// Function to change page
const changePage = (newPage) => {
  if (newPage < 1 || newPage > totalPages.value) return; // Cek batas halaman
  fetchReviews(newPage); // Ambil data review untuk halaman baru
};

// Toggle Sort By dropdown
const toggleSortDropdown = () => {
  isSortDropdownOpen.value = !isSortDropdownOpen.value;
};

// Change sort option and fetch data
const changeSort = (option) => {
  sortBy.value = option;
  fetchReviews(page.value, option);  // Fetch with new sort option
  isSortDropdownOpen.value = false;  // Close dropdown
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

onMounted(() => {
  fetchReviews(page.value, sortBy.value);
});
</script>

<style scoped>
/* Styling untuk tombol paginasi */
button:disabled {
  cursor: not-allowed;
}

button:hover {
  background-color: #f5f5f5;
}
</style>
