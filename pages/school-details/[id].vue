
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">Bali School</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <button class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors">
                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Breadcrumb -->
      <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a href="#" class="text-gray-700 hover:text-blue-600 text-sm">{{ school.educationLevelName || 'Sekolah Dasar' }}</a>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <a href="#" class="ml-1 text-gray-700 hover:text-blue-600 text-sm md:ml-2">{{ school.statusName || 'Negeri' }}</a>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1 text-gray-500 text-sm md:ml-2">{{ school.name || 'SD Negeri 1' }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Content Area -->
        <div class="lg:col-span-2 space-y-6">
          <!-- School Image -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="aspect-w-3 aspect-h-2 bg-gray-200 flex items-center justify-center">
              <img 
                v-if="school.galleryImages && school.galleryImages.length > 0" 
                :src="school.galleryImages[0]" 
                :alt="school.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="text-center text-gray-500">
                <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p class="mt-2 text-sm">Foto Sekolah</p>
              </div>
            </div>
          </div>

          <!-- School Name -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ school.name || 'SD Negeri 1' }}</h1>
            <p class="text-gray-600">
              {{ school.subDistrictName ? `${school.subDistrictName}, ${school.districtName}, ${school.provinceName}` : 'Kuta, Kabupaten Badung, Bali' }}
            </p>
          </div>

          <!-- School Information Table -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Informasi Sekolah</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Rating</td>
                    <td class="py-3 text-sm text-gray-900">
                      <div class="flex items-center">
                        <span class="text-yellow-400">★</span>
                        <span class="ml-1">{{ school.rating || 0 }}/5</span>
                        <span class="ml-2 text-gray-500">({{ school.reviewers || 0 }} reviews)</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">NPSN</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.institutionCode || '50103075' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Status</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.statusName || 'Negeri' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Bentuk Pendidikan</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.educationLevelName || 'SD' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Status Kepemilikan</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.ownershipStatus || 'Pemerintah Daerah' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Tanggal SK Pendirian</td>
                    <td class="py-3 text-sm text-gray-900">{{ formatDate(school.dateEstablishmentDecree) || '2003-03-14' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">SK Izin Operasional</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.operationalLicense || '421.9/4401/Dikpora/2021' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Tanggal SK Izin Operasional</td>
                    <td class="py-3 text-sm text-gray-900">{{ formatDate(school.dateOperationalLicense) || '2021-11-01' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Kepsek</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.principal || 'Ni Ketut Yoni Riskayanti' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Operator</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.operator || 'Ida Ayu Yuliari, S.Ag' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Akreditasi</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.accreditationName || 'B' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Kurikulum</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.curriculum || 'Kurikulum Merdeka' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Telephone Number</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.telpNo || '6288829299222' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Tuition Fee</td>
                    <td class="py-3 text-sm text-gray-900">{{ formatCurrency(school.tuitionFee) || '1000000' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Num of Students</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.numStudent || '300' }}</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Num of Teacher</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.numTeacher || '50' }}</td>
                  </tr>
                  <tr v-if="school.movie">
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Movie</td>
                    <td class="py-3 text-sm text-gray-900">
                      <a :href="school.movie" target="_blank" class="text-blue-600 hover:text-blue-800">[Video]</a>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-6 text-sm font-medium text-gray-500 whitespace-nowrap">Exam Information</td>
                    <td class="py-3 text-sm text-gray-900">{{ school.examInfo || 'Lorem Ipsum has been the industry\'s standard dummy text ever since the' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Rating Section -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Beri Rating Sekolah ini</h2>
            
            <!-- Questionnaire Table -->
            <div class="mb-8">
              <div class="overflow-x-auto">
                <table class="min-w-full border border-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">
                        Penilaian
                      </th>
                      <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Poin
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(criteria, index) in questionnaire" :key="criteria.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">
                        {{ criteria.name }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="flex justify-center space-x-4">
                          <label v-for="score in 5" :key="score" class="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              :name="`criteria-${criteria.id}`"
                              :value="score"
                              v-model="questionnaireAnswers[criteria.id]"
                              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span class="ml-1 text-sm text-gray-700">{{ score }}</span>
                          </label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Star Rating -->
            <div class="mb-6">
              <div class="flex items-center justify-center space-x-1 mb-4">
                <button
                  v-for="star in 5"
                  :key="star"
                  @click="setRating(star)"
                  @mouseenter="hoverRating = star"
                  @mouseleave="hoverRating = 0"
                  class="text-4xl transition-all duration-150 hover:scale-110"
                  :class="star <= (hoverRating || currentRating) ? 'text-yellow-400' : 'text-gray-300'"
                >
                  ★
                </button>
              </div>
              <div v-if="currentRating > 0" class="text-center text-sm text-gray-600">
                {{ currentRating }} dari 5 bintang
              </div>
            </div>

            <!-- Review Textarea -->
            <div class="mb-6">
              <label for="review" class="block text-sm font-medium text-gray-700 mb-2">
                Deskripkan pengalaman anda (opsional)
              </label>
              <textarea
                id="review"
                v-model="reviewText"
                rows="4"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Bagikan pengalaman Anda tentang sekolah ini..."
                maxlength="500"
              ></textarea>
              <div class="mt-1 text-right text-sm text-gray-500">
                {{ reviewText.length }}/500
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end">
              <button
                @click="submitReview"
                :disabled="!isFormValid || submitting"
                class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <svg v-if="submitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ submitting ? 'Mengirim...' : 'Submit' }}
              </button>
            </div>

            <!-- Validation Messages -->
            <div v-if="validationErrors.length > 0" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <ul class="text-sm text-red-600 space-y-1">
                <li v-for="error in validationErrors" :key="error">• {{ error }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="space-y-6">
          <!-- Ranking Section -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Ranking</h3>
            <div class="space-y-4">
              <div
                v-for="(item, index) in topSchools"
                :key="item.id"
                class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div class="flex-shrink-0">
                  <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                    {{ index + 1 }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ item.name }}
                  </p>
                  <div class="flex items-center mt-1">
                    <span class="text-yellow-400 text-sm">★★★★★</span>
                    <span class="ml-1 text-xs text-gray-600">4.5 (100)</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 text-center">
              <a href="#" class="text-sm text-blue-600 hover:text-blue-800">See Others</a>
            </div>
          </div>

          <!-- Related Schools Section -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Sekolah Terkait</h3>
            <div class="space-y-4">
              <div
                v-for="(relatedSchool, index) in relatedSchools"
                :key="relatedSchool.id"
                class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0">
                    <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs font-medium">
                      {{ index + 1 }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 mb-1">
                      {{ relatedSchool.name }}
                    </h4>
                    <div class="flex items-center">
                      <span class="text-yellow-400 text-sm">★★★★★</span>
                      <span class="ml-1 text-xs text-gray-600">4.5 (100)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 text-center">
              <a href="#" class="text-sm text-blue-600 hover:text-blue-800">See Others</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/lib/axios'

const route = useRoute()
const loading = ref(true)
const submitting = ref(false)

// School data from API
const school = ref({})

// Form data
const currentRating = ref(0)
const hoverRating = ref(0)
const reviewText = ref('')
const questionnaireAnswers = ref({})

// Questionnaire criteria
const questionnaire = [
  { id: 1, name: 'Kelengkapan Fasilitas' },
  { id: 2, name: 'Proses Pembelajaran' },
  { id: 3, name: 'Pelayanan Sekolah' },
  { id: 4, name: 'Pelayanan Keamanan' },
  { id: 5, name: 'Ekstrakurikuler' }
]

// Dummy data for sidebar
const topSchools = ref([
  { id: 1, name: 'Universitas Udayana' },
  { id: 2, name: 'Universitas Ganesha' },
  { id: 3, name: 'UNDINAS' },
  { id: 4, name: 'UNDINAS' },
  { id: 5, name: 'UNDINAS' },
  { id: 6, name: 'UNDINAS' },
  { id: 7, name: 'UNDINAS' },
  { id: 8, name: 'UNDINAS' }
])

const relatedSchools = ref([
  { id: 1, name: 'SMA Negeri 1 Denpasar' },
  { id: 2, name: 'SMA Negeri 3 Denpasar' },
  { id: 3, name: 'SMA Negeri 1 Badung' }
])

// Computed properties
const isFormValid = computed(() => {
  const allQuestionsAnswered = questionnaire.every(criteria => 
    questionnaireAnswers.value[criteria.id] !== undefined
  )
  return allQuestionsAnswered && currentRating.value > 0
})

const validationErrors = computed(() => {
  const errors = []
  
  const unansweredCriteria = questionnaire.filter(criteria => 
    questionnaireAnswers.value[criteria.id] === undefined
  )
  
  if (unansweredCriteria.length > 0) {
    errors.push(`Mohon jawab semua kriteria penilaian (${unansweredCriteria.length} kriteria belum dijawab)`)
  }
  
  if (currentRating.value === 0) {
    errors.push('Mohon berikan rating bintang')
  }
  
  return errors
})

// Methods
const setRating = (rating) => {
  currentRating.value = rating
}

const formatDate = (dateString) => {
  if (!dateString) return null
  return new Date(dateString).toLocaleDateString('id-ID')
}

const formatCurrency = (amount) => {
  if (!amount || amount === '0.00') return 'Gratis'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount)
}

const fetchSchoolDetails = async () => {
  try {
    loading.value = true
    const schoolId = route.params.id
    const response = await axios.get(`/school-details/${schoolId}`)
    
    if (response.data.status === 'success') {
      school.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching school details:', error)
  } finally {
    loading.value = false
  }
}

const submitReview = async () => {
  if (!isFormValid.value) {
    return
  }

  try {
    submitting.value = true
    
    // Calculate average score from questionnaire
    const scores = Object.values(questionnaireAnswers.value)
    const averageScore = scores.reduce((sum, score) => sum + parseInt(score), 0) / scores.length

    const reviewData = {
      schoolId: route.params.id,
      overallRating: currentRating.value,
      criteriaRatings: questionnaireAnswers.value,
      averageScore: Math.round(averageScore * 10) / 10,
      review: reviewText.value.trim() || null,
      timestamp: new Date().toISOString()
    }

    console.log('Submitting review:', reviewData)
    
    // Replace with actual API endpoint
    // const response = await axios.post('/api/reviews', reviewData)
    
    // For now, just show success message
    alert('Review berhasil dikirim!')
    
    // Reset form
    currentRating.value = 0
    reviewText.value = ''
    questionnaireAnswers.value = {}
    
  } catch (error) {
    console.error('Error submitting review:', error)
    alert('Gagal mengirim review. Silakan coba lagi.')
  } finally {
    submitting.value = false
  }
}

// Initialize questionnaire answers
const initializeQuestionnaire = () => {
  questionnaire.forEach(criteria => {
    questionnaireAnswers.value[criteria.id] = undefined
  })
}

// Lifecycle
onMounted(() => {
  initializeQuestionnaire()
  fetchSchoolDetails()
})
</script>

<style scoped>
.aspect-w-3 {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 66.666667%;
}

.aspect-h-2 > img,
.aspect-h-2 > div {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

button:hover {
  transform: scale(1.05);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>

