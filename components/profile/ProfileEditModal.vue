<!-- components/profile/ProfileEditModal.vue -->
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
            <h3 class="text-xl font-semibold text-gray-900">Edit Profil</h3>
            <p class="text-sm text-gray-500 mt-1">Ubah profil sesuai dengan data yang asli</p>
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
          <!-- Row 1: Nama Lengkap & Tanggal Lahir (Tanggal Lahir hidden for parent) -->
          <div :class="isParent ? 'mb-6' : 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'">
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
            <div v-if="!isParent">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Lahir
              </label>
              <div class="relative">
                <input
                  v-model="formData.birthDate"
                  type="date"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
            </div>
          </div>

          <!-- Row 2: NISN (hidden for parent) -->
          <div v-if="!isParent" class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              NISN/NIM
            </label>
            <input
              v-model="formData.nisn"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Row 3: Email & No. Telp -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
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
                placeholder="-"
              />
            </div>
          </div>

          <!-- Row 4: Alamat -->
          <div class="mb-8">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Alamat
            </label>
            <textarea
              v-model="formData.address"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
              placeholder="-"
            ></textarea>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600">{{ error }}</p>
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
import { ref, watch, computed } from 'vue'
import axios from '@/lib/axios'
import Cookies from 'js-cookie'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  userData: {
    type: Object,
    default: () => ({})
  }
})

// Emits
const emit = defineEmits(['close', 'submit', 'success', 'error'])

// State
const isSubmitting = ref(false)
const error = ref('')
const formData = ref({
  fullname: '',
  nisn: '',
  email: '',
  birthDate: '',
  phone: '',
  address: ''
})

// Computed property to check if user is parent
const isParent = computed(() => {
  // Primary: Check roles array from API
  if (props.userData?.roles && Array.isArray(props.userData.roles)) {
    return props.userData.roles.includes('parent')
  }
  return false
})

// Watch for userData changes to populate form
watch(() => props.userData, (newData) => {
  if (newData) {
    formData.value = {
      fullname: newData.fullname || '',
      nisn: newData.nisn || '',
      email: newData.email || '',
      birthDate: newData.birthDate || '',
      phone: newData.phone || '',
      address: newData.address || ''
    }
  }
}, { immediate: true, deep: true })

// Clear error when modal opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    error.value = ''
  }
})

// Methods
const handleSubmit = async () => {
  isSubmitting.value = true
  error.value = ''
  
  try {
    // Get token from cookies
    const token = Cookies.get('token')
    
    if (!token) {
      error.value = 'Sesi Anda telah berakhir, silakan login kembali'
      emit('error', error.value)
      isSubmitting.value = false
      return
    }
    
    // Prepare data to send
    const updateData = {
      fullname: formData.value.fullname || null,
      email: formData.value.email || null,
      phoneNo: formData.value.phone || null,
      address: formData.value.address || null,
      image: null // Will be implemented later
    }

    // Only include NISN and birthDate if user is not parent
    if (!isParent.value) {
      updateData.nisn = formData.value.nisn || null
      updateData.dateOfBirth = formData.value.birthDate || null
    }

    console.log('Submitting profile update:', updateData)
    console.log('Using token:', token ? 'Token exists' : 'No token')
    console.log('User role:', props.userData?.role)

    // Make API call to update user profile with token
    const response = await axios.put('/user', updateData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    if (response.data.status === 'success') {
      // Emit submit event to parent (ProfileSettings)
      // Parent will handle refresh and close modal
      emit('submit', formData.value)
      
      console.log('Profile updated successfully:', response.data)
    }
    
  } catch (err) {
    console.error('Error updating profile:', err)
    console.error('Error response:', err.response)
    
    // Handle different error scenarios
    if (err.response) {
      // Server responded with error status
      if (err.response.status === 401) {
        error.value = 'Sesi Anda telah berakhir, silakan login kembali'
      } else {
        error.value = err.response.data?.message || 'Terjadi kesalahan saat menyimpan data'
      }
      emit('error', error.value)
    } else if (err.request) {
      // Request made but no response received
      error.value = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
      emit('error', error.value)
    } else {
      // Something else happened
      error.value = 'Terjadi kesalahan yang tidak diketahui'
      emit('error', error.value)
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>