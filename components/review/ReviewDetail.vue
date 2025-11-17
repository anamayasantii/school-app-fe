<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/lib/axios'

const route = useRoute()
const router = useRouter()
const showRatingFilter = ref(false)
const showUserFilter = ref(false)
const loading = ref(true)
const error = ref(null)
const reviews = ref([])
const meta = ref(null)

const schoolRating = computed(() => {
  if (!meta.value) {
    return {
      overall: '0.0',
      showRecommended: false,
      recommendedPercent: 0,
      categories: [
        { score: '0.0', label: 'Kelengkapan Fasilitas' },
        { score: '0.0', label: 'Proses Pembelajaran' },
        { score: '0.0', label: 'Pelayanan Sekolah' },
        { score: '0.0', label: 'Pelayanan Keamanan' },
        { score: '0.0', label: 'Ekstrakulikuler' }
      ]
    }
  }
  
  const finalRating = parseFloat(meta.value.finalRating) || 0
  
  return {
    overall: finalRating.toFixed(1),
    showRecommended: finalRating >= 4.5,
    recommendedPercent: calculateRecommendedPercentage(),
    categories: meta.value.questionStats.map(stat => ({
      score: parseFloat(stat.avg_score).toFixed(1),
      label: stat.questionId === 1 ? 'Kelengkapan Fasilitas' :
             stat.questionId === 2 ? 'Proses Pembelajaran' :
             stat.questionId === 3 ? 'Pelayanan Sekolah' :
             stat.questionId === 4 ? 'Pelayanan Keamanan' : 'Ekstrakulikuler'
    }))
  }
})

const ratingDistribution = computed(() => {
  if (!reviews.value.length) {
    return [5, 4, 3, 2, 1].map(stars => ({ 
      stars, 
      count: 0, 
      percentage: 0 
    }))
  }
  
  return [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.value.filter(r => Math.floor(parseFloat(r.rating)) === stars).length
    return { 
      stars, 
      count, 
      percentage: (count / reviews.value.length) * 100 
    }
  })
})

const calculateRecommendedPercentage = () => {
  if (!reviews.value.length) return 0
  const recommended = reviews.value.filter(r => parseFloat(r.rating) >= 4).length
  return Math.round((recommended / reviews.value.length) * 100)
}

