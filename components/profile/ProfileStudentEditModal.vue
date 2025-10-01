<!-- components/profile/ProfileStudentEditModal.vue -->
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
            <h3 class="text-xl font-semibold text-gray-900">Edit Profil Siswa</h3>
            <p class="text-sm text-gray-500 mt-1">Ubah profil siswa sesuai dengan data yang asli</p>
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
          <!-- Row 1: Nama Lengkap & Tanggal Lahir -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                v-model="formData.fullname"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Lahir
              </label>
              <div class="relative">
                <input
                  v-model="formData.birthDate"
                  type="date"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Row 2: NISN -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              NISN
            </label>
            <input
              v-model="formData.nisn"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500 bg-gray-50"
              readonly
              disabled
            />
          </div>

          <!-- Row 3: Email & No. Telp -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500 bg-gray-50"
                readonly
                disabled
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                No. Telp
              </label>
              <input
                v-model="formData.phone"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Masukkan nomor telepon"
              />
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-3">
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
              {{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  studentData: {
    type: Object,
    default: () => ({})
  }
})

// Emits
const emit = defineEmits(['close', 'submit'])

// State
const isSubmitting = ref(false)
const formData = ref({
  fullname: '',
  nisn: '',
  birthDate: '',
  email: '',
  phone: ''
})

// Watch for studentData changes to populate form
watch(() => props.studentData, (newData) => {
  if (newData) {
    formData.value = {
      fullname: newData.fullname || '',
      nisn: newData.nisn || '',
      birthDate: newData.birthDate || '',
      email: newData.email || '',
      phone: newData.phone || ''
    }
  }
}, { immediate: true, deep: true })

// Methods
const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    emit('submit', formData.value)
  } finally {
    isSubmitting.value = false
  }
}
</script>