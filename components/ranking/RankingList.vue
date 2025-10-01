<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="space-y-4">
      <div
        v-for="i in 8"
        :key="i"
        class="bg-white rounded-lg border p-6 animate-pulse"
      >
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
          <div class="flex-1">
            <div class="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div class="w-20 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Schools List dengan border luar + title di dalam -->
    <div v-else-if="schools.length > 0" class="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <!-- Section Title di dalam border -->
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ getCurrentEducationName() }} Terbaik {{ currentYear }}
        </h2>
      </div>
      
      <!-- Garis pembatas title dengan padding -->
      <div class="mx-6 border-b border-gray-200"></div>
      
      <!-- Schools List -->
      <div v-for="(school, index) in schools" :key="school.schoolId">
        <RankingCard
          :school="school"
          :rank="index + 1"
        />
        <!-- Garis pembatas antar item dengan padding -->
        <div 
          v-if="index !== schools.length - 1" 
          class="mx-6 border-b border-gray-200"
        ></div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg
          class="mx-auto h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No schools found</h3>
      <p class="text-gray-600">
        Try adjusting your filters or check back later for more data.
      </p>
    </div>
  </div>
</template>

<script setup>
import RankingCard from './RankingCard.vue'

const currentYear = new Date().getFullYear();

const props = defineProps({
  schools: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  currentEducation: {
    type: String,
    default: 'sd'
  }
})

const getCurrentEducationName = () => {
  const educationNames = {
    'sd': 'Sekolah Dasar',
    'smp': 'Sekolah Menengah Pertama',
    'sma': 'Sekolah Menengah Atas',
    'smk': 'Sekolah Menengah Kejuruan',
    'universitas': 'Universitas'
  }
  return educationNames[props.currentEducation] || 'Schools'
}
</script>