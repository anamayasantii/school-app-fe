<!-- pages/profile/setup/index.vue -->
<template>
    <component 
      :is="FormComponents[currentStep]" 
      :current-step="currentStep"
      :form-data="formData"
      @next="handleNextStep"
      @prev="handlePrevStep" 
      @save="saveFormData"
      @submit="handleFinalSubmit"
    />
</template>

<script setup>
import { ref } from 'vue'
import api from '@/lib/axios'
import FormStepOne from '@/components/auth/ProfileStep1.vue'
import FormStepTwo from '@/components/auth/ProfileStep2.vue'
import FormStepThree from '@/components/auth/ProfileStep3.vue'

// SEO
useSeoMeta({
  title: 'Setup Profile',
  description: 'Lengkapi informasi profil Anda'
})

definePageMeta({
  layout: 'authPage'
})

// State
const currentStep = ref(1)
const loading = ref(false)
const formData = ref({
  step1: {},
  step2: {},
  step3: {}
})

// Form Components Map
const FormComponents = {
  1: FormStepOne,
  2: FormStepTwo,
  3: FormStepThree
}

// Pakai axios instance yang udah ada dari lib/axios

// Methods
const handleNextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const handlePrevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const saveFormData = (stepData, step = null) => {
  const targetStep = step || currentStep.value
  formData.value[`step${targetStep}`] = {
    ...formData.value[`step${targetStep}`],
    ...stepData
  }
  console.log('Form data updated:', formData.value)
}

const handleFinalSubmit = async () => {
  loading.value = true
  
  try {
    console.log('Final submit:', formData.value)
    console.log('Step1 data:', formData.value.step1)
    console.log('Step2 data:', formData.value.step2) 
    console.log('Step3 data:', formData.value.step3)
    
    // Debug: Cek token sebelum request
    const token = useCookie('token').value
    console.log('Auth token:', token ? 'Token exists' : 'No token found')
    
    // Flatten semua step data jadi satu object
    const flatData = {
      ...formData.value.step1,
      ...formData.value.step2,
      ...formData.value.step3
    }
    
    console.log('Flat data to send:', flatData)
    
    // Buat FormData untuk handle file upload
    const formDataToSend = new FormData()
    
    // Tambahkan semua field kecuali file
    Object.keys(flatData).forEach(key => {
      if (key !== 'schoolValidation' && flatData[key] !== null && flatData[key] !== undefined) {
        formDataToSend.append(key, flatData[key])
      }
    })
    
    // Tambahkan file secara terpisah
    if (flatData.schoolValidation && flatData.schoolValidation instanceof File) {
      formDataToSend.append('schoolValidation', flatData.schoolValidation)
    }
    
    // Submit all form data to API dengan manual auth header
    const response = await api.put('/profile/complete', formDataToSend, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    
    console.log('Setup success:', response.data)
    
    // Redirect to home after successful setup
    await navigateTo('/')
    
  } catch (error) {
    console.error('Setup failed:', error)
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      console.error('Server error:', error.response.data)
      console.error('Status:', error.response.status)
    } else if (error.request) {
      // Request was made but no response
      console.error('Network error:', error.request)
    } else {
      // Something else happened
      console.error('Error:', error.message)
    }
    
    // Show error notification (bisa pakai toast, alert, dll)
    // showErrorNotification('Gagal menyimpan profil. Silakan coba lagi.')
    
  } finally {
    loading.value = false
  }
}

// Interceptors udah dihandle di lib/axios
// Jadi gak perlu setup lagi di sini
</script>