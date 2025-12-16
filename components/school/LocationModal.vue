<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="$emit('skip')"
    >
      <div class="bg-white rounded-2xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl w-full p-6 sm:p-8">
        <div class="text-center mb-6 sm:mb-8">
          <div
            class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 bg-blue-100 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-[#28190C] mb-3 sm:mb-4">
            Pilih lokasi Anda
          </h2>
          <p class="text-xs sm:text-sm md:text-base text-[#76685A] px-2">
            Untuk meningkatkan pengalaman Anda saat menggunakan platform,
            silakan aktifkan lokasi Anda di Pengaturan di atas.
          </p>
        </div>

        <div class="mb-4 sm:mb-6">
          <div
            class="relative flex items-center border border-[#28190C]/[0.12] rounded-lg p-2 sm:p-3"
          >
            <label class="text-xs sm:text-sm text-[#76685A] mr-2 whitespace-nowrap"
              >Provinsi:</label
            >
            <select
              v-model="selectedProvince"
              class="appearance-none block w-full px-2 sm:px-4 py-1.5 sm:py-2 bg-transparent text-[#28190C] focus:outline-none text-xs sm:text-sm font-medium"
            >
              <option value="">Pilih Provinsi</option>
              <option
                v-for="province in provinceList"
                :key="province.id"
                :value="province.name"
              >
                {{ province.name }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none"
            >
              <svg
                class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
        </div>

        <div class="grid grid-cols-2 gap-3 sm:gap-4">
          <button
            @click="$emit('skip')"
            class="px-4 sm:px-6 py-2 sm:py-3 border border-[#28190C]/[0.12] rounded-lg sm:rounded-xl text-[#28190C] text-sm sm:text-base font-medium hover:bg-gray-50 transition-colors"
          >
            Nanti
          </button>
          <button
            @click="handleConfirm"
            class="px-4 sm:px-6 py-2 sm:py-3 bg-[#28190C] text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:bg-[#28190C]/90 transition-colors"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  provinceList: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['skip', 'confirm']);

const selectedProvince = ref('');

const handleConfirm = () => {
  if (selectedProvince.value) {
    emit('confirm', selectedProvince.value);
  }
};

watch(() => props.show, (newVal) => {
  if (!newVal) {
    selectedProvince.value = '';
  }
});
</script>