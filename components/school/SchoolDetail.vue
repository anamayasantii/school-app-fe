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
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Ringkasan</h2>
              <p class="text-gray-700 leading-relaxed mb-6">
                {{ schoolData.name }} adalah sekolah
                {{ schoolData.statusName.toLowerCase() }} yang berlokasi di
                {{ schoolData.village }}, {{ schoolData.subDistrictName }},
                {{ schoolData.districtName }}. Sekolah ini menyediakan
                pendidikan tingkat {{ schoolData.educationLevelName }} dengan
                kurikulum {{ schoolData.curriculum }}.
              </p>
              <p class="text-gray-700 leading-relaxed mb-8">
                Sekolah ini memiliki {{ schoolData.numStudent }} siswa dan
                {{ schoolData.numTeacher }} guru. Status akreditasi sekolah
                adalah {{ schoolData.accreditationCode }} dengan kepemilikan
                {{ schoolData.ownershipStatus }}.
              </p>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white border rounded-lg p-6">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.5 31.25H36.25V22.5C36.25 21.837 35.9866 21.2011 35.5178 20.7322C35.0489 20.2634 34.413 20 33.75 20H27.5V8.75C27.5 8.08696 27.2366 7.45107 26.7678 6.98223C26.2989 6.51339 25.663 6.25 25 6.25H15C14.337 6.25 13.7011 6.51339 13.2322 6.98223C12.7634 7.45107 12.5 8.08696 12.5 8.75V13.75H6.25C5.58696 13.75 4.95107 14.0134 4.48223 14.4822C4.01339 14.9511 3.75 15.587 3.75 16.25V31.25H2.5C2.16848 31.25 1.85054 31.3817 1.61612 31.6161C1.3817 31.8505 1.25 32.1685 1.25 32.5C1.25 32.8315 1.3817 33.1495 1.61612 33.3839C1.85054 33.6183 2.16848 33.75 2.5 33.75H37.5C37.8315 33.75 38.1495 33.6183 38.3839 33.3839C38.6183 33.1495 38.75 32.8315 38.75 32.5C38.75 32.1685 38.6183 31.8505 38.3839 31.6161C38.1495 31.3817 37.8315 31.25 37.5 31.25ZM12.5 31.25H6.25V16.25H12.5V31.25ZM21.875 21.25C21.875 21.5815 21.7433 21.8995 21.5089 22.1339C21.2745 22.3683 20.9565 22.5 20.625 22.5C20.2935 22.5 19.9755 22.3683 19.7411 22.1339C19.5067 21.8995 19.375 21.5815 19.375 21.25V16.7344L19.1453 16.8109C18.9896 16.8629 18.8251 16.8836 18.6614 16.8719C18.4976 16.8603 18.3378 16.8165 18.1909 16.7431C18.0441 16.6697 17.9132 16.5681 17.8056 16.4441C17.6981 16.32 17.616 16.1761 17.5641 16.0203C17.5121 15.8646 17.4914 15.7001 17.5031 15.5364C17.5147 15.3726 17.5585 15.2128 17.6319 15.0659C17.7053 14.9191 17.8069 14.7882 17.9309 14.6806C18.055 14.5731 18.1989 14.491 18.3547 14.4391L20.2297 13.8141C20.4176 13.7514 20.6177 13.7343 20.8135 13.7642C21.0093 13.7941 21.1952 13.8701 21.3559 13.9859C21.5166 14.1017 21.6475 14.254 21.7377 14.4304C21.828 14.6067 21.875 14.8019 21.875 15V21.25ZM33.75 31.25H27.5V22.5H33.75V31.25Z"
                    fill="#212529"
                  />
                </svg>

                <h3 class="text-xl font-bold text-[#082519] mb-1 mt-5">
                  {{ schoolData.accreditationCode }}
                </h3>
                <p class="text-sm text-[#6C757D]">Akreditasi</p>
              </div>

              <div class="bg-white border rounded-lg p-6">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35.7687 7.76424C35.619 7.64756 35.4447 7.56653 35.259 7.52727C35.0732 7.48802 34.881 7.49157 34.6969 7.53767L25.1453 9.92517L15.5594 5.13142C15.2923 4.99821 14.9863 4.96495 14.6969 5.03767L4.69687 7.53767C4.42645 7.60527 4.18638 7.76131 4.01482 7.98101C3.84325 8.2007 3.75004 8.47143 3.75 8.75017V31.2502C3.75003 31.4401 3.79334 31.6275 3.87665 31.7982C3.95996 31.9689 4.08107 32.1184 4.23079 32.2353C4.38051 32.3522 4.5549 32.4334 4.7407 32.4728C4.92651 32.5122 5.11885 32.5087 5.30312 32.4627L14.8547 30.0752L24.4406 34.8689C24.6146 34.9547 24.806 34.9996 25 35.0002C25.1022 35.0001 25.204 34.9875 25.3031 34.9627L35.3031 32.4627C35.5735 32.3951 35.8136 32.239 35.9852 32.0193C36.1567 31.7997 36.25 31.5289 36.25 31.2502V8.75017C36.25 8.56006 36.2067 8.37244 36.1233 8.20159C36.0399 8.03074 35.9187 7.88116 35.7687 7.76424ZM15 27.5002C14.8978 27.5002 14.796 27.5128 14.6969 27.5377L6.25 29.6486V9.72674L14.8547 7.57517L15 7.64705V27.5002ZM33.75 30.2736L25.1453 32.4252L25 32.3533V12.5002C25.1021 12.5006 25.2039 12.4886 25.3031 12.4642L33.75 10.3517V30.2736Z"
                    fill="#212529"
                  />
                </svg>

                <h3 class="text-xl font-bold text-[#082519] mb-1 mt-5">
                  {{ schoolData.districtName }}
                </h3>
                <p class="text-sm text-[#6C757D]">
                  {{ schoolData.provinceName }}, Indonesia
                </p>
              </div>

              <div class="bg-white border rounded-lg p-6">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 3.75C16.7861 3.75 13.6443 4.70305 10.972 6.48862C8.29969 8.27419 6.21689 10.8121 4.98696 13.7814C3.75704 16.7507 3.43524 20.018 4.06225 23.1702C4.68926 26.3224 6.23692 29.2179 8.50952 31.4905C10.7821 33.7631 13.6776 35.3108 16.8298 35.9378C19.982 36.5648 23.2493 36.243 26.2186 35.013C29.1879 33.7831 31.7258 31.7003 33.5114 29.028C35.297 26.3557 36.25 23.2139 36.25 20C36.245 15.6918 34.5314 11.5614 31.485 8.515C28.4386 5.4686 24.3083 3.75496 20 3.75ZM32.2438 13.75H26.6734C25.972 11.1764 24.7897 8.75887 23.1891 6.625C25.123 7.08958 26.9336 7.96684 28.4967 9.19665C30.0599 10.4265 31.3386 11.9797 32.2453 13.75H32.2438ZM33.75 20C33.7511 21.2681 33.576 22.5301 33.2297 23.75H27.2125C27.5958 21.2647 27.5958 18.7353 27.2125 16.25H33.2297C33.576 17.4699 33.7511 18.7319 33.75 20ZM20 6.71875C21.8718 8.72269 23.2612 11.1276 24.0625 13.75H15.9375C16.738 11.1272 18.1275 8.72216 20 6.71875ZM15.9375 26.25H24.0625C23.2621 28.8728 21.8725 31.2778 20 33.2812C18.1283 31.2773 16.7388 28.8724 15.9375 26.25ZM15.3281 23.75C14.899 21.2684 14.899 18.7316 15.3281 16.25H24.6844C25.1135 18.7316 25.1135 21.2684 24.6844 23.75H15.3281ZM23.1953 33.375C24.7959 31.2411 25.9782 28.8236 26.6797 26.25H32.2516C31.3442 28.0209 30.0645 29.5746 28.5002 30.8045C26.936 32.0343 25.1241 32.9112 23.1891 33.375H23.1953Z"
                    fill="#212529"
                  />
                </svg>

                <h3 class="text-xl font-bold text-[#082519] mb-1 mt-5">
                  <p>Belum Tersedia</p>
                </h3>
                <p class="text-sm text-[#6C757D]">Situs Resmi</p>
              </div>
            </div>
          </div>

          <!-- Location Section -->
          <div id="location" class="section mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Lokasi</h2>

            <!-- Map Container -->
            <div id="map" class="rounded-lg mb-6 h-80 border"></div>

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

          <!-- Facilities Section -->
          <div id="facilities" class="section mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Fasilitas</h2>
            <div
              v-if="schoolData.facilities && schoolData.facilities.length > 0"
              class="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
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
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Biaya</h2>
            <div class="bg-white border rounded-lg p-8">
              <div class="mb-4">
                <span class="text-sm font-medium text-gray-600"
                  >Biaya Pendidikan</span
                >
              </div>
              <div class="mb-6">
                <h3 class="text-4xl font-bold text-gray-900">
                  {{
                    schoolData.tuitionFee
                      ? `Rp ${formatNumber(schoolData.tuitionFee)}`
                      : "Tidak Tersedia"
                  }}
                </h3>
              </div>
              <p class="text-gray-600">
                Informasi biaya pendidikan tahunan untuk siswa.
              </p>
            </div>
          </div>

          <!-- Related Schools Section -->
          <div id="related-schools" class="section mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
              Sekolah Terkait
            </h2>
            <div class="space-y-4">
              <div
                v-for="(school, index) in schoolData.relatedSchools"
                :key="school.id"
                class="border border-gray-200 rounded-lg bg-white"
              >
                <button
                  @click="toggleSchool(index)"
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
                    <div class="text-left">
                      <span class="font-semibold text-gray-900 block">
                        {{ school.name }}
                      </span>
                      <span class="text-sm text-gray-600">
                        {{ school.educationLevelName }} •
                        {{ school.statusName }}
                      </span>
                    </div>
                  </div>
                  <svg
                    class="w-5 h-5 text-gray-400 transition-transform"
                    :class="{ 'rotate-180': school.expanded }"
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
                <div v-show="school.expanded" class="px-4 pb-4">
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div
                      class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700"
                    >
                      <div>
                        <p class="font-medium text-sm text-gray-600">
                          Kode Institusi
                        </p>
                        <p>{{ school.institutionCode }}</p>
                      </div>
                      <div>
                        <p class="font-medium text-sm text-gray-600">
                          Kepala Sekolah
                        </p>
                        <p>{{ school.principal }}</p>
                      </div>
                      <div>
                        <p class="font-medium text-sm text-gray-600">
                          Jumlah Siswa
                        </p>
                        <p>{{ school.numStudent }}</p>
                      </div>
                      <div>
                        <p class="font-medium text-sm text-gray-600">
                          Tingkat Pendidikan
                        </p>
                        <p>{{ school.educationLevelName }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="
                !schoolData.relatedSchools ||
                schoolData.relatedSchools.length === 0
              "
              class="bg-gray-50 rounded-lg p-6 text-center"
            >
              <p class="text-gray-600">
                Tidak ada sekolah terkait yang tersedia
              </p>
            </div>
          </div>

          <!-- Contact Section -->
          <div id="contact" class="section mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Kontak</h2>
            <div v-if="schoolData.contacts" class="space-y-4">
              <div
                v-if="schoolData.contacts.phone"
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
                  <span class="text-gray-900">{{
                    schoolData.contacts.phone
                  }}</span>
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
              <div
                v-if="schoolData.contacts.email"
                class="bg-white border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
              >
                <div class="flex items-center">
                  <svg
                    class="w-5 h-5 text-gray-500 mr-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    ></path>
                    <path
                      d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                    ></path>
                  </svg>
                  <span class="text-gray-900">{{
                    schoolData.contacts.email
                  }}</span>
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
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Informasi Sekolah
              </h3>
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
                  <p class="text-sm text-gray-600">Kode Institusi</p>
                  <p class="text-gray-900">{{ schoolData.institutionCode }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Izin Operasional</p>
                  <p class="text-gray-900">
                    {{ schoolData.operationalLicense }}
                  </p>
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

const activeTab = ref("overview");
const isScrolling = ref(false);
const loading = ref(true);
const error = ref(null);
const schoolData = ref({});
const route = useRoute();

const tabs = [
  { id: "overview", name: "Ringkasan" },
  { id: "location", name: "Lokasi" },
  { id: "facilities", name: "Fasilitas" },
  { id: "cost", name: "Biaya" },
  { id: "related-schools", name: "Sekolah Terkait" },
  { id: "contact", name: "Kontak" },
];

const fetchSchoolData = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`/school-details/${route.params.id}`);

    if (response.data.status === "success") {
      const data = response.data.data;
      if (data.relatedSchools) {
        data.relatedSchools = data.relatedSchools.map((school) => ({
          ...school,
          expanded: false,
        }));
      }
      schoolData.value = data;
    } else {
      throw new Error(response.data.message || "Failed to fetch school data");
    }
  } catch (err) {
    error.value =
      err.response?.data?.message || err.message || "Terjadi kesalahan";
    console.error("Error fetching school data:", err);
  } finally {
    loading.value = false;

    await nextTick();
    setupIntersectionObserver();
    initMap();
  }
};

