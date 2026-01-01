<template>
  <div class="min-h-screen bg-bg-light py-4 md:py-8 px-4">
    <div class="max-w-3xl mx-auto">
      <div class="flex items-center justify-center mb-8 md:mb-12 px-4">
        <div
          class="flex items-center justify-between w-full max-w-md md:max-w-2xl"
        >
          <div class="flex flex-col items-center flex-1">
            <div
              class="w-8 h-8 md:w-10 md:h-10 bg-[#1F1F1F] text-white rounded-full flex items-center justify-center font-semibold mb-1 md:mb-2 text-sm md:text-base"
            >
              1
            </div>
            <div
              class="text-xs md:text-sm font-medium text-[#1F1F1F] text-center leading-tight"
            >
              Detail Anda
            </div>
          </div>

          <div
            class="flex-shrink-0 w-12 sm:w-20 md:w-32 h-0.5 bg-border-gray mx-1 sm:mx-2 md:mx-4 mt-[-24px] md:mt-[-30px]"
          ></div>

          <div class="flex flex-col items-center flex-1">
            <div
              class="w-8 h-8 md:w-10 md:h-10 border-2 border-border-gray text-secondary-gray rounded-full flex items-center justify-center font-semibold mb-1 md:mb-2 text-sm md:text-base"
            >
              2
            </div>
            <div
              class="text-xs md:text-sm font-medium text-secondary-gray text-center leading-tight"
            >
              Tinjau Sekolah
            </div>
          </div>

          <div
            class="flex-shrink-0 w-12 sm:w-20 md:w-32 h-0.5 bg-border-gray mx-1 sm:mx-2 md:mx-4 mt-[-24px] md:mt-[-30px]"
          ></div>

          <div class="flex flex-col items-center flex-1">
            <div
              class="w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-border-gray text-secondary-gray rounded-full flex items-center justify-center font-semibold mb-1 md:mb-2 text-sm md:text-base"
            >
              3
            </div>
            <div
              class="text-xs md:text-sm font-medium text-secondary-gray text-center leading-tight"
            >
              Langkah Terakhir
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-sm">
        <h1
          class="text-xl sm:text-2xl text-[#1F1F1F] md:text-3xl font-bold mb-2"
        >
          Mari kita mulai dengan detail Anda
        </h1>
        <p class="text-sm md:text-base text-[#1F1F1F] mb-6 md:mb-8">
          Silakan isi kolom di bawah ini dengan detail kontak Anda.
        </p>

        <div class="mb-4 md:mb-6">
          <label
            class="block text-xs md:text-sm text-primary-green font-medium mb-1.5 md:mb-2"
            >Nama Lengkap</label
          >
          <input
            v-model="form.fullName"
            type="text"
            placeholder="Contoh: John Doe"
            disabled
            class="w-full text-secondary-gray px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div class="mb-4 md:mb-6">
          <label class="block text-xs md:text-sm font-medium mb-1.5 md:mb-2"
            >Alamat Email</label
          >
          <input
            v-model="form.email"
            type="email"
            placeholder="Contoh: john.doe@gmail.com"
            disabled
            class="w-full text-secondary-gray px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div class="mb-4 md:mb-6">
          <label class="block text-xs md:text-sm font-medium mb-1.5 md:mb-2"
            >Nomor Telepon</label
          >
          <input
            v-model="form.phoneNo"
            type="tel"
            placeholder="Contoh: 8888-8888-8888"
            class="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4 md:mb-6">
          <label class="block text-xs md:text-sm font-medium mb-1.5 md:mb-2"
            >Hubungan dengan Sekolah</label
          >
          <div class="relative">
            <select
              v-model="form.userStatus"
              class="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-border-gray rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Pilih Hubungan</option>
              <option value="aktif">Siswa/Mahasiswa Aktif</option>
              <option value="alumni">Alumni</option>
            </select>
            <svg
              class="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-secondary-gray pointer-events-none"
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
          </div>
        </div>

        <div class="flex items-start mb-4 md:mb-6">
          <div class="flex items-center h-5 mt-0.5 md:mt-1">
            <button
              type="button"
              @click="form.isVerified = !form.isVerified"
              :class="[
                'w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                form.isVerified
                  ? 'border-[#1F1F1F] bg-black'
                  : 'border-border-gray bg-white',
              ]"
            >
              <svg
                v-if="form.isVerified"
                class="w-3 h-3 md:w-4 md:h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
          <label class="ml-2 md:ml-3 text-xs md:text-sm leading-tight">
            Saya dapat memberikan verifikasi hubungan saya dengan sekolah ini
          </label>
        </div>

        <div
          v-if="form.isVerified"
          class="bg-blue-50 border-l-4 border-blue-500 p-3 md:p-4 mb-4 md:mb-6"
        >
          <p class="text-xs md:text-sm text-blue-700">
            Dapatkan lencana terverifikasi khusus untuk memberikan verifikasi
            hubungan Anda dengan Sekolah
          </p>
        </div>

        <div v-if="form.isVerified" class="mb-4 md:mb-6">
          <h3 class="text-base md:text-lg font-semibold mb-3 md:mb-4">
            Unggah Berkas
          </h3>

          <div
            v-if="!form.file"
            class="border-2 border-dashed border-border-gray rounded-lg p-4 sm:p-6 md:p-8 text-center"
          >
            <div class="flex flex-col items-center">
              <div
                class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-bg-light rounded-full flex items-center justify-center mb-3 md:mb-4"
              >
                <div
                  v-if="isUploading"
                  class="animate-spin rounded-full h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 border-b-2 border-primary-green"
                ></div>
                <svg
                  v-else
                  class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-secondary-gray"
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
              </div>
              <p class="text-xs sm:text-sm text-secondary-gray mb-1">
                <span v-if="isUploading">Mengunggah...</span>
                <span v-else class="block sm:inline">
                  Seret dan jatuhkan berkas di sini atau
                  <label
                    for="fileUpload"
                    class="text-blue-600 underline cursor-pointer block sm:inline mt-1 sm:mt-0"
                    >Pilih berkas</label
                  >
                </span>
              </p>
              <input
                id="fileUpload"
                type="file"
                @change="handleFileUpload"
                class="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                :disabled="isUploading"
              />
            </div>
          </div>

          <div
            v-else
            class="border border-border-gray rounded-lg p-3 md:p-4 flex items-center justify-between gap-2"
          >
            <div class="flex items-center min-w-0 flex-1">
              <div
                class="w-8 h-8 md:w-10 md:h-10 bg-bg-light rounded flex items-center justify-center mr-2 md:mr-3 flex-shrink-0"
              >
                <svg
                  class="w-5 h-5 md:w-6 md:h-6 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  />
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-medium text-xs md:text-sm truncate">
                  {{ form.fileName }}
                </p>
                <p class="text-[10px] md:text-xs text-bg-light0">
                  {{ fileSize }}
                </p>
              </div>
            </div>
            <button
              @click="handleFileDelete"
              class="text-secondary-gray hover:text-red-600 transition-colors flex-shrink-0"
            >
              <svg
                class="w-4 h-4 md:w-5 md:h-5"
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

        <div
          class="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 sm:gap-0 pt-4 md:pt-6"
        >
          <button
            type="button"
            @click="handleCancel"
            class="w-full sm:w-auto px-4 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-primary-gray font-medium border border-border-gray rounded-xl transition-colors flex items-center justify-center gap-3"
          >
            Batal
          </button>
          <button
            type="button"
            @click="handleNext"
            :disabled="!isFormValid || isUploading"
            :class="[
              'w-full sm:w-auto px-6 md:px-6 py-2.5 md:py-3 text-sm md:text-base rounded-xl font-medium transition-colors flex items-center justify-center gap-3',
              isFormValid && !isUploading
                ? 'bg-[#1F1F1F] text-white'
                : 'bg-border-gray text-bg-light cursor-not-allowed',
            ]"
          >
            Selanjutnya
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.375 10.5H16.625M16.625 10.5L10.5 4.375M16.625 10.5L10.5 16.625"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
});

