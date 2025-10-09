<template>
  <div class="container mx-auto py-6 px-16">
    <!-- Content Section -->
    <div v-if="school">
      <!-- Breadcrumb Navigation -->
      <nav class="mb-4" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <a 
              href="/" 
              class="hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </a>
          </li>
          <li class="text-gray-400">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
          </li>
          <li>
            <a 
              href="/schools" 
              class="hover:text-blue-600 transition-colors duration-200"
            >
              Explore School
            </a>
          </li>
          <li class="text-gray-400">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
          </li>
          <li>
            <a 
              href="/schools" 
              class="hover:text-blue-600 transition-colors duration-200"
            >
              {{ school.educationLevelName }}
            </a>
          </li>
          <li class="text-gray-400">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
          </li>
          <li class="text-gray-800 font-medium truncate max-w-xs" aria-current="page">
            {{ school.name }}
          </li>
        </ol>
      </nav>

      <h1 class="text-3xl font-bold">{{ school.name }}</h1>
      <div class="flex items-center my-2 justify-between">
        <div class="flex">
          {{ school.rating }}
          <svg
            v-for="star in 5"
            :key="star"
            class="size-6"
            viewBox="0 0 24 24"
            :fill="star <= (school.rating || 0) ? '#FFB800' : '#28190C'"
            :opacity="star <= (school.rating || 0) ? 1 : 0.12"
          >
            <path
              d="M12 3.8l2.5 5.1 5.7.8-4.1 4 1 5.7L12 16.9 6.9 19.4l1-5.7-4.1-4 5.7-.8L12 3.8z"
            />
          </svg>
          <span class="text-gray-500">({{ school.reviewers }} Reviews)</span>
        </div>
        <div class="flex items-center space-x-4">
          <button class="text-sm text-blue-500 hover:text-blue-700">
            <ShareIcon class="inline-block mr-1" />
          </button>
          <NuxtLink :to="`/reviews/${route.params.id}`">
          <button
            class="flex items-center space-x-2 px-4 py-2 rounded-[16px] border border-gray-300 hover:bg-gray-100"
          >
            <AddReviewIcon class="inline-block mr-2" />
            <span class="text-sm text-gray-800">Add Review</span>
          </button>
          </NuxtLink>
          <button
            class="flex items-center space-x-2 px-4 py-2 rounded-[16px] border border-gray-300 hover:bg-gray-100"
          >
            <SaveIcon class="inline-block mr-2" />
            <span class="text-sm text-gray-800">Save</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading or Error Message -->
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">Error loading data!</div>

    <SchoolImages/>

    <SchoolDetail/>

    <RatingDetail />
    <ReviewDetail/>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from "@/lib/axios";
import { ref, onMounted } from "vue";
import ShareIcon from "~/assets/ShareIcon.vue";
import AddReviewIcon from "~/assets/AddReviewIcon.vue";
import SaveIcon from "~/assets/SaveIcon.vue";
import SchoolImages from "@/components/school/ImagesSlider.vue";
import RatingDetail from "~/components/review/RatingDetail.vue";
import ReviewDetail from "~/components/review/ReviewDetail.vue";
import SchoolDetail from "~/components/school/SchoolDetail.vue";

const route = useRoute();
const school = ref(null);
const loading = ref(true);
const error = ref(false);
const activeTab = ref('Overview'); // Set default tab
const tabs = ['Overview', 'Location', 'Official Contact', 'Facility', 'Education Program', 'Pricing', 'Reviews'];

const fetchSchoolData = async () => {
  try {
    const response = await axios.get(`/school-details/${route.params.id}`);
    school.value = response.data.data || {};
    loading.value = false;
  } catch (err) {
    console.error("Error fetching data:", err);
    error.value = true;
    loading.value = false;
  }
};

onMounted(() => {
  fetchSchoolData();
});
</script>