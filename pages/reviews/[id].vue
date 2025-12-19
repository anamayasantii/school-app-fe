<template>
  <div>
    <component
      :is="currentStepComponent"
      v-if="school"
      :currentStep="currentStep"
      :formData="reviewFormData"
      :schoolName="school.name"
      :schoolId="id"
      @next="handleNext"
      @prev="handlePrev"
      @updateFormData="updateFormData"
      @submit="handleSubmit"
    />
    <div
      v-else-if="loading"
      class="min-h-screen flex items-center justify-center"
    >
      <p>Loading...</p>
    </div>
    <div
      v-else-if="error"
      class="min-h-screen flex items-center justify-center"
    >
      <p class="text-red-600">Error loading school data</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import ReviewStep1 from "@/components/review/ReviewStep1.vue";
import ReviewStep2 from "@/components/review/ReviewStep2.vue";
import ReviewStep3 from "@/components/review/ReviewStep3.vue";
import ReviewSuccess from "@/components/review/Success.vue";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const school = ref(null);
const loading = ref(true);
const error = ref(false);
const currentStep = ref(1);

const reviewFormData = ref({
  step1: null,
  step2: null,
  step3: null,
});

const stepComponents = {
  1: ReviewStep1,
  2: ReviewStep2,
  3: ReviewStep3,
  4: ReviewSuccess,
};

const currentStepComponent = computed(() => stepComponents[currentStep.value]);

const fetchSchoolData = async () => {
  try {
    const response = await axios.get(`/school-details/${id}`);
    school.value = response.data.data || {};
    loading.value = false;
  } catch (err) {
    console.error("Error fetching school data:", err);
    error.value = true;
    loading.value = false;
  }
};

const updateFormData = (data) => {
  reviewFormData.value = {
    ...reviewFormData.value,
    ...data,
  };
};

const handleNext = () => {
  currentStep.value++;
};

const handlePrev = () => {
  if (currentStep.value === 1) return;
  currentStep.value--;
};

const handleSubmit = async () => {
  try {
    const token = Cookies.get('token')
    
    const reviewPayload = {
      fullname: reviewFormData.value.step1?.fullName || '',
      email: reviewFormData.value.step1?.email || '',
      phoneNo: reviewFormData.value.step1?.phoneNo || '',
      userStatus: reviewFormData.value.step1?.userStatus || '',
      schoolValidationFile: reviewFormData.value.step1?.fileUrl || null,
      schoolDetailId: parseInt(id),
      reviewText: reviewFormData.value.step2?.experience.liked || '',
      liked: reviewFormData.value.step2?.experience.liked || '',
      improved: reviewFormData.value.step2?.experience.improved || '',
      details: [
        { questionId: 1, score: reviewFormData.value.step2?.ratings.fasilitas },
        { questionId: 2, score: reviewFormData.value.step2?.ratings.pembelajaran },
        { questionId: 3, score: reviewFormData.value.step2?.ratings.layanan },
        { questionId: 4, score: reviewFormData.value.step2?.ratings.keamanan },
        { questionId: 5, score: reviewFormData.value.step2?.ratings.kegiatan }
      ]
    }

    console.log('reviewFormData.value.step1:', reviewFormData.value.step1)
    console.log('status yang dikirim:', reviewPayload.status)
    console.log('Full payload:', reviewPayload)
    
    console.log('=== DEBUG SUBMIT ===')
    console.log('reviewFormData.value:', reviewFormData.value)
    console.log('step1 fileUrl:', reviewFormData.value.step1?.fileUrl)
    console.log('Payload yang dikirim:', reviewPayload)
    console.log('===================')
    
    const response = await axios.post('/review/submit', reviewPayload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    console.log('Response dari backend:', response.data)
    
    reviewFormData.value = { step1: null, step2: null, step3: null }
    currentStep.value = 4
    
  } catch (error) {
    console.error('Submit error:', error)
    console.error('Error response:', error.response?.data)
    alert('Gagal submit review')
  }
}

onMounted(() => {
  fetchSchoolData();
});
</script>