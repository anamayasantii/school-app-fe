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
import axios from '@/lib/axios'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/store/auth'
import FormStepOne from '@/components/auth/ProfileStep1.vue'
import FormStepTwo from '@/components/auth/ProfileStep2.vue'
import FormStepThree from '@/components/auth/ProfileStep3.vue'

definePageMeta({
  layout: 'authPage'
})

const authStore = useAuthStore()
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
    const token = Cookies.get('token')
    
    console.log('Final submit started')
    console.log('Step1 data:', formData.value.step1)
    console.log('Step2 data:', formData.value.step2)
    
    const submitData = {
      fullname: formData.value.step1.fullname,
      dateOfBirth: formData.value.step1.dateOfBirth,
      nisn: formData.value.step1.nisn,
      schoolDetailId: formData.value.step2.schoolDetailId,
      schoolValidation: formData.value.step2.schoolValidation
    }
    
    if (formData.value.step1.relation) {
      submitData.relation = formData.value.step1.relation
    }
    
    console.log('Data to submit:', submitData)
    
    const response = await axios.put('/profile/complete', submitData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    
    console.log('Setup success:', response.data)
    
    await authStore.fetchUser()
    await nextTick()
    console.log('User data refreshed:', authStore.user)
    console.log('Is logged in:', authStore.isLoggedIn)
    
    await navigateTo('/')
    
  } catch (error) {
    console.error('Setup failed:', error)
    
    if (error.response) {
      console.error('Server error:', error.response.data)
      console.error('Status:', error.response.status)
    }
  } finally {
    loading.value = false
  }
}
</script>