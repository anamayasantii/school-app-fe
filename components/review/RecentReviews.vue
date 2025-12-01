<template>
  <div class="bg-bg-light">
    <section class="max-w-7xl mx-auto px-6 py-16 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-semibold text-gray-900 mb-4">
          Beberapa hal mendalam untuk membantu
          <br />anda memutuskan
        </h2>
        <p class="text-primary-green max-w-4xl mx-auto">
          Menghapus pemisahan data dan penginputan ganda secara permanen dengan
          cara menghubungkan sistem SDM (sumber daya manusia), pencatatan waktu
          kerja, manajemen proyek, dan akuntansi dalam satu sistem terpadu.
        </p>
      </div>

      <div class="relative">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article
            v-for="review in visibleReviews"
            :key="review.id"
            class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="flex items-center gap-2 mb-6">
              <div class="border border-border-gray rounded-full px-3 py-2 flex items-center gap-2">
                <span class="text-sm text-secondary-gray">Review untuk</span>
                <NuxtLink
                  :to="`/school-details/${review.schoolDetailId}`"
                  class="flex items-center gap-1.5 underline"
                >
                  <div class="flex items-center gap-1.5">
                    <svg
                      class="w-4 h-4 text-primary-green"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span class="font-semibold text-primary-green">{{
                      review.schoolDetailName
                    }}</span>
                  </div>
                  <svg
                    width="19"
                    height="19"
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
            </div>

            <div class="flex items-start gap-4 mb-6">
              <img
                v-if="review.image"
                :src="review.image"
                alt="Profile Picture"
                class="w-14 h-14 rounded-full object-cover"
              />
              <div
                v-else
                class="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg"
              >
                {{ getInitials(review.fullname) }}
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-900 mb-1">
                  {{ review.fullname }}
                </h3>
                <div class="flex items-center gap-3 text-sm">
                  <span
                    v-if="review.userStatus"
                    class="px-2 py-0.5 rounded text-xs font-medium"
                    :class="
                      review.userStatus === 'Alumni'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-teal-100 text-teal-700'
                    "
                  >
                    {{ review.userStatus }}
                  </span>
                  <span class="text-gray-600">dari</span>
                  <div class="flex items-center gap-1">
                    <svg
                      class="w-3.5 h-3.5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span class="text-gray-900 font-medium text-xs">{{
                      review.schoolDetailName
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="flex items-center gap-4 mb-4 pt-4 border-t border-border-gray"
            >
              <div class="flex items-center gap-1">
                <span class="text-lg font-bold text-gray-900">{{
                  review.rating
                }}</span>
                <div class="flex">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    class="w-5 h-5"
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
              <span class="text-sm text-gray-500">
                {{ formatDate(review.createdAt) }}
              </span>
            </div>

            <p class="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4">
              {{ review.reviewText }}
            </p>

            <div class="flex items-center gap-2 pt-4">
              <div class="border border-border-gray rounded-full px-3 py-2 flex items-center gap-2">
                <span class="text-sm text-secondary-gray">Helpful?</span>
                <button>
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
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </button>
              </div>
              <span class="text-sm text-gray-600"
                >25 orang menganggap ini bermanfaat</span
              >
            </div>
          </article>
        </div>

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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "@/lib/axios";

const reviews = ref([]);
const currentPage = ref(0);

const fetchReviews = async () => {
  try {
    const { data } = await axios.get("/reviews/recent");
    reviews.value = data.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

const visibleReviews = computed(() => {
  const start = currentPage.value * 2;
  return reviews.value.slice(start, start + 2);
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

const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--;
};

const nextPage = () => {
  if ((currentPage.value + 1) * 2 < reviews.value.length) currentPage.value++;
};

onMounted(() => fetchReviews());
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
}
</style>
