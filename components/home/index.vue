<template>
  <section class="py-8 sm:py-12 bg-white">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8 sm:mb-12">
        <h2 class="text-xl sm:text-3xl md:text-4xl font-semibold text-primary-green mb-2 sm:mb-4">
          Semua dalam satu platform.
          <br>
          Lebih sederhana & mudah.
        </h2>
      </div>

      <SharedEduLevelTab 
        :active-tab="selectedEducationLevel"
        @change-education-level="handleEducationLevelChange"
      />

      <div v-if="loading" class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div v-for="i in 6" :key="i" class="animate-pulse">
          <div class="rounded-xl bg-gray-200 h-64"></div>
        </div>
      </div>

      <div v-if="loading" class="flex sm:hidden gap-4 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <div v-for="i in 6" :key="i" class="flex-shrink-0 w-[280px] animate-pulse">
          <div class="rounded-xl bg-gray-200 h-64"></div>
        </div>
      </div>

      <template v-if="!loading && !error">
        <div v-if="schools.length > 0" class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <SharedSchoolCard 
            v-for="school in schools.slice(0, 6)" 
            :key="school.id" 
            :school="school" 
          />
        </div>

        <div v-if="schools.length > 0" class="flex sm:hidden gap-4 overflow-x-auto pb-4 mb-6 scrollbar-hide snap-x snap-mandatory">
          <div v-for="school in schools.slice(0, 6)" :key="school.id" class="flex-shrink-0 w-[280px] snap-start">
            <SharedSchoolCard :school="school" />
          </div>
          
          <NuxtLink 
            :to="`/schools/${selectedEducationLevel}`"
            class="flex-shrink-0 w-[280px] snap-start flex flex-col items-center justify-center border-2 border-dashed border-border-gray rounded-xl bg-white hover:bg-gray-50 transition-colors"
          >
            <div class="flex flex-col items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-primary-green flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <span class="text-primary-green font-medium text-sm">Browse All</span>
            </div>
          </NuxtLink>
        </div>

        <div v-if="schools.length === 0" class="text-center py-8 sm:py-12">
          <svg class="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <p class="text-gray-600 text-sm sm:text-base">Belum ada sekolah untuk jenjang {{ selectedEducationLevel.toUpperCase() }}</p>
        </div>

        <div v-if="schools.length > 0" class="hidden sm:block text-center">
          <NuxtLink 
            :to="`/schools/${selectedEducationLevel}`"
            class="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 border border-border-gray text-primary-green font-medium rounded-lg text-sm sm:text-base"
          >
            Browse All
          </NuxtLink>
        </div>
      </template>

      <div v-if="error" class="text-center py-8 sm:py-12">
        <p class="text-red-600 mb-4 text-sm sm:text-base">{{ error }}</p>
        <button 
          @click="fetchSchools"
          class="px-4 py-2 bg-[#1D2B29] text-white rounded-lg hover:bg-[#2a3e3b] text-sm sm:text-base"
        >
          Coba Lagi
        </button>
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

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>