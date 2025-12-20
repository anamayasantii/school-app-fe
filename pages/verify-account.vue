<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div class="flex justify-center mb-6">
          <svg class="animate-spin h-16 w-16 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Memverifikasi Akun</h2>
        <p class="text-gray-600">Mohon tunggu sebentar...</p>
      </div>

      <!-- Success State -->
      <div v-else-if="verificationStatus === 'success'" class="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div class="flex justify-center mb-6">
          <div class="bg-green-100 rounded-full p-4">
            <svg class="h-16 w-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Verifikasi Berhasil!</h2>
        <p class="text-gray-600 mb-8">Akun Anda telah berhasil diverifikasi. Sekarang Anda dapat masuk ke akun Anda.</p>
        <NuxtLink 
          to="/auth/login"
          class="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Masuk Sekarang
        </NuxtLink>
      </div>

      <!-- Error State -->
      <div v-else-if="verificationStatus === 'error'" class="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div class="flex justify-center mb-6">
          <div class="bg-red-100 rounded-full p-4">
            <svg class="h-16 w-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Verifikasi Gagal</h2>
        <p class="text-gray-600 mb-8">{{ errorMessage }}</p>
        
        <NuxtLink 
          to="/auth/login"
          class="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
        >
          Kembali ke Login
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/lib/axios'

definePageMeta({
  layout: 'authPage'
})

const route = useRoute()
const isLoading = ref(true)
const verificationStatus = ref(null)
const errorMessage = ref('')

const verifyAccount = async () => {
  try {
    const token = route.query.token
    
    if (!token) {
      throw new Error('Token verifikasi tidak ditemukan')
    }
    
    const response = await axios.get(`/verify-account?token=${token}`)
    
    verificationStatus.value = 'success'
  } catch (error) {
    console.error('Verification failed:', error)
    verificationStatus.value = 'error'
    
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else if (error.message) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Link verifikasi tidak valid atau sudah kedaluwarsa.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  verifyAccount()
})
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>