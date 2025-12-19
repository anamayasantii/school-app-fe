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
            class="flex-shrink-0 w-12 sm:w-20 md:w-32 h-0.5 bg-border-gray mx-1 sm:mx-2 md:mx-4 mt-[-24px] md:mt-[-30px]"
          ></div>

          <div class="flex flex-col items-center flex-1">
            <div
              class="w-8 h-8 md:w-10 md:h-10 bg-[#1F1F1F] text-white rounded-full flex items-center justify-center font-semibold mb-1 md:mb-2"
            >
              2
            </div>
            <div
              class="text-xs md:text-sm text-[#1F1F1F] font-medium text-center leading-tight"
            >
              Tinjau Sekolah
            </div>
          </div>

          <div
            class="flex-shrink-0 w-12 sm:w-20 md:w-32 h-0.5 bg-border-gray mx-1 sm:mx-2 md:mx-4 mt-[-24px] md:mt-[-30px]"
          ></div>

          <div class="flex flex-col items-center flex-1">
            <div
              class="w-8 h-8 md:w-10 md:h-10 border-2 border-border-gray text-secondary-gray rounded-full flex items-center justify-center font-semibold mb-1 md:mb-2"
            >
              3
            </div>
            <div
              class="text-xs md:text-sm text-secondary-gray text-center leading-tight"
            >
              Langkah Terakhir
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-sm">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Tulis ulasan
        </h1>
        <p class="text-sm md:text-base text-[#1F1F1F] mb-6 md:mb-8">
          Silakan isi kolom di bawah ini dengan detail kontak Anda.
        </p>

        <div class="mb-6 md:mb-8">
          <h2 class="text-base md:text-lg font-semibold mb-2">
            Penilaian Keseluruhan
          </h2>
          <p class="text-xs md:text-sm text-[#1F1F1F] mb-3 md:mb-4">
            Bagaimana Anda menilai sekolah ini secara keseluruhan?
          </p>

          <div class="flex gap-1 sm:gap-2">
            <svg
              v-for="star in 5"
              :key="star"
              class="w-8 h-8 sm:w-10 sm:h-10"
              :class="
                star <= overallRating
                  ? 'text-[#FFC423] fill-current'
                  : 'text-border-gray fill-current'
              "
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </div>
        </div>

        <div class="mb-6 md:mb-8">
          <h2 class="text-base md:text-lg font-semibold mb-3 md:mb-4">
            Ulasan Anda
          </h2>
          <p class="text-xs md:text-sm text-[#1F1F1F] mb-3 md:mb-4">
            Bagikan pemikiran Anda di sini
          </p>

          <div class="space-y-4 md:space-y-6">
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <span class="text-xs md:text-sm font-medium"
                >Fasilitas & Peralatan</span
              >
              <div class="flex gap-2 sm:gap-3 md:gap-4">
                <label
                  v-for="rating in 5"
                  :key="'fasilitas-' + rating"
                  class="cursor-pointer"
                >
                  <input
                    type="radio"
                    :value="rating"
                    v-model="form.ratings.fasilitas"
                    class="sr-only"
                  />
                  <span
                    class="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-colors text-xs md:text-sm"
                    :class="
                      form.ratings.fasilitas === rating
                        ? 'border-[#1F1F1F] bg-[#1F1F1F] text-white'
                        : 'border-bg-gray text-[#1F1F1F] hover:border-secondary-gray'
                    "
                  >
                    {{ rating }}
                  </span>
                </label>
              </div>
            </div>

            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <span class="text-xs md:text-sm font-medium"
                >Proses Pembelajaran</span
              >
              <div class="flex gap-2 sm:gap-3 md:gap-4">
                <label
                  v-for="rating in 5"
                  :key="'pembelajaran-' + rating"
                  class="cursor-pointer"
                >
                  <input
                    type="radio"
                    :value="rating"
                    v-model="form.ratings.pembelajaran"
                    class="sr-only"
                  />
                  <span
                    class="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-colors text-xs md:text-sm"
                    :class="
                      form.ratings.pembelajaran === rating
                        ? 'border-[#1F1F1F] bg-[#1F1F1F] text-white'
                        : 'border-bg-gray text-[#1F1F1F] hover:border-secondary-gray'
                    "
                  >
                    {{ rating }}
                  </span>
                </label>
              </div>
            </div>

            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <span class="text-xs md:text-sm font-medium"
                >Layanan Sekolah</span
              >
              <div class="flex gap-2 sm:gap-3 md:gap-4">
                <label
                  v-for="rating in 5"
                  :key="'layanan-' + rating"
                  class="cursor-pointer"
                >
                  <input
                    type="radio"
                    :value="rating"
                    v-model="form.ratings.layanan"
                    class="sr-only"
                  />
                  <span
                    class="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-colors text-xs md:text-sm"
                    :class="
                      form.ratings.layanan === rating
                        ? 'border-[#1F1F1F] bg-[#1F1F1F] text-white'
                        : 'border-bg-gray text-[#1F1F1F] hover:border-secondary-gray'
                    "
                  >
                    {{ rating }}
                  </span>
                </label>
              </div>
            </div>

            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <span class="text-xs md:text-sm font-medium"
                >Keamanan Sekolah</span
              >
              <div class="flex gap-2 sm:gap-3 md:gap-4">
                <label
                  v-for="rating in 5"
                  :key="'keamanan-' + rating"
                  class="cursor-pointer"
                >
                  <input
                    type="radio"
                    :value="rating"
                    v-model="form.ratings.keamanan"
                    class="sr-only"
                  />
                  <span
                    class="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-colors text-xs md:text-sm"
                    :class="
                      form.ratings.keamanan === rating
                        ? 'border-[#1F1F1F] bg-[#1F1F1F] text-white'
                        : 'border-bg-gray text-[#1F1F1F] hover:border-secondary-gray'
                    "
                  >
                    {{ rating }}
                  </span>
                </label>
              </div>
            </div>

            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <span class="text-xs md:text-sm font-medium"
                >Kegiatan Sekolah</span
              >
              <div class="flex gap-2 sm:gap-3 md:gap-4">
                <label
                  v-for="rating in 5"
                  :key="'kegiatan-' + rating"
                  class="cursor-pointer"
                >
                  <input
                    type="radio"
                    :value="rating"
                    v-model="form.ratings.kegiatan"
                    class="sr-only"
                  />
                  <span
                    class="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-colors text-xs md:text-sm"
                    :class="
                      form.ratings.kegiatan === rating
                        ? 'border-[#1F1F1F] bg-[#1F1F1F] text-white'
                        : 'border-bg-gray text-[#1F1F1F] hover:border-secondary-gray'
                    "
                  >
                    {{ rating }}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-6 md:mb-8">
          <h2 class="text-base md:text-lg font-semibold mb-3 md:mb-4">
            Pengalaman Anda di {{ schoolName }}
          </h2>
          <p class="text-xs md:text-sm text-[#1F1F1F] mb-3 md:mb-4">
            Bagikan pemikiran Anda di sini
          </p>

          <div class="mb-4 md:mb-6">
            <label class="block text-xs md:text-sm font-medium mb-2"
              >Apa yang paling Anda sukai?</label
            >
            <textarea
              v-model="form.experience.liked"
              rows="4"
              maxlength="1000"
              placeholder="Jelaskan apa yang paling Anda sukai"
              class="w-full px-3 py-2 md:px-4 md:py-3 border border-bg-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-xs md:text-sm"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1 text-right">
              {{ form.experience.liked.length }}/1000
            </p>
          </div>

          <div class="mb-4 md:mb-6">
            <label class="block text-xs md:text-sm font-medium mb-2"
              >Apa yang bisa diperbaiki?</label
            >
            <textarea
              v-model="form.experience.improved"
              rows="4"
              maxlength="1000"
              placeholder="Jelaskan apa yang bisa diperbaiki"
              class="w-full px-3 py-2 md:px-4 md:py-3 border border-bg-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-xs md:text-sm"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1 text-right">
              {{ form.experience.improved.length }}/1000
            </p>
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
            @click="handleNext"
            :disabled="!isFormValid"
            :class="[
              'w-full sm:w-auto px-5 md:px-5 py-2.5 md:py-3 text-sm md:text-base border border-border-gray rounded-xl font-medium transition-colors flex items-center justify-center gap-3',
              isFormValid
                ? 'bg-[#1F1F1F] text-white'
                : 'bg-border-gray text-bg-light cursor-not-allowed',
            ]"
          >
            Berikutnya
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
  schoolName: {
    type: String,
    default: "Jakarta Intercultural School",
  },
  formData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["next", "prev", "updateFormData"]);

