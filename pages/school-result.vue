<template>
  <div class="min-h-screen">
    <!-- Breadcrumb -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <nav class="flex items-center text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
        <NuxtLink to="/" class="hover:text-gray-900">Beranda</NuxtLink>
        <span class="mx-2">›</span>
        <span class="text-gray-900">Pencarian</span>
      </nav>

      <!-- Title -->
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        Hasil dari "{{ searchQuery }}"
      </h1>
    </div>

    <!-- Section dengan Background -->
    <section class="bg-bg-light py-6 sm:py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <!-- Mobile Filter Button -->
          <div class="lg:hidden">
            <button
              @click="mobileFilterOpen = !mobileFilterOpen"
              class="w-full bg-white border border-border-gray rounded-xl px-4 py-3 flex items-center justify-between"
            >
              <span class="font-medium">Filter</span>
              <svg
                class="w-5 h-5 transform transition-transform"
                :class="{ 'rotate-180': mobileFilterOpen }"
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

          <!-- Sidebar Filters - Mobile: collapsible, Desktop: always visible -->
          <aside
            class="w-full lg:w-64 flex-shrink-0"
            :class="{ 'hidden lg:block': !mobileFilterOpen, 'block': mobileFilterOpen }"
          >
            <div
              class="bg-white rounded-2xl p-4 sm:p-6 lg:sticky lg:top-6 border border-border-gray"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold text-sm sm:text-base">Filter</h3>
                <button
                  v-if="selectedStatus"
                  @click="resetFilters"
                  class="text-xs bg-primary-green w-14 h-7 rounded-full text-white"
                >
                  Hapus
                </button>
              </div>

              <!-- Garis Pembatas -->
              <div class="border-b border-border-gray -mx-4 sm:-mx-6 mb-4"></div>

              <!-- School Type -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-3">
                  <button
                    class="flex items-center gap-2 font-medium text-gray-900 text-sm sm:text-base"
                    @click="toggleSection('schoolType')"
                  >
                    Tipe Sekolah
                    <svg
                      class="w-4 h-4 transform transition-transform"
                      :class="{ 'rotate-180': openSections.schoolType }"
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
                <div v-if="openSections.schoolType" class="space-y-2">
                  <label
                    v-for="status in schoolStatuses"
                    :key="status.id"
                    class="flex items-center text-xs sm:text-sm cursor-pointer"
                    :class="
                      selectedStatus === status.name
                        ? 'text-black font-medium'
                        : 'text-secondary-gray'
                    "
                  >
                    <input
                      type="radio"
                      name="schoolType"
                      :value="status.name"
                      v-model="selectedStatus"
                      class="w-4 h-4 sm:w-5 sm:h-5 mr-2 accent-black cursor-pointer"
                      @change="applyFilter"
                    />
                    <span>{{ getStatusDisplayName(status.name) }}</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <!-- School Cards Grid -->
          <div class="flex-1 min-w-0">
            <!-- Active Filters Tags -->
            <div v-if="selectedStatus" class="flex flex-wrap gap-2 mb-4">
              <span class="filter-tag-active text-xs sm:text-sm">
                Tipe Sekolah: {{ getStatusDisplayName(selectedStatus) }}
                <button @click="removeStatusFilter" class="ml-2">×</button>
              </span>
            </div>

            <!-- Results Count -->
            <p class="text-xs sm:text-sm text-primary-green mb-4 sm:mb-6">
              Menampilkan {{ schools.length }} dari {{ totalSchools }} Sekolah
            </p>

            <div v-if="isLoading" class="text-center py-12">
              <div class="spinner mx-auto mb-4"></div>
              <p class="text-gray-600 text-sm">Memuat Sekolah...</p>
            </div>

            <div v-else-if="schools.length === 0" class="text-center py-12">
              <p class="text-gray-600 text-sm sm:text-base">
                Tidak ada sekolah yang ditemukan untuk "{{ searchQuery }}"
              </p>
            </div>

            <!-- Menggunakan SchoolCard Component -->
            <div v-else class="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <SchoolCard
                v-for="school in schools"
                :key="school.id"
                :school="school"
              />
            </div>

            <!-- Pagination -->
            <div
              v-if="!isLoading && schools.length > 0"
              class="flex items-center justify-center gap-1 sm:gap-2 flex-wrap"
            >
              <button
                :disabled="currentPage === 1"
                class="pagination-btn text-xs sm:text-sm"
                @click="goToPage(currentPage - 1)"
              >
                <span class="hidden sm:inline">Sebelumnya</span>
                <span class="sm:hidden">‹</span>
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                :class="[
                  'pagination-btn text-xs sm:text-sm',
                  page === currentPage ? 'pagination-btn-active' : '',
                ]"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
              <span v-if="totalPages > 5" class="px-1 sm:px-2 text-xs sm:text-sm">...</span>
              <button
                v-if="totalPages > 5"
                class="pagination-btn text-xs sm:text-sm"
                @click="goToPage(totalPages)"
              >
                {{ totalPages }}
              </button>
              <button
                :disabled="currentPage === totalPages"
                class="pagination-btn text-xs sm:text-sm"
                @click="goToPage(currentPage + 1)"
              >
                <span class="hidden sm:inline">Selanjutnya</span>
                <span class="sm:hidden">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "@/lib/axios";
