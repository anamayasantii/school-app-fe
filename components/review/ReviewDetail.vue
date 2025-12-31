<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";
import { useAuthStore } from '@/store/auth'
import StarRatingOverall from "~/assets/StarRatingOverall.vue";
import Smiley from "~/assets/Smiley.vue";
import Verify from "~/assets/Verify.vue";
import UserStatus from "~/assets/UserStatus.vue";
import ThumbIcon from "~/assets/ThumbIcon.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const showRatingFilter = ref(false);
const showUserFilter = ref(false);
const showMobileFilter = ref(false);
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
  console.log('Sort selected:', sort);
  selectedSort.value = sort;
  showSortDropdown.value = false;
  currentPage.value = 1;
  fetchReviews();
};

const schoolRating = computed(() => {
  if (!meta.value || !reviews.value.length) {
    return {
      overall: "0.0",
      showRecommended: false,
      categories: [
        { score: "0.0", label: "Fasilitas & Peralatan" },
        { score: "0.0", label: "Proses Pembelajaran" },
        { score: "0.0", label: "Layanan Sekolah" },
        { score: "0.0", label: "Keamanan Sekolah" },
        { score: "0.0", label: "Kegiatan Sekolah" },
      ],
    };
  }

  const finalRating = parseFloat(meta.value.finalRating) || 0;

  const questionLabels = {
    1: "Fasilitas & Peralatan",
    2: "Proses Pembelajaran",
    3: "Layanan Sekolah",
    4: "Keamanan Sekolah",
    5: "Kegiatan Sekolah",
  };

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

const getDetailScore = (reviewDetails, questionId) => {
  const detail = reviewDetails.find((d) => d.questionId === questionId);
  return detail ? parseFloat(detail.score).toFixed(0) : "0";
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
  showMobileFilter.value = false;
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
  if (!authStore.isLoggedIn) {
    useState('showLoginModal').value = true
    useState('intendedRoute').value = `/reviews/${route.params.id}`
    useState('fromMiddleware').value = false
  } else {
    router.push(`/reviews/${route.params.id}`)
  }
};

const handleLikeReview = async (reviewId) => {
  try {
    const { data } = await axios.post(`/reviews/${reviewId}/like`);
    if (data.status === "success") {
      const review = reviews.value.find((r) => r.id === reviewId);
      if (review) {
        review.likesCount = (review.likesCount || 0) + 1;
      }
    }
  } catch (err) {
    console.error("Gagal like review:", err);
  }
};

onMounted(fetchReviews);
</script>

<template>
  <div
    class="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 border-t border-b border-border-gray"
  >
    <div v-if="loading" class="text-center py-12">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green"
      ></div>
      <p class="mt-2 text-secondary-gray">Memuat data...</p>
    </div>

    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
    >
      {{ error }}
    </div>

    <template v-else>
      <!-- Rating Overview Section -->
      <div class="p-2 sm:p-4 mb-4 sm:mb-6">
        <!-- Overall Rating -->
        <div
          class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
        >
          <div class="flex items-center gap-3">
            <StarRatingOverall />
            <span class="text-2xl sm:text-3xl font-bold text-primary-green">
              {{ schoolRating.overall }}
            </span>
          </div>
          <span class="hidden sm:inline mx-2">
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
            class="flex items-center gap-2"
          >
            <Smiley />
            <span class="text-xs sm:text-sm text-[#1F1F1F] font-medium">
              Direkomendasikan oleh sebagian besar pengguna
            </span>
          </div>
        </div>

        <!-- Rating Distribution & Categories -->
        <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-4 sm:mb-6">
          <!-- Rating Distribution -->
          <div class="space-y-1.5 w-full sm:w-40 lg:w-32">
            <div
              v-for="item in ratingDistribution"
              :key="item.stars"
              class="flex items-center gap-2"
            >
              <span class="text-xs font-medium text-primary-green w-2">
                {{ item.stars }}
              </span>
              <div class="flex-1 h-2 bg-bg-light rounded-full overflow-hidden">
                <div
                  class="h-full bg-primary-green rounded-full transition-all"
                  :style="{ width: item.percentage + '%' }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Category Scores -->
          <div
            class="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4"
          >
            <div
              v-for="(cat, index) in schoolRating.categories"
              :key="cat.label"
              class="flex items-center"
              :class="{
                'lg:border-l lg:border-border-gray lg:pl-4': index > 0,
              }"
            >
              <div class="flex flex-col gap-2 lg:gap-8">
                <div
                  class="text-base sm:text-lg font-semibold text-primary-green"
                >
                  {{ cat.score }}
                </div>
                <div
                  class="text-[9px] sm:text-[10px] text-primary-green leading-tight"
                >
                  {{ cat.label }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="goToWriteReview"
          class="w-full sm:w-auto px-6 py-2 bg-primary-green text-white rounded-lg text-sm font-medium"
        >
          Tulis Ulasan
        </button>
      </div>

      <!-- Mobile Filter Button -->
      <div class="lg:hidden mb-4">
        <button
          @click="showMobileFilter = !showMobileFilter"
          class="w-full flex items-center justify-between border border-border-gray rounded-lg px-4 py-3 text-sm font-semibold text-primary-green"
        >
          <span>Filter & Urutkan</span>
          <svg
            class="w-5 h-5 transition-transform"
            :class="{ 'rotate-180': showMobileFilter }"
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
      </div>

      <!-- Reviews Section -->
      <div class="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <!-- Filter Sidebar (Desktop) / Dropdown (Mobile) -->
        <div
          class="w-full lg:w-48 lg:flex-shrink-0"
          :class="{ 'hidden lg:block': !showMobileFilter }"
        >
          <div
            class="rounded-xl p-4 border border-border-gray lg:sticky lg:top-20"
          >
            <div
              class="flex items-center justify-between mb-4 pb-4 border-b border-border-gray"
            >
              <h3 class="font-semibold text-sm text-primary-green">Filter</h3>
              <button
                @click="resetFilter"
                class="text-xs bg-primary-green px-3 h-6 rounded-full text-white"
              >
                Hapus
              </button>
            </div>

            <!-- Rating Filter -->
            <div class="pb-4 mb-4 border-b border-border-gray">
              <button
                @click="showRatingFilter = !showRatingFilter"
                class="flex items-center justify-between w-full py-2 text-left"
              >
                <span class="font-semibold text-sm text-primary-green"
                  >Rating</span
                >
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform"
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

              <div v-show="showRatingFilter" class="mt-3 space-y-2">
                <label
                  v-for="item in ratingDistribution"
                  :key="item.stars"
                  class="flex items-center gap-2 cursor-pointer group"
                  @click="applyRatingFilter(item.stars)"
                >
                  <input
                    type="radio"
                    name="rating"
                    :value="item.stars"
                    :checked="selectedRating === item.stars"
                    class="w-4 h-4 text-primary-green accent-black cursor-pointer"
                  />
                  <svg
                    class="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                  <span class="text-sm text-primary-green">{{
                    item.stars
                  }}</span>
                </label>
              </div>
            </div>

            <!-- User Filter -->
            <div>
              <button
                @click="showUserFilter = !showUserFilter"
                class="flex items-center justify-between w-full py-2 text-left"
              >
                <span class="font-semibold text-sm text-primary-green"
                  >User</span
                >
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform"
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

              <div v-show="showUserFilter" class="mt-3 space-y-2">
                <label
                  v-for="type in ['student', 'parent']"
                  :key="type"
                  class="flex items-center gap-2 cursor-pointer group"
                  @click="applyRoleFilter(type)"
                >
                  <input
                    type="radio"
                    name="role"
                    :value="type"
                    :checked="selectedRole === type"
                    class="w-4 h-4 accent-black cursor-pointer text-primary-green border-gray-300"
                  />
                  <span class="text-sm text-primary-green capitalize">
                    {{ type }}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews List -->
        <div class="flex-1 border border-border-gray rounded-xl p-3 sm:p-6">
          <!-- Header -->
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4"
          >
            <h2 class="text-base sm:text-lg font-semibold text-primary-green">
              {{ meta?.total || 0 }} Ulasan
            </h2>

            <div class="relative">
              <div
                class="flex items-center border border-border-gray rounded-lg px-3 py-1.5 text-xs sm:text-sm text-primary-green gap-2"
              >
                <span class="text-secondary-gray hidden sm:inline"
                  >Urutkan Berdasarkan:</span
                >
                <span class="text-secondary-gray sm:hidden">Urutkan:</span>
                <div class="relative">
                  <button
                    @click="showSortDropdown = !showSortDropdown"
                    class="flex items-center gap-2 pl-2 pr-6 py-1 min-w-[70px] sm:min-w-[80px] text-left rounded-lg hover:bg-bg-light transition-colors"
                  >
                    <span>{{
                      selectedSort === "newest" ? "Terbaru" : "Terlama"
                    }}</span>
                    <svg
                      class="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform"
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

                  <div
                    v-if="showSortDropdown"
                    class="absolute top-full right-0 mt-1 w-32 border border-border-gray rounded-lg shadow-lg z-10 overflow-hidden bg-white"
                  >
                    <button
                      @click="selectSortOption('newest')"
                      class="w-full px-3 py-2 text-sm text-left hover:bg-bg-light transition-colors"
                      :class="{ 'bg-bg-light': selectedSort === 'newest' }"
                    >
                      Terbaru
                    </button>
                    <button
                      @click="selectSortOption('oldest')"
                      class="w-full px-3 py-2 text-sm text-left hover:bg-bg-light transition-colors"
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
              class="border-t pt-4"
            >
              <!-- User Info -->
              <!-- User Info -->
              <div class="flex items-start gap-3 mb-3">
                <img
                  v-if="review.image"
                  :src="review.image"
                  :alt="review.fullname"
                  class="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div
                  v-else
                  class="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                >
                  {{ getInitials(review.fullname) }}
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-sm text-primary-green truncate">
                    {{ review.fullname }}
                  </h3>
                  <div class="flex flex-wrap items-center gap-1.5 mt-1">
                    <span
                      class="inline-flex items-center gap-1 px-2 py-0.5 bg-[#FFF4EE] text-[#FA9E53] rounded-full text-xs font-medium capitalize"
                    >
                      <Verify />
                      {{ review.status }}
                    </span>
                    <span
                      v-if="review.schoolValidation?.[0]?.userStatus"
                      class="inline-flex items-center gap-1 px-2 py-0.5 bg-[#E5F3FE] text-[#0789F2] rounded-full text-xs font-medium capitalize"
                    >
                      <UserStatus />
                      {{ review.schoolValidation[0].userStatus }}
                    </span>
                    <span
                      class="inline-flex items-center gap-1 px-2 py-0.5 border border-border-gray text-primary-green rounded-full text-xs font-medium"
                    >
                      {{ review.schoolDetailName }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Rating & Date -->
              <div class="flex items-center gap-3 mb-3">
                <div class="flex items-center gap-1">
                  <span class="font-semibold text-sm text-primary-green">
                    {{ parseFloat(review.rating).toFixed(1) }}
                  </span>
                  <div class="flex">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      class="w-3 h-3"
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
                <span class="text-xs text-secondary-gray">
                  {{ formatDate(review.createdAt) }}
                </span>
              </div>

              <!-- Review Text -->
              <!-- <div class="mb-3">
                <p class="text-primary-green text-sm font-semibold mb-1">
                  Komentar :
                </p>
                <p
                  v-if="review.reviewText"
                  class="text-primary-green text-sm leading-relaxed"
                >
                  {{ review.reviewText }}
                </p>
              </div> -->

              <!-- Liked Section -->
              <div v-if="review.liked" class="mb-3">
                <p class="text-primary-green text-sm font-semibold mb-1">
                  Apa yang disukai dari sekolah ini?
                </p>
                <p class="text-primary-green text-sm leading-relaxed">
                  {{ review.liked }}
                </p>
              </div>

              <!-- Improved Section -->
              <div v-if="review.improved" class="mb-3">
                <p class="text-primary-green text-sm font-semibold mb-1">
                  Apa yang bisa diperbaiki dari sekolah ini?
                </p>
                <p class="text-primary-green text-sm leading-relaxed">
                  {{ review.improved }}
                </p>
              </div>

              <!-- Detail Scores -->
              <div class="grid grid-cols-5 gap-2 sm:gap-3 mb-3">
                <div
                  v-for="questionId in [1, 2, 3, 4, 5]"
                  :key="questionId"
                  class="border border-border-gray rounded-lg py-2 px-2"
                >
                  <div class="text-base font-semibold text-primary-green mb-5">
                    {{ getDetailScore(review.reviewDetails, questionId) }}
                  </div>
                  <div class="text-[9px] text-primary-green leading-tight">
                    {{ schoolRating.categories[questionId - 1]?.label || "" }}
                  </div>
                </div>
              </div>

              <!-- Like Button -->
              <!-- <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <button
                  @click="handleLikeReview(review.id)"
                  class="inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-1.5 text-xs text-secondary-gray hover:bg-bg-light rounded-lg transition-colors"
                >
                  <ThumbIcon />
                  <span class="font-medium">Bermanfaat?</span>
                </button>
                <span
                  v-if="review.likesCount > 0"
                  class="text-xs text-secondary-gray text-center sm:text-left"
                >
                  {{ review.likesCount }} orang menganggap ini bermanfaat
                </span>
              </div> -->
            </div>
          </div>

          <div v-else class="text-center py-12">
            <p class="text-secondary-gray">Data belum tersedia.</p>
          </div>

          <!-- Pagination -->
          <div
            v-if="meta && meta.last_page > 1"
            class="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-6"
          >
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary-green bg-[#F8F9FA] hover:bg-bg-light rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <button
              v-for="(page, index) in paginationPages"
              :key="index"
              @click="goToPage(page)"
              :disabled="page === '...'"
              class="w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm font-medium rounded-lg transition-colors"
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
              :disabled="currentPage === meta?.last_page"
              class="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary-green bg-[#F8F9FA] hover:bg-bg-light rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
