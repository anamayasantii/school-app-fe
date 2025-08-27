<template>
  <!-- <div class="mx-auto my-8 max-w-[1420px] px-[170px]">
    <h2 class="text-2xl font-semibold mb-4">Recent Reviews</h2>
    <div class="flex flex-wrap justify-between">
      <div 
        v-for="review in reviews" 
        :key="review.id" 
        class="flex flex-col bg-[#F2ECE3] rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 mb-4 w-full md:w-[48%]"
        style="width: 450px; height: 222px;"
      >
        <div class="flex items-start mb-2">
          <img
            v-if="review.image && review.image.length > 0"
            :src="review.image"
            alt="Profile Picture"
            class="w-12 h-12 rounded-full mr-4"
          />
          <div class="flex-1">
            <div class="flex justify-between">
              <div>
                <div class="text-lg font-bold text-gray-800 dark:text-white">{{ review.username }}</div>
                <div class="text-sm font-medium uppercase text-gray-500 dark:text-neutral-500">{{ review.schoolDetailName }}</div>
              </div>
              <div class="text-yellow-500 flex items-center">
                <span v-for="star in 5" :key="star" class="material-icons">
                  {{ star <= review.rating ? 'star' : 'star_border' }}
                </span>
              </div>
            </div>
            <p class="mt-2 text-gray-800 dark:text-neutral-400">{{ review.reviewText }}</p>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="mx-auto my-8 max-w-[1420px] px-[160px]">
    <h2 class="text-2xl font-semibold mb-4">Recent Reviews</h2>
    <div class="flex flex-wrap justify-between">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="flex flex-col bg-[#F2ECE3] shadow-2xs rounded-xl p-4 md:p-5 m-2"
        style="width: 455px; height: 200px"
      >
        <div class="flex items-center">
          <img
            v-if="review.image && review.image.length > 0"
            :src="review.image"
            alt="Profile Picture"
            class="w-12 h-12 rounded-full mr-4"
          />
          <img
            v-else
            src=""
            alt="Default Profile Picture"
            class="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 class="text-lg font-bold text-gray-800 dark:text-white">
              {{ review.username }}
            </h3>
            <p
              class="mt-1 text-xs font-medium text-gray-500 dark:text-neutral-500"
            >
              {{ review.schoolDetailName }}
            </p>
          </div>
        </div>
        <p class="mt-2 text-gray-500 dark:text-neutral-400 line-clamp-3">
          {{ review.reviewText }}
        </p>
        <a
          class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-[#0FAE13] hover:underline focus:underline focus:outline-hidden focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600"
          href="#"
        >
          See Full Reviews
          <svg
            class="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/lib/axios"; // Ganti dengan path sesuai project Anda

const reviews = ref([]);

const fetchReviews = async () => {
  try {
    const response = await axios.get("/reviews/recent");
    reviews.value = response.data.data; // Mengambil hanya bagian data dari respons
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

onMounted(() => {
  fetchReviews();
});
</script>

<style scoped>
.material-icons {
  font-size: 20px;
}
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.mr-4 {
  margin-right: 1rem; /* Ubah sesuai kebutuhan */
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3; /* batas maksimal 3 baris */
}
</style>
