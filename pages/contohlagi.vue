<script setup>
import { ref } from 'vue'

const selectedRating = ref(null)
const sortBy = ref('Terbaru')
const showUserFilter = ref(false)

const schoolRating = {
  overall: 4.9,
  recommended: 89,
  categories: [
    { label: 'Fasilitas', score: 4.8 },
    { label: 'Pembelajaran', score: 4.6 },
    { label: 'Layanan', score: 3.8 },
    { label: 'Keamanan', score: 4.0 },
    { label: 'Aktivitas', score: 4.7 }
  ]
}

const ratingDistribution = [
  { stars: 5, count: 5 },
  { stars: 4, count: 4 },
  { stars: 3, count: 3 },
  { stars: 2, count: 2 },
  { stars: 1, count: 1 }
]

const reviews = ref([
  {
    id: 1,
    name: "Charles Baker",
    verified: true,
    studentType: "Siswa Aktif",
    school: "Sekolah Interkultural Jakarta",
    rating: 4.8,
    date: "22 Agustus 2025",
    text: "Sekolah yang baik dengan fokus pada keterampilan praktis. Saya berharap ada lebih banyak pilihan mata pelajaran pilihan, tetapi kelas inti sangat kuat. Layanan dukungan juga dapat diandalkan. Sekolah yang bai...",
    ratings: {
      fasilitas: 3,
      pembelajaran: 5,
      layanan: 5,
      keamanan: 4,
      aktivitas: 5
    },
    helpful: 25,
    isReviewerPicked: true
  },
  {
    id: 2,
    name: "Charles Baker",
    verified: true,
    studentType: "Siswa Aktif",
    school: "Sekolah Interkultural Jakarta",
    rating: 4.8,
    date: "22 Agustus 2025",
    text: "Sekolah yang baik dengan fokus pada keterampilan praktis. Saya berharap ada lebih banyak pilihan mata pelajaran pilihan, tetapi kelas inti sangat kuat. Layanan dukungan juga dapat diandalkan. Sekolah yang bai...",
    ratings: {
      fasilitas: 3,
      pembelajaran: 5,
      layanan: 5,
      keamanan: 4,
      aktivitas: 5
    },
    helpful: 25,
    isReviewerPicked: false
  },
  {
    id: 3,
    name: "Charles Baker",
    verified: true,
    studentType: "Siswa Aktif",
    school: "Sekolah Interkultural Jakarta",
    rating: 4.8,
    date: "22 Agustus 2025",
    text: "Sekolah yang baik dengan fokus pada keterampilan praktis. Saya berharap ada lebih banyak pilihan mata pelajaran pilihan, tetapi kelas inti sangat kuat. Layanan dukungan juga dapat diandalkan. Sekolah yang bai...",
    ratings: {
      fasilitas: 3,
      pembelajaran: 5,
      layanan: 5,
      keamanan: 4,
      aktivitas: 5
    },
    helpful: 25,
    isReviewerPicked: false
  }
])

const toggleRatingFilter = (rating) => {
  selectedRating.value = selectedRating.value === rating ? null : rating
}

