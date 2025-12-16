<template>
  <div class="mb-6 sm:mb-8">
    <div
      class="flex flex-col items-center justify-center text-center py-4 sm:py-6 space-y-3 sm:space-y-4 px-4"
    >
      <div class="mb-2 sm:mb-4">
        <span
          class="inline-block px-2.5 sm:px-3 py-1 bg-gray-100 text-gray-600 text-xs sm:text-sm font-medium rounded-full"
        >
          Seri {{ currentYear }}
        </span>
      </div>

      <div class="mb-4 sm:mb-6">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
          Sekolah Terbaik Di <br class="hidden sm:block" />Indonesia
        </h1>
        <p class="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl px-4">
          Sekolah terbaik diranking berdasarkan data Kementerian Pendidikan dan
          ulasan siswa dari 5.000 sekolah teratas di Indonesia.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>