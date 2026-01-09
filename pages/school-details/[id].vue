<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
    <div v-if="school">
      <nav class="mb-3 sm:mb-4" aria-label="Breadcrumb">
        <ol
          class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-secondary-gray"
        >
          <li>
            <a href="/" class="hover:text-primary-green"> Home </a>
          </li>
          <span>›</span>
          <li>
            <a href="/" class="hover:text-primary-green">
              Jelajahi Sekolah
            </a>
          </li>
          <span>›</span>
          <li>
            <a :href="getEducationLevelPath()" class="hover:text-primary-green">
              {{ getEducationLevelFullName() }}
            </a>
          </li>
          <span>›</span>
          <li
            class="text-primary-green font-medium break-words"
            aria-current="page"
          >
            {{ school.name }}
          </li>
        </ol>
      </nav>

      <div class="flex justify-between items-start mb-4 sm:mb-6 gap-3">
        <div class="flex-1 min-w-0">
          <h1 class="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
            {{ school.name }}
          </h1>
          <div class="flex flex-wrap items-center gap-2">
            <span
              class="bg-[#fff3d6] text-[#ffb901] text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-full font-semibold"
              >{{ school.accreditationCode }}</span
            >
            <span
              class="hidden sm:inline font-medium text-primary-green text-sm"
              >Akreditasi</span
            >
            <span class="hidden sm:inline"
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
            <div class="flex items-center gap-1">
              <span class="w-4 h-4 sm:w-5 sm:h-5"><Star /></span>
              <span class="font-medium text-sm sm:text-base">{{
                school.rating
              }}</span>
            </div>

            <template v-if="school.rating > 4.5">
              <span class="inline">
                <svg
                  width="2"
                  height="16"
                  viewBox="0 0 2 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="2" height="16" rx="1" fill="#F8F9FA" />
                </svg>
              </span>
              <div class="flex items-center gap-1 sm:gap-2">
                <span>
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5"
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
                <span class="font-medium text-primary-green text-xs sm:text-sm">
                  Direkomendasikan oleh sebagian besar pengguna
                </span>
              </div>
            </template>
          </div>
        </div>

        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            @click="showShareModal = true"
            class="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-1.5 sm:p-2 rounded-full hover:bg-gray-100"
          >
            <ShareIcon class="w-8 h-8 sm:w-10 sm:h-10" />
          </button>

          <!-- <button
            @click="toggleSave"
            :disabled="isSaving"
            class="transition-all duration-200 p-1.5 sm:p-2 rounded-full hover:bg-gray-100"
            :class="
              isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            "
          >
            <SaveIcon
              :filled="isSaved"
              :color="isSaved ? '#082519' : '#9CA3AF'"
              class="w-8 h-8 sm:w-10 sm:h-10"
            />
          </button> -->
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="text-center py-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green"
      ></div>
      <p class="mt-2 text-sm text-gray-600">Loading...</p>
    </div>
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600">Error loading data!</p>
    </div>

    <SchoolImages />

    <SchoolDetail />

    <ReviewDetail />
    <div
      v-if="showShareModal"
      @click="showShareModal = false"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
    >
      <div
        @click.stop
        class="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900">Bagikan Sekolah</h3>
          <button
            @click="showShareModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-4 gap-4 mb-6">
          <button
            @click="shareToWhatsApp"
            class="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div
              class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                />
              </svg>
            </div>
            <span class="text-xs text-gray-600">WhatsApp</span>
          </button>

          <button
            @click="shareToFacebook"
            class="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div
              class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </div>
            <span class="text-xs text-gray-600">Facebook</span>
          </button>

          <button
            @click="shareToTwitter"
            class="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div
              class="w-12 h-12 bg-black rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </div>
            <span class="text-xs text-gray-600">Twitter</span>
          </button>

          <button
            @click="copyLink"
            class="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div
              class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span class="text-xs text-gray-600">Copy Link</span>
          </button>
        </div>

        <div class="bg-gray-50 rounded-lg p-3">
          <p class="text-sm text-gray-600 mb-2">Link:</p>
          <div class="flex items-center gap-2">
            <input
              type="text"
              :value="shareUrl"
              readonly
              class="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
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
const showShareModal = ref(false);
const shareUrl = ref("");
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

      alert(message);
    }
  } catch (err) {
    console.error("Error toggling save:", err);

    if (err.response?.status === 401) {
      alert("Sesi Anda telah berakhir, silakan login kembali");
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
const shareToWhatsApp = () => {
  const text = `Lihat informasi ${school.value.name} di Schoolpedia`;
  const url = `https://wa.me/?text=${encodeURIComponent(
    text + " " + shareUrl.value
  )}`;
  window.open(url, "_blank");
};

const shareToFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl.value
  )}`;
  window.open(url, "_blank", "width=600,height=400");
};

const shareToTwitter = () => {
  const text = `Lihat informasi ${school.value.name} di Schoolpedia`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(shareUrl.value)}`;
  window.open(url, "_blank", "width=600,height=400");
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    alert("Link berhasil disalin!");
  } catch (err) {
    console.error("Gagal copy link:", err);
  }
};
onMounted(() => {
  fetchSchoolData();
  shareUrl.value = window.location.href;
});
</script>
