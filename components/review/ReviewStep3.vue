<template>
  <div class="min-h-screen bg-bg-light py-4 md:py-8 px-4">
    <div class="max-w-3xl mx-auto">
      <div class="flex items-center justify-center mb-8 md:mb-12 px-4">
        <div
          class="flex items-center justify-between w-full max-w-md md:max-w-2xl"
        >
          <div class="flex flex-col items-center flex-1">
            <div
              class="w-8 h-8 md:w-10 md:h-10 bg-[#0E996F] text-white rounded-full flex items-center justify-center font-semibold mb-1 md:mb-2"
            >
              <svg
                class="w-4 h-4 md:w-6 md:h-6"
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
            </div>
            <div
              class="text-xs md:text-sm font-medium text-[#0E996F] text-center leading-tight"
            >
              Detail Anda
            </div>
          </div>

          <div
            class="flex-shrink-0 w-12 sm:w-20 md:w-32 h-0.5 bg-[#0E996F] mx-1 sm:mx-2 md:mx-4 mt-[-24px] md:mt-[-30px]"
          ></div>

          <div class="flex flex-col items-center flex-1">
            <div
              class="w-8 h-8 md:w-10 md:h-10 bg-[#0E996F] text-white rounded-full flex items-center justify-center font-semibold mb-1 md:mb-2"
            >
              <svg
                class="w-4 h-4 md:w-6 md:h-6"
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
            </div>
            <div
              class="text-xs md:text-sm text-[#0E996F] font-medium text-center leading-tight"
            >
              Tinjau Sekolah
            </div>
          </div>

          <div
            class="flex-shrink-0 w-12 sm:w-20 md:w-32 h-0.5 bg-border-gray mx-1 sm:mx-2 md:mx-4 mt-[-24px] md:mt-[-30px]"
          ></div>

          <div class="flex flex-col items-center flex-1">
            <div
              class="w-8 h-8 md:w-10 md:h-10 bg-primary-green text-white rounded-full flex items-center justify-center font-semibold mb-1 md:mb-2"
            >
              3
            </div>
            <div
              class="text-xs md:text-sm text-primary-green font-medium text-center leading-tight"
            >
              Langkah Terakhir
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-sm">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Baca pedoman
        </h1>
        <p class="text-sm md:text-base text-primary-green mb-6 md:mb-8">
          Silakan isi kolom di bawah ini dengan rincian kontak Anda.
        </p>

        <div class="mb-6 md:mb-8">
          <h2 class="text-base md:text-lg font-semibold mb-2 md:mb-3">
            Pedoman
          </h2>
          <p class="text-xs md:text-sm text-primary-green mb-3 md:mb-4">
            Bagaimana Anda menilai sekolah ini secara keseluruhan?
          </p>

          <ul class="space-y-2 mb-4 md:mb-6">
            <li class="flex items-start text-xs md:text-sm text-primary-green">
              <span
                class="inline-block w-1.5 h-1.5 bg-primary-green rounded-full mt-1.5 mr-2 md:mr-3 flex-shrink-0"
              ></span>
              <span
                >Bersikaplah jujur dan konstruktif dalam umpan balik Anda</span
              >
            </li>
            <li class="flex items-start text-xs md:text-sm text-primary-green">
              <span
                class="inline-block w-1.5 h-1.5 bg-primary-green rounded-full mt-1.5 mr-2 md:mr-3 flex-shrink-0"
              ></span>
              <span>Fokus pada pengalaman pribadi Anda</span>
            </li>
            <li class="flex items-start text-xs md:text-sm text-primary-green">
              <span
                class="inline-block w-1.5 h-1.5 bg-primary-green rounded-full mt-1.5 mr-2 md:mr-3 flex-shrink-0"
              ></span>
              <span>Hindari membagikan informasi pribadi tentang individu</span>
            </li>
            <li class="flex items-start text-xs md:text-sm text-primary-green">
              <span
                class="inline-block w-1.5 h-1.5 bg-primary-green rounded-full mt-1.5 mr-2 md:mr-3 flex-shrink-0"
              ></span>
              <span>Ulasan dimoderasi sebelum diterbitkan</span>
            </li>
            <li class="flex items-start text-xs md:text-sm text-primary-green">
              <span
                class="inline-block w-1.5 h-1.5 bg-primary-green rounded-full mt-1.5 mr-2 md:mr-3 flex-shrink-0"
              ></span>
              <span
                >Ulasan yang terverifikasi ditandai dengan lencana khusus</span
              >
            </li>
          </ul>

          <div class="flex items-start mb-3 md:mb-4">
            <label class="flex items-start cursor-pointer">
              <div class="flex items-center h-5 mt-0.5">
                <input
                  type="checkbox"
                  v-model="agreements.agreement1"
                  class="hidden"
                />
                <div
                  class="w-4 h-4 md:w-5 md:h-5 rounded border-2 flex items-center justify-center transition-colors"
                  :class="
                    agreements.agreement1
                      ? 'border-primary-green bg-primary-green rounded-full'
                      : 'border-bg-gray bg-white rounded-full'
                  "
                >
                  <svg
                    v-if="agreements.agreement1"
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
                </div>
              </div>
              <span class="ml-2 md:ml-3 text-xs md:text-sm text-primary-green"
                >Saya setuju dengan pedoman</span
              >
            </label>
          </div>

          <div class="flex items-start">
            <label class="flex items-start cursor-pointer">
              <div class="flex items-center h-5 mt-0.5">
                <input
                  type="checkbox"
                  v-model="agreements.agreement2"
                  class="hidden"
                />
                <div
                  class="w-4 h-4 md:w-5 md:h-5 rounded border-2 flex items-center justify-center transition-colors"
                  :class="
                    agreements.agreement2
                      ? 'border-primary-green bg-primary-green rounded-full'
                      : 'border-bg-gray bg-white rounded-full'
                  "
                >
                  <svg
                    v-if="agreements.agreement2"
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
                </div>
              </div>
              <span class="ml-2 md:ml-3 text-xs md:text-sm text-primary-green"
                >Saya mengakui konsekuensi dari pedoman</span
              >
            </label>
          </div>
        </div>

        <div
          class="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 sm:gap-0 pt-4 md:pt-6"
        >
          <button
            @click="handlePrev"
            class="w-full sm:w-auto px-4 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-primary-gray font-medium border border-border-gray rounded-xl transition-colors flex items-center justify-center gap-3"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.625 10.5H4.375M4.375 10.5L10.5 16.625M4.375 10.5L10.5 4.375"
                stroke="#082519"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Kembali
          </button>
          <button
            @click="handleSubmit"
            :disabled="!isFormValid || isSubmitting"
            :class="[
              'w-full sm:w-auto px-5 md:px-5 py-2.5 md:py-3 text-sm md:text-base border border-border-gray rounded-xl font-medium transition-colors flex items-center justify-center gap-3',
              isFormValid && !isSubmitting
                ? 'bg-[#1F1F1F] text-white'
                : 'bg-border-gray text-bg-light cursor-not-allowed',
            ]"
          >
            <span v-if="isSubmitting">Mengirim...</span>
            <span v-else>Kirim</span>
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
const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["prev", "submit"]);

const agreements = ref({
  agreement1: false,
  agreement2: false,
});

const isSubmitting = ref(false);

onMounted(() => {
  if (props.formData?.step3) {
    agreements.value = { ...props.formData.step3 };
  }
});

watch(
  () => props.formData?.step3,
  (newData) => {
    if (newData) {
      agreements.value = { ...newData };
    }
  },
  { deep: true }
);

const isFormValid = computed(() => {
  return agreements.value.agreement1 && agreements.value.agreement2;
});

const handlePrev = () => {
  emit("prev");
};

const handleSubmit = () => {
  if (!isFormValid.value || isSubmitting.value) return;

  isSubmitting.value = true;
  emit("submit");
};
</script>
