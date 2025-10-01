<!-- components/profile/FormStepTwo.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left Side - Background -->
    <div class="flex-1 relative bg-cover bg-center bg-no-repeat" 
         :style="`background-image: url('${backgroundImage}')`">
    </div>

    <!-- Right Side - Form -->
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
            {{ userRole === 'student' ? 'Tambahkan Pendidikan Saat Ini' : 'Pendidikan Peserta Didik Anda' }}
          </h1>
          <p class="text-gray-600">
            {{ userRole === 'student' 
                ? 'Tambahkan informasi tentang sekolah atau pendidikan yang ditempuh saat ini.' 
                : 'Tambahkan informasi tentang sekolah atau pendidikan yang ditempuh peserta didik Anda.' }}
          </p>
        </div>

        <!-- Form Fields -->
        <div class="space-y-6">
          <!-- School Search Autocomplete -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Sekolah
            </label>
            <div class="relative">
              <input
                v-model="schoolSearchQuery"
                @input="handleSchoolSearch"
                @focus="showDropdown = true"
                @blur="handleBlur"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Ketik nama sekolah..."
                autocomplete="off"
              />
              
              <!-- Loading Indicator -->
              <div v-if="isSearching" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg class="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>

            <!-- Dropdown Results -->
            <div 
              v-if="showDropdown && (schoolOptions.length > 0 || (schoolSearchQuery && !isSearching))"
              class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              <!-- Search Results -->
              <div v-if="schoolOptions.length > 0">
                <button
                  v-for="school in schoolOptions"
                  :key="school.id"
                  @mousedown="selectSchool(school)"
                  type="button"
                  class="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 focus:bg-gray-50 focus:outline-none"
                >
                  <div class="font-medium text-gray-900">{{ school.schoolName }}</div>
                  <div class="text-sm text-gray-600">
                    {{ school.educationLevelName }} • {{ school.statusName }} • {{ school.subDistrictName }}, {{ school.districtName }}
                  </div>
                </button>
              </div>

              <!-- No Results -->
              <div v-else-if="schoolSearchQuery && !isSearching" class="px-4 py-3 text-gray-500 text-center">
                Tidak ada sekolah ditemukan
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Unggah Dokumen Bukti Sekolah
            </label>
            
            <!-- File Upload Area -->
            <div 
              @click="triggerFileInput"
              @dragover.prevent
              @drop.prevent="handleDrop"
              class="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-teal-400 hover:bg-gray-50 transition-colors"
            >
              <div class="flex flex-col items-center">
                <!-- Upload Icon -->
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
                
                <!-- Upload Text -->
                <p class="text-gray-600 mb-2">
                  {{ selectedFile ? selectedFile.name : 'Seret dan lepas file di sini atau Pilih file' }}
                </p>
                <p class="text-sm text-gray-500 mb-4">
                  Unggah dokumen untuk membuktikan sebagai verifikasi, dapat berupa foto kartu siswa atau dokumen yang relevan.
                </p>
              </div>
            </div>

            <!-- Hidden File Input -->
            <input
              ref="fileInput"
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              @change="handleFileSelect"
              class="hidden"
            />

            <!-- File Preview -->
            <div v-if="selectedFile" class="mt-4 p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span class="text-sm text-gray-700">{{ selectedFile.name }}</span>
                </div>
                <button
                  @click="removeFile"
                  type="button"
                  class="text-red-500 hover:text-red-700"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4 pt-6">
          <button
            type="button"
            @click="handlePrev"
            class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Kembali
          </button>
          <button
            type="button"
            @click="handleNext"
            :disabled="!isFormValid"
            :class="[
              'flex-1 px-6 py-3 rounded-lg font-medium transition-colors',
              isFormValid 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            ]"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import backgroundImage from '~/assets/images/register1.jpg'
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import axios from '@/lib/axios'

// Props
const props = defineProps({
  currentStep: Number,
  formData: Object
})

// Emits
const emit = defineEmits(['next', 'prev', 'save'])

const authStore = useAuthStore()
const fileInput = ref(null)
const currentStep = props.currentStep || 2

// Form data local
const form = ref({
  schoolDetailId: '',
  schoolValidation: null
})

const selectedFile = ref(null)

// School search states
const schoolSearchQuery = ref('')
const schoolOptions = ref([])
const selectedSchool = ref(null)
const showDropdown = ref(false)
const isSearching = ref(false)
const searchTimeout = ref(null)

// Computed
const userRole = computed(() => {
  return authStore.user?.role || 'student'
})

const isFormValid = computed(() => {
  return form.value.schoolDetailId && selectedFile.value
})

// Methods
const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    form.value.schoolValidation = file || "http://example.com/dummy.jpg"
  }
}

const handleDrop = (event) => {
  const files = event.dataTransfer.files
  if (files.length > 0) {
    selectedFile.value = files[0]
    form.value.schoolValidation = files[0]
  }
}

const removeFile = () => {
  selectedFile.value = null
  form.value.schoolValidation = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// School search methods
const handleSchoolSearch = async () => {
  const query = schoolSearchQuery.value.trim()
  
  // Clear previous timeout
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  
  // Reset if query is empty
  if (!query) {
    schoolOptions.value = []
    showDropdown.value = false
    return
  }
  
  // If user cleared the input, reset selected school
  if (selectedSchool.value && query !== selectedSchool.value.schoolName) {
    selectedSchool.value = null
    form.value.schoolDetailId = ''
  }
  
  // Debounce search
  searchTimeout.value = setTimeout(async () => {
    isSearching.value = true
    showDropdown.value = true
    
    try {
      const response = await axios.get(`/school-details?search=${encodeURIComponent(query)}`)
      
      if (response.data.status === 'success') {
        schoolOptions.value = response.data.data.datas || []
      } else {
        schoolOptions.value = []
      }
    } catch (error) {
      console.error('Error searching schools:', error)
      schoolOptions.value = []
    } finally {
      isSearching.value = false
    }
  }, 300) // 300ms debounce
}

const fetchSchoolById = async (schoolId) => {
  try {
    const response = await axios.get(`/school-details/${schoolId}`)
    if (response.data.status === 'success') {
      const school = response.data.data
      selectedSchool.value = school
      schoolSearchQuery.value = school.schoolName
    }
  } catch (error) {
    console.error('Error fetching school:', error)
  }
}

const selectSchool = (school) => {
  selectedSchool.value = school
  schoolSearchQuery.value = school.schoolName
  form.value.schoolDetailId = school.id
  showDropdown.value = false
  schoolOptions.value = []
}

const handleBlur = () => {
  // Delay hiding dropdown to allow click on options
  setTimeout(() => {
    showDropdown.value = false
  }, 150)
}

const handleNext = () => {
  if (!isFormValid.value) return
  
  // Save data to parent
  emit('save', form.value, 2)
  
  // Go to next step
  emit('next')
}

const handlePrev = () => {
  emit('prev')
}

// Watchers
watch(() => props.formData?.step2, async (newData) => {
  if (newData) {
    form.value.schoolDetailId = newData.schoolDetailId || ''
    
    // Restore file
    if (newData.schoolValidation) {
      selectedFile.value = newData.schoolValidation
      form.value.schoolValidation = newData.schoolValidation
    }
    
    // Restore school selection
    if (newData.schoolDetailId && !selectedSchool.value) {
      await fetchSchoolById(newData.schoolDetailId)
    }
  }
}, { immediate: true })

// Cleanup timeout on unmount
onUnmounted(() => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
})
</script>