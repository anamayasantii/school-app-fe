<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Breadcrumb -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <nav class="flex items-center text-sm text-gray-600 mb-6">
        <NuxtLink to="/" class="hover:text-gray-900">Home</NuxtLink>
        <span class="mx-2">›</span>
        <NuxtLink to="/explore-school" class="hover:text-gray-900"
          >Explore School</NuxtLink
        >
        <span class="mx-2">›</span>
        <span class="text-gray-900">Search</span>
      </nav>

      <!-- Title -->
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        Result of "{{ searchQuery }}"
      </h1>

      <!-- Filters Row -->
      <div class="flex flex-wrap gap-4 mb-6">
        <select v-model="filters.province" class="filter-select">
          <option value="">Province: Bali</option>
        </select>

        <select v-model="filters.regency" class="filter-select">
          <option value="">Regency: Badung</option>
        </select>

        <select v-model="filters.subdistrict" class="filter-select">
          <option value="">Subdistrict: Kuta</option>
        </select>

        <select v-model="filters.sortBy" class="filter-select">
          <option value="recommendation">Sort by: Recommendation</option>
          <option value="rating">Rating</option>
          <option value="name">Name</option>
        </select>
      </div>

      <!-- Active Filters Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <button class="filter-tag">
          Apply
        </button>
        <span class="filter-tag-active">
          School Type: Public
          <button class="ml-2">×</button>
        </span>
        <span class="filter-tag-active">
          School Level: Special Education
          <button class="ml-2">×</button>
        </span>
      </div>

      <!-- Results Count -->
      <p class="text-sm text-gray-600 mb-6">
        Showing {{ schools.length }} of {{ totalSchools }} Schools
      </p>

      <div class="flex gap-6">
        <!-- Sidebar Filters -->
        <aside class="w-64 flex-shrink-0">
          <div class="bg-white rounded-lg p-6 sticky top-6">
            <h3 class="font-semibold text-gray-900 mb-4">Filters</h3>

            <!-- School Type -->
            <div class="mb-6">
              <button
                class="w-full flex items-center justify-between font-medium text-gray-900 mb-3"
                @click="toggleSection('schoolType')"
              >
                School Type
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
              <div v-if="openSections.schoolType" class="space-y-2">
                <label class="flex items-center text-sm">
                  <input
                    type="radio"
                    name="schoolType"
                    value="public"
                    class="mr-2"
                    checked
                  />
                  <span>Public</span>
                  <button class="ml-auto text-gray-400">×</button>
                </label>
                <label class="flex items-center text-sm text-gray-600">
                  <input type="radio" name="schoolType" value="private" class="mr-2" />
                  <span>Private</span>
                </label>
                <label class="flex items-center text-sm text-gray-600">
                  <input
                    type="radio"
                    name="schoolType"
                    value="international"
                    class="mr-2"
                  />
                  <span>International</span>
                </label>
                <label class="flex items-center text-sm text-gray-600">
                  <input type="radio" name="schoolType" value="boarding" class="mr-2" />
                  <span>Boarding</span>
                </label>
                <label class="flex items-center text-sm text-gray-600">
                  <input
                    type="radio"
                    name="schoolType"
                    value="vocational"
                    class="mr-2"
                  />
                  <span>Vocational</span>
                </label>
              </div>
            </div>

            <!-- School Level -->
            <div class="mb-6">
              <button
                class="w-full flex items-center justify-between font-medium text-gray-900 mb-3"
                @click="toggleSection('schoolLevel')"
              >
                School Level
                <svg
                  class="w-4 h-4 transform transition-transform"
                  :class="{ 'rotate-180': openSections.schoolLevel }"
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

            <!-- Language -->
            <div>
              <button
                class="w-full flex items-center justify-between font-medium text-gray-900 mb-3"
                @click="toggleSection('language')"
              >
                Language
                <svg
                  class="w-4 h-4 transform transition-transform"
                  :class="{ 'rotate-180': openSections.language }"
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
          </div>
        </aside>

        <!-- School Cards Grid -->
        <div class="flex-1">
          <div v-if="isLoading" class="text-center py-12">
            <div class="spinner mx-auto mb-4"></div>
            <p class="text-gray-600">Loading schools...</p>
          </div>

          <div v-else-if="schools.length === 0" class="text-center py-12">
            <p class="text-gray-600">No schools found for "{{ searchQuery }}"</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <NuxtLink
              v-for="school in schools"
              :key="school.id"
              :to="`/school/${school.id}`"
              class="school-card"
            >
              <div class="relative">
                <img
                  :src="school.galleryImages[0] || '/placeholder-school.jpg'"
                  :alt="school.name"
                  class="school-card-image"
                />
                <span class="school-card-badge">{{ school.accreditationCode }}</span>
              </div>
              <div class="p-4">
                <div class="flex gap-2 mb-2">
                  <span class="tag">{{ school.curriculum }}</span>
                  <span class="tag">{{ school.curriculum }}</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  {{ school.name }}
                </h3>
                <div class="flex items-center text-sm text-gray-600 mb-3">
                  <svg
                    class="w-4 h-4 mr-1 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>{{ school.subDistrictName }}, {{ school.districtName }}</span>
                </div>
                <div class="flex items-center">
                  <svg
                    class="w-5 h-5 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="font-semibold text-gray-900 mr-1">{{
                    school.rating || 0
                  }}</span>
                  <span class="text-sm text-gray-600"
                    >({{ school.reviewers }} Reviews)</span
                  >
                </div>
              </div>
            </NuxtLink>
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
              Previous
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
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "@/lib/axios";

const route = useRoute();
const searchQuery = ref(route.query.search || "");

const schools = ref([]);
const isLoading = ref(false);
const currentPage = ref(1);
const totalSchools = ref(0);
const totalPages = ref(1);
const limit = 12;

const filters = ref({
  province: "",
  regency: "",
  subdistrict: "",
  sortBy: "recommendation",
});

const openSections = ref({
  schoolType: true,
  schoolLevel: false,
  language: false,
});

const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section];
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
    const { data } = await axios.get("/school-details", {
      params: {
        search: searchQuery.value,
        page: currentPage.value,
        limit: limit,
      },
    });

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
.filter-select {
  padding: 8px 32px 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
}

.filter-tag {
  padding: 6px 16px;
  border-radius: 20px;
  background: #28190c;
  color: white;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

.filter-tag-active {
  padding: 6px 16px;
  border-radius: 20px;
  background: #f3f4f6;
  color: #374151;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
}

.school-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
}

.school-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.school-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.school-card-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.school-card-badge::before {
  content: "🎓";
  font-size: 14px;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 12px;
  font-size: 12px;
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