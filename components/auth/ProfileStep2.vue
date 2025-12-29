<template>
  <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    <Modal
      :isOpen="errorModal.isOpen"
      type="error"
      :title="errorModal.title"
      :message="errorModal.message"
      confirmText="Tutup"
      @close="closeErrorModal"
    />
    
    <div
      class="hidden md:flex md:flex-1 relative bg-cover bg-center bg-no-repeat"
      :style="`background-image: url('${backgroundImage}')`"
    ></div>

    <div class="flex-1 flex items-center justify-center px-6 sm:px-8 py-8 md:py-12">
      <div class="w-full max-w-md">
        <div class="text-center mb-6 md:mb-8">
          <div class="text-sm text-teal-600 font-medium mb-2">
            LANGKAH {{ currentStep }} DARI 3
          </div>
        </div>

        <div class="text-center mb-6 md:mb-8">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {{
              userRole === "student"
                ? "Tambahkan Pendidikan Saat Ini"
                : "Pendidikan Peserta Didik Anda"
            }}
          </h1>
          <p class="text-sm sm:text-base text-gray-600">
            {{
              userRole === "student"
                ? "Tambahkan informasi tentang sekolah atau pendidikan yang ditempuh saat ini."
                : "Tambahkan informasi tentang sekolah atau pendidikan yang ditempuh peserta didik Anda."
            }}
          </p>
        </div>

        <div class="space-y-4 md:space-y-6">
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Sekolah
            </label>
            <div class="relative">
              <input
                v-model="schoolSearchQuery"
                @input="handleSchoolSearch"
                @focus="showDropdown = true"
                @blur="handleBlur"
                type="text"
                class="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Ketik nama sekolah..."
                autocomplete="off"
              />

              <div
                v-if="isSearching"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <svg
                  class="animate-spin h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>

            <div
              v-if="
                showDropdown &&
                (schoolOptions.length > 0 ||
                  (schoolSearchQuery && !isSearching))
              "
              class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 sm:max-h-60 overflow-y-auto"
            >
              <div v-if="schoolOptions.length > 0">
                <button
                  v-for="school in schoolOptions"
                  :key="school.id"
                  @mousedown="selectSchool(school)"
                  type="button"
                  class="w-full text-left px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 focus:bg-gray-50 focus:outline-none"
                >
                  <div class="font-medium text-gray-900 text-sm sm:text-base">{{ school.name }}</div>
                  <div class="text-xs sm:text-sm text-gray-600">
                    {{ school.accreditationCode }} •
                    {{ school.subDistrictName }}, {{ school.districtName }}
                  </div>
                </button>
              </div>

              <div
                v-else-if="schoolSearchQuery && !isSearching"
                class="px-4 py-3 text-gray-500 text-center text-sm"
              >
                Tidak ada sekolah ditemukan
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Unggah Dokumen Bukti Sekolah
            </label>

            <div
              @click="triggerFileInput"
              @dragover.prevent
              @drop.prevent="handleDrop"
              :class="[
                'w-full border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors',
                isUploading
                  ? 'border-teal-400 bg-teal-50'
                  : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50',
              ]"
            >
              <div class="flex flex-col items-center">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4"
                >
                  <svg
                    v-if="!isUploading"
                    class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <svg
                    v-else
                    class="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>

                <p class="text-sm sm:text-base text-gray-600 mb-2">
                  {{
                    isUploading
                      ? "Mengunggah..."
                      : selectedFile
                      ? selectedFile.name
                      : "Seret dan lepas file di sini atau Pilih file"
                  }}
                </p>
                <p class="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 px-2">
                  Unggah dokumen untuk membuktikan sebagai verifikasi, dapat
                  berupa foto kartu siswa atau dokumen yang relevan.
                </p>
              </div>
            </div>

            <input
              ref="fileInput"
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              @change="handleFileSelect"
              class="hidden"
            />

            <div
              v-if="selectedFile && !isUploading"
              class="mt-4 p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center min-w-0">
                  <svg
                    class="w-5 h-5 text-gray-600 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span class="text-sm text-gray-700 truncate">{{
                    selectedFile.name
                  }}</span>
                </div>
                <button
                  @click.stop="removeFile"
                  type="button"
                  class="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5"
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
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 pt-6">
          <button
            type="button"
            @click="handlePrev"
            class="w-full sm:flex-1 px-6 py-2.5 md:py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Kembali
          </button>
          <button
            type="button"
            @click="handleNext"
            :disabled="!isFormValid || isUploading"
            :class="[
              'w-full sm:flex-1 px-6 py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base',
              isFormValid && !isUploading
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed',
            ]"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import backgroundImage from "~/assets/images/complete2.jpg";
import { ref, computed, watch, onUnmounted } from "vue";
import { useAuthStore } from "@/store/auth";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import Modal from "@/components/common/Modal.vue";

const props = defineProps({
  currentStep: Number,
  formData: Object,
});

const emit = defineEmits(["next", "prev", "save"]);

const authStore = useAuthStore();
const fileInput = ref(null);
const currentStep = props.currentStep || 2;

const form = ref({
  schoolDetailId: "",
  schoolValidation: null,
});

const selectedFile = ref(null);
const isUploading = ref(false);

const schoolSearchQuery = ref("");
const schoolOptions = ref([]);
const selectedSchool = ref(null);
const showDropdown = ref(false);
const isSearching = ref(false);
const searchTimeout = ref(null);

const errorModal = ref({
  isOpen: false,
  title: "",
  message: "",
});

const userRole = computed(() => {
  const roles = authStore.user?.role;

  if (Array.isArray(roles)) {
    return roles.includes("parent") ? "parent" : "student";
  }

  return roles || "student";
});

