<template>
  <div class="mb-8">
    <!-- Series Badge -->
    <div
      class="flex flex-col items-center justify-center text-center py-6 space-y-4"
    >
      <div class="mb-4">
        <span
          class="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full"
        >
          Seri {{ currentYear }}
        </span>
      </div>

      <!-- Main Title -->
      <div class="mb-6">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Sekolah Terbaik Di <br class="hidden sm:block" />Indonesia
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl">
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
