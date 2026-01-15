<template>
  <div class="min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="mt-4 sm:mt-6 lg:mt-8 font-medium">
        <ol
          class="flex flex-wrap items-center space-x-2 text-xs sm:text-sm text-secondary-gray"
        >
          <li><span class="mx-2">‹</span></li>
          <li><a href="/">Beranda</a></li>
        </ol>
      </nav>
    </div>

    <SchoolType />

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div v-if="loading" class="text-center py-8 sm:py-12">
        <p class="text-primary-green text-sm sm:text-base">Loading...</p>
      </div>

      <div v-else-if="schools.length === 0" class="text-center py-8 sm:py-12">
        <p class="text-primary-green text-sm sm:text-base">Tidak ada sekolah ditemukan</p>
      </div>

      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
      >
        <SchoolCard
          v-for="school in schools"
          :key="school.id"
          :school="school"
        />
      </div>

      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/lib/axios";
import SchoolType from "@/components/school/SchoolTypes.vue";
import SchoolCard from "@/components/shared/SchoolCard.vue";
import Pagination from "@/components/school/Pagination.vue";

const schools = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);

const fetchSchools = async (page = 1) => {
  loading.value = true;
  try {
    const response = await axios.get("/school-details?sortBy=name&sortDirection=asc", {
      params: {
        page: page,
        limit: 12,
      },
    });

    if (response.data.status === "success") {
      schools.value = response.data.data.datas;
      currentPage.value = response.data.data.meta.current_page;
      totalPages.value = response.data.data.meta.last_page;
    }
  } catch (error) {
    console.error("Error fetching schools:", error);
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchSchools(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  fetchSchools();
});
</script>