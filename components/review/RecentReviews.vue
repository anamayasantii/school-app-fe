<template>
  <div class="bg-bg-light">
    <section
      class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
    >
      <div class="text-center mb-8 sm:mb-10 md:mb-12">
        <h2
          class="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2 sm:mb-4"
        >
          Ulasan Terbaru dari Pengalaman Nyata
        </h2>
        <p
          class="text-primary-green max-w-4xl mx-auto text-sm sm:text-base px-4"
        >
          Baca pengalaman langsung dari siswa/mahasiswa aktif dan alumni yang
          pernah belajar di sekolah tersebut. Setiap ulasan mencerminkan
          penilaian jujur tentang kualitas pembelajaran, lingkungan, dan
          fasilitas sekolah.
        </p>
      </div>

      <div class="relative">
        <div class="hidden md:grid md:grid-cols-2 gap-3 md:gap-4">
          <article
            v-for="review in visibleReviews"
            :key="review.id"
            class="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5"
          >
            <div class="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <img
                v-if="review.image"
                :src="review.image"
                alt="Profile Picture"
                class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
              />
              <div
                v-else
                class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0"
              >
                {{ getInitials(getDisplayName(review)) }}
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="text-base sm:text-lg font-bold text-gray-900 mb-1 truncate"
                >
                  {{ getDisplayName(review) }}
                </h3>
                <div
                  class="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm flex-wrap"
                >
                  <span
                    v-if="review.userStatus"
                    class="px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0"
                    :class="
                      review.userStatus === 'alumni'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-teal-100 text-teal-700'
                    "
                  >
                    {{
                      review.userStatus === "alumni"
                        ? "Alumni"
                        : "Siswa/Mahasiswa Aktif"
                    }}
                  </span>
                  <span class="text-gray-600">dari</span>
                  <div class="flex items-center gap-1 min-w-0">
                    <svg
                      class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <NuxtLink
                      :to="`/school-details/${review.schoolDetailId}`"
                      class="text-gray-900 font-medium text-xs truncate"
                      >{{ review.schoolDetailName }}</NuxtLink
                    >
                  </div>
                </div>
              </div>
            </div>

            <div
              class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pt-3 sm:pt-4 border-t border-border-gray"
            >
              <div class="flex items-center gap-1">
                <span class="text-base sm:text-xs font-bold text-gray-900">{{
                  review.rating
                }}</span>
                <div class="flex">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    class="w-4 h-4 sm:w-4 sm:h-4"
                    viewBox="0 0 24 24"
                    :fill="star <= review.rating ? '#FFB800' : 'none'"
                    :stroke="star <= review.rating ? '#FFB800' : '#E5E7EB'"
                    stroke-width="2"
                  >
                    <path
                      d="M12 3.8l2.5 5.1 5.7.8-4.1 4 1 5.7L12 16.9 6.9 19.4l1-5.7-4.1-4 5.7-.8L12 3.8z"
                    />
                  </svg>
                </div>
              </div>
              <span class="text-xs sm:text-xs text-gray-500">
                {{ formatDate(review.createdAt) }}
              </span>
            </div>

            <div class="mb-3 sm:mb-4">
              <p class="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                Apa yang disukai dari sekolah ini?
              </p>
              <p class="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {{ review.liked }}
              </p>
            </div>

            <div class="mb-3 sm:mb-4">
              <p class="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                Apa yang perlu diperbaiki dari sekolah ini?
              </p>
              <p class="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {{ review.improved }}
              </p>
            </div>
          </article>
        </div>

        <div
          class="flex md:hidden gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          <article
            v-for="review in reviews"
            :key="review.id"
            class="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex-shrink-0 w-[300px] snap-start"
          >
            <div class="flex items-start gap-3 mb-4">
              <img
                v-if="review.image"
                :src="review.image"
                alt="Profile Picture"
                class="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div
                v-else
                class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-base flex-shrink-0"
              >
                {{ getInitials(getDisplayName(review)) }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-base font-bold text-gray-900 mb-1 line-clamp-1">
                  {{ getDisplayName(review) }}
                </h3>
                <div class="flex items-center gap-2 text-xs flex-wrap">
                  <span
                    v-if="review.userStatus"
                    class="px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0"
                    :class="
                      review.userStatus === 'alumni'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-teal-100 text-teal-700'
                    "
                  >
                    {{
                      review.userStatus === "alumni"
                        ? "Alumni"
                        : "Siswa/Mahasiswa Aktif"
                    }}
                  </span>
                  <span class="text-gray-600">dari</span>
                  <div class="flex items-center gap-1 min-w-0">
                    <svg
                      class="w-3 h-3 text-gray-400 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <NuxtLink
                      :to="`/school-details/${review.schoolDetailId}`"
                      class="text-gray-900 font-medium text-xs line-clamp-1"
                      >{{ review.schoolDetailName }}</NuxtLink
                    >
                  </div>
                </div>
              </div>
            </div>

            <div
              class="flex items-center gap-3 mb-3 pt-3 border-t border-border-gray"
            >
              <div class="flex items-center gap-1">
                <span class="text-base font-bold text-gray-900">{{
                  review.rating
                }}</span>
                <div class="flex">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    :fill="star <= review.rating ? '#FFB800' : 'none'"
                    :stroke="star <= review.rating ? '#FFB800' : '#E5E7EB'"
                    stroke-width="2"
                  >
                    <path
                      d="M12 3.8l2.5 5.1 5.7.8-4.1 4 1 5.7L12 16.9 6.9 19.4l1-5.7-4.1-4 5.7-.8L12 3.8z"
                    />
                  </svg>
                </div>
              </div>
              <span class="text-xs text-gray-500">
                {{ formatDate(review.createdAt) }}
              </span>
            </div>

            <div class="mb-3">
              <p class="text-xs font-semibold text-gray-900 mb-1">
                Apa yang disukai dari sekolah ini?
              </p>
              <p class="text-xs text-gray-700 leading-relaxed">
                {{ review.liked }}
              </p>
            </div>

            <div class="mb-3">
              <p class="text-xs font-semibold text-gray-900 mb-1">
                Apa yang perlu diperbaiki dari sekolah ini?
              </p>
              <p class="text-xs text-gray-700 leading-relaxed">
                {{ review.improved }}
              </p>
            </div>
          </article>
        </div>

        <div
          class="hidden md:flex items-center justify-center gap-4 mt-6 sm:mt-8"
        >
          <button
            class="p-2 sm:p-3 rounded-full border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            @click="prevPage"
            :disabled="currentPage === 0"
            aria-label="Previous"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 text-gray-900"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            class="p-2 sm:p-3 rounded-full border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            @click="nextPage"
            :disabled="(currentPage + 1) * 2 >= reviews.length"
            aria-label="Next"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 text-gray-900"
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

    <Modal
      :isOpen="showLoginModal"
      type="warning"
      title="Login Diperlukan"
      message="Anda harus login terlebih dahulu untuk memberikan like pada review ini."
      confirmText="Login"
      cancelText="Batal"
      :showCancel="true"
      @confirm="goToLogin"
      @close="showLoginModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import Modal from "@/components/common/Modal.vue";

const router = useRouter();
const authStore = useAuthStore();

const reviews = ref([]);
const currentPage = ref(0);
const reviewLikes = ref({});
const showLoginModal = ref(false);

const fetchReviews = async () => {
  try {
    const { data } = await axios.get("/reviews/recent");
    reviews.value = data.data;

    console.log("Data reviews dari API:", reviews.value);

    reviews.value.forEach((review) => {
      console.log(`Review ID ${review.id} - likesCount:`, review.likesCount);
      reviewLikes.value[review.id] = {
        isLiked: false,
        likesCount: review.likesCount || 0,
      };
    });

    console.log("reviewLikes setelah init:", reviewLikes.value);

    if (authStore.isLoggedIn) {
      await fetchLikesStatus();
    }

    console.log("reviewLikes setelah fetchLikesStatus:", reviewLikes.value);
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

const fetchLikesStatus = async () => {
  try {
    const promises = reviews.value.map(async (review) => {
      try {
        const { data } = await axios.get(`/reviews/${review.id}/likes/check`);
        return {
          id: review.id,
          isLiked: data.data.isLiked,
          likesCount: review.likesCount || 0,
        };
      } catch (error) {
        return {
          id: review.id,
          isLiked: false,
          likesCount: review.likesCount || 0,
        };
      }
    });
    const results = await Promise.all(promises);
    results.forEach((item) => {
      const review = reviews.value.find((r) => r.id === item.id);
      reviewLikes.value[item.id] = {
        isLiked: item.isLiked,
        likesCount: review?.likesCount || 0,
      };
    });
  } catch (error) {
    console.error("Error fetching likes status:", error);
  }
};

const handleLikeClick = (reviewId) => {
  if (!authStore.isLoggedIn) {
    showLoginModal.value = true;
    return;
  }
  toggleLike(reviewId);
};

const toggleLike = async (reviewId) => {
  try {
    const { data } = await axios.post(`/reviews/${reviewId}/like`);
    if (data.success) {
      reviewLikes.value[reviewId] = {
        isLiked: data.data.action === "liked",
        likesCount: data.data.likesCount,
      };
    }
  } catch (error) {
    console.error("Error toggling like:", error);
  }
};

const goToLogin = () => {
  router.push("/auth/login");
};

const visibleReviews = computed(() => {
  const start = currentPage.value * 2;
  return reviews.value.slice(start, start + 2);
});

const getDisplayName = (review) => {
  // Cek apakah user adalah parent (punya children)
  if (review.children && review.children.length > 0) {
    // Jika anak alumni, tampilkan nama anak
    if (review.userStatus === "alumni") {
      return review.children[0].fullname;
    }
    // Jika anak aktif, tampilkan nama orang tua
    return review.fullname;
  }
  // Jika bukan parent (student), tampilkan nama user
  return review.fullname;
};

const getInitials = (fullname) => {
  const parts = fullname.split(" ");
  const lastTwoParts = parts.slice(-2);
  return lastTwoParts.map((part) => part.charAt(0).toUpperCase()).join("");
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--;
};

const nextPage = () => {
  if ((currentPage.value + 1) * 2 < reviews.value.length) currentPage.value++;
};

onMounted(() => fetchReviews());
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
