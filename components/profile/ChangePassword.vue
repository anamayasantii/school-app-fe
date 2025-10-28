<!-- components/profile/ChangePassword.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100">
      <h2 class="text-xl font-semibold text-gray-900">Ubah Kata Sandi</h2>
    </div>

    <!-- Content -->
    <div class="p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Current Password -->
        <div>
          <label for="currentPassword" class="block text-sm font-medium text-gray-900 mb-3">
            Kata Sandi Saat Ini
          </label>
          <div class="relative">
            <input
              id="currentPassword"
              v-model="form.currentPassword"
              :type="showCurrentPassword ? 'text' : 'password'"
              class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              :class="{ 'border-red-300': errors.currentPassword }"
              placeholder="Kata Sandi Saat Ini"
            />
            <button
              type="button"
              @click="showCurrentPassword = !showCurrentPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg v-if="showCurrentPassword" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
              </svg>
              <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
          </div>
          <div v-if="errors.currentPassword" class="mt-2 text-sm text-red-600">
            {{ errors.currentPassword }}
          </div>
        </div>

        <!-- New Password -->
        <div>
          <label for="newPassword" class="block text-sm font-medium text-gray-900 mb-3">
            Kata Sandi Baru
          </label>
          <div class="relative">
            <input
              id="newPassword"
              v-model="form.newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              :class="{ 'border-red-300': errors.newPassword }"
              placeholder="Kata Sandi Baru"
            />
            <button
              type="button"
              @click="showNewPassword = !showNewPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg v-if="showNewPassword" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
              </svg>
              <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
          </div>
          <div v-if="errors.newPassword" class="mt-2 text-sm text-red-600">
            {{ errors.newPassword }}
          </div>
          <!-- Password strength indicator -->
          <div v-if="form.newPassword" class="mt-2">
            <div class="flex space-x-1 mb-1">
              <div 
                v-for="i in 4" 
                :key="i"
                class="h-1 flex-1 rounded"
                :class="getPasswordStrengthColor(i)"
              ></div>
            </div>
            <p class="text-xs" :class="getPasswordStrengthTextColor()">
              {{ getPasswordStrengthText() }}
            </p>
          </div>
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-900 mb-3">
            Konfirmasi Kata Sandi
          </label>
          <div class="relative">
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              :class="{ 'border-red-300': errors.confirmPassword }"
              placeholder="Masukkan Ulang Kata Sandi Baru"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg v-if="showConfirmPassword" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
              </svg>
              <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
          </div>
          <div v-if="errors.confirmPassword" class="mt-2 text-sm text-red-600">
            {{ errors.confirmPassword }}
          </div>
          <!-- Password match indicator -->
          <div v-if="form.confirmPassword" class="mt-2 flex items-center">
            <svg v-if="form.newPassword === form.confirmPassword" class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <svg v-else class="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <p class="text-xs" :class="form.newPassword === form.confirmPassword ? 'text-green-600' : 'text-red-600'">
              {{ form.newPassword === form.confirmPassword ? 'Kata sandi cocok' : 'Kata sandi tidak cocok' }}
            </p>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end pt-4">
          <button
            type="submit"
            :disabled="isSubmitting || !isFormValid"
            :class="[
              'px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center',
              isFormValid && !isSubmitting
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Menyimpan...' : 'Perbarui Kata Sandi' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from '@/lib/axios'
import Cookies from 'js-cookie'

// Form data
const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Form state
const isSubmitting = ref(false)
const errors = ref({})

// Password visibility
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Computed
const isFormValid = computed(() => {
  return form.value.currentPassword && 
         form.value.newPassword && 
         form.value.confirmPassword &&
         form.value.newPassword === form.value.confirmPassword &&
         form.value.newPassword.length >= 8 &&
         getPasswordStrength() >= 2 // Minimal medium strength
})

// Password strength calculator
const getPasswordStrength = () => {
  const password = form.value.newPassword
  let strength = 0
  
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  
  return Math.min(strength, 4)
}

const getPasswordStrengthColor = (index) => {
  const strength = getPasswordStrength()
  if (index <= strength) {
    switch (strength) {
      case 1: return 'bg-red-500'
      case 2: return 'bg-yellow-500'
      case 3: return 'bg-blue-500'
      case 4: return 'bg-green-500'
      default: return 'bg-gray-200'
    }
  }
  return 'bg-gray-200'
}

