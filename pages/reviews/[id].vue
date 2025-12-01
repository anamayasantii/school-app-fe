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
      @save="saveFormData"
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
import { useAuthStore } from "@/store/auth";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import ReviewStep1 from "@/components/review/ReviewStep1.vue";
import ReviewStep2 from "@/components/review/ReviewStep2.vue";
import ReviewStep3 from "@/components/review/ReviewStep3.vue";
import ReviewSuccess from "@/components/review/Success.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
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

// Dynamic component mapping
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

const saveFormData = (data) => {
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
    const user = authStore.user
    const token = Cookies.get('token')
    
    // Build request body untuk review
    const reviewPayload = {
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
    
    // Submit review dengan header
    await axios.post('/review/submit', reviewPayload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    // Update user profile dengan header
    let profilePayload
    if (user.role === 'parent') {
      profilePayload = {
        relation: user.relation,
        phoneNo: reviewFormData.value.step1?.phoneNo,
        address: user.address,
        image: user.image,
        child: {
          fullname: reviewFormData.value.step1?.fullName,
          nisn: user.child[0].nisn,
          dateOfBirth: user.child[0].birthdate,
          status: reviewFormData.value.step1?.status,
          schoolDetailId: user.child[0].riwayatPendidikan[0].id
        }
      }
    } else {
      profilePayload = {
        fullname: reviewFormData.value.step1?.fullName,
        nisn: user.nisn,
        email: reviewFormData.value.step1?.email,
        dateOfBirth: user.dateOfBirth,
        phoneNo: reviewFormData.value.step1?.phoneNo,
        address: user.address,
        image: reviewFormData.value.step1?.fileUrl || user.image
      }
    }
    
    await axios.put('/user', profilePayload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    // Clear form data & pindah ke success page
    reviewFormData.value = { step1: null, step2: null, step3: null }
    currentStep.value = 4 // Success page
    
  } catch (error) {
    console.error('Submit error:', error)
    alert('Gagal submit review')
  }
};

onMounted(() => {
  fetchSchoolData();
});
</script>
