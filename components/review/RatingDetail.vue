<template>
  <div class="max-w-full mx-auto">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Ratings</h2>

    <div class="grid grid-cols-12 gap-4">
      <!-- Left Column - Overall Rating (smaller space) -->
      <div class="col-span-2 flex flex-col items-start">
        <div class="flex items-center gap-2 mb-2">
          <svg
            class="w-6 h-6 fill-yellow-400 text-yellow-400"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
          <span class="text-3xl font-bold text-gray-800">{{
            overallRating
          }}</span>
          <span class="text-lg text-gray-600">/ 5.0</span>
        </div>
      </div>

      <!-- Middle Column - Ratings 5,4,3 (more space) -->
      <div class="col-span-5 space-y-4">
        <div
          v-for="rating in leftRatings"
          :key="`left-${rating.stars}`"
          class="flex flex-col gap-1"
        >
          <!-- Star and number at top -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1">
              <svg
                class="w-4 h-4 fill-yellow-400 text-yellow-400"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              <span class="text-sm font-medium">{{ rating.stars }}</span>
            </div>
            <span class="text-xs text-gray-500">({{ rating.count }})</span>
          </div>

          <!-- Progress bar below -->
          <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${rating.displayPercentage}%` }"
            />
          </div>
        </div>
      </div>

      <!-- Right Column - Ratings 2,1 (more space) -->
      <div class="col-span-5 space-y-4">
        <div
          v-for="rating in rightRatings"
          :key="`right-${rating.stars}`"
          class="flex flex-col gap-1"
        >
          <!-- Star and number at top -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1">
              <svg
                class="w-4 h-4 fill-yellow-400 text-yellow-400"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              <span class="text-sm font-medium">{{ rating.stars }}</span>
            </div>
            <span class="text-xs text-gray-500">({{ rating.count }})</span>
          </div>

          <!-- Progress bar below -->
          <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${rating.displayPercentage}%` }"
            />
          </div>
        </div>
        <!-- Empty space to align with middle column -->
        <div class="h-8"></div>
      </div>
    </div>

    <!-- Write a Review Button -->
    <button
      type="button"
      class="mt-8 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-gray-800"
    >
      Write a Review
    </button>
  </div>
</template>

<script setup>
import axios from '@/lib/axios'
import { useRoute } from 'vue-router'

// Get route params
const route = useRoute()

// Reactive data
const overallRating = ref(0)
const ratings = ref([
  { stars: 5, count: 0, percentage: 0, displayPercentage: 0 },
  { stars: 4, count: 0, percentage: 0, displayPercentage: 0 },
  { stars: 3, count: 0, percentage: 0, displayPercentage: 0 },
  { stars: 2, count: 0, percentage: 0, displayPercentage: 0 },
  { stars: 1, count: 0, percentage: 0, displayPercentage: 0 },
])

// Computed properties for splitting ratings
const leftRatings = computed(() => ratings.value.slice(0, 3))
const rightRatings = computed(() => ratings.value.slice(3))

// Function to calculate display percentage with minimum width
const calculateDisplayPercentage = (count, total) => {
  if (total === 0) return 0
  
  const actualPercentage = (count / total) * 100
  
  // If there are reviews for this star rating, ensure minimum 3% width for visibility
  if (count > 0 && actualPercentage < 3) {
    return 3
  }
  
  // Otherwise use the actual percentage, with proper decimal handling
  return Math.round(actualPercentage * 10) / 10
}

// Fetch reviews data
const fetchReviews = async () => {
  try {
    const schoolId = route.params.id
    const response = await axios.get(`/schools/${schoolId}/reviews`)
    const reviewsData = response.data.data.datas

    // Handle case when no reviews exist
    if (!reviewsData || reviewsData.length === 0) {
      overallRating.value = '0.0'
      return
    }

    // Calculate overall rating
    const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0)
    overallRating.value = (totalRating / reviewsData.length).toFixed(1)

    // Calculate rating distribution
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    
    reviewsData.forEach(review => {
      const rating = Math.round(review.rating) // Handle decimal ratings by rounding
      if (distribution.hasOwnProperty(rating)) {
        distribution[rating]++
      }
    })

    // Update ratings array with counts and percentages
    const total = reviewsData.length
    
    ratings.value = [
      { 
        stars: 5, 
        count: distribution[5], 
        percentage: Math.round((distribution[5] / total) * 100),
        displayPercentage: calculateDisplayPercentage(distribution[5], total)
      },
      { 
        stars: 4, 
        count: distribution[4], 
        percentage: Math.round((distribution[4] / total) * 100),
        displayPercentage: calculateDisplayPercentage(distribution[4], total)
      },
      { 
        stars: 3, 
        count: distribution[3], 
        percentage: Math.round((distribution[3] / total) * 100),
        displayPercentage: calculateDisplayPercentage(distribution[3], total)
      },
      { 
        stars: 2, 
        count: distribution[2], 
        percentage: Math.round((distribution[2] / total) * 100),
        displayPercentage: calculateDisplayPercentage(distribution[2], total)
      },
      { 
        stars: 1, 
        count: distribution[1], 
        percentage: Math.round((distribution[1] / total) * 100),
        displayPercentage: calculateDisplayPercentage(distribution[1], total)
      }
    ]

  } catch (error) {
    console.error('Error fetching reviews:', error)
  }
}

// Fetch data on component mount
onMounted(() => {
  fetchReviews()
})
</script>