const route = useRoute();
const router = useRouter();
const emit = defineEmits(["next", "updateFormData"]);

const authStore = useAuthStore();

const form = ref({
  fullName: "",
  email: "",
  phoneNo: "",
  userStatus: "",
  file: null,
  fileName: "",
  fileUrl: "",
  isVerified: false,
});

const isUploading = ref(false);

onMounted(() => {
  if (props.formData?.step1) {
    form.value = { ...props.formData.step1 };
  } else {
    const user = authStore.user;

    if (user.role === "parent" && user.child && user.child.length > 0) {
      const child = user.child[0];
      form.value.fullName = child.fullname || "";
      form.value.userStatus = child.userStatus || "";
      form.value.email = user.email || "";
      form.value.phoneNo = user.phoneNo || "";
    } else {
      form.value.fullName = user.fullname || "";
      form.value.email = user.email || "";
      form.value.phoneNo = user.phoneNo || "";
    }
  }
});

watch(
  () => props.formData?.step1,
  (newData) => {
    if (newData) {
      form.value = { ...newData };
    }
  },
  { deep: true }
);

const isFormValid = computed(() => {
  return (
    form.value.fullName &&
    form.value.email &&
    form.value.phoneNo &&
    form.value.userStatus &&
    form.value.isVerified &&
    form.value.file
  );
});

const fileSize = computed(() => {
  if (form.value.file) {
    const sizeInMB = (form.value.file.size / (1024 * 1024)).toFixed(2);
    return `${sizeInMB} MB`;
  }
  return "";
});

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  isUploading.value = true;

  try {
    const token = Cookies.get("token");
    const formDataUpload = new FormData();
    formDataUpload.append("files[]", file);

    const response = await axios.post("/upload", formDataUpload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    const fileUrl = response.data.data.urls[0];

    form.value.file = file;
    form.value.fileName = file.name;
    form.value.fileUrl = fileUrl;

    emit("updateFormData", { step1: form.value });
  } catch (error) {
    console.error("Upload error:", error);
    alert("Gagal upload file");
  } finally {
    isUploading.value = false;
  }
};

const handleFileDelete = () => {
  form.value.file = null;
  form.value.fileName = "";
  form.value.fileUrl = "";

  emit("updateFormData", { step1: form.value });
};

const handleNext = () => {
  if (!isFormValid.value) return;

  console.log("Form data saat next:", form.value);
  console.log("User Status:", form.value.userStatus);

  emit("updateFormData", { step1: form.value });
  emit("next");
};

const handleCancel = () => {
  router.push(`/school-details/${route.params.id}`);
};
</script>
