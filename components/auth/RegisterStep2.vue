<template>
  <div class="min-h-screen flex">
    <!-- Left Section - Image Background -->
    <div class="flex-1 relative bg-cover bg-center bg-no-repeat" 
         :style="`background-image: url('${backgroundImage}')`">
    </div>

    <!-- Right Section - Registration Form -->
    <div class="flex-1 bg-white flex flex-col justify-center px-12 py-12">
      <div class="max-w-md mx-auto w-full">
        
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-3">
            Buat Akun
          </h1>
          <p class="text-gray-600">
            Daftar untuk menemukan lingkungan belajar ideal Anda.
          </p>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          
          <!-- Full Name Field -->
          <div>
            <label for="fullname" class="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <input
              id="fullname"
              v-model="form.fullname"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Nama Lengkap"
            />
          </div>

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
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Alamat Email"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Kata Sandi
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                placeholder="Kata Sandi"
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
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-4">
            <!-- Back Button -->
            <button
              type="button"
              @click="$emit('prev')"
              class="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Kembali
            </button>
            
            <!-- Register Button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="flex-1 py-3 px-4 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
            >
              <span v-if="!isLoading">Buat Akun</span>
              <div v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </div>
            </button>
          </div>

        </form>

        <!-- Login Link -->
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-600">
            Sudah memiliki akun? 
            <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500 transition-colors underline">
              Masuk
            </NuxtLink>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from '@/lib/axios'
import backgroundImg from '~/assets/images/register.jpg'

const props = defineProps({
  currentStep: {
    type: Number,
    default: 2
  },
  formData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['prev', 'save-data'])
const backgroundImage = backgroundImg
const showPassword = ref(false)
const isLoading = ref(false)

const form = reactive({
  fullname: props.formData?.fullname || '',
  email: props.formData?.email || '',
  password: props.formData?.password || ''
})

const handleSubmit = async () => {
  try {
    isLoading.value = true
    
    const registrationData = {
      ...props.formData,
      fullname: form.fullname,
      email: form.email,
      password: form.password
    }
    
    emit('save-data', registrationData)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const response = await axios.post('/register', registrationData)
    
    await navigateTo('/auth/login')
    
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    isLoading.value = false
  }
}
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

input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

button:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

input, button {
  transition: all 0.2s ease-in-out;
}
</style>