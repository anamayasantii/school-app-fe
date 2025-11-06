<template>
  <section class="max-w-7xl mx-auto px-6 py-16">
    <!-- Header -->
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">
        Some in-depth to help<br />you decide
      </h2>
      <p class="text-gray-600 max-w-3xl mx-auto">
        Eliminate data silos and double entry (for good) by connecting HR, time-tracking, project management, and accounting in one place.
      </p>
    </div>

    <div class="relative">
      <!-- Grid Container -->
      <div
        ref="track"
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <!-- Review Card -->
        <article
          v-for="review in visibleReviews"
          :key="review.id"
          class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <!-- Review For Badge -->
          <div class="flex items-center gap-2 mb-6">
            <span class="text-sm text-gray-600">Review for</span>
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span class="font-semibold text-gray-900">{{ review.schoolDetailName }}</span>
            </div>
            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </div>

          <!-- User Info -->
          <div class="flex items-start gap-4 mb-6">
            <img
              v-if="review.image && review.image.length > 0"
              :src="review.image"
              alt="Profile Picture"
              class="w-14 h-14 rounded-full object-cover"
            />
            <div
              v-else
              class="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg"
            >
              {{ getInitials(review.username) }}
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-1">
                {{ review.username }}
              </h3>
              <div class="flex items-center gap-3 text-sm">
                <span
                  class="px-2 py-0.5 rounded text-xs font-medium"
                  :class="review.status === 'Alumni' ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'"
                >
                  {{ review.status || 'Alumni' }}
                </span>
                <span class="text-gray-600">from</span>
                <div class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span class="text-gray-900 font-medium text-xs">{{ review.schoolDetailName }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Rating and Date -->
          <div class="flex items-center gap-4 mb-4">
            <div class="flex items-center gap-1">
              <span class="text-lg font-bold text-gray-900">{{ review.rating || 4.8 }}</span>
              <div class="flex">
                <svg
                  v-for="star in 5"
                  :key="star"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  :fill="star <= (review.rating || 0) ? '#FFB800' : 'none'"
                  :stroke="star <= (review.rating || 0) ? '#FFB800' : '#E5E7EB'"
                  stroke-width="2"
                >
                  <path d="M12 3.8l2.5 5.1 5.7.8-4.1 4 1 5.7L12 16.9 6.9 19.4l1-5.7-4.1-4 5.7-.8L12 3.8z"/>
                </svg>
              </div>
            </div>
            <span class="text-sm text-gray-500">
              {{ formatDate(review.createdAt) }}
            </span>
          </div>

          <!-- Review Text -->
          <p class="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4">
            {{ review.reviewText }}
          </p>

          <!-- Helpful Footer -->
          <div class="flex items-center gap-2 pt-4 border-t border-gray-100">
            <span class="text-sm text-gray-600">Helpful?</span>
            <button class="p-1 hover:bg-gray-100 rounded transition">
              <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 10v12M15 5.88L15 10l5.88 0c.53 0 1.07.53.59 1.41l-3.6 6.52a1 1 0 0 1-.86.5H8a1 1 0 0 1-1-1v-7.41a1 1 0 0 1 .29-.7L13.88 2.3a1 1 0 0 1 1.7.7L15 5.88z"/>
              </svg>
            </button>
            <span class="text-sm text-gray-600">25 people found this helpful</span>
          </div>
        </article>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex items-center justify-center gap-4 mt-8">
        <button
          class="p-3 rounded-full border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          @click="prevPage"
          :disabled="currentPage === 0"
          aria-label="Previous"
        >
          <svg
            class="w-5 h-5 text-gray-900"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          class="p-3 rounded-full border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          @click="nextPage"
          :disabled="(currentPage + 1) * 2 >= reviews.length"
          aria-label="Next"
        >
          <svg
            class="w-5 h-5 text-gray-900"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "@/lib/axios";

const reviews = ref([]);
const currentPage = ref(0);

const fetchReviews = async () => {
  try {
    const response = await axios.get("/reviews/recent");
    reviews.value = response.data.data.map(review => ({
      ...review,
      status: Math.random() > 0.5 ? 'Alumni' : 'Active Student'
    }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

const visibleReviews = computed(() => {
  const start = currentPage.value * 2;
  return reviews.value.slice(start, start + 2);
});

const getInitials = (username) => {
  const nameParts = username.split(" ");
  return nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if ((currentPage.value + 1) * 2 < reviews.value.length) {
    currentPage.value++;
  }
};

onMounted(async () => {
  await fetchReviews();
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
}
</style>