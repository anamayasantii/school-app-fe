<template>
  <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    <div class="hidden md:flex md:flex-1 relative bg-cover bg-center bg-no-repeat" 
         :style="`background-image: url('${backgroundImage}')`">
    </div>

    <div class="flex-1 flex items-center justify-center px-6 sm:px-8 py-8 md:py-12">
      <div class="w-full max-w-md">
        <div class="text-center mb-6 md:mb-8">
          <div class="text-sm text-teal-600 font-medium mb-2">
            LANGKAH {{ currentStep }} DARI 3
          </div>
        </div>

        <div class="text-center mb-6 md:mb-8">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Tinjau Kembali Profil
          </h1>
          <p class="text-sm sm:text-base text-gray-600">
            Cek kembali detail profil kamu.
          </p>
        </div>

        <div class="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm border border-gray-100">
          <div class="flex items-center mb-4 sm:mb-6">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div class="min-w-0">
              <h3 class="text-base sm:text-lg font-semibold text-gray-900 truncate">
                {{ previewData.fullname || 'Nama Lengkap' }}
              </h3>
              <p class="text-xs sm:text-sm text-gray-600 truncate">
                {{ authStore.user?.email || 'email@example.com' }}
              </p>
            </div>
          </div>

          <div class="space-y-3 sm:space-y-4">
            <div v-if="userRole === 'parent'" class="flex justify-between items-center">
              <span class="text-xs sm:text-sm text-gray-500 font-medium">STATUS</span>
              <span class="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-orange-100 text-orange-800">
                <span class="w-2 h-2 bg-orange-400 rounded-full mr-1 sm:mr-2"></span>
                Orang Tua
              </span>
            </div>

            <div v-if="userRole === 'parent'" class="flex justify-between items-center gap-2">
              <span class="text-xs sm:text-sm text-gray-500 font-medium flex-shrink-0">NAMA</span>
              <span class="text-xs sm:text-sm text-gray-900 font-medium text-right truncate">
                {{ previewData.studentName || 'Nama Peserta Didik' }}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-xs sm:text-sm text-gray-500 font-medium">STATUS</span>
              <span class="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
                <span class="w-2 h-2 bg-blue-400 rounded-full mr-1 sm:mr-2"></span>
                Siswa/Mahasiswa
              </span>
            </div>

            <div class="flex justify-between items-center gap-2">
              <span class="text-xs sm:text-sm text-gray-500 font-medium flex-shrink-0">NISN/NIM</span>
              <span class="text-xs sm:text-sm font-medium text-green-600 truncate">
                {{ previewData.nisn || '1234567890' }}
              </span>
            </div>

            <div class="flex justify-between items-start gap-2">
              <span class="text-xs sm:text-sm text-gray-500 font-medium flex-shrink-0">SEKOLAH</span>
              <div class="flex items-start text-right">
                <span class="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                <span class="text-xs sm:text-sm text-gray-900 font-medium break-words">
                  {{ previewData.schoolName }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          <button
            type="button"
            @click="handlePrev"
            class="w-full sm:flex-1 px-6 py-2.5 md:py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Kembali
          </button>
          <button
            type="button"
            @click="handleSubmit"
            :disabled="isSubmitting"
            :class="[
              'w-full sm:flex-1 px-6 py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base',
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
  emit('submit')
}

const fetchSchoolName = async (schoolId) => {
  try {
    const response = await axios.get(`/school-details/${schoolId}`)
    if (response.data.status === 'success') {
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

<style scoped>
.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}

.bg-no-repeat {
  background-repeat: no-repeat;
}

@media (max-width: 640px) {
  button {
    font-size: 16px;
  }
}
</style>