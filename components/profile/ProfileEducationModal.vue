<!-- components/profile/ProfileEducationModal.vue -->
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
                v-model="formData.level"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 appearance-none bg-white"
                required
              >
                <option value="" disabled>Contoh: Sekolah Menengah</option>
                <option value="Taman Kanak-kanak">Taman Kanak-kanak</option>
                <option value="Sekolah Dasar">Sekolah Dasar</option>
                <option value="Sekolah Menengah Pertama">Sekolah Menengah Pertama</option>
                <option value="Sekolah Menengah Akhir">Sekolah Menengah Akhir</option>
                <option value="Diploma I">Diploma I</option>
                <option value="Diploma II">Diploma II</option>
                <option value="Diploma III">Diploma III</option>
                <option value="Diploma IV">Diploma IV</option>
                <option value="Sarjana (S1)">Sarjana (S1)</option>
                <option value="Magister (S2)">Magister (S2)</option>
                <option value="Doktor (S3)">Doktor (S3)</option>
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
            <input
              v-model="formData.schoolName"
              type="text"
              placeholder="Contoh: Jakarta Intercultural School"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              required
            />
          </div>

          <!-- Hubungan dengan Sekolah -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Hubungan dengan Sekolah
            </label>
            <div class="relative">
              <select
                v-model="formData.relationship"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 appearance-none bg-white"
                required
              >
                <option value="" disabled>Contoh: Siswa</option>
                <option value="Siswa">Siswa</option>
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Alumni">Alumni</option>
                <option value="Guru">Guru</option>
                <option value="Dosen">Dosen</option>
                <option value="Staff">Staff</option>
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
                :disabled="formData.isCurrentlyStudying"
                :class="{ 'bg-gray-50 text-gray-500': formData.isCurrentlyStudying }"
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
                @click="handleDelete"
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
</template>

<script setup>
import { ref, watch } from 'vue'

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
const formData = ref({
  level: '',
  schoolName: '',
  relationship: '',
  startDate: '',
  endDate: '',
  isCurrentlyStudying: false
})

watch(() => props.educationData, (newData) => {
  if (newData && Object.keys(newData).length > 0) {
    formData.value = {
      level: newData.level || '',
      schoolName: newData.schoolName || '',
      relationship: newData.relationship || '',
      startDate: newData.startDate || '',
      endDate: newData.endDate || '',
      isCurrentlyStudying: newData.isCurrentlyStudying || false
    }
  }
}, { immediate: true, deep: true })

watch(() => props.isOpen, (isOpen) => {
  if (isOpen && props.mode === 'add') {
    formData.value = {
      level: '',
      schoolName: '',
      relationship: '',
      startDate: '',
      endDate: '',
      isCurrentlyStudying: false
    }
  }
})

const handleSubmit = async () => {
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

const handleDelete = () => {
  if (confirm('Apakah Anda yakin ingin menghapus riwayat pendidikan ini?')) {
    emit('delete', props.educationData)
  }
}
</script>