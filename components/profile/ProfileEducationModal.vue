<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="$emit('close')"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 class="text-xl font-semibold text-gray-900">
              {{ mode === 'add' ? 'Menambahkan Pengalaman Pendidikan' : 'Edit Pengalaman Pendidikan' }}
            </h3>
            <p class="text-sm text-gray-500 mt-1">Tambahkan informasi mengenai riwayat pendidikan Anda</p>
          </div>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="p-6">
          <!-- Tingkat Pendidikan -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tingkat Pendidikan
            </label>
            <div class="relative">
              <select
                v-model="formData.educationLevelId"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 appearance-none bg-white"
                required
                :disabled="loadingLevels"
              >
                <option value="" disabled>{{ loadingLevels ? 'Memuat...' : 'Pilih Tingkat Pendidikan' }}</option>
                <option v-for="level in educationLevels" :key="level.id" :value="level.id">
                  {{ getEducationLevelLabel(level.name) }}
                </option>
              </select>
              <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>

          <!-- Nama Sekolah -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Sekolah
            </label>
            <div class="relative">
              <input
                v-model="schoolSearchQuery"
                @input="handleSchoolSearch"
                @focus="showSchoolDropdown = true"
                type="text"
                placeholder="Cari nama sekolah..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
                autocomplete="off"
              />
              
              <!-- Dropdown Results -->
              <div 
                v-if="showSchoolDropdown && (schoolResults.length > 0 || loadingSchools)"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
              >
                <div v-if="loadingSchools" class="px-4 py-3 text-sm text-gray-500">
                  Mencari sekolah...
                </div>
                <div 
                  v-else-if="schoolResults.length === 0 && schoolSearchQuery"
                  class="px-4 py-3 text-sm text-gray-500"
                >
                  Tidak ada hasil
                </div>
                <button
                  v-for="school in schoolResults"
                  :key="school.id"
                  type="button"
                  @click="selectSchool(school)"
                  class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div class="font-medium text-gray-900">{{ school.name }}</div>
                  <div class="text-sm text-gray-500">
                    {{ school.subDistrictName }}, {{ school.districtName }}, {{ school.provinceName }}
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Hubungan dengan Sekolah (Status) -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Hubungan dengan Sekolah
            </label>
            <div class="relative">
              <select
                v-model="formData.status"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 appearance-none bg-white"
                required
              >
                <option value="" disabled>Pilih Status</option>
                <option value="aktif">Siswa Aktif</option>
                <option value="alumni">Alumni</option>
              </select>
              <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>

          <!-- Row: Tanggal Mulai & Tanggal Akhir -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Mulai
              </label>
              <input
                v-model="formData.startDate"
                type="date"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Akhir (Diharapkan)
              </label>
              <input
                v-model="formData.endDate"
                type="date"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
              />
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-between">
            <!-- Left side - Delete button (only in edit mode) -->
            <div>
              <button
                v-if="mode === 'edit'"
                type="button"
                @click="showDeleteModal = true"
                class="px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Hapus Pendidikan
              </button>
            </div>
            
            <!-- Right side - Cancel and Submit buttons -->
            <div class="flex space-x-3">
              <button
                type="button"
                @click="$emit('close')"
                class="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ isSubmitting ? 'Menyimpan...' : (mode === 'add' ? 'Tambah Pengalaman Pendidikan' : 'Simpan Perubahan') }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <Modal
    :isOpen="showDeleteModal"
    type="warning"
    title="Hapus Riwayat Pendidikan?"
    message="Apakah Anda yakin ingin menghapus riwayat pendidikan ini? Tindakan ini tidak dapat dibatalkan."
    confirmText="Ya, Hapus"
    cancelText="Batal"
    :showCancel="true"
    @confirm="handleDeleteConfirm"
    @cancel="showDeleteModal = false"
    @close="showDeleteModal = false"
  />
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import axios from '@/lib/axios'
import Modal from '@/components/common/Modal.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'add',
    validator: (value) => ['add', 'edit'].includes(value)
  },
  educationData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'submit', 'delete'])