const getInitials = (fullname) => {
  return fullname
    .split(" ")
    .map(part => part.charAt(0).toUpperCase())
    .join("");
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

// const getInitials = (fullname) => {
//   if (!fullname) return '??'
//   return fullname.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
// }

const fetchReviews = async () => {
  try {
    loading.value = true
    const { data } = await axios.get(`/schools/${route.params.id}/reviews`)
    
    if (data.status === 'success') {
      reviews.value = data.data.reviews || []
      meta.value = data.data.meta
    }
  } catch (err) {
    if (err.response?.status === 404) {
      reviews.value = []
      meta.value = null
    } else {
      error.value = 'Gagal memuat data'
      console.error(err)
    }
  } finally {
    loading.value = false
  }
}

const goToWriteReview = () => {
  router.push(`/reviews/${route.params.id}`)
}

const handleLikeReview = async (reviewId) => {
  try {
    const { data } = await axios.post(`/reviews/${reviewId}/like`)
    if (data.status === 'success') {
      const review = reviews.value.find(r => r.id === reviewId)
      if (review) {
        review.liked = (review.liked || 0) + 1
      }
    }
  } catch (err) {
    console.error('Gagal like review:', err)
  }
}

onMounted(fetchReviews)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <p class="mt-2 text-gray-600">Memuat data...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
      {{ error }}
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Rating Overview -->
      <div class="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div class="flex items-center gap-3 mb-6">
          <svg class="w-8 h-8 text-yellow-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span class="text-5xl font-bold text-gray-900">{{ schoolRating.overall }}</span>
          <div v-if="schoolRating.showRecommended" class="flex items-center gap-2 ml-4">
            <svg class="w-5 h-5 text-green-600 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span class="text-sm text-gray-600">Direkomendasikan Oleh {{ schoolRating.recommendedPercent }}% Peninjau</span>
          </div>
        </div>

        <div class="grid grid-cols-6 gap-6">
          <!-- Rating Distribution -->
          <div class="space-y-2.5">
            <div v-for="item in ratingDistribution" :key="item.stars" class="flex items-center gap-2">
              <span class="text-xs font-medium text-gray-700 w-2">{{ item.stars }}</span>
              <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-gray-900 rounded-full transition-all" :style="{ width: item.percentage + '%' }"></div>
              </div>
            </div>
          </div>

          <!-- Categories -->
          <div v-for="cat in schoolRating.categories" :key="cat.label" class="text-center">
            <div class="text-3xl font-semibold text-gray-900 mb-2">{{ cat.score }}</div>
            <div class="text-sm text-gray-600">{{ cat.label }}</div>
          </div>
        </div>

        <button @click="goToWriteReview" class="mt-6 w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          Tulis Ulasan
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar Filter (Non-functional) -->
        <div class="lg:w-64 flex-shrink-0">
          <div class="bg-white rounded-xl p-4 shadow-sm sticky top-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold text-gray-900">Filter</h3>
              <button class="text-sm text-gray-500 hover:text-gray-700">Reset</button>
            </div>

            <!-- Rating Filter -->
            <div class="border-b border-gray-100 pb-4 mb-4">
              <button @click="showRatingFilter = !showRatingFilter" class="flex items-center justify-between w-full py-2 text-left">
                <span class="font-semibold text-gray-900">Rating</span>
                <svg class="w-5 h-5 text-gray-400 transition-transform" :class="{ 'rotate-180': !showRatingFilter }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              
              <div v-show="showRatingFilter" class="mt-3 space-y-3">
                <label v-for="item in ratingDistribution" :key="item.stars" class="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" :value="item.stars" class="w-5 h-5 text-gray-900 border-gray-300 focus:ring-gray-900"/>
                  <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span class="text-sm text-gray-700 group-hover:text-gray-900">{{ item.stars }}</span>
                </label>
              </div>
            </div>

            <!-- User Filter -->
            <div>
              <button @click="showUserFilter = !showUserFilter" class="flex items-center justify-between w-full py-2 text-left">
                <span class="font-semibold text-gray-900">User</span>
                <svg class="w-5 h-5 text-gray-400 transition-transform" :class="{ 'rotate-180': !showUserFilter }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <div v-show="showUserFilter" class="mt-3 space-y-3">
                <label v-for="type in ['student', 'alumni', 'parent']" :key="type" class="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" :value="type" class="w-5 h-5 text-gray-900 border-gray-300 focus:ring-gray-900"/>
                  <span class="text-sm text-gray-700 group-hover:text-gray-900 capitalize">{{ type }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews List -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900">{{ reviews.length }} Ulasan</h2>
          </div>

          <!-- Reviews -->
          <div v-if="reviews.length > 0" class="space-y-4">
            <div v-for="review in reviews" :key="review.id" class="bg-white rounded-xl p-6 shadow-sm">
              <!-- Reviewer Info -->
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                  {{ getInitials(review.fullname) }}
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900">{{ review.fullname }}</h3>
                  <div class="flex flex-wrap items-center gap-2 mt-1">
                    <span v-if="review.userStatus" class="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-xs">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      {{ review.userStatus }}
                    </span>
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {{ review.schoolDetailName }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Rating and Date -->
              <div class="flex items-center gap-4 mb-4">
                <div class="flex items-center gap-1">
                  <span class="font-semibold text-gray-900">{{ parseFloat(review.rating).toFixed(1) }}</span>
                  <div class="flex">
                    <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= Math.floor(parseFloat(review.rating)) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
                <span class="text-sm text-gray-500">{{ formatDate(review.createdAt) }}</span>
              </div>

              <!-- Review Text -->
              <p class="text-gray-700 text-sm mb-4">{{ review.reviewText }}</p>

              <!-- Detailed Ratings -->
              <div class="grid grid-cols-5 gap-4 mb-4">
                <div v-for="detail in review.review_details" :key="detail.id" class="text-center">
                  <div class="text-lg font-semibold text-gray-900">{{ parseFloat(detail.score).toFixed(1) }}</div>
                  <div class="text-xs text-gray-600">{{ detail.question }}</div>
                </div>
              </div>

              <!-- Helpful Button -->
              <div class="flex items-center gap-2">
                <button @click="handleLikeReview(review.id)" class="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                  </svg>
                  <span class="font-medium">Bermanfaat?</span>
                </button>
                <span v-if="review.liked" class="text-sm text-gray-600">{{ review.liked }} orang menganggap ini bermanfaat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>