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

useHead({
  title: "Register - Schoola Advisor",
  meta: [
    {
      name: "description",
      content:
        "Register ke akun School Review Anda untuk mengakses fitur-fitur terbaik kami dan temukan sekolah impian Anda dengan mudah.",
    },
  ],
});

definePageMeta({
  layout: 'authPage'
})

const currentStep = ref(1)
const formValue = ref({})

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

const FormComponents = {
  1: RoleSelection,
  2: RegisterForm
}
</script>