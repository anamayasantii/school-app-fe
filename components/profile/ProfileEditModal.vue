<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="$emit('close')"></div>
    
    <div class="flex min-h-full items-center justify-center p-2 sm:p-4">
      <div class="relative bg-white rounded-lg shadow-xl w-full max-w-[320px] sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-gray-200">
          <div>
            <h3 class="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Edit Profil</h3>
            <p class="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Ubah profil sesuai dengan data yang asli</p>
          </div>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="p-4 sm:p-5 md:p-6">
          <div :class="isParent ? 'mb-4 sm:mb-5 md:mb-6' : 'grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6'">
            <div>
              <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Nama Lengkap
              </label>
              <input
                v-model="formData.fullname"
                type="text"
                class="w-full px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
              />
            </div>
            <div v-if="!isParent">
              <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Tanggal Lahir
              </label>
              <div class="relative">
                <input
                  v-model="formData.birthDate"
                  type="date"
                  class="w-full px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
            </div>
          </div>

          <div v-if="!isParent" class="mb-4 sm:mb-5 md:mb-6">
            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              NISN/NIM
            </label>
            <input
              v-model="formData.nisn"
              type="text"
              class="w-full px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
            <div>
              <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Email
              </label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500 bg-gray-50"
                readonly
                disabled
              />
            </div>
            <div>
              <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                No. Telp
              </label>
              <input
                v-model="formData.phone"
                type="tel"
                class="w-full px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="-"
              />
            </div>
          </div>

          <div class="mb-6 sm:mb-7 md:mb-8">
            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              Alamat
            </label>
            <textarea
              v-model="formData.address"
              rows="3"
              class="w-full px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
              placeholder="-"
            ></textarea>
          </div>

          <div v-if="error" class="mb-4 sm:mb-5 md:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-xs sm:text-sm text-red-600">{{ error }}</p>
          </div>

          <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
            <button
              type="button"
              @click="$emit('close')"
              class="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

const emit = defineEmits(['close', 'submit', 'success', 'error'])

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

const isParent = computed(() => {
  if (props.userData?.roles && Array.isArray(props.userData.roles)) {
    return props.userData.roles.includes('parent')
  }
  return false
})

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

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    error.value = ''
  }
})

const handleSubmit = async () => {
  isSubmitting.value = true
  error.value = ''
  
  try {
    const token = Cookies.get('token')
    
    if (!token) {
      error.value = 'Sesi Anda telah berakhir, silakan login kembali'
      emit('error', error.value)
      isSubmitting.value = false
      return
    }
    
    const updateData = {
      fullname: formData.value.fullname || null,
      email: formData.value.email || null,
      phoneNo: formData.value.phone || null,
      address: formData.value.address || null,
      image: null
    }

    if (!isParent.value) {
      updateData.nisn = formData.value.nisn || null
      updateData.dateOfBirth = formData.value.birthDate || null
    }

    console.log('Submitting profile update:', updateData)
    console.log('Using token:', token ? 'Token exists' : 'No token')
    console.log('User role:', props.userData?.role)

    const response = await axios.put('/user', updateData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    if (response.data.status === 'success') {
      emit('submit', formData.value)
      
      console.log('Profile updated successfully:', response.data)
    }
    
  } catch (err) {
    console.error('Error updating profile:', err)
    console.error('Error response:', err.response)
    
    if (err.response) {
      if (err.response.status === 401) {
        error.value = 'Sesi Anda telah berakhir, silakan login kembali'
      } else {
        error.value = err.response.data?.message || 'Terjadi kesalahan saat menyimpan data'
      }
      emit('error', error.value)
    } else if (err.request) {
      error.value = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
      emit('error', error.value)
    } else {
      error.value = 'Terjadi kesalahan yang tidak diketahui'
      emit('error', error.value)
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>