const getPasswordStrengthText = () => {
  const strength = getPasswordStrength()
  switch (strength) {
    case 1: return 'Lemah'
    case 2: return 'Sedang'
    case 3: return 'Kuat'
    case 4: return 'Sangat Kuat'
    default: return 'Terlalu Pendek'
  }
}

const getPasswordStrengthTextColor = () => {
  const strength = getPasswordStrength()
  switch (strength) {
    case 1: return 'text-red-600'
    case 2: return 'text-yellow-600'
    case 3: return 'text-blue-600'
    case 4: return 'text-green-600'
    default: return 'text-gray-500'
  }
}

// Methods
const validateForm = () => {
  errors.value = {}

  // Validate current password
  if (!form.value.currentPassword) {
    errors.value.currentPassword = 'Kata sandi saat ini wajib diisi'
  }

  // Validate new password
  if (!form.value.newPassword) {
    errors.value.newPassword = 'Kata sandi baru wajib diisi'
  } else if (form.value.newPassword.length < 8) {
    errors.value.newPassword = 'Kata sandi minimal 8 karakter'
  } else if (getPasswordStrength() < 2) {
    errors.value.newPassword = 'Kata sandi terlalu lemah. Gunakan kombinasi huruf, angka, dan simbol'
  }

  // Validate confirm password
  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = 'Konfirmasi kata sandi wajib diisi'
  } else if (form.value.newPassword !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Konfirmasi kata sandi tidak cocok'
  }

  // Check if new password is different from current
  if (form.value.currentPassword === form.value.newPassword) {
    errors.value.newPassword = 'Kata sandi baru harus berbeda dari kata sandi saat ini'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  errors.value = {}

  try {
    // Get token from cookies
    const token = Cookies.get('token')
    
    if (!token) {
      alert('Sesi Anda telah berakhir, silakan login kembali')
      isSubmitting.value = false
      return
    }

    console.log('Submitting password change...')

    // API call to change password
    const response = await axios.put('/user', {
      current_password: form.value.currentPassword,
      new_password: form.value.newPassword,
      new_password_confirmation: form.value.confirmPassword
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log('Password change response:', response.data)

    // Check if response is successful
    if (response.data.status === 'success') {
      // Show success message
      alert('Kata sandi berhasil diperbarui!')
      
      // Reset form
      form.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }

      // Emit success event
      emit('passwordChanged', response.data)

    } else {
      throw new Error(response.data.message || 'Gagal memperbarui kata sandi')
    }

  } catch (error) {
    console.error('Error changing password:', error)
    console.error('Error response:', error.response)
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error
      const errorMessage = error.response.data?.message || 'Gagal memperbarui kata sandi'
      const statusCode = error.response.status
      
      if (statusCode === 400) {
        // Validation errors from server
        if (error.response.data?.errors) {
          // If server returns field-specific errors
          const serverErrors = error.response.data.errors
          
          // Map server error fields to our form fields
          if (serverErrors.current_password) {
            errors.value.currentPassword = Array.isArray(serverErrors.current_password) 
              ? serverErrors.current_password[0] 
              : serverErrors.current_password
          }
          if (serverErrors.new_password) {
            errors.value.newPassword = Array.isArray(serverErrors.new_password) 
              ? serverErrors.new_password[0] 
              : serverErrors.new_password
          }
          if (serverErrors.new_password_confirmation) {
            errors.value.confirmPassword = Array.isArray(serverErrors.new_password_confirmation) 
              ? serverErrors.new_password_confirmation[0] 
              : serverErrors.new_password_confirmation
          }
        } else {
          // Generic validation error
          alert(errorMessage)
        }
      } else if (statusCode === 401) {
        // Unauthorized - wrong current password or session expired
        if (errorMessage.toLowerCase().includes('current password') || 
            errorMessage.toLowerCase().includes('kata sandi saat ini')) {
          errors.value.currentPassword = 'Kata sandi saat ini salah'
        } else {
          alert('Sesi Anda telah berakhir, silakan login kembali')
        }
      } else if (statusCode === 403) {
        // Forbidden
        alert('Anda tidak memiliki akses untuk mengubah kata sandi')
      } else if (statusCode === 422) {
        // Unprocessable Entity - validation error
        alert(errorMessage)
      } else {
        // Other server errors
        alert(errorMessage)
      }
    } else if (error.request) {
      // Network error
      alert('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.')
    } else {
      // Other errors
      alert(error.message || 'Terjadi kesalahan yang tidak diketahui')
    }
  } finally {
    isSubmitting.value = false
  }
}

// Emits
const emit = defineEmits(['passwordChanged'])
</script>