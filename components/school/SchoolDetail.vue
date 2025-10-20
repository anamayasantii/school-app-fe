<template>
  <div class="flex min-h-screen">
    <!-- Left Sidebar Navigation -->
    <div class="w-64 sticky top-0 h-screen overflow-y-auto bg-white">
      <div class="p-4 relative">
        <!-- Garis vertikal abu-abu penuh -->
        <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

        <nav class="space-y-2 relative">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="scrollToSection(tab.id)"
            :class="[
              'w-full text-left px-4 py-3 text-base transition-all duration-200 flex items-center relative',
              activeTab === tab.id
                ? 'text-gray-900 font-semibold'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            <!-- Garis hitam HANYA untuk tinggi tab yang aktif -->
            <span
              v-if="activeTab === tab.id"
              class="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-900"
            ></span>

            <span class="flex-grow pl-0.5">{{ tab.name }}</span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto">
      <div class="max-w-4xl mx-auto p-8">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <p class="text-gray-600">Loading school data...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600">{{ error }}</p>
        </div>

        <!-- Content -->
        <div v-else>
          <!-- Overview Section -->
          <div id="overview" class="section mb-12">
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">
                Quick Overview
              </h2>
              <p class="text-gray-700 leading-relaxed mb-6">
                {{ schoolData.name }} adalah sekolah {{ schoolData.statusName.toLowerCase() }} 
                yang berlokasi di {{ schoolData.village }}, {{ schoolData.subDistrictName }}, 
                {{ schoolData.districtName }}. Sekolah ini menyediakan pendidikan tingkat 
                {{ schoolData.educationLevelName }} dengan kurikulum {{ schoolData.curriculum }}.
              </p>
              <p class="text-gray-700 leading-relaxed mb-8">
                Sekolah ini memiliki {{ schoolData.numStudent }} siswa dan {{ schoolData.numTeacher }} guru. 
                Status akreditasi sekolah adalah {{ schoolData.accreditationCode }} dengan kepemilikan 
                {{ schoolData.ownershipStatus }}.
              </p>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="text-center">
                <div class="flex justify-center mb-3">
                  <div
                    class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-8 h-8 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-1">
                  {{ schoolData.accreditationCode }}
                </h3>
                <p class="text-sm text-gray-600">Akreditasi</p>
              </div>
              <div class="text-center">
                <div class="flex justify-center mb-3">
                  <div
                    class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-8 h-8 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-1">
                  {{ schoolData.districtName }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ schoolData.provinceName }}, Indonesia
                </p>
              </div>
              <div class="text-center">
                <div class="flex justify-center mb-3">
                  <div
                    class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-8 h-8 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-1">
                  {{ schoolData.numStudent }}
                </h3>
                <p class="text-sm text-gray-600">Jumlah Siswa</p>
              </div>
            </div>
          </div>

          <!-- Location Section -->
          <div id="location" class="section mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Location</h2>

            <!-- Map Placeholder -->
            <div
              class="bg-gray-100 rounded-lg mb-6 h-80 flex items-center justify-center border"
            >
              <div class="text-center text-gray-500">
                <svg
                  class="w-16 h-16 mx-auto mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p class="text-lg font-medium">Interactive Map Location</p>
                <p class="text-sm mt-2">
                  Latitude: {{ schoolData.latitude }}, Longitude: {{ schoolData.longitude }}
                </p>
              </div>
            </div>

            <div class="flex items-start p-4 bg-gray-50 rounded-lg">
              <svg
                class="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p class="text-gray-700">
                {{ getFullAddress() }}
              </p>
            </div>
          </div>

          <!-- Ranking Section -->
          <div id="ranking" class="section mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Ranking</h2>
            <div class="bg-gray-50 rounded-lg p-6 text-center">
              <p class="text-gray-600">
                Rating: {{ schoolData.rating }} ({{ schoolData.reviewers }} reviewers)
              </p>
            </div>
          </div>

          <!-- Facilities Section -->
          <div id="facilities" class="section mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Facilities</h2>
            <div v-if="schoolData.facilities && schoolData.facilities.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="(facility, index) in schoolData.facilities"
                :key="index"
                class="flex items-center p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow"
              >
                <svg
                  class="w-6 h-6 mr-4 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span class="text-gray-900">{{ facility }}</span>
              </div>
            </div>
            <div v-else class="bg-gray-50 rounded-lg p-6 text-center">
              <p class="text-gray-600">Informasi fasilitas belum tersedia</p>
            </div>
          </div>

          <!-- Cost Section -->
          <div id="cost" class="section mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Cost</h2>
            <div class="bg-white border rounded-lg p-8">
              <div class="mb-4">
                <span class="text-sm font-medium text-gray-600"
                  >Biaya Pendidikan</span
                >
              </div>
              <div class="mb-6">
                <h3 class="text-4xl font-bold text-gray-900">
                  {{ schoolData.tuitionFee ? `Rp ${formatNumber(schoolData.tuitionFee)}` : 'Tidak Tersedia' }}
                </h3>
              </div>
              <p class="text-gray-600">
                Informasi biaya pendidikan tahunan untuk siswa.
              </p>
            </div>
          </div>

          <!-- Programs Section -->
          <div id="programs" class="section mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
              Education Programs
            </h2>
            <div class="space-y-4">
              <div
                class="border border-gray-200 rounded-lg bg-white"
              >
                <button
                  @click="toggleProgram(1)"
                  class="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors rounded-lg"
                >
                  <div class="flex items-center">
                    <div
                      class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4"
                    >
                      <svg
                        class="w-5 h-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"
                        ></path>
                      </svg>
                    </div>
                    <span class="font-semibold text-gray-900">
                      Program {{ schoolData.educationLevelName }}
                    </span>
                  </div>
                  <svg
                    class="w-5 h-5 text-gray-400 transition-transform"
                    :class="{ 'rotate-180': programs[0].expanded }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                <div v-show="programs[0].expanded" class="px-4 pb-4">
                  <div class="bg-gray-50 rounded-lg p-4">
                    <ul class="text-gray-700 space-y-2">
                      <li class="flex items-center">
                        <span
                          class="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"
                        ></span>
                        Kurikulum: {{ schoolData.curriculum }}
                      </li>
                      <li class="flex items-center">
                        <span
                          class="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"
                        ></span>
                        Jumlah Siswa: {{ schoolData.numStudent }}
                      </li>
                      <li class="flex items-center">
                        <span
                          class="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"
                        ></span>
                        Jumlah Guru: {{ schoolData.numTeacher }}
                      </li>
                      <li class="flex items-center">
                        <span
                          class="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"
                        ></span>
                        Status: {{ schoolData.statusName }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Section -->
          <div id="contact" class="section mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
            <div v-if="schoolData.contacts && schoolData.contacts.length > 0" class="space-y-4">
              <div
                v-for="(contact, index) in schoolData.contacts"
                :key="index"
                class="bg-white border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
              >
                <div class="flex items-center">
                  <svg
                    class="w-5 h-5 text-gray-500 mr-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    ></path>
                  </svg>
                  <span class="text-gray-900">{{ contact }}</span>
                </div>
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </div>
            <div v-else class="space-y-4">
              <div class="bg-gray-50 rounded-lg p-6 text-center">
                <p class="text-gray-600">Informasi kontak belum tersedia</p>
              </div>
            </div>

            <!-- School Information -->
            <div class="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Informasi Sekolah</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600">Kepala Sekolah</p>
                  <p class="text-gray-900">{{ schoolData.principal }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Operator</p>
                  <p class="text-gray-900">{{ schoolData.operator }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">NPSN</p>
                  <p class="text-gray-900">{{ schoolData.institutionCode }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Izin Operasional</p>
                  <p class="text-gray-900">{{ schoolData.operationalLicense }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import axios from "@/lib/axios";

// Reactive data
const activeTab = ref("overview");
const isScrolling = ref(false);
const loading = ref(true);
const error = ref(null);
const schoolData = ref({});
const route = useRoute();

const tabs = [
  { id: "overview", name: "Overview" },
  { id: "location", name: "Location" },
  { id: "ranking", name: "Ranking" },
  { id: "facilities", name: "Facilities" },
  { id: "cost", name: "Cost" },
  { id: "programs", name: "Programs" },
  { id: "contact", name: "Contact" },
];

const programs = ref([
  {
    id: 1,
    name: "Program Utama",
    expanded: false,
  },
]);

// Fetch school data from API
const fetchSchoolData = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`/school-details/${route.params.id}`);
    
    if (response.data.status === "success") {
      schoolData.value = response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch school data");
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || "Terjadi kesalahan";
    console.error("Error fetching school data:", err);
  } finally {
    loading.value = false;
    
    // Setup Intersection Observer SETELAH data selesai dimuat dan DOM sudah di-render
    await nextTick();
    setupIntersectionObserver();
  }
};

// Helper functions
const getFullAddress = () => {
  const addressParts = [
    schoolData.value.street,
    schoolData.value.village,
    schoolData.value.subDistrictName,
    schoolData.value.districtName,
    schoolData.value.provinceName,
    schoolData.value.postalCode
  ].filter(part => part);
  
  return addressParts.join(", ");
};

const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number);
};

// Toggle program expansion
const toggleProgram = (programId) => {
  const program = programs.value.find((p) => p.id === programId);
  if (program) {
    program.expanded = !program.expanded;
  }
};

// Smooth scroll function
const scrollToSection = (sectionId) => {
  isScrolling.value = true;
  activeTab.value = sectionId;

  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      isScrolling.value = false;
    }, 1000);
  }
};

// Setup Intersection Observer
const setupIntersectionObserver = () => {
  const sections = document.querySelectorAll(".section");
  
  // Pastikan sections sudah ada di DOM
  if (sections.length === 0) {
    console.warn("No sections found");
    return;
  }
  
  const options = {
    threshold: 0,
    rootMargin: "-50% 0px -50% 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    if (isScrolling.value) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeTab.value = entry.target.id;
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
};

// Intersection Observer
onMounted(() => {
  fetchSchoolData();
});
</script>