<template>
  <div class="min-h-screen">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <!-- Education Level Header -->
      <nav class="mt-8 px-6 font-medium">
        <ol class="flex items-center space-x-2 text-sm text-secondary-gray">
          <li><a href="/">Beranda</a></li>
          <li><span class="mx-2">›</span></li>
          <li><a href="">Jelajahi Sekolah</a></li>
          <li><span class="mx-2">›</span></li>
          <li :class="selectedStatus ? 'text-[#76685A]' : 'text-[#28190C]'">
            {{
              level === "sd"
                ? "Sekolah Dasar"
                : level === "smp"
                ? "Sekolah Menengah Pertama"
                : level === "sma"
                ? "Sekolah Menengah Atas"
                : level === "smk"
                ? "Sekolah Menengah Kejuruan"
                : level === "universitas"
                ? "Universitas"
                : level
            }}
          </li>
          <!-- Status Breadcrumb -->
          <template v-if="selectedStatus">
            <li><span class="mx-2">›</span></li>
            <li class="text-[#28190C]">
              {{
                selectedStatus === "SPK"
                  ? "Nasional Plus/Internasional"
                  : selectedStatus
              }}
            </li>
          </template>
        </ol>
      </nav>

      <!-- Status Filter Buttons -->
      <div v-if="!filterVisible" class="p-6">
        <!-- Header Section - Dynamic based on selected level -->
        <div class="mb-6">
          <div class="flex items-center space-x-3">
            <!-- Dynamic Icon based on selected level -->
            <div class="flex-shrink-0">
              <!-- SD Icon -->
              <IconSd v-if="level === 'sd'" class="w-8 h-8" />

              <!-- SMP Icon -->
              <SmpIcon v-else-if="level === 'smp'" class="w-8 h-8" />

              <!-- SMA Icon -->
              <SmaIcon v-else-if="level === 'sma'" class="w-8 h-8" />

              <!-- SMK Icon -->
              <SmkIcon v-else-if="level === 'smk'" class="w-8 h-8" />

              <!-- Universitas Icon -->
              <UniversitasIcon
                v-else-if="level === 'universitas'"
                class="w-8 h-8"
              />
            </div>

            <!-- Dynamic Title -->
            <h2 class="font-bold text-2xl text-[#28190C]">
              {{
                level === "sd"
                  ? "Sekolah Dasar"
                  : level === "smp"
                  ? "Sekolah Menengah Pertama"
                  : level === "sma"
                  ? "Sekolah Menengah Atas"
                  : level === "smk"
                  ? "Sekolah Menengah Kejuruan"
                  : level === "universitas"
                  ? "Universitas"
                  : level
              }}
            </h2>
          </div>
        </div>

        <!-- Buttons Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div
            v-for="status in statusList"
            :key="status.id"
            @click="applyStatusFilter(status.name)"
            class="cursor-pointer"
          >
            <div
              :class="[
                'p-6 border border-border-gray rounded-xl transition duration-300 hover:bg-[#f8f9fa] h-full',
                selectedStatus === status.name
                  ? 'border-[#28190C]/[0.12] bg-[#F2ECE]'
                  : 'border-[#28190C]/[0.12] hover:border-[#28190C]/[0.12]',
              ]"
            >
              <div class="flex items-start space-x-4">
                <!-- Icon Container -->
                <div class="flex-shrink-0 font-bold">
                  <!-- Negeri Icon Component -->
                  <IconType
                    v-if="status.name === 'Negeri'"
                    class="w-12 h-12"
                  />

                  <!-- Swasta Icon Component -->
                  <IconType
                    v-else-if="status.name === 'Swasta'"
                    class="w-12 h-12"
                  />

                  <!-- SPK/Nasional Plus Icon Component -->
                  <IconType
                    v-else-if="status.name === 'SPK'"
                    class="w-12 h-12"
                  />
                </div>

                <!-- Title and Description -->
                <div class="flex-1">
                  <h3
                    :class="[
                      'text-lg mb-2',
                      selectedStatus === status.name ? 'text-[#28190C]' : '',
                    ]"
                  >
                    {{
                      status.name === "SPK"
                        ? "Sekolah Internasional"
                        : status.name === "Negeri"
                        ? "Sekolah Negeri"
                        : "Sekolah Swasta"
                    }}
                  </h3>
                  <p
                    class="text-sm text-secondary-gray font-regular leading-relaxed"
                  >
                    <span v-if="status.name === 'Negeri'"
                      >Didanai pemerintah, gratis atau biaya rendah.</span
                    >
                    <span v-else-if="status.name === 'Swasta'"
                      >Dikelola secara independen, berbasis biaya kuliah</span
                    >
                    <span v-else-if="status.name === 'SPK'"
                      >Kurikulum global, sering kali dalam bahasa Inggris.</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search Input -->
      <!-- <div class="p-6 pb-0">
        <div class="relative max-w-full mb-6 font-medium">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-[#76685A]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="search"
            class="block w-full p-3 pl-10 text-sm text-[#76685A] border border-[#28190C]/[0.12] rounded-lg bg-[#F9F6F1]"
            placeholder="Cari nama sekolah atau informasi ujian..."
          />
        </div>
      </div> -->

      <!-- Location Filters -->
      <div
        v-if="filterVisible"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 p-6 pt-7"
      >
        <!-- Province Filter -->
        <div
          class="relative flex items-center border border-[#28190C]/[0.12] font-medium rounded-lg p-2"
        >
          <label class="text-sm text-[#76685A] mr-2">Provinsi:</label>
          <select
            v-model="selectedProvince"
            @change="applyFilter"
            class="appearance-none block w-full px-4 py-2 bg-transparent text-gray-700 focus:outline-none text-sm"
          >
            <option value="">Provinsi</option>
            <option
              v-for="province in provinceList"
              :key="province.id"
              :value="province.name"
            >
              {{ province.name }}
            </option>
          </select>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>

        <!-- District Filter -->
        <div
          class="relative flex items-center border border-gray-300 rounded-lg p-2"
        >
          <label class="text-sm text-gray-600 mr-2">Regency/City:</label>
          <select
            v-model="selectedDistrict"
            @change="applyFilter"
            :disabled="!selectedProvince"
            :class="[
              'appearance-none block w-full px-4 py-2 bg-transparent text-gray-700 focus:outline-none text-sm',
              !selectedProvince ? 'bg-gray-100 cursor-not-allowed' : '',
            ]"
          >
            <option value="">Kabupaten</option>
            <option
              v-for="district in districtList"
              :key="district.id"
              :value="district.name"
            >
              {{ district.name }}
            </option>
          </select>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Sub-District Filter -->
        <div
          class="relative flex items-center border border-gray-300 rounded-lg p-2"
        >
          <label class="text-sm text-gray-600 mr-2">Subdistrict:</label>
          <select
            v-model="selectedSubDistrict"
            @change="applyFilter"
            :disabled="!selectedDistrict"
            :class="[
              'appearance-none block w-full px-4 py-2 bg-transparent text-gray-700 focus:outline-none text-sm',
              !selectedDistrict ? 'bg-gray-100 cursor-not-allowed' : '',
            ]"
          >
            <option value="">Kecamatan</option>
            <option
              v-for="subDistrict in subDistrictList"
              :key="subDistrict.id"
              :value="subDistrict.name"
            >
              {{ subDistrict.name }}
            </option>
          </select>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between mb-6 pb-4 px-6">
        <div class="text-sm text-[#1D2B29] font-medium">
          <span v-if="schools.length > 0 && pagination.total > 0">
            Showing {{ pagination.to }} of {{ pagination.total }} result{{
              pagination.total !== 1 ? "s" : ""
            }}
          </span>
          <span v-else-if="loading"> Loading... </span>
          <span v-else> No results found </span>
        </div>
        <div
          v-if="!filterVisible"
          class="flex items-center gap-2 border border-gray-300 rounded-xl p-2 w-full max-w-sm"
        >
          <label class="text-sm text-gray-600">Provinsi:</label>
          <select
            v-model="selectedProvince"
            @change="applyFilter"
            class="py-1.5 px-3 pe-8 bg-transparent border-none text-sm w-full"
          >
            <option value="">Semua</option>
            <option
              v-for="province in provinceList"
              :key="province.id"
              :value="province.name"
            >
              {{ province.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- Schools List -->
      <div v-else class="rounded-lg p-6">
        <div v-if="schools.length === 0" class="text-center py-12">
          <div class="text-gray-500">
            <svg
              class="mx-auto h-16 w-16 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-2-5v5m6-5v5M7 7h10M7 11h10M7 15h10"
              ></path>
            </svg>
            <p class="text-lg font-medium">Tidak ada sekolah ditemukan</p>
            <p class="text-sm">Coba ubah filter pencarian Anda</p>
          </div>
        </div>

        <div v-else class="space-y-4">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div
              v-for="school in schools"
              :key="school.id"
              class="rounded-xl bg-[#F2ECE3]"
            >
              <NuxtLink
                :to="`/school-details/${school.id}`"
                class="block cursor-pointer"
              >
                <div class="relative overflow-hidden rounded-t-xl bg-gray-100">
                  <!-- Actual Image -->
                  <img
                    v-if="
                      school.galleryImages && school.galleryImages.length > 0
                    "
                    :src="school.galleryImages[0]"
                    :alt="school.name"
                    class="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    @error="onImageError"
                  />

                  <!-- Placeholder when no image -->
                  <div
                    v-else
                    class="w-full h-48 flex items-center justify-center bg-gradient-to-br rounded-xl bg-[#F2ECE3] cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    <div class="text-center">
                      <svg
                        class="w-16 h-16 mx-auto text-[#76685A] mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p class="text-[#76685A] font-medium text-sm">
                        {{ school.name }}
                      </p>
                      <p class="text-[#76685A] text-xs">No image available</p>
                    </div>
                  </div>
                </div>

                <div class="p-4">
                  <h3 class="font-semibold text-[#1D2B29] mb-2 line-clamp-2">
                    {{ school.name }}
                  </h3>

                  <div class="flex items-center text-gray-500 text-sm mb-3">
                    <svg
                      class="w-4 h-4 mr-1"
                      width="24"
                      height="24"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12C11.337 12 10.7011 11.7366 10.2322 11.2678C9.76339 10.7989 9.5 10.163 9.5 9.5C9.5 8.83696 9.76339 8.20107 10.2322 7.73223C10.7011 7.26339 11.337 7 12 7C12.663 7 13.2989 7.26339 13.7678 7.73223C14.2366 8.20107 14.5 8.83696 14.5 9.5C14.5 9.8283 14.4353 10.1534 14.3097 10.4567C14.1841 10.76 13.9999 11.0356 13.7678 11.2678C13.5356 11.4999 13.26 11.6841 12.9567 11.8097C12.6534 11.9353 12.3283 12 12 12ZM12 2.5C10.1435 2.5 8.36301 3.2375 7.05025 4.55025C5.7375 5.86301 5 7.64348 5 9.5C5 14.75 12 22.5 12 22.5C12 22.5 19 14.75 19 9.5C19 7.64348 18.2625 5.86301 16.9497 4.55025C15.637 3.2375 13.8565 2.5 12 2.5Z"
                        fill="#F52936"
                      />
                    </svg>
                    {{ school.subDistrictName }}, {{ school.districtName }}
                  </div>

                  <div class="flex items-center">
                    <div class="flex items-center text-yellow-400">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.13L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77Z"
                          fill="#FFB800"
                        />
                      </svg>

                      <span class="ml-1 text-sm text-gray-800 font-medium">
                        {{ school.rating }}
                      </span>
                    </div>

                    <span class="ml-2 text-sm text-gray-600">
                      ({{ school.reviewers }} Reviews)
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Simplified Pagination -->
      <div
        v-if="!loading && schools.length > 0"
        class="flex justify-center px-6 pb-16"
      >
        <div class="flex items-center space-x-1 gap-2">
          <!-- Previous Button -->
          <button
            @click="changePage(pagination.currentPage - 1)"
            :disabled="pagination.currentPage === 1"
            :class="paginationButtonClass(false, pagination.currentPage === 1)"
          >
            Previous
          </button>

          <!-- Page Numbers -->
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page !== '...'"
              @click="changePage(page)"
              :class="paginationButtonClass(page === pagination.currentPage)"
            >
              {{ page }}
            </button>
            <div
              v-else
              class="px-3 py-2 text-sm text-[#28190C] bg-[#F2ECE3] rounded-md min-w-[40px] flex items-center justify-center"
            >
              ...
            </div>
          </template>

          <!-- Next Button -->
          <button
            @click="changePage(pagination.currentPage + 1)"
            :disabled="pagination.currentPage === pagination.lastPage"
            :class="
              paginationButtonClass(
                false,
                pagination.currentPage === pagination.lastPage
              )
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";
import IconType from "~/assets/IconType.vue";
import IconSd from "@/assets/IconSd2.vue";
import SmpIcon from "@/assets/IconSmp2.vue";
import SmaIcon from "@/assets/IconSma2.vue";
import SmkIcon from "@/assets/IconSmk2.vue";
import UniversitasIcon from "@/assets/IconKuliah2.vue";

const route = useRoute();
const router = useRouter();

// Get level from route params
const level = route.params.level || "sekolah-dasar";

// Data refs
const schools = ref([]);
const statusList = ref([]);
const provinceList = ref([]);
const districtList = ref([]);
const subDistrictList = ref([]);
const loading = ref(false);
const searchQuery = ref(route.query.search || "");

// Filter states
const selectedStatus = ref(route.query.status || "");
const selectedProvince = ref(route.query.province || "");
const selectedDistrict = ref(route.query.district || "");
const selectedSubDistrict = ref(route.query.subDistrict || "");

// Pagination states
const pagination = ref({
  currentPage: parseInt(route.query.page) || 1,
  lastPage: 1,
  limit: 12,
  total: 0,
  from: 0,
  to: 0,
});

const filterVisible = ref(false);

// Computed Properties
const visiblePages = computed(() => {
  const current = pagination.value.currentPage;
  const last = pagination.value.lastPage;
  const pages = [];

  if (last <= 7) {
    // Show all pages if 7 or less
    for (let i = 1; i <= last; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (current <= 4) {
      // Current page is near the beginning
      for (let i = 2; i <= 5; i++) pages.push(i);
      pages.push("...");
    } else if (current >= last - 3) {
      // Current page is near the end
      pages.push("...");
      for (let i = last - 4; i <= last - 1; i++) pages.push(i);
    } else {
      // Current page is in the middle
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push("...");
    }

    // Always show last page (if more than 1)
    if (last > 1) pages.push(last);
  }

  return pages;
});

// Methods
const paginationButtonClass = (isActive, isDisabled = false) => {
  const baseClasses = "px-3 py-2 text-sm rounded-md transition-colors";
  const activeClasses = "bg-[#28190C] text-[#F2ECE3] min-w-[40px]";
  const inactiveClasses = "text-[#28190C] bg-[#F2ECE3]";
  const disabledClasses = "text-[#28190C] bg-[#F2ECE3] cursor-not-allowed";

  if (isDisabled) {
    return `${baseClasses} ${disabledClasses}`;
  }

  if (isActive) {
    return `${baseClasses} ${activeClasses}`;
  }

  return `${baseClasses} ${inactiveClasses}`;
};

const changePage = (page) => {
  if (
    page >= 1 &&
    page <= pagination.value.lastPage &&
    page !== pagination.value.currentPage
  ) {
    pagination.value.currentPage = page;
    updatePageQuery();
  }
};

const fetchSchoolsByLevel = async () => {
  try {
    loading.value = true;
    const query = {
      educationLevelName: level,
      statusName: selectedStatus.value || "",
      provinceName: selectedProvince.value || "",
      districtName: selectedDistrict.value || "",
      subDistrictName: selectedSubDistrict.value || "",
      search: searchQuery.value || "",
      page: pagination.value.currentPage,
      limit: pagination.value.limit,
    };

    // Remove empty query parameters
    Object.keys(query).forEach((key) => {
      if (!query[key]) delete query[key];
    });

    const response = await axios.get("/school-details", { params: query });
    schools.value = response.data.data.datas || [];

    // Update pagination info
    if (response.data.data.meta) {
      const meta = response.data.data.meta;
      pagination.value = {
        currentPage: meta.current_page,
        lastPage: meta.last_page,
        limit: meta.limit,
        total: meta.total,
        from: meta.current_page * meta.limit - meta.limit + 1,
        to: Math.min(meta.current_page * meta.limit, meta.total),
      };
    }
  } catch (error) {
    console.error("Error fetching schools:", error);
    schools.value = [];
  } finally {
    loading.value = false;
  }
};

const fetchFilters = async () => {
  try {
    // Fetch status list
    const statusResponse = await axios.get("/school-status");
    statusList.value = statusResponse.data.data || [];

    // Fetch provinces
    const provinceResponse = await axios.get("/provinces");
    provinceList.value = provinceResponse.data.data || [];
  } catch (error) {
    console.error("Error fetching filters:", error);
  }
};

const fetchDistrictsByProvince = async () => {
  if (selectedProvince.value) {
    try {
      const response = await axios.get("/districts", {
        params: { provinceName: selectedProvince.value },
      });
      districtList.value = response.data.data;
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  } else {
    districtList.value = [];
    selectedDistrict.value = "";
    selectedSubDistrict.value = "";
  }
};

const fetchSubDistrictsByDistrict = async () => {
  if (selectedDistrict.value) {
    try {
      const response = await axios.get("/sub-districts", {
        params: { districtName: selectedDistrict.value },
      });
      subDistrictList.value = response.data.data;
    } catch (error) {
      console.error("Error fetching sub-districts:", error);
    }
  } else {
    subDistrictList.value = [];
    selectedSubDistrict.value = "";
  }
};

const applyFilter = () => {
  pagination.value.currentPage = 1; // Reset to first page
  updatePageQuery();
};

const applyStatusFilter = (status) => {
  if (selectedStatus.value === status) {
    selectedStatus.value = "";
  } else {
    selectedStatus.value = status;
  }
  filterVisible.value = true;
  pagination.value.currentPage = 1; // Reset to first page when filter changes
  updatePageQuery();
};

const handleSearch = () => {
  pagination.value.currentPage = 1; // Reset to first page when searching
  updatePageQuery();
};

const updatePageQuery = () => {
  const queryParams = {};

  if (searchQuery.value) queryParams.search = searchQuery.value;
  if (selectedStatus.value) queryParams.status = selectedStatus.value;
  if (selectedProvince.value) queryParams.province = selectedProvince.value;
  if (selectedDistrict.value) queryParams.district = selectedDistrict.value;
  if (selectedSubDistrict.value)
    queryParams.subDistrict = selectedSubDistrict.value;
  if (pagination.value.currentPage > 1)
    queryParams.page = pagination.value.currentPage;

  router.push({
    path: `/schools/${level}`,
    query: queryParams,
  });
};

// Watchers
watch(
  () => route.query,
  () => {
    searchQuery.value = route.query.search || "";
    selectedStatus.value = route.query.status || "";
    selectedProvince.value = route.query.province || "";
    selectedDistrict.value = route.query.district || "";
    selectedSubDistrict.value = route.query.subDistrict || "";
    pagination.value.currentPage = parseInt(route.query.page) || 1;
    fetchSchoolsByLevel();
  },
  { immediate: true }
);

watch(() => selectedProvince.value, fetchDistrictsByProvince);
watch(() => selectedDistrict.value, fetchSubDistrictsByDistrict);

watch(
  () => route.query.status,
  (newStatus) => {
    filterVisible.value = !!newStatus;
  },
  { immediate: true }
);

// Lifecycle
onMounted(() => {
  fetchFilters();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
