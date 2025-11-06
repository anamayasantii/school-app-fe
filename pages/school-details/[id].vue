<template>
  <div class="container mx-auto py-6 px-16">
    <!-- Content Section -->
    <div v-if="school">
      <!-- Breadcrumb Navigation -->
      <nav class="mb-4" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <a 
              href="/">
              Home
            </a>
          </li>
          <span class="mx-2">›</span>
          <li>
            <a 
              href="/schools">
              Jelajahi Sekolah
            </a>
          </li>
          <span class="mx-2">›</span>
          <li>
            <a 
              :href="getEducationLevelPath()">
              {{ getEducationLevelFullName() }}
            </a>
          </li>
          <span class="mx-2">›</span>
          <li class="text-gray-800 font-medium truncate max-w-xs" aria-current="page">
            {{ school.name }}
          </li>
        </ol>
      </nav>

      <!-- School Header Section -->
      <div class="flex justify-between items-start mb-2">
        <!-- School Name and Rating -->
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-2">{{ school.name }}</h1>
          <div class="flex items-center">
            <span class="mr-2">{{ school.rating }}</span>
            <div class="flex items-center">
              <svg
                v-for="star in 5"
                :key="star"
                class="size-6"
                viewBox="0 0 24 24"
                :fill="star <= (school.rating || 0) ? '#FFB800' : '#28190C'"
                :opacity="star <= (school.rating || 0) ? 1 : 0.12"
              >
                <path
                  d="M12 3.8l2.5 5.1 5.7.8-4.1 4 1 5.7L12 16.9 6.9 19.4l1-5.7-4.1-4 5.7-.8L12 3.8z"
                />
              </svg>
            </div>
            <span class="text-gray-500 ml-2">({{ school.reviewers }} Reviews)</span>
          </div>
        </div>

        <!-- Action Buttons - Now aligned with school name -->
        <div class="flex items-center mt-1">
          <!-- Share Button -->
          <button class="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
            <ShareIcon class="w-10 h-10" />
          </button>
          
          <!-- Save Button -->
          <button
            @click="toggleSave"
            :disabled="isSaving"
            class="transition-all duration-200 p-2 rounded-full hover:bg-gray-100"
            :class="isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
          >
            <SaveIcon 
              :filled="isSaved"
              :color="isSaved ? '#082519' : '#9CA3AF'"
              class="w-10 h-10"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Loading or Error Message -->
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">Error loading data!</div>

    <SchoolImages/>

    <SchoolDetail/>

    <ReviewDetail/>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { ref, onMounted } from "vue";
import ShareIcon from "~/assets/ShareIcon.vue";
import SaveIcon from "~/assets/SaveIcon.vue";
import SchoolImages from "@/components/school/ImagesSlider.vue";
import ReviewDetail from "~/components/review/ReviewDetail.vue";
import SchoolDetail from "~/components/school/SchoolDetail.vue";

const route = useRoute();
const school = ref(null);
const loading = ref(true);
const error = ref(false);
const isSaved = ref(false);
const isSaving = ref(false);
const activeTab = ref('Overview');
const tabs = ['Overview', 'Location', 'Official Contact', 'Facility', 'Education Program', 'Pricing', 'Reviews'];

const educationLevelMap = {
  'SD': { full: 'Sekolah Dasar', path: 'sd' },
  'SMP': { full: 'Sekolah Menengah Pertama', path: 'smp' },
  'SMA': { full: 'Sekolah Menengah Atas', path: 'sma' },
  'SMK': { full: 'Sekolah Menengah Kejuruan', path: 'smk' },
  'Universitas': { full: 'Universitas', path: 'universitas' },
};

const getEducationLevelFullName = () => {
  if (!school.value?.educationLevelName) return '';
  
  const levelKey = school.value.educationLevelName.toUpperCase();
  return educationLevelMap[levelKey]?.full || school.value.educationLevelName;
};

const getEducationLevelPath = () => {
  if (!school.value?.educationLevelName) return '/schools';
  
  const levelKey = school.value.educationLevelName.toUpperCase();
  const path = educationLevelMap[levelKey]?.path || school.value.educationLevelName.toLowerCase();
  
  return `/schools/${path}`;
};

const fetchSchoolData = async () => {
  try {
    const response = await axios.get(`/school-details/${route.params.id}`);
    school.value = response.data.data || {};
    loading.value = false;
    
    await checkIfSaved();
  } catch (err) {
    console.error("Error fetching data:", err);
    error.value = true;
    loading.value = false;
  }
};

const checkIfSaved = async () => {
  try {
    const token = Cookies.get('token');
    
    if (!token) {
      isSaved.value = false;
      return;
    }
    
    const response = await axios.get('/school-details/saved', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data.status === 'success') {
      const savedSchools = response.data.data;
      isSaved.value = savedSchools.some(s => s.id === parseInt(route.params.id));
    }
  } catch (err) {
    console.error("Error checking saved status:", err);
    isSaved.value = false;
  }
};

const toggleSave = async () => {
  const token = Cookies.get('token');
  
  if (!token) {
    alert('Anda harus login terlebih dahulu untuk menyimpan sekolah');
    // TODO: Redirect to login page
    router.push('/login');
    return;
  }
  
  isSaving.value = true;
  
  try {
    const response = await axios.post('/school-details/save', 
      {
        schoolDetailId: parseInt(route.params.id)
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    if (response.data.status === 'success') {
      isSaved.value = !isSaved.value;
      
      const message = isSaved.value 
        ? 'Sekolah berhasil disimpan' 
        : 'Sekolah berhasil dihapus dari daftar simpanan';
      
      // TODO: Replace with toast notification
      alert(message);
    }
  } catch (err) {
    console.error("Error toggling save:", err);
    
    if (err.response?.status === 401) {
      alert('Sesi Anda telah berakhir, silakan login kembali');
      // TODO: Redirect to login
    } else {
      alert(err.response?.data?.message || 'Gagal menyimpan sekolah. Silakan coba lagi.');
    }
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  fetchSchoolData();
});
</script>