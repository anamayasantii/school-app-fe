<template>
  <div class="min-h-screen flex">
    <!-- Left Section - Image Background -->
    <div class="flex-1 relative bg-cover bg-center bg-no-repeat" 
         :style="`background-image: url('${backgroundImage}')`">
      
      <!-- Logo -->
      <div class="absolute top-8 left-8">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="text-white">
            <div class="text-lg font-bold">Schools</div>
            <div class="text-sm font-medium">Advisor</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Section - Login Form -->
    <div class="flex-1 bg-white flex flex-col justify-center px-12 py-12">
      <div class="max-w-md mx-auto w-full">
        
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-3">
            Masuk
          </h1>
          <p class="text-gray-600">
            Masuk dengan informasi kredensial Anda
          </p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Alamat Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              :class="[
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
                emailError ? 'border-red-300 error-input' : 'border-gray-300'
              ]"
              placeholder="Email"
              @blur="validateEmail"
            />
            <p v-if="emailError" class="mt-1 text-sm text-red-600">{{ emailError }}</p>
          </div>

          <!-- Password Field -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Kata Sandi
              </label>
              <NuxtLink to="/forgot-password" class="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                Lupa Kata Sandi
              </NuxtLink>
            </div>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12',
                  passwordError ? 'border-red-300 error-input' : 'border-gray-300'
                ]"
                placeholder="Password"
                @blur="validatePassword"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                </svg>
              </button>
            </div>
            <p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            <span v-if="!isLoading">Masuk</span>
            <div v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </div>
          </button>

        </form>

        <!-- Register Link -->
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-600">
            Belum memiliki akun? 
            <NuxtLink to="/auth/register" class="font-medium text-blue-600 hover:text-blue-500 transition-colors underline">
              Registrasi
            </NuxtLink>
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex">
            <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <div class="ml-3">
              <p class="text-sm text-red-800">{{ errorMessage }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import axios from '@/lib/axios'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/store/auth'

// Import image from assets
import backgroundImg from '~/assets/images/register1.jpg'

// Page meta
definePageMeta({
  layout: 'authPage'
})

// SEO
useSeoMeta({
  title: 'Login - Schools Advisor',
  description: 'Masuk ke akun Schools Advisor Anda'
})

// Reactive data
const backgroundImage = backgroundImg
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const emailError = ref('')
const passwordError = ref('')

// Form reactive object
const form = reactive({
  email: '',
  password: ''
})

// Computed
const isFormValid = computed(() => {
  return form.email && form.password && !emailError.value && !passwordError.value
})

// Validation methods
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    emailError.value = 'Email wajib diisi'
  } else if (!emailRegex.test(form.email)) {
    emailError.value = 'Format email tidak valid'
  } else {
    emailError.value = ''
  }
}

const validatePassword = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/
  
  if (!form.password) {
    passwordError.value = 'Password wajib diisi'
  } else if (form.password.length < 8) {
    passwordError.value = 'Password minimal 8 karakter'
  } else if (!passwordRegex.test(form.password)) {
    passwordError.value = 'Password harus mengandung huruf besar, huruf kecil, angka, dan simbol'
  } else {
    passwordError.value = ''
  }
}

// Submit handler
const handleSubmit = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    
    // Validate form
    validateEmail()
    validatePassword()
    
    if (emailError.value || passwordError.value) {
      return
    }
    
    // API call
    const response = await axios.post('/login', {
      email: form.email,
      password: form.password
    })
    
    if (response.data.status === 'success') {
      const { token, expiresAt } = response.data.data
      
      // Simpan token ke cookie
      Cookies.set('token', token, { 
        expires: new Date(expiresAt),
        secure: true, // untuk HTTPS
        sameSite: 'strict'
      })
      
      const authStore = useAuthStore()
      await authStore.fetchUser()
      
      // await navigateTo('/profile/setup')
      await navigateTo('/')
    } else {
      errorMessage.value = response.data.message || 'Login gagal'
    }
    
  } catch (error) {
    console.error('Login failed:', error)
    
    if (error.response?.status === 401) {
      errorMessage.value = 'Email atau password salah'
    } else if (error.response?.status === 422) {
      errorMessage.value = 'Data tidak valid'
    } else {
      errorMessage.value = 'Terjadi kesalahan, silakan coba lagi'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Custom styles */
.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}

.bg-no-repeat {
  background-repeat: no-repeat;
}

/* Focus styles for better accessibility */
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

button:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Smooth transitions for all interactive elements */
input, button, a {
  transition: all 0.2s ease-in-out;
}

/* Error state styles */
.error-input {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}
</style>