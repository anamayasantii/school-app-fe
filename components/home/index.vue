<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-[#1D2B29] mb-4">
          Semua dalam satu platform.
        </h2>
        <p class="text-lg text-gray-600">
          Lebih sederhana & mudah.
        </p>
      </div>

      <!-- Education Level Tabs -->
      <SharedEduLevelTab 
        :active-tab="selectedEducationLevel"
        @change-education-level="handleEducationLevelChange"
      />

      <!-- Schools Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SharedSchoolCard 
          v-for="school in filteredSchools.slice(0, 6)" 
          :key="school.id" 
          :school="school" 
        />
      </div>

      <!-- Browse All Button -->
      <div class="text-center">
        <NuxtLink 
          to="/schools"
          class="inline-flex items-center px-6 py-3 bg-[#1D2B29] text-white font-medium rounded-lg hover:bg-[#2a3e3b] transition-colors"
        >
          Browse All
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// Define props
const props = defineProps({
  schools: {
    type: Array,
    default: () => []
  }
});

// Reactive data
const selectedEducationLevel = ref('sd');

// Computed filtered schools
const filteredSchools = computed(() => {
  if (!props.schools || props.schools.length === 0) {
    return [];
  }
  
  // Map education level values to actual field values
  const educationLevelMap = {
    'sd': 'SD',
    'smp': 'SMP', 
    'sma': 'SMA',
    'smk': 'SMK',
    'universitas': 'Universitas'
  };
  
  const targetLevel = educationLevelMap[selectedEducationLevel.value];
  
  return props.schools.filter(school => 
    school.educationLevelName === targetLevel
  );
});

// Handle education level change
const handleEducationLevelChange = (level) => {
  selectedEducationLevel.value = level;
};
</script>