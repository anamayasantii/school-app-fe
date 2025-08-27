<template>
  <div class="flex flex-col items-center max-w-[1440px] mx-auto w-full p-4">
    <!-- Search Bar -->
    <div class="flex items-center mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search schools..."
        @keyup.enter="searchSchools"
        class="p-2 border rounded"
      />
      <button
        @click="searchSchools"
        class="ml-2 p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
      ></div>
      <p class="mt-2 text-gray-600">Loading...</p>
    </div>

    <!-- Schools Grid -->
    <div
      v-else-if="schools.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="school in schools"
        :key="school.id"
        class="flex flex-col bg-[#F2ECE3] shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 w-64"
      >
        <img
          v-if="school.galleryImages && school.galleryImages.length > 0"
          :src="school.galleryImages[0]"
          alt="Image of school"
          class="w-full h-48 object-cover rounded-t-xl"
        />
        <div class="p-4 md:p-5">
          <!-- Adjust padding to match second snippet -->
          <h3
            class="text-lg font-bold text-gray-800 dark:text-white line-clamp-2"
          >
            <!-- Increase font size -->
            {{ school.schoolName }}
          </h3>
          <p
            class="mt-1 text-sm text-gray-500 dark:text-neutral-400 line-clamp-2"
          >
            {{ school.statusName }} | {{ school.provinceName }},
            {{ school.districtName }}, {{ school.subDistrictName }}
          </p>
          <p class="text-yellow-500 text-sm mt-2">
            ⭐ {{ school.rating }} ({{ school.reviewers }} reviews)
          </p>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-else class="text-center py-8">
      <p class="text-gray-600">No schools found.</p>
    </div>

    <!-- Pagination Controls -->
    <div
      v-if="totalPages > 1"
      class="flex items-center justify-center mt-6 space-x-1"
    >
      <!-- Previous Button -->
      <button
        @click="prevPage"
        :disabled="currentPage <= 1"
        class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center space-x-1">
        <button
          v-if="currentPage > 3"
          @click="goToPage(1)"
          class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          1
        </button>
        <span v-if="currentPage > 4" class="px-2 text-gray-500">...</span>

        <button
          v-for="page in pages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-2 text-sm rounded-md border',
            currentPage === page
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
          ]"
        >
          {{ page }}
        </button>

        <span v-if="currentPage < totalPages - 3" class="px-2 text-gray-500"
          >...</span
        >

        <button
          v-if="currentPage < totalPages - 2"
          @click="goToPage(totalPages)"
          class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          {{ totalPages }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        @click="nextPage"
        :disabled="currentPage >= totalPages"
        class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>

    <!-- Page Info -->
    <div v-if="totalPages > 0" class="mt-3 text-sm text-gray-600 text-center">
      Page {{ currentPage }} of {{ totalPages }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "@/lib/axios";
import { useRouter, useRoute } from "vue-router";

const schools = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const limit = 12; // Jumlah sekolah per halaman
const searchQuery = ref(""); // Kolom untuk pencarian
const isLoading = ref(false); // Status loading
const router = useRouter();
const route = useRoute();

// Fungsi untuk memanggil API dan fetch data sekolah
async function fetchSchools(page) {
  isLoading.value = true; // Start loading
  try {
    const response = await axios.get("/school-details", {
      params: {
        page,
        limit,
        search: searchQuery.value, // Parameter pencarian
      },
    });

    console.log("Response from API:", response.data);

    schools.value = response.data.data.datas;
    totalPages.value = response.data.data.meta.last_page;
  } catch (error) {
    console.error("Error fetching schools:", error);
  } finally {
    isLoading.value = false; // End loading
  }
}

// Fungsi untuk mencari sekolah
function searchSchools() {
  currentPage.value = 1; // Reset ke halaman pertama
  router.push({ query: { search: searchQuery.value } }); // Update URL dengan query
  fetchSchools(currentPage.value); // Ambil data untuk pencarian
}

// Menghasilkan array dari nomor halaman yang ingin ditampilkan
const pages = computed(() => {
  const pageNumbers = [];
  const maxPagesToShow = 5;

  let startPage = Math.max(
    1,
    currentPage.value - Math.floor(maxPagesToShow / 2)
  );
  let endPage = Math.min(
    totalPages.value,
    currentPage.value + Math.floor(maxPagesToShow / 2)
  );

  if (startPage === 1) {
    endPage = Math.min(maxPagesToShow, totalPages.value);
  } else if (endPage === totalPages.value) {
    startPage = Math.max(1, totalPages.value - (maxPagesToShow - 1));
  }

  for (let page = startPage; page <= endPage; page++) {
    pageNumbers.push(page);
  }

  return pageNumbers;
});

// Navigasi ke halaman sebelumnya
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchSchools(currentPage.value);
  }
}

// Navigasi ke halaman berikutnya
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchSchools(currentPage.value);
  }
}

// Fungsi untuk pergi ke halaman tertentu
function goToPage(page) {
  currentPage.value = page;
  fetchSchools(currentPage.value);
}

// Memanggil fungsi fetchSchools ketika komponen dimuat
onMounted(() => {
  // Ambil parameter pencarian dari URL
  const searchParam = route.query.search;
  if (searchParam) {
    searchQuery.value = searchParam;
  }
  fetchSchools(currentPage.value); // Panggil fetch dengan parameter yang ada
});

// Watch for changes in currentPage to refetch data
watch(currentPage, (newPage) => {
  fetchSchools(newPage);
});
</script>

<style>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}
</style>
