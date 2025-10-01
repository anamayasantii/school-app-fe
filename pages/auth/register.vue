<template>
  <div>
    <component 
      :is="FormComponents[currentStep]" 
      :current-step="currentStep"
      :form-data="formValue"
      @next="handleNextStep"
      @prev="handlePrevStep" 
      @save-data="saveDataForm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RoleSelection from '~/components/auth/RegisterStep1.vue'
import RegisterForm from '~/components/auth/RegisterStep2.vue'

// Page meta
definePageMeta({
  layout: 'authPage'
})

// SEO
useSeoMeta({
  title: 'Daftar Akun - Schools Advisor',
  description: 'Buat akun baru untuk mengakses platform Schools Advisor'
})

// State management
const currentStep = ref(1)
const formValue = ref({})

// Step handlers
const handleNextStep = () => {
  currentStep.value += 1
}

const handlePrevStep = () => {
  if (currentStep.value === 1) return
  currentStep.value -= 1
}

const saveDataForm = (data) => {
  formValue.value = {
    ...formValue.value,
    ...data
  }
}

// Dynamic component mapping
const FormComponents = {
  1: RoleSelection,    // Step 1: Pilih role
  2: RegisterForm      // Step 2: Form registrasi
}
</script>