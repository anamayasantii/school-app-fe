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

definePageMeta({
  layout: 'authPage'
})

const currentStep = ref(1)
const loading = ref(false)
const formData = ref({
  step1: {},
  step2: {},
  step3: {}
})

const FormComponents = {
  1: FormStepOne,
  2: FormStepTwo,
  3: FormStepThree
}

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
    
    const token = useCookie('token').value
    console.log('Auth token:', token ? 'Token exists' : 'No token found')
    
    const flatData = {
      ...formData.value.step1,
      ...formData.value.step2,
      ...formData.value.step3
    }
    
    console.log('Flat data to send:', flatData)
    
    const formDataToSend = new FormData()
    
    Object.keys(flatData).forEach(key => {
      if (key !== 'schoolValidation' && flatData[key] !== null && flatData[key] !== undefined) {
        formDataToSend.append(key, flatData[key])
      }
    })
    
    if (flatData.schoolValidation && flatData.schoolValidation instanceof File) {
      formDataToSend.append('schoolValidation', flatData.schoolValidation)
    }
    
    const response = await api.put('/profile/complete', formDataToSend, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    
    console.log('Setup success:', response.data)
    
    await navigateTo('/')
    
  } catch (error) {
    console.error('Setup failed:', error)
    
    if (error.response) {
      console.error('Server error:', error.response.data)
      console.error('Status:', error.response.status)
    } else if (error.request) {
      console.error('Network error:', error.request)
    } else {
      console.error('Error:', error.message)
    }

  } finally {
    loading.value = false
  }
}
</script>