const getFullAddress = () => {
  const addressParts = [
    schoolData.value.street,
    schoolData.value.village,
    schoolData.value.subDistrictName,
    schoolData.value.districtName,
    schoolData.value.provinceName,
    schoolData.value.postalCode,
  ].filter((part) => part);

  return addressParts.join(", ");
};

const formatNumber = (number) => {
  return new Intl.NumberFormat("id-ID").format(number);
};

const toggleSchool = (index) => {
  if (
    schoolData.value.relatedSchools &&
    schoolData.value.relatedSchools[index]
  ) {
    schoolData.value.relatedSchools[index].expanded =
      !schoolData.value.relatedSchools[index].expanded;
  }
};

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

const setupIntersectionObserver = () => {
  const sections = document.querySelectorAll(".section");

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

const loadLeaflet = () => {
  return new Promise((resolve, reject) => {
    // Load CSS
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    if (window.L) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

onMounted(async () => {
  await loadLeaflet();
  fetchSchoolData();
});

const initMap = () => {
  const lat = parseFloat(schoolData.value.latitude);
  const lng = parseFloat(schoolData.value.longitude);

  const map = L.map("map").setView([lat, lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<b>${schoolData.value.name}</b><br>${getFullAddress()}`)
    .openPopup();
};

onMounted(() => {
  fetchSchoolData();
});
</script>
