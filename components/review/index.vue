<template>
  <div>
    <!-- Step 1: Detail Anda -->
    <Step1PersonalInfo 
      v-if="currentStep === 1"
      @next="handleStep1Next"
    />

    <!-- Step 2: Tinjau Sekolah -->
    <Step2TinjauSekolah 
      v-if="currentStep === 2"
      :schoolName="schoolName"
      @next="handleStep2Next"
      @back="currentStep = 1"
    />

    <!-- Step 3: Langkah Terakhir -->
    <Step3LangkahTerakhir 
      v-if="currentStep === 3"
      @submit="handleSubmit"
      @back="currentStep = 2"
    />

    <!-- Success Screen -->
    <ReviewSuccess 
      v-if="currentStep === 4"
      :schoolId="schoolId"
      :schoolName="schoolName"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  schoolId: {
    type: [String, Number],
    required: true
  },
  schoolName: {
    type: String,
    default: 'Jakarta Intercultural School'
  }
})

// Current step state
const currentStep = ref(1)

// Data dari semua step
const reviewData = ref({
  step1: null,
  step2: null,
  step3: null
})

// Handle Step 1 Next
const handleStep1Next = (data) => {
  reviewData.value.step1 = data
  currentStep.value = 2
}

// Handle Step 2 Next
const handleStep2Next = (data) => {
  reviewData.value.step2 = data
  currentStep.value = 3
}

// Handle Final Submit
const handleSubmit = async () => {
  try {
    // Gabungkan semua data
    const fullReviewData = {
      schoolId: props.schoolId,
      ...reviewData.value.step1,
      ...reviewData.value.step2
    }

    console.log('Data yang akan dikirim:', fullReviewData)

    // Kirim ke API
    // const response = await $fetch('/api/reviews/create', {
    //   method: 'POST',
    //   body: fullReviewData
    // })

    // Jika berhasil, pindah ke success screen
    currentStep.value = 4

    // Optional: Reset form setelah beberapa detik
    // setTimeout(() => {
    //   navigateTo(`/school-details/${props.schoolId}`)
    // }, 3000)

  } catch (error) {
    console.error('Error submitting review:', error)
    // Handle error (bisa tambahkan toast notification)
  }
}
</script>

<style scoped>
/* Custom styling jika diperlukan */
</style>