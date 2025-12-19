<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 w-full max-w-full">
    <div class="px-4 py-3 md:px-6 md:py-4">
      <h2 class="text-lg md:text-xl font-semibold text-gray-900">
        Ulasan Saya({{ reviews.length }})
      </h2>
    </div>

    <div class="p-4 md:p-6">
      <div v-if="loading" class="text-center py-12 md:py-16">
        <div
          class="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-gray-900 mx-auto"
        ></div>
        <p class="mt-3 md:mt-4 text-sm md:text-base text-gray-600">Memuat ulasan...</p>
      </div>

      <div v-else class="space-y-6 md:space-y-8">
        <template v-for="(review, index) in reviews" :key="review.id">
          <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 md:mb-4 border-b border-gray-300 p-3 md:p-6 space-y-3 sm:space-y-0"
          >
            <div
              class="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-1 md:px-4 md:py-1 self-start"
            >
              <span class="text-xs md:text-sm whitespace-nowrap">Ulasan untuk</span>
              <NuxtLink
                :to="`/school-details/${review.schoolDetailId}`"
                class="flex items-center space-x-1 md:space-x-2 min-w-0"
              >
                <span class="text-xs md:text-sm font-medium text-gray-900 underline truncate">{{
                  review.schoolDetailName
                }}</span>
                <svg
                  class="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="#082519"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </NuxtLink>
            </div>

            <button
              @click="toggleMenu(index)"
              class="p-1 text-gray-400 hover:text-gray-600 transition-colors relative self-end sm:self-auto"
            >
              <svg class="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>

              <div
                v-show="activeMenu === index"
                class="absolute right-0 top-8 w-32 md:w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10"
              >
                <button
                  @click="editReview(review, index)"
                  class="w-full px-3 py-2 md:px-4 md:py-2 text-left text-xs md:text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Edit
                </button>
                <button
                  @click="deleteReview(review.id, index)"
                  class="w-full px-3 py-2 md:px-4 md:py-2 text-left text-xs md:text-sm text-red-600 hover:bg-gray-50 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </button>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-3 md:mb-4 px-3 md:px-6 space-y-2 sm:space-y-0">
            <div class="flex items-center space-x-1">
              <span class="text-base md:text-lg font-semibold text-gray-900">{{
                review.rating
              }}</span>
              <div class="flex space-x-0.5 md:space-x-1">
                <svg
                  v-for="star in 5"
                  :key="star"
                  :class="
                    star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                  "
                  class="w-4 h-4 md:w-5 md:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>

            <span class="text-xs md:text-sm text-gray-500">{{
              formatDate(review.createdAt)
            }}</span>
          </div>

          <p class="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6 px-3 md:px-6 pt-0">
            {{ review.reviewText }}
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 border-b border-gray-300 p-3 md:p-6">
            <template
              v-for="category in review.review_details"
              :key="category.id"
            >
              <div
                class="relative rounded-lg p-3 md:p-4 min-h-[80px] md:min-h-[90px] border border-gray-200"
              >
                <div class="absolute top-2 left-2 md:top-3 md:left-3 text-sm md:text-base font-medium">
                  {{ parseInt(category.score) }}
                </div>

                <div
                  class="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-gray-600 text-center w-[calc(100%-16px)]"
                >
                  {{ category.question }}
                </div>
              </div>
            </template>
          </div>
        </template>

        <div v-if="reviews.length === 0" class="text-center py-12 md:py-16">
          <svg
            class="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <h3 class="text-base md:text-lg font-medium text-gray-900 mb-2">
            Belum ada ulasan
          </h3>
          <p class="text-sm md:text-base text-gray-600 px-4">
            Ulasan yang Anda berikan akan muncul di sini
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="closeEditModal"
    >
      <div
        class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div
          class="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10"
        >
          <h3 class="text-lg md:text-xl font-semibold text-gray-900">Edit Ulasan</h3>
          <button
            @click="closeEditModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg
              class="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="p-4 md:p-6 space-y-4 md:space-y-6">
          <div>
            <h4 class="font-medium text-sm md:text-base text-gray-900 mb-2 md:mb-3">
              Penilaian Keseluruhan
            </h4>
            <p class="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
              Bagaimana Anda menilai sekolah ini secara keseluruhan?
            </p>
            <div class="flex space-x-1 md:space-x-2">
              <button
                v-for="star in 5"
                :key="star"
                @click="editForm.details.forEach((d) => (d.score = star))"
                type="button"
                class="focus:outline-none"
              >
                <svg
                  :class="
                    editForm.details.some((d) => d.score >= star)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  "
                  class="w-8 h-8 md:w-10 md:h-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-sm md:text-base text-gray-900 mb-2 md:mb-3">Ulasan Anda</h4>
            <p class="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
              Bagikan pemikiran Anda di sini
            </p>
            <textarea
              v-model="editForm.reviewText"
              rows="4"
              class="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Bagikan pemikiran Anda di sini"
            ></textarea>
          </div>

          <div>
            <h4 class="font-medium text-sm md:text-base text-gray-900 mb-2 md:mb-3">Detail Penilaian</h4>
            <div class="space-y-3 md:space-y-4">
              <div
                v-for="(detail, idx) in editForm.details"
                :key="idx"
                class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0"
              >
                <span class="text-xs md:text-sm text-gray-700">{{
                  getQuestionName(detail.questionId)
                }}</span>
                <div class="flex space-x-1.5 md:space-x-2">
                  <button
                    v-for="score in 5"
                    :key="score"
                    @click="detail.score = score"
                    type="button"
                    :class="
                      score === detail.score
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-600'
                    "
                    class="w-7 h-7 md:w-8 md:h-8 rounded-full text-xs md:text-sm font-medium hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    {{ score }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-sm md:text-base text-gray-900 mb-2 md:mb-3">
              Apa yang paling Anda sukai?
            </h4>
            <textarea
              v-model="editForm.liked"
              rows="3"
              class="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jelaskan apa yang paling Anda sukai"
            ></textarea>
          </div>

          <div>
            <h4 class="font-medium text-sm md:text-base text-gray-900 mb-2 md:mb-3">
              Apa yang bisa diperbaiki?
            </h4>
            <textarea
              v-model="editForm.improved"
              rows="3"
              class="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jelaskan apa yang bisa diperbaiki"
            ></textarea>
          </div>
        </div>

        <div
          class="px-4 py-3 md:px-6 md:py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 sticky bottom-0 bg-white"
        >
          <button
            @click="closeEditModal"
            type="button"
            class="w-full sm:w-auto px-4 py-2 text-sm md:text-base text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Batal
          </button>
          <button
            @click="updateReview"
            type="button"
            class="w-full sm:w-auto px-4 py-2 text-sm md:text-base bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "@/lib/axios";