const isFormValid = computed(() => {
  return form.value.schoolDetailId && form.value.schoolValidation;
});

const triggerFileInput = () => {
  if (!isUploading.value) {
    fileInput.value.click();
  }
};

const uploadFile = async (file) => {
  try {
    console.log("File selected:", file.name);
    const token = Cookies.get("token");

    const formData = new FormData();
    formData.append("files[]", file);

    const response = await axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      validateStatus: (status) => {
        return status >= 200 && status < 500;
      },
    });

    console.log("Full response:", response);
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    // Cek jika response status bukan 2xx
    if (response.status !== 200 && response.status !== 201) {
      console.log("Masuk ke error handling, status:", response.status);
      
      let errorTitle = "Gagal Mengunggah File";
      let errorMessage = "Terjadi kesalahan saat mengunggah file. Silakan coba lagi.";
      
      if (response.status === 413) {
        errorTitle = "Ukuran File Terlalu Besar";
        errorMessage = "Ukuran file melebihi batas maksimum 2MB. Silakan pilih file yang lebih kecil.";
      } else if (response.status === 422) {
        errorTitle = "Format File Tidak Valid";
        errorMessage = response.data?.message || "Format file tidak didukung. Gunakan format JPG, PNG, PDF, DOC, atau DOCX.";
      } else if (response.status === 401) {
        errorTitle = "Sesi Berakhir";
        errorMessage = "Sesi Anda telah berakhir. Silakan login kembali.";
      } else if (response.data?.message) {
        errorMessage = response.data.message;
      }
      
      errorModal.value = {
        isOpen: true,
        title: errorTitle,
        message: errorMessage,
      };
      
      throw new Error(errorMessage);
    }

    const fileUrl = response.data.data.urls[0];
    return fileUrl;
  } catch (error) {
    console.error("Catch block - Upload error:", error);
    console.error("errorModal.value.isOpen:", errorModal.value.isOpen);
    
    // Jika sudah ada errorModal yang di-set, skip
    if (!errorModal.value.isOpen) {
      let errorTitle = "Koneksi Gagal";
      let errorMessage = "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
      
      errorModal.value = {
        isOpen: true,
        title: errorTitle,
        message: errorMessage,
      };
    }
    
    throw error;
  }
};

const handleFileSelect = async (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    isUploading.value = true;

    try {
      const fileUrl = await uploadFile(file);
      form.value.schoolValidation = fileUrl;
      console.log("File uploaded, URL:", fileUrl);
    } catch (error) {
      console.error("Failed to upload file:", error);
      selectedFile.value = null;
      form.value.schoolValidation = null;
    } finally {
      isUploading.value = false;
    }
  }
};

const handleDrop = async (event) => {
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    selectedFile.value = files[0];
    isUploading.value = true;

    try {
      const fileUrl = await uploadFile(files[0]);
      form.value.schoolValidation = fileUrl;
      console.log("File uploaded, URL:", fileUrl);
    } catch (error) {
      console.error("Failed to upload file:", error);
      selectedFile.value = null;
      form.value.schoolValidation = null;
    } finally {
      isUploading.value = false;
    }
  }
};

const removeFile = () => {
  selectedFile.value = null;
  form.value.schoolValidation = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const handleSchoolSearch = async () => {
  const query = schoolSearchQuery.value.trim();

  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }

  if (!query) {
    schoolOptions.value = [];
    showDropdown.value = false;
    return;
  }

  if (selectedSchool.value && query !== selectedSchool.value.name) {
    selectedSchool.value = null;
    form.value.schoolDetailId = "";
  }

  searchTimeout.value = setTimeout(async () => {
    isSearching.value = true;
    showDropdown.value = true;

    try {
      const response = await axios.get(
        `/school-details?search=${encodeURIComponent(query)}`
      );

      if (response.data.status === "success") {
        schoolOptions.value = response.data.data.datas || [];
      } else {
        schoolOptions.value = [];
      }
    } catch (error) {
      console.error("Error searching schools:", error);
      schoolOptions.value = [];
    } finally {
      isSearching.value = false;
    }
  }, 300);
};

const fetchSchoolById = async (schoolId) => {
  try {
    const response = await axios.get(`/school-details/${schoolId}`);
    if (response.data.status === "success") {
      const school = response.data.data;
      selectedSchool.value = school;
      schoolSearchQuery.value = school.name;
    }
  } catch (error) {
    console.error("Error fetching school:", error);
  }
};

const selectSchool = (school) => {
  selectedSchool.value = school;
  schoolSearchQuery.value = school.name;
  form.value.schoolDetailId = school.id;
  showDropdown.value = false;
  schoolOptions.value = [];
};

const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
};

const handleNext = () => {
  if (!isFormValid.value) return;

  emit("save", form.value, 2);
  emit("next");
};

const handlePrev = () => {
  emit("prev");
};

const closeErrorModal = () => {
  errorModal.value.isOpen = false;
};

watch(
  () => props.formData?.step2,
  async (newData) => {
    if (newData) {
      form.value.schoolDetailId = newData.schoolDetailId || "";
      form.value.schoolValidation = newData.schoolValidation || null;

      if (newData.schoolValidation) {
        selectedFile.value = { name: "File terunggah" };
      }

      if (newData.schoolDetailId && !selectedSchool.value) {
        await fetchSchoolById(newData.schoolDetailId);
      }
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
});
</script>

<style scoped>
.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}

.bg-no-repeat {
  background-repeat: no-repeat;
}

input:focus {
  outline: none;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@media (max-width: 640px) {
  input, button {
    font-size: 16px;
  }
}
</style>