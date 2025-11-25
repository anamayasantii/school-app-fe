<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6 px-16">
    <!-- Content Section -->
    <div v-if="school">
      <!-- Breadcrumb Navigation -->
      <nav class="mb-4" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2 text-sm text-secondary-gray">
          <li>
            <a href="/"> Home </a>
          </li>
          <span class="mx-2">›</span>
          <li>
            <a href="/schools"> Jelajahi Sekolah </a>
          </li>
          <span class="mx-2">›</span>
          <li>
            <a :href="getEducationLevelPath()">
              {{ getEducationLevelFullName() }}
            </a>
          </li>
          <span class="mx-2">›</span>
          <li
            class="text-primary-green font-medium truncate max-w-xs"
            aria-current="page"
          >
            {{ school.name }}
          </li>
        </ol>
      </nav>

      <!-- School Header Section -->
      <div class="flex justify-between items-start mb-2">
        <!-- School Name and Rating -->
        <div class="flex-1">
          <h1 class="text-2xl font-semibold mb-2">{{ school.name }}</h1>
          <div class="flex items-center">
            <span
              class="mr-2 bg-[#fff3d6] text-[#ffb901] text-sm px-3 py-1 rounded-full font-semibold"
              >{{ school.accreditationCode }}</span
            >
            <span class="mr-2 font-medium text-primary-green">Akreditasi</span>
            <span class="mr-6 ml-6"
              ><svg
                width="2"
                height="16"
                viewBox="0 0 2 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="2" height="16" rx="1" fill="#F8F9FA" />
              </svg>
            </span>
            <span class="mr-1"><Star /></span>
            <span class="mr-2 font-medium">{{ school.rating }}</span>

            <template v-if="school.rating > 4.5">
              <span class="mr-6 ml-6"
                ><svg
                  width="2"
                  height="16"
                  viewBox="0 0 2 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="2" height="16" rx="1" fill="#F8F9FA" />
                </svg>
              </span>
              <span class="mr-2"
                ><svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96452 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM8.625 9C8.84751 9 9.06502 9.06598 9.25002 9.1896C9.43503 9.31321 9.57922 9.48891 9.66437 9.69448C9.74952 9.90005 9.7718 10.1262 9.72839 10.3445C9.68498 10.5627 9.57783 10.7632 9.4205 10.9205C9.26317 11.0778 9.06271 11.185 8.84448 11.2284C8.62625 11.2718 8.40005 11.2495 8.19449 11.1644C7.98892 11.0792 7.81322 10.935 7.6896 10.75C7.56598 10.565 7.5 10.3475 7.5 10.125C7.5 9.82663 7.61853 9.54048 7.82951 9.3295C8.04049 9.11853 8.32664 9 8.625 9ZM16.3988 14.625C15.4341 16.2928 13.8309 17.25 12 17.25C10.1691 17.25 8.56594 16.2937 7.60125 14.625C7.54699 14.5396 7.51055 14.4442 7.49413 14.3444C7.47772 14.2446 7.48166 14.1425 7.50573 14.0442C7.52979 13.946 7.57348 13.8536 7.63417 13.7727C7.69485 13.6917 7.77128 13.6239 7.85886 13.5733C7.94643 13.5227 8.04334 13.4903 8.14375 13.4781C8.24417 13.4659 8.34601 13.4742 8.44316 13.5023C8.5403 13.5305 8.63074 13.5781 8.70904 13.6421C8.78734 13.7062 8.85187 13.7854 8.89875 13.875C9.59907 15.0853 10.6997 15.75 12 15.75C13.3003 15.75 14.4009 15.0844 15.1013 13.875C15.1481 13.7854 15.2127 13.7062 15.291 13.6421C15.3693 13.5781 15.4597 13.5305 15.5569 13.5023C15.654 13.4742 15.7558 13.4659 15.8563 13.4781C15.9567 13.4903 16.0536 13.5227 16.1412 13.5733C16.2287 13.6239 16.3052 13.6917 16.3658 13.7727C16.4265 13.8536 16.4702 13.946 16.4943 14.0442C16.5183 14.1425 16.5223 14.2446 16.5059 14.3444C16.4895 14.4442 16.453 14.5396 16.3988 14.625ZM15.375 11.25C15.1525 11.25 14.935 11.184 14.75 11.0604C14.565 10.9368 14.4208 10.7611 14.3356 10.5555C14.2505 10.35 14.2282 10.1238 14.2716 9.90552C14.315 9.68729 14.4222 9.48684 14.5795 9.3295C14.7368 9.17217 14.9373 9.06502 15.1555 9.02162C15.3738 8.97821 15.6 9.00049 15.8055 9.08564C16.0111 9.17078 16.1868 9.31498 16.3104 9.49998C16.434 9.68499 16.5 9.9025 16.5 10.125C16.5 10.4234 16.3815 10.7095 16.1705 10.9205C15.9595 11.1315 15.6734 11.25 15.375 11.25Z"
                    fill="#0E996F"
                  />
                </svg>
              </span>
              <span class="mr-2 font-medium text-primary-green"
                >Direkomendasikan oleh sebagian besar pengguna</span
              >
            </template>
          </div>
        </div>

        <!-- Action Buttons - Now aligned with school name -->
        <div class="flex items-center mt-1">
          <!-- Share Button -->
          <button
            class="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
          >
            <ShareIcon class="w-10 h-10" />
          </button>

          <!-- Save Button -->
          <button
            @click="toggleSave"
            :disabled="isSaving"
            class="transition-all duration-200 p-2 rounded-full hover:bg-gray-100"
            :class="
              isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            "
          >
            <SaveIcon
              :filled="isSaved"
              :color="isSaved ? 'primary-green' : '#9CA3AF'"
              class="w-10 h-10"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Loading or Error Message -->
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">Error loading data!</div>

    <SchoolImages />

    <SchoolDetail />

    <ReviewDetail />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { ref, onMounted } from "vue";
