<!-- components/profile/FormStepThree.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left Side - Background -->
    <div class="flex-1 relative bg-cover bg-center bg-no-repeat" 
         :style="`background-image: url('${backgroundImage}')`">
    </div>

    <!-- Right Side - Preview -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <!-- Progress Indicator -->
        <div class="text-center mb-8">
          <div class="text-sm text-teal-600 font-medium mb-2">LANGKAH {{ currentStep }} DARI 3</div>
          <div class="flex justify-center space-x-2 mb-6">
          </div>
        </div>

        <!-- Form Title -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">
            Tinjau Kembali Profil
          </h1>
          <p class="text-gray-600">
            Cek kembali detail profil kamu.
          </p>
        </div>

        <!-- Profile Preview -->
        <div class="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-100">
          <!-- Profile Header -->
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
              <!-- Avatar placeholder -->
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ previewData.fullname || 'Nama Lengkap' }}</h3>
              <p class="text-sm text-gray-600">{{ authStore.user?.email || 'email@example.com' }}</p>
            </div>
          </div>

          <!-- Profile Details -->
          <div class="space-y-4">
            <!-- Role Status -->
            <div v-if="userRole === 'parent'" class="flex justify-between items-center">
              <span class="text-sm text-gray-500 font-medium">STATUS</span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                <span class="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                Orang Tua
              </span>
            </div>

            <!-- Student Name (for parent role) -->
            <div v-if="userRole === 'parent'" class="flex justify-between items-center">
              <span class="text-sm text-gray-500 font-medium">NAMA</span>
              <span class="text-sm text-gray-900 font-medium">{{ previewData.studentName || 'Nama Peserta Didik' }}</span>
            </div>

            <!-- Student Status -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 font-medium">STATUS</span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Siswa Aktif
              </span>
            </div>

            <!-- NISN -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 font-medium">NISN/NIM</span>
              <span class="text-sm font-medium text-green-600">{{ previewData.nisn || '1234567890' }}</span>
            </div>

            <!-- School -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 font-medium">SEKOLAH</span>
              <div class="flex items-center">
                <span class="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                <span class="text-sm text-gray-900 font-medium">{{ previewData.schoolName }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4">
          <button
            type="button"
            @click="handlePrev"
            class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Kembali
          </button>
          <button
            type="button"
            @click="handleSubmit"
            :disabled="isSubmitting"
            :class="[
              'flex-1 px-6 py-3 rounded-lg font-medium transition-colors',
              isSubmitting 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-gray-900 text-white hover:bg-gray-800'
            ]"
          >
            {{ isSubmitting ? 'Menyimpan...' : 'Berikutnya' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import backgroundImage from '~/assets/images/conclusion.jpg'
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '@/store/auth'
import axios from '@/lib/axios'

const props = defineProps({
  currentStep: Number,
  formData: Object
})

const emit = defineEmits(['prev', 'submit'])
const authStore = useAuthStore()
const isSubmitting = ref(false)
const currentStep = props.currentStep || 3
const schoolName = ref('')

const userRole = computed(() => {
  const roles = authStore.user?.role
  
  if (Array.isArray(roles)) {
    return roles.includes('parent') ? 'parent' : 'student'
  }
  
  return roles || 'student'
})

const previewData = computed(() => {
  const step1 = props.formData?.step1 || {}
  const step2 = props.formData?.step2 || {}
  
  return {
    fullname: userRole.value === 'student' 
      ? (authStore.user?.fullname || step1.fullname)
      : authStore.user?.fullname,
    studentName: userRole.value === 'parent' ? step1.fullname : null,
    nisn: step1.nisn,
    schoolDetailId: step2.schoolDetailId,
    schoolName: schoolName.value || 'Loading...',
    dateOfBirth: step1.dateOfBirth,
    relation: step1.relation,
  }
})

const handlePrev = () => {
  emit('prev')
}

const handleSubmit = () => {
  // Emit ke parent untuk handle submit
  emit('submit')
}

const fetchSchoolName = async (schoolId) => {
  try {
    const response = await axios.get(`/school-details/${schoolId}`)
    if (response.data.status === 'success') {
      // PERBAIKAN: pakai 'name' bukan 'schoolName'
      schoolName.value = response.data.data.name
    }
  } catch (error) {
    console.error('Error fetching school:', error)
    schoolName.value = 'Sekolah tidak ditemukan'
  }
}

watch(() => props.formData?.step2?.schoolDetailId, (newId) => {
  if (newId) {
    fetchSchoolName(newId)
  }
}, { immediate: true })
</script>