const form = ref({
  ratings: {
    fasilitas: null,
    pembelajaran: null,
    layanan: null,
    keamanan: null,
    kegiatan: null,
  },
  experience: {
    liked: "",
    improved: "",
  },
});

const overallRating = ref(0);

onMounted(() => {
  if (props.formData?.step2) {
    form.value = { ...props.formData.step2 };
  }
});

watch(
  () => props.formData?.step2,
  (newData) => {
    if (newData) {
      form.value = { ...newData };
    }
  },
  { deep: true }
);

const isFormValid = computed(() => {
  return (
    form.value.ratings.fasilitas !== null &&
    form.value.ratings.pembelajaran !== null &&
    form.value.ratings.layanan !== null &&
    form.value.ratings.keamanan !== null &&
    form.value.ratings.kegiatan !== null &&
    form.value.experience.liked.trim() !== "" &&
    form.value.experience.improved.trim() !== ""
  );
});

watch(
  () => form.value.ratings,
  (newRatings) => {
    const allRatings = Object.values(newRatings);
    if (allRatings.every((r) => r !== null)) {
      const sum = allRatings.reduce((acc, val) => acc + val, 0);
      overallRating.value = Math.round(sum / allRatings.length);
    } else {
      overallRating.value = 0;
    }
  },
  { deep: true }
);

const handlePrev = () => {
  emit("updateFormData", { step2: form.value });
  emit("prev");
};

const handleNext = () => {
  if (!isFormValid.value) return;
  emit("updateFormData", { step2: form.value });
  emit("next");
};
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
