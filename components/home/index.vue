<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-semibold text-primary-green mb-4">
          Semua dalam satu platform.
          <br>
          Lebih sederhana & mudah.
        </h2>
      </div>

      <!-- Education Level Tabs -->
      <SharedEduLevelTab 
        :active-tab="selectedEducationLevel"
        @change-education-level="handleEducationLevelChange"
      />

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div v-for="i in 6" :key="i" class="animate-pulse">
          <div class="rounded-xl bg-gray-200 h-64"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button 
          @click="fetchSchools"
          class="px-4 py-2 bg-[#1D2B29] text-white rounded-lg hover:bg-[#2a3e3b]"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Schools Grid -->
      <div v-else-if="schools.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SharedSchoolCard 
          v-for="school in schools.slice(0, 6)" 
          :key="school.id" 
          :school="school" 
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
        <p class="text-gray-600">Belum ada sekolah untuk jenjang {{ selectedEducationLevel.toUpperCase() }}</p>
      </div>

      <!-- Browse All Button -->
      <div v-if="schools.length > 0" class="text-center">
        <NuxtLink 
          :to="`/schools/${selectedEducationLevel}`"
          class="inline-flex items-center px-6 py-3 border border-border-gray text-primary-green font-medium rounded-lg"
        >
          Browse All
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from '@/lib/axios';

const selectedEducationLevel = ref('sd');
const schools = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchSchools = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await axios.get("/school-details", {
      params: {
        educationLevelName: selectedEducationLevel.value
      }
    });
    
    schools.value = response.data?.data?.datas || [];
    
  } catch (err) {
    console.error('Error fetching schools:', err);
    error.value = 'Gagal memuat data sekolah. Silakan coba lagi.';
    schools.value = [];
  } finally {
    loading.value = false;
  }
};

const handleEducationLevelChange = (level) => {
  selectedEducationLevel.value = level;
  fetchSchools();
};

onMounted(() => {
  fetchSchools();
});
</script>