import Cookies from "js-cookie";

const activeMenu = ref(null);
const reviews = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchUserReviews = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = Cookies.get("token");

    if (!token) {
      error.value = "Anda harus login terlebih dahulu";
      return;
    }

    const response = await axios.get("/reviews/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    reviews.value = response.data.data;
  } catch (err) {
    console.error("Error fetching reviews:", err);
    error.value = err.response?.data?.message || "Gagal memuat ulasan";

    if (err.response?.status === 401) {
      error.value = "Sesi Anda telah berakhir, silakan login kembali";
    }
  } finally {
    loading.value = false;
  }
};

const toggleMenu = (index) => {
  activeMenu.value = activeMenu.value === index ? null : index;
};

const closeMenu = () => {
  activeMenu.value = null;
};

const showEditModal = ref(false);
const editingReview = ref(null);
const editingIndex = ref(null);
const editForm = ref({
  reviewText: "",
  liked: "",
  improved: "",
  details: [],
});

const editReview = (review, index) => {
  editingReview.value = review;
  editingIndex.value = index;

  editForm.value = {
    reviewText: review.reviewText,
    liked: review.liked || "",
    improved: review.improved || "",
    details: review.review_details.map((detail) => ({
      questionId: detail.questionId,
      score: parseInt(detail.score),
    })),
  };

  showEditModal.value = true;
  closeMenu();
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingReview.value = null;
  editingIndex.value = null;
};

const updateReview = async () => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      alert("Anda harus login terlebih dahulu");
      return;
    }

    await axios.put(`/reviews-user/${editingReview.value.id}`, editForm.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await fetchUserReviews();
    closeEditModal();
    alert("Ulasan berhasil diperbarui");
  } catch (err) {
    console.error("Error updating review:", err);
    alert(err.response?.data?.message || "Gagal memperbarui ulasan");
  }
};

const getQuestionName = (questionId) => {
  const questions = {
    1: "Fasilitas & Peralatan",
    2: "Proses Pembelajaran",
    3: "Layanan Sekolah",
    4: "Keamanan Sekolah",
    5: "Kegiatan Sekolah",
  };
  return questions[questionId] || "Unknown";
};

const deleteReview = async (reviewId, index) => {
  const schoolName = reviews.value[index].schoolDetailName;
  if (!confirm(`Hapus ulasan untuk "${schoolName}"?`)) {
    closeMenu();
    return;
  }

  try {
    const token = Cookies.get("token");

    if (!token) {
      alert("Anda harus login terlebih dahulu");
      return;
    }

    await axios.delete(`/reviews-user/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    reviews.value.splice(index, 1);
    alert("Ulasan berhasil dihapus");
  } catch (err) {
    console.error("Error deleting review:", err);
    alert(err.response?.data?.message || "Gagal menghapus ulasan");
  } finally {
    closeMenu();
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const handleClickOutside = (event) => {
  if (activeMenu.value !== null && !event.target.closest("button")) {
    closeMenu();
  }
};

onMounted(() => {
  fetchUserReviews();
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const emit = defineEmits(["reviewEdited", "reviewDeleted"]);

defineExpose({
  editReview,
  deleteReview,
});
</script> 