import SchoolCard from "~/components/shared/SchoolCard.vue";

const route = useRoute();
const searchQuery = ref(route.query.search || "");

const schools = ref([]);
const isLoading = ref(false);
const currentPage = ref(1);
const totalSchools = ref(0);
const totalPages = ref(1);
const limit = 12;

const schoolStatuses = ref([]);
const selectedStatus = ref("");
const mobileFilterOpen = ref(false);

const openSections = ref({
  schoolType: false,
});

const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section];
};

const getStatusDisplayName = (statusName) => {
  if (statusName === "SPK") return "Nasional/Internasional";
  return statusName;
};

const fetchSchoolStatuses = async () => {
  try {
    const { data } = await axios.get("/school-status");
    if (data.status === "success") {
      schoolStatuses.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching school statuses:", error);
  }
};

const applyFilter = () => {
  currentPage.value = 1;
  mobileFilterOpen.value = false;
  fetchSchools();
};

const removeStatusFilter = () => {
  selectedStatus.value = "";
  currentPage.value = 1;
  fetchSchools();
};

const resetFilters = () => {
  selectedStatus.value = "";
  currentPage.value = 1;
  mobileFilterOpen.value = false;
  fetchSchools();
};

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - 2);
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const fetchSchools = async () => {
  isLoading.value = true;
  try {
    const params = {
      search: searchQuery.value,
      page: currentPage.value,
      limit: limit,
    };

    if (selectedStatus.value) {
      params.statusName = selectedStatus.value;
    }

    const { data } = await axios.get("/school-details", { params });

    if (data.status === "success" && data.data?.datas) {
      schools.value = data.data.datas;
      totalSchools.value = data.data.meta.total;
      totalPages.value = data.data.meta.last_page;
    } else {
      schools.value = [];
      totalSchools.value = 0;
      totalPages.value = 1;
    }
  } catch (error) {
    console.error("Error fetching schools:", error);
    schools.value = [];
    totalSchools.value = 0;
    totalPages.value = 1;
  } finally {
    isLoading.value = false;
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

onMounted(() => {
  fetchSchoolStatuses();
  fetchSchools();
});

watch(
  () => route.query.search,
  (newSearch) => {
    searchQuery.value = newSearch || "";
    currentPage.value = 1;
    fetchSchools();
  }
);

watch(currentPage, () => {
  fetchSchools();
});
</script>

<style scoped>
.filter-tag-active {
  padding: 6px 12px;
  border-radius: 20px;
  background: #e9ecef;
  color: #6c757d;
  display: inline-flex;
  align-items: center;
}

.pagination-btn {
  padding: 6px 10px;
  min-width: 36px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

@media (min-width: 640px) {
  .pagination-btn {
    padding: 8px 12px;
  }
}

.pagination-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #d1d5db;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn-active {
  background: #28190c;
  color: white;
  border-color: #28190c;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top-color: #28190c;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>