import ShareIcon from "~/assets/ShareIcon.vue";
import SaveIcon from "~/assets/SaveIcon.vue";
import SchoolImages from "@/components/school/ImagesSlider.vue";
import ReviewDetail from "~/components/review/ReviewDetail.vue";
import SchoolDetail from "~/components/school/SchoolDetail.vue";
import Star from "~/assets/Star.vue";

const route = useRoute();
const school = ref(null);
const loading = ref(true);
const error = ref(false);
const isSaved = ref(false);
const isSaving = ref(false);
const activeTab = ref("Overview");
const tabs = [
  "Overview",
  "Location",
  "Official Contact",
  "Facility",
  "Education Program",
  "Pricing",
  "Reviews",
];

const educationLevelMap = {
  SD: { full: "Sekolah Dasar", path: "sd" },
  SMP: { full: "Sekolah Menengah Pertama", path: "smp" },
  SMA: { full: "Sekolah Menengah Atas", path: "sma" },
  SMK: { full: "Sekolah Menengah Kejuruan", path: "smk" },
  Universitas: { full: "Universitas", path: "universitas" },
};

const getEducationLevelFullName = () => {
  if (!school.value?.educationLevelName) return "";

  const levelKey = school.value.educationLevelName.toUpperCase();
  return educationLevelMap[levelKey]?.full || school.value.educationLevelName;
};

const getEducationLevelPath = () => {
  if (!school.value?.educationLevelName) return "/schools";

  const levelKey = school.value.educationLevelName.toUpperCase();
  const path =
    educationLevelMap[levelKey]?.path ||
    school.value.educationLevelName.toLowerCase();

  return `/schools/${path}`;
};

const fetchSchoolData = async () => {
  try {
    const response = await axios.get(`/school-details/${route.params.id}`);
    school.value = response.data.data || {};
    loading.value = false;

    await checkIfSaved();
  } catch (err) {
    console.error("Error fetching data:", err);
    error.value = true;
    loading.value = false;
  }
};

const checkIfSaved = async () => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      isSaved.value = false;
      return;
    }

    const response = await axios.get("/school-details/saved", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "success") {
      const savedSchools = response.data.data;
      isSaved.value = savedSchools.some(
        (s) => s.id === parseInt(route.params.id)
      );
    }
  } catch (err) {
    console.error("Error checking saved status:", err);
    isSaved.value = false;
  }
};

const toggleSave = async () => {
  const token = Cookies.get("token");

  if (!token) {
    alert("Anda harus login terlebih dahulu untuk menyimpan sekolah");
    // TODO: Redirect to login page
    router.push("/login");
    return;
  }

  isSaving.value = true;

  try {
    const response = await axios.post(
      "/school-details/save",
      {
        schoolDetailId: parseInt(route.params.id),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === "success") {
      isSaved.value = !isSaved.value;

      const message = isSaved.value
        ? "Sekolah berhasil disimpan"
        : "Sekolah berhasil dihapus dari daftar simpanan";

      // TODO: Replace with toast notification
      alert(message);
    }
  } catch (err) {
    console.error("Error toggling save:", err);

    if (err.response?.status === 401) {
      alert("Sesi Anda telah berakhir, silakan login kembali");
      // TODO: Redirect to login
    } else {
      alert(
        err.response?.data?.message ||
          "Gagal menyimpan sekolah. Silakan coba lagi."
      );
    }
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  fetchSchoolData();
});
</script>
