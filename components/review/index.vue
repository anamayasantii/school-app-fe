<template>
  <div>
    <Step1PersonalInfo v-if="currentStep === 1" @next="handleStep1Next" />

    <Step2TinjauSekolah
      v-if="currentStep === 2"
      :schoolName="schoolName"
      @next="handleStep2Next"
      @back="currentStep = 1"
    />

    <Step3LangkahTerakhir
      v-if="currentStep === 3"
      @submit="handleSubmit"
      @back="currentStep = 2"
    />

    <ReviewSuccess
      v-if="currentStep === 4"
      :schoolId="schoolId"
      :schoolName="schoolName"
    />
  </div>
</template>

<script setup>
import Step1PersonalInfo from "./ReviewStep1.vue";
import Step2TinjauSekolah from "./ReviewStep2.vue";
import Step3LangkahTerakhir from "./ReviewStep3.vue";
import ReviewSuccess from "./Success.vue";

const props = defineProps({
  schoolId: {
    type: [String, Number],
    required: true,
  },
  schoolName: {
    type: String,
    default: "Jakarta Intercultural School",
  },
});

const currentStep = ref(1);

const reviewData = ref({
  step1: null,
  step2: null,
  step3: null,
});

const handleStep1Next = (data) => {
  reviewData.value.step1 = data;
  currentStep.value = 2;
};

const handleStep2Next = (data) => {
  reviewData.value.step2 = data;
  currentStep.value = 3;
};

const handleSubmit = async () => {
  try {
    const fullReviewData = {
      schoolId: props.schoolId,
      ...reviewData.value.step1,
      ...reviewData.value.step2,
    };

    console.log("Data yang akan dikirim:", fullReviewData);
    currentStep.value = 4;
  } catch (error) {
    console.error("Error submitting review:", error);
  }
};
</script>

