<script setup>
import DashboardLayout from '~/layouts/dashboardLayout.vue';
import axios from '@/lib/axios';

definePageMeta({
  layout: 'dashboardLayout',
  middleware: 'admin'
})

const selectedLevel = ref('sd')
const schools = ref([])
const loading = ref(false)
const error = ref(null)

const educationLevels = [
  { value: 'sd', label: 'SD' },
  { value: 'smp', label: 'SMP' },
  { value: 'sma', label: 'SMA' },
  { value: 'smk', label: 'SMK' },
  { value: 'universitas', label: 'Universitas' },
]

const fetchSchools = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get('/ranking/school-details', {
      params: {
        educationLevelName: selectedLevel.value
      }
    })
    schools.value = response.data.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSchools()
})

watch(selectedLevel, () => {
  fetchSchools()
})
</script>

<template>
  <DashboardLayout>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Top 10 Sekolah Terbaik</h1>
      
      <!-- Filter Jenjang -->
      <div class="mb-6">
        <label class="block text-sm font-medium mb-2">Jenjang Pendidikan</label>
        <select 
          v-model="selectedLevel" 
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="level in educationLevels" :key="level.value" :value="level.value">
            {{ level.label }}
          </option>
        </select>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <p>Loading...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-red-500 text-center py-8">
        <p>Error: {{ error }}</p>
      </div>

      <!-- Schools Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(school, index) in schools" 
          :key="school.id"
          class="border rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <!-- Ranking Badge -->
          <div class="flex justify-between items-start mb-3">
            <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              #{{ index + 1 }}
            </span>
            <span 
              class="px-3 py-1 rounded-full text-sm font-semibold"
              :class="{
                'bg-green-100 text-green-800': school.accreditationCode === 'A',
                'bg-yellow-100 text-yellow-800': school.accreditationCode === 'B',
                'bg-orange-100 text-orange-800': school.accreditationCode === 'C',
              }"
            >
              {{ school.accreditationCode }}
            </span>
          </div>

          <!-- School Image -->
          <img 
            v-if="school.galleryImages && school.galleryImages.length > 0"
            :src="school.galleryImages[0]" 
            :alt="school.name"
            class="w-full h-48 object-cover rounded-lg mb-3"
          />

          <!-- School Info -->
          <h3 class="font-bold text-lg mb-2">{{ school.name }}</h3>
          <div class="text-sm text-gray-600 space-y-1">
            <p><span class="font-semibold">NPSN:</span> {{ school.institutionCode }}</p>
            <p><span class="font-semibold">Status:</span> {{ school.statusName }}</p>
            <p><span class="font-semibold">Kepala Sekolah:</span> {{ school.principal }}</p>
            <p><span class="font-semibold">Siswa:</span> {{ school.numStudent }} | <span class="font-semibold">Guru:</span> {{ school.numTeacher }}</p>
            <p><span class="font-semibold">Kurikulum:</span> {{ school.curriculum }}</p>
          </div>

          <!-- Rating -->
          <div class="mt-3 pt-3 border-t flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span class="text-yellow-500">⭐</span>
              <span class="font-semibold">{{ school.rating }}</span>
              <span class="text-gray-500 text-sm">({{ school.reviewers }} reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>