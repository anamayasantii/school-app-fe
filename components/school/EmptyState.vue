<template>
  <div class="text-center py-8 sm:py-12">
    <div class="text-gray-500">
      <svg
        class="mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 mb-3 sm:mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          v-if="icon === 'school'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-2-5v5m6-5v5M7 7h10M7 11h10M7 15h10"
        />
        <path
          v-else-if="icon === 'search'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <p class="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">{{ title }}</p>
      <p class="text-xs sm:text-sm text-gray-500 px-4">{{ description }}</p>
      
      <button
        v-if="showButton"
        @click="$emit('action')"
        class="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-[#28190C] text-white text-sm sm:text-base rounded-lg hover:bg-[#28190C]/90 transition-colors"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Tidak ada data'
  },
  description: {
    type: String,
    default: 'Belum ada data untuk ditampilkan'
  },
  icon: {
    type: String,
    default: 'school',
    validator: (value) => ['school', 'search', 'inbox'].includes(value)
  },
  showButton: {
    type: Boolean,
    default: false
  },
  buttonText: {
    type: String,
    default: 'Kembali'
  }
});

const emit = defineEmits(['action']);
</script>