const isSubmitting = ref(false)
const showDeleteModal = ref(false)
const formData = ref({
  educationLevelId: '',
  schoolDetailId: '',
  status: '',
  startDate: '',
  endDate: ''
})

const educationLevels = ref([])
const loadingLevels = ref(false)

const schoolSearchQuery = ref('')
const schoolResults = ref([])
const loadingSchools = ref(false)
const showSchoolDropdown = ref(false)
const selectedSchool = ref(null)
let searchTimeout = null

const fetchEducationLevels = async () => {
  loadingLevels.value = true
  try {
    const response = await axios.get('/education-levels')
    educationLevels.value = response.data.data.filter(level => level.name !== 'SPK SMA')
  } catch (error) {
    console.error('Error fetching education levels:', error)
  } finally {
    loadingLevels.value = false
  }
}

const getEducationLevelLabel = (name) => {
  const mapping = {
    'SD': 'Sekolah Dasar',
    'SMP': 'Sekolah Menengah Pertama',
    'SMA': 'Sekolah Menengah Atas',
    'SMK': 'Sekolah Menengah Kejuruan',
    'Universitas': 'Universitas'
  }
  return mapping[name] || name
}

const handleSchoolSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  
  searchTimeout = setTimeout(async () => {
    if (schoolSearchQuery.value.length < 2) {
      schoolResults.value = []
      return
    }
    
    loadingSchools.value = true
    try {
      const response = await axios.get('/school-details', {
        params: {
          search: schoolSearchQuery.value
        }
      })
      schoolResults.value = response.data.data.datas
    } catch (error) {
      console.error('Error searching schools:', error)
      schoolResults.value = []
    } finally {
      loadingSchools.value = false
    }
  }, 300)
}

const selectSchool = (school) => {
  selectedSchool.value = school
  formData.value.schoolDetailId = school.id
  schoolSearchQuery.value = school.name
  showSchoolDropdown.value = false
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showSchoolDropdown.value = false
  }
}

onMounted(() => {
  fetchEducationLevels()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (searchTimeout) clearTimeout(searchTimeout)
})

watch(() => props.educationData, (newData) => {
  if (newData && Object.keys(newData).length > 0) {
    formData.value = {
      educationLevelId: newData.educationLevelId || '',
      schoolDetailId: newData.schoolDetailId || '',
      status: newData.rawStatus || '',
      startDate: newData.startDate || '',
      endDate: newData.endDate || ''
    }
    if (newData.schoolName) {
      schoolSearchQuery.value = newData.schoolName
      selectedSchool.value = { id: newData.schoolDetailId, name: newData.schoolName }
    }
  }
}, { immediate: true, deep: true })

watch(() => props.isOpen, (isOpen) => {
  if (isOpen && props.mode === 'add') {
    formData.value = {
      educationLevelId: '',
      schoolDetailId: '',
      status: '',
      startDate: '',
      endDate: ''
    }
    schoolSearchQuery.value = ''
    selectedSchool.value = null
    schoolResults.value = []
  }
})

const handleSubmit = async () => {
  if (!formData.value.educationLevelId || !formData.value.schoolDetailId || 
      !formData.value.status || !formData.value.startDate || !formData.value.endDate) {
    alert('Semua field harus diisi')
    return
  }

  if (new Date(formData.value.endDate) < new Date(formData.value.startDate)) {
    alert('Tanggal akhir harus lebih besar dari tanggal mulai')
    return
  }

  isSubmitting.value = true
  try {
    emit('submit', {
      mode: props.mode,
      data: formData.value
    })
  } finally {
    isSubmitting.value = false
  }
}

const handleDeleteConfirm = () => {
  emit('delete', props.educationData)
  showDeleteModal.value = false
}
</script>