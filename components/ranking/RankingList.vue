<template>
  <div>
    <div v-if="isLoading" class="space-y-3 sm:space-y-4">
      <div
        v-for="i in 8"
        :key="i"
        class="bg-white rounded-lg border p-4 sm:p-6 animate-pulse"
      >
        <div class="flex items-center gap-3 sm:gap-6">
          <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
          <div class="flex-1 min-w-0">
            <div class="h-3 sm:h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div class="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div class="w-16 sm:w-20 h-5 sm:h-6 bg-gray-200 rounded flex-shrink-0"></div>
        </div>
      </div>
    </div>

    <div v-else-if="schools.length > 0" class="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <div class="p-4 sm:p-6">
        <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
          {{ getCurrentEducationName() }} Terbaik {{ currentYear }}
        </h2>
      </div>
      
      <div class="mx-4 sm:mx-6 border-b border-gray-200"></div>
      
      <div v-for="(school, index) in schools" :key="school.schoolId">
        <RankingCard
          :school="school"
          :rank="index + 1"
        />
        <div 
          v-if="index !== schools.length - 1" 
          class="mx-4 sm:mx-6 border-b border-gray-200"
        ></div>
      </div>
    </div>

    <div v-else class="text-center py-8 sm:py-12">
      <div class="text-gray-400 mb-4">
        <svg
          class="mx-auto h-12 w-12 sm:h-16 sm:w-16"
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
      <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No schools found</h3>
      <p class="text-sm sm:text-base text-gray-600 px-4">
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