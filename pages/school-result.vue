<template>
  <div class="min-h-screen">
    <!-- Breadcrumb -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <nav class="flex items-center text-sm text-gray-600 mb-6">
        <NuxtLink to="/" class="hover:text-gray-900">Beranda</NuxtLink>
        <span class="mx-2">›</span>
        <span class="text-gray-900">Pencarian</span>
      </nav>

      <!-- Title -->
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        Hasil dari "{{ searchQuery }}"
      </h1>
    </div>

    <!-- Section dengan Background - Pindahkan ke luar container -->
    <section class="bg-bg-light py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex gap-6">
          <!-- Sidebar Filters -->
          <aside class="w-64 flex-shrink-0">
            <div
              class="bg-white rounded-2xl p-6 sticky top-6 border border-border-gray"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold">Filter</h3>
                <button
                  v-if="selectedStatus"
                  @click="resetFilters"
                  class="text-xs bg-primary-green w-14 h-7 rounded-full text-white"
                >
                  Hapus
                </button>
              </div>

              <!-- Garis Pembatas Nyambung ke Pinggir -->
              <div class="border-b border-border-gray -mx-6 mb-4"></div>

              <!-- School Type -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-3">
                  <button
                    class="flex items-center gap-2 font-medium text-gray-900"
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
                    class="flex items-center text-sm cursor-pointer"
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
                      class="w-5 h-5 mr-2 accent-black cursor-pointer"
                      @change="applyFilter"
                    />
                    <span>{{ getStatusDisplayName(status.name) }}</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <!-- School Cards Grid -->
          <div class="flex-1">
            <!-- Active Filters Tags -->
            <div v-if="selectedStatus" class="flex flex-wrap gap-2 mb-4">
              <span class="filter-tag-active">
                Tipe Sekolah: {{ getStatusDisplayName(selectedStatus) }}
                <button @click="removeStatusFilter" class="ml-2">×</button>
              </span>
            </div>

            <!-- Results Count -->
            <p class="text-sm text-primary-green mb-6">
              Menampilkan {{ schools.length }} dari {{ totalSchools }} Sekolah
            </p>

            <div v-if="isLoading" class="text-center py-12">
              <div class="spinner mx-auto mb-4"></div>
              <p class="text-gray-600">Memuat Sekolah...</p>
            </div>

            <div v-else-if="schools.length === 0" class="text-center py-12">
              <p class="text-gray-600">
                Tidak ada sekolah yang ditemukan untuk "{{ searchQuery }}"
              </p>
            </div>

            <!-- Menggunakan SchoolCard Component -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <SchoolCard
                v-for="school in schools"
                :key="school.id"
                :school="school"
              />
            </div>

            <!-- Pagination -->
            <div
              v-if="!isLoading && schools.length > 0"
              class="flex items-center justify-center gap-2"
            >
              <button
                :disabled="currentPage === 1"
                class="pagination-btn"
                @click="goToPage(currentPage - 1)"
              >
                Sebelumnya
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                :class="[
                  'pagination-btn',
                  page === currentPage ? 'pagination-btn-active' : '',
                ]"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
              <span v-if="totalPages > 5" class="px-2">...</span>
              <button
                v-if="totalPages > 5"
                class="pagination-btn"
                @click="goToPage(totalPages)"
              >
                {{ totalPages }}
              </button>
              <button
                :disabled="currentPage === totalPages"
                class="pagination-btn"
                @click="goToPage(currentPage + 1)"
              >
                Selanjutnya
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
  padding: 6px 16px;
  border-radius: 20px;
  background: #e9ecef;
  color: #6c757d;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
}

.pagination-btn {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
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

@media (max-width: 768px) {
  .flex.gap-6 {
    flex-direction: column;
  }

  aside {
    width: 100%;
  }
}
</style>