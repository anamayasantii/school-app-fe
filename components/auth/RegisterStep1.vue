<template>
  <div class="min-h-screen flex">
    <!-- Left Section - Image Background -->
    <div class="flex-1 relative bg-cover bg-center bg-no-repeat" 
         :style="`background-image: url('${backgroundImage}')`">
    </div>

    <!-- Right Section - Form -->
    <div class="flex-1 bg-white flex flex-col justify-center px-8 py-12">
      <div class="max-w-sm mx-auto w-full">
        
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Pilih Peran Anda
          </h1>
          <p class="text-gray-600">
            Pilih peran yang sesuai.
          </p>
        </div>

        <!-- Role Selection Cards -->
        <div class="space-y-4 mb-8">
          
          <!-- Student Card -->
          <button @click="continueToNextStep('student')" 
                  class="w-full text-left p-4 border-2 rounded-xl transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 group"
                  :class="selectedRole === 'student' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Murid</h3>
                <p class="text-sm text-gray-600">
                  Saya disini untuk mencari Sekolah.
                </p>
              </div>
              <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" 
                   :class="selectedRole === 'student' ? 'text-blue-500' : ''"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </button>

          <!-- Parent Card -->
          <button @click="continueToNextStep('parent')"
                  class="w-full text-left p-4 border-2 rounded-xl transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 group"
                  :class="selectedRole === 'parent' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Orang Tua</h3>
                <p class="text-sm text-gray-600">
                  Saya disini untuk mencari informasi Sekolah.
                </p>
              </div>
              <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                   :class="selectedRole === 'parent' ? 'text-blue-500' : ''"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </button>

        </div>

        <!-- Login Link -->
        <div class="text-center mt-8">
          <p class="text-sm text-gray-600">
            Sudah memiliki akun? 
            <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Masuk
            </NuxtLink>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import backgroundImg from '~/assets/images/pre-register.jpg'

const props = defineProps({
  currentStep: {
    type: Number,
    default: 1
  },
  formData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['next', 'save-data'])
const selectedRole = ref(props.formData?.role || '')
const backgroundImage = backgroundImg

const continueToNextStep = (role) => {
  selectedRole.value = role
  
  emit('save-data', { role })
  
  emit('next')
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

button:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}
</style>