<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";
import StarRatingOverall from "~/assets/StarRatingOverall.vue";
import Smiley from "~/assets/Smiley.vue";
import Verify from "~/assets/Verify.vue";
import UserStatus from "~/assets/UserStatus.vue";
import ThumbIcon from "~/assets/ThumbIcon.vue";

const route = useRoute();
const router = useRouter();
const showRatingFilter = ref(false);
const showUserFilter = ref(false);
const loading = ref(true);
const error = ref(null);
const reviews = ref([]);
const meta = ref(null);

const selectedRating = ref(null);
const selectedRole = ref(null);
const selectedSort = ref("newest");
const currentPage = ref(1);

const showSortDropdown = ref(false);

const selectSortOption = (sort) => {
  selectedSort.value = sort;
  showSortDropdown.value = false;
  currentPage.value = 1;
  fetchReviews();
};

const schoolRating = computed(() => {
  if (!meta.value) {
    return {
      overall: "0.0",
      showRecommended: false,
      categories: [],
    };
  }

  const finalRating = parseFloat(meta.value.finalRating) || 0;

  const questionLabels = {};
  if (reviews.value.length > 0 && reviews.value[0].review_details) {
    reviews.value[0].review_details.forEach((detail) => {
      questionLabels[detail.questionId] = detail.question;
    });
  }

  return {
    overall: finalRating.toFixed(1),
    showRecommended: finalRating >= 4.5,
    categories: meta.value.questionStats.map((stat) => ({
      score: parseFloat(stat.avg_score).toFixed(1),
      label: questionLabels[stat.questionId] || "",
    })),
  };
});

const ratingDistribution = computed(() => {
  if (!reviews.value.length) {
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: 0,
      percentage: 0,
    }));
  }

  return [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.value.filter(
      (r) => Math.floor(parseFloat(r.rating)) === stars
    ).length;
    return {
      stars,
      count,
      percentage: (count / reviews.value.length) * 100,
    };
  });
});

const paginationPages = computed(() => {
  if (!meta.value) return [];

  const pages = [];
  const lastPage = meta.value.last_page;
  const current = currentPage.value;

  if (lastPage <= 7) {
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...");
      pages.push(lastPage);
    } else if (current >= lastPage - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = lastPage - 4; i <= lastPage; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(lastPage);
    }
  }

  return pages;
});

const getInitials = (fullname) => {
  return fullname
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const fetchReviews = async () => {
  try {
    loading.value = true;

    const params = {
      sort: selectedSort.value,
      page: currentPage.value,
    };

    if (selectedRating.value) {
      params.starRating = selectedRating.value;
    }

    if (selectedRole.value) {
      params.role = selectedRole.value;
    }

    const { data } = await axios.get(`/schools/${route.params.id}/reviews`, {
      params,
    });

    if (data.status === "success") {
      reviews.value = data.data.reviews || [];
      meta.value = data.data.meta;
    }
  } catch (err) {
    if (err.response?.status === 404) {
      reviews.value = [];
      meta.value = null;
    } else {
      error.value = "Gagal memuat data";
      console.error(err);
    }
  } finally {
    loading.value = false;
  }
};

const resetFilter = () => {
  selectedRating.value = null;
  selectedRole.value = null;
  selectedSort.value = "newest";
  currentPage.value = 1;
  fetchReviews();
};

const applyRatingFilter = (rating) => {
  selectedRating.value = selectedRating.value === rating ? null : rating;
  currentPage.value = 1;
  fetchReviews();
};

const applyRoleFilter = (role) => {
  selectedRole.value = selectedRole.value === role ? null : role;
  currentPage.value = 1;
  fetchReviews();
};

const goToPage = (page) => {
  if (page === "..." || page === currentPage.value) return;
  currentPage.value = page;
  fetchReviews();
};

const goToWriteReview = () => {
  router.push(`/reviews/${route.params.id}`);
};

const handleLikeReview = async (reviewId) => {
  try {
    const { data } = await axios.post(`/reviews/${reviewId}/like`);
    if (data.status === "success") {
      const review = reviews.value.find((r) => r.id === reviewId);
      if (review) {
        review.liked = (review.liked || 0) + 1;
      }
    }
  } catch (err) {
    console.error("Gagal like review:", err);
  }
};

onMounted(fetchReviews);
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8 border-t border-b border-border-gray">
    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green"
      ></div>
      <p class="mt-2 text-secondary-gray">Memuat data...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
    >
      {{ error }}
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Rating Overview -->
      <div class="p-6 mb-6">
        <div class="flex items-center gap-3 mb-6">
          <StarRatingOverall />
          <span class="text-4xl font-bold text-primary-green mr-4">{{
            schoolRating.overall
          }}</span>
          <span>
            <svg
              width="2"
              height="16"
              viewBox="0 0 2 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="2" height="16" rx="1" fill="#F8F9FA" />
            </svg>
          </span>
          <div
            v-if="schoolRating.showRecommended"
            class="flex items-center gap-2 ml-4"
          >
            <Smiley />

            <span class="text-sm text-[#1F1F1F] font-medium"
              >Direkomendasikan oleh sebagian besar pengguna</span
            >
          </div>
        </div>

        <div class="grid grid-cols-6 gap-6">
          <!-- Rating Distribution -->
          <div class="space-y-2.5">
            <div
              v-for="item in ratingDistribution"
              :key="item.stars"
              class="flex items-center gap-2"
            >
              <span class="text-xs font-medium text-primary-green w-2">{{
                item.stars
              }}</span>
              <div class="flex-1 h-2 bg-bg-light rounded-full overflow-hidden">
                <div
                  class="h-full bg-primary-green rounded-full transition-all"
                  :style="{ width: item.percentage + '%' }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Categories -->
          <div
            v-for="cat in schoolRating.categories"
            :key="cat.label"
            class="border-r border-border-gray last:border-r-0"
          >
            <div class="text-lg font-semibold text-primary-green mb-10">
              {{ cat.score }}
            </div>
            <div class="text-sm text-secondary-gray">{{ cat.label }}</div>
          </div>
        </div>

        <button
          @click="goToWriteReview"
          class="mt-6 w-full sm:w-auto px-6 py-2.5 bg-primary-green text-white rounded-lg text-sm font-medium"
        >
          Tulis Ulasan
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar Filter -->
        <div class="lg:w-64 flex-shrink-0">
          <div class="rounded-xl p-4 sticky top-20 border border-border-gray">
            <div
              class="flex items-center justify-between mb-4 border-b border-border-gray pb-4"
            >
              <h3 class="font-semibold text-primary-green">Filter</h3>
              <button
                @click="resetFilter"
                class="text-xs bg-primary-green w-14 h-7 rounded-full text-white"
              >
                Hapus
              </button>
            </div>

            <!-- Rating Filter -->
            <div class="border-b border-gray-100 pb-4 mb-4">
              <button
                @click="showRatingFilter = !showRatingFilter"
                class="flex items-center justify-between w-full py-2 text-left"
              >
                <span class="font-semibold text-primary-green">Rating</span>
                <svg
                  class="w-5 h-5 text-gray-400 transition-transform"
                  :class="{ 'rotate-180': !showRatingFilter }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div v-show="showRatingFilter" class="mt-3 space-y-3">
                <label
                  v-for="item in ratingDistribution"
                  :key="item.stars"
                  class="flex items-center gap-3 cursor-pointer group"
                  @click="applyRatingFilter(item.stars)"
                >
                  <input
                    type="radio"
                    name="rating"
                    :value="item.stars"
                    :checked="selectedRating === item.stars"
                    class="w-5 h-5 text-primary-green accent-black cursor-pointer pointer-events-none"
                  />
                  <svg
                    class="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                  <span
                    class="text-sm text-primary-green group-hover:text-primary-green"
                    >{{ item.stars }}</span
                  >
                </label>
              </div>
            </div>

            <!-- User Filter -->
            <div>
              <button
                @click="showUserFilter = !showUserFilter"
                class="flex items-center justify-between w-full py-2 text-left"
              >
                <span class="font-semibold text-primary-green">User</span>
                <svg
                  class="w-5 h-5 text-gray-400 transition-transform"
                  :class="{ 'rotate-180': !showUserFilter }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div v-show="showUserFilter" class="mt-3 space-y-3">
                <label
                  v-for="type in ['student', 'parent']"
                  :key="type"
                  class="flex items-center gap-3 cursor-pointer group"
                  @click="applyRoleFilter(type)"
                >
                  <input
                    type="radio"
                    name="role"
                    :value="type"
                    :checked="selectedRole === type"
                    class="w-5 h-5 accent-black cursor-pointer text-primary-green border-gray-300 pointer-events-none"
                  />
                  <span
                    class="text-sm text-primary-green group-hover:text-primary-green capitalize"
                    >{{ type }}</span
                  >
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews List -->
        <div class="flex-1 border border-border-gray rounded-xl p-6">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-xl font-semibold text-primary-green">
              {{ meta?.total || 0 }} Ulasan
            </h2>

            <!-- Custom Dropdown Style -->
            <div class="relative">
              <div
                class="flex items-center border border-border-gray rounded-lg px-4 py-2 text-sm text-primary-green"
              >
                <span class="text-secondary-gray mr-2"
                  >Urutkan Berdasarkan:</span
                >

                <!-- Custom Dropdown -->
                <div class="relative">
                  <button
                    @click="showSortDropdown = !showSortDropdown"
                    class="flex items-center gap-2 pl-3 pr-8 py-1 min-w-[120px] text-left rounded-lg hover:bg-bg-light transition-colors"
                  >
                    <span>{{
                      selectedSort === "newest" ? "Terbaru" : "Terlama"
                    }}</span>
                    <svg
                      class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform"
                      :class="{ 'rotate-180': showSortDropdown }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <!-- Dropdown Menu -->
                  <div
                    v-if="showSortDropdown"
                    class="absolute top-full left-0 mt-1 w-full border border-border-gray rounded-lg shadow-lg z-10 overflow-hidden bg-white"
                  >
                    <button
                      @click="selectSortOption('newest')"
                      class="w-full px-4 py-3 text-left hover:bg-bg-light transition-colors border-b border-border-gray last:border-b-0"
                      :class="{ 'bg-bg-light': selectedSort === 'newest' }"
                    >
                      Terbaru
                    </button>
                    <button
                      @click="selectSortOption('oldest')"
                      class="w-full px-4 py-3 text-left hover:bg-bg-light transition-colors"
                      :class="{ 'bg-bg-light': selectedSort === 'oldest' }"
                    >
                      Terlama
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews -->
          <div v-if="reviews.length > 0" class="space-y-4">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="rounded-xl p-6"
            >
              <!-- Reviewer Info -->
              <div class="flex items-start gap-4 mb-4 border-t pt-6">
                <div
                  class="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center text-white font-semibold"
                >
                  {{ getInitials(review.fullname) }}
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-primary-green">
                    {{ review.fullname }}
                  </h3>
                  <div class="flex flex-wrap items-center gap-2 mt-1">
                    <span
                      class="inline-flex items-center gap-1 px-2 py-1 bg-[#FFF4EE] text-[#FA9E53] rounded-full text-sm font-medium capitalize"
                    >
                      <Verify />

                      {{ review.status }}
                    </span>
                    <span
                      v-if="review.userStatus"
                      class="inline-flex items-center gap-1 px-2 py-1 bg-[#E5F3FE] text-[#0789F2] rounded-full text-sm font-medium capitalize"
                    >
                      <UserStatus />

                      {{ review.userStatus }}
                    </span>
                    <span
                      class="inline-flex items-center gap-1 px-2 py-1 border border-border-gray text-primary-green rounded-full text-sm font-medium"
                    >
                      {{ review.schoolDetailName }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Rating and Date -->
              <div class="flex items-center gap-4 mb-4 border-t pt-6">
                <div class="flex items-center gap-1">
                  <span class="font-semibold text-primary-green">{{
                    parseFloat(review.rating).toFixed(1)
                  }}</span>
                  <div class="flex">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      class="w-4 h-4"
                      :class="
                        i <= Math.floor(parseFloat(review.rating))
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      "
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      />
                    </svg>
                  </div>
                </div>
                <svg
                  width="2"
                  height="16"
                  viewBox="0 0 2 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="2" height="16" rx="1" fill="#F8F9FA" />
                </svg>

                <span class="text-sm text-secondary-gray">{{
                  formatDate(review.createdAt)
                }}</span>
              </div>

              <!-- Review Text -->
              <p class="text-primary-green text-sm mb-4">
                {{ review.reviewText }}
              </p>

              <!-- Detailed Ratings -->
              <div class="grid grid-cols-5 gap-4 mb-4">
                <div
                  v-for="detail in review.review_details"
                  :key="detail.id"
                  class="border border-border-gray rounded-lg py-2 px-2"
                >
                  <div class="text-lg font-semibold text-primary-green mb-5">
                    {{ parseFloat(detail.score).toFixed(0) }}
                  </div>
                  <div class="text-xs text-primary-green">
                    {{ detail.question }}
                  </div>
                </div>
              </div>

              <!-- Helpful Button -->
              <div class="flex items-center gap-2">
                <button
                  @click="handleLikeReview(review.id)"
                  class="inline-flex items-center gap-2 px-4 py-2 text-sm text-secondary-gray hover:bg-bg-light rounded-lg transition-colors"
                >
                  <ThumbIcon />
                  <span class="font-medium">Bermanfaat?</span>
                </button>
                <span v-if="review.liked" class="text-sm text-secondary-gray"
                  >{{ review.liked }} orang menganggap ini bermanfaat</span
                >
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <p class="text-secondary-gray">
              Tidak ada ulasan yang sesuai dengan filter
            </p>
          </div>

          <!-- Pagination -->
          <div
            class="flex justify-center items-center gap-5 mt-6"
          >
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 text-sm font-medium text-primary-green bg-[#F8F9FA] hover:bg-bg-light rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <button
              v-for="(page, index) in paginationPages"
              :key="index"
              @click="goToPage(page)"
              :disabled="page === '...'"
              class="w-8 h-8 text-sm font-medium rounded-lg transition-colors"
              :class="{
                'bg-primary-green text-[#F8F9FA]': page === currentPage,
                'text-primary-green hover:bg-bg-light':
                  page !== currentPage && page !== '...',
                'cursor-default text-primary-green': page === '...',
              }"
            >
              {{ page }}
            </button>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === meta.last_page"
              class="px-4 py-2 text-sm font-medium text-primary-green bg-[#F8F9FA] hover:bg-bg-light rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