const resetFilters = () => {
  selectedRating.value = null
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Rating Overview Section -->
    <div class="bg-white rounded-xl p-6 mb-6 shadow-sm">
      <!-- Overall Rating -->
      <div class="flex items-start gap-4 mb-6">
        <div class="flex items-center gap-2">
          <svg class="w-8 h-8 text-yellow-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span class="text-4xl font-bold text-gray-900">{{ schoolRating.overall }}</span>
        </div>
        <div class="flex items-center gap-2 mt-2">
          <svg class="w-5 h-5 text-green-600 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span class="text-sm text-gray-600">Direkomendasikan Oleh {{ schoolRating.recommended }}% Peninjau</span>
        </div>
      </div>

      <!-- Category Ratings -->
      <div class="grid grid-cols-5 gap-4">
        <div v-for="cat in schoolRating.categories" :key="cat.label" class="text-center">
          <div class="text-2xl font-semibold text-gray-900 mb-1">{{ cat.score }}</div>
          <div class="text-xs text-gray-600">{{ cat.label }}</div>
        </div>
      </div>

      <!-- Write Review Button -->
      <button class="mt-6 w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
        Tulis Ulasan
      </button>
    </div>

    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Sidebar Filter -->
      <div class="lg:w-64 flex-shrink-0">
        <div class="bg-white rounded-xl p-4 shadow-sm sticky top-4">
          <!-- Filter Header -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900">Filter</h3>
            <button 
              @click="resetFilters"
              class="text-sm text-gray-500 hover:text-gray-700"
            >
              Reset
            </button>
          </div>

          <!-- Rating Filter -->
          <div class="mb-4">
            <button 
              @click="showUserFilter = !showUserFilter"
              class="flex items-center justify-between w-full py-2 text-left"
            >
              <span class="font-medium text-gray-900">Rating</span>
              <svg 
                class="w-5 h-5 text-gray-400 transition-transform"
                :class="{ 'rotate-180': !showUserFilter }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            <div v-show="showUserFilter" class="mt-2 space-y-2">
              <button
                v-for="item in ratingDistribution"
                :key="item.stars"
                @click="toggleRatingFilter(item.stars)"
                class="flex items-center gap-2 w-full py-2 px-2 rounded hover:bg-gray-50 transition-colors"
                :class="{ 'bg-gray-50': selectedRating === item.stars }"
              >
                <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="text-sm text-gray-700">{{ item.stars }}</span>
              </button>
            </div>
          </div>

          <!-- User Filter -->
          <div>
            <button class="flex items-center justify-between w-full py-2 text-left">
              <span class="font-medium text-gray-900">User</span>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Reviews List -->
      <div class="flex-1">
        <!-- Reviews Header -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">{{ reviews.length }} Ulasan</h2>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Urutkan Berdasarkan:</span>
            <select 
              v-model="sortBy"
              class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option>Terbaru</option>
              <option>Terlama</option>
              <option>Rating Tertinggi</option>
              <option>Rating Terendah</option>
            </select>
          </div>
        </div>

        <!-- Reviews -->
        <div class="space-y-4">
          <div 
            v-for="review in reviews" 
            :key="review.id"
            class="bg-white rounded-xl p-6 shadow-sm border-l-4"
            :class="review.isReviewerPicked ? 'border-green-500' : 'border-transparent'"
          >
            <!-- Reviewer Picked Badge -->
            <div v-if="review.isReviewerPicked" class="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium mb-4">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Reviewer Terpilih
            </div>

            <!-- Reviewer Info -->
            <div class="flex items-start gap-4 mb-4">
              <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                CB
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">{{ review.name }}</h3>
                <div class="flex flex-wrap items-center gap-2 mt-1">
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-xs">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    {{ review.studentType }}
                  </span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Siswa Aktif
                  </span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {{ review.school }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Rating and Date -->
            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center gap-1">
                <span class="font-semibold text-gray-900">{{ review.rating }}</span>
                <div class="flex">
                  <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <span class="text-sm text-gray-500">{{ review.date }}</span>
            </div>

            <!-- Review Text -->
            <p class="text-gray-700 text-sm mb-4">{{ review.text }}</p>

            <!-- Detailed Ratings -->
            <div class="grid grid-cols-5 gap-4 mb-4">
              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900">{{ review.ratings.fasilitas }}</div>
                <div class="text-xs text-gray-600">Fasilitas</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900">{{ review.ratings.pembelajaran }}</div>
                <div class="text-xs text-gray-600">Pembelajaran</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900">{{ review.ratings.layanan }}</div>
                <div class="text-xs text-gray-600">Layanan</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900">{{ review.ratings.keamanan }}</div>
                <div class="text-xs text-gray-600">Keamanan</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900">{{ review.ratings.aktivitas }}</div>
                <div class="text-xs text-gray-600">Aktivitas</div>
              </div>
            </div>

            <!-- Helpful Button -->
            <div class="flex items-center gap-2">
              <button class="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                </svg>
                <span class="font-medium">Bermanfaat?</span>
              </button>
              <span class="text-sm text-gray-600">{{ review.helpful }} orang menganggap ini bermanfaat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>