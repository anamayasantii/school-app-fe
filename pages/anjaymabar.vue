
<template>
  <div class="min-h-screen bg-gray-50">

    <!-- <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">

          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-emerald-600">Schoola Advisor</h1>
          </div>

          <nav class="hidden md:flex space-x-8">
            <a href="#" class="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium">Home</a>
            <a href="#" class="text-emerald-600 px-3 py-2 text-sm font-medium border-b-2 border-emerald-600">Explore School</a>
            <a href="#" class="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium">Write a Review</a>
            <a href="#" class="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium">About Us</a>
          </nav>

          <div class="flex items-center space-x-4">

            <div class="flex bg-gray-100 rounded-lg p-1">
              <button class="px-3 py-1 text-sm font-medium bg-white text-gray-900 rounded-md shadow-sm">ID</button>
              <button class="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-900">EN</button>
            </div>

            <div class="flex items-center space-x-3">
              <button class="text-gray-700 hover:text-emerald-600 text-sm font-medium">Login</button>
              <button class="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
                Sign Up
              </button>
            </div>
          </div>

          <button class="md:hidden p-2">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header> -->

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm text-gray-500">
          <li><a href="#" class="hover:text-emerald-600">Beranda</a></li>
          <li><span class="mx-2">></span></li>
          <li class="text-gray-900">Sekolah Dasar</li>
        </ol>
      </nav>

      <!-- School Type Filter Cards -->
      <div class="mb-8">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer border-emerald-200 bg-emerald-50">
            <div class="text-center">
              <div class="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <span class="text-sm font-medium text-gray-900">Negeri</span>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
            <div class="text-center">
              <div class="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <span class="text-sm font-medium text-gray-900">Swasta</span>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
            <div class="text-center">
              <div class="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <span class="text-sm font-medium text-gray-900">Islam</span>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
            <div class="text-center">
              <div class="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <span class="text-sm font-medium text-gray-900">Kristen</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="flex justify-between items-center mb-6">
        <p class="text-gray-700">Showing <span class="font-semibold">8</span> of <span class="font-semibold">24</span> results</p>
        
        <div class="relative">
          <select v-model="selectedProvince" class="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
            <option value="">Semua Provinsi</option>
            <option value="bali">Bali</option>
            <option value="jakarta">DKI Jakarta</option>
            <option value="jabar">Jawa Barat</option>
            <option value="jatim">Jawa Timur</option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- School Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="school in schools" :key="school.id" class="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow cursor-pointer">
          <div class="relative">
            <img :src="school.image" :alt="school.name" class="w-full h-48 object-cover rounded-t-lg">
            <div class="absolute top-4 left-4">
              <span :class="getBadgeClass(school.type)" class="px-3 py-1 rounded-full text-xs font-medium">
                {{ school.type }}
              </span>
            </div>
          </div>
          
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ school.name }}</h3>
            
            <div class="flex items-center text-gray-500 text-sm mb-3">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {{ school.location }}
            </div>
            
            <div class="flex items-center">
              <div class="flex items-center">
                <div class="flex text-yellow-400">
                  <svg v-for="i in 5" :key="i" :class="i <= school.rating ? 'text-yellow-400' : 'text-gray-300'" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                </div>
                <span class="ml-2 text-sm text-gray-600">({{ school.reviews }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center space-x-1">
        <button class="px-3 py-2 text-sm text-gray-500 hover:text-emerald-600 disabled:opacity-50" :disabled="currentPage === 1">
          Previous
        </button>
        
        <button v-for="page in totalPages" :key="page" 
                :class="page === currentPage ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'" 
                class="px-3 py-2 text-sm rounded-md">
          {{ page }}
        </button>
        
        <button class="px-3 py-2 text-sm text-gray-500 hover:text-emerald-600 disabled:opacity-50" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </main>

    <!-- Footer -->
    <!-- <footer class="bg-gray-900 text-white mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div class="md:col-span-2">
            <h2 class="text-2xl font-bold text-emerald-400 mb-4">Schoola Advisor</h2>
            <p class="text-gray-300 mb-6">Find the best schools in Indonesia with comprehensive reviews and ratings.</p>
            
            <div class="mb-4">
              <h3 class="text-lg font-semibold mb-3">Subscribe to Our Newsletter</h3>
              <div class="flex">
                <input type="email" placeholder="Enter your email" class="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <button class="bg-emerald-600 px-6 py-2 rounded-r-lg hover:bg-emerald-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-emerald-400">Home</a></li>
              <li><a href="#" class="hover:text-emerald-400">Explore Schools</a></li>
              <li><a href="#" class="hover:text-emerald-400">Write Review</a></li>
              <li><a href="#" class="hover:text-emerald-400">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Support</h3>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-emerald-400">Help Center</a></li>
              <li><a href="#" class="hover:text-emerald-400">Contact Us</a></li>
              <li><a href="#" class="hover:text-emerald-400">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-emerald-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-8 mt-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 text-sm">© 2024 Schoola Advisor. All rights reserved.</p>
            <div class="flex space-x-6 mt-4 md:mt-0">
              <a href="#" class="text-gray-400 hover:text-emerald-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-emerald-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-emerald-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.22.083.402-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer> -->
  </div>
</template>

<script setup>
// Page metadata
useHead({
  title: 'Schoola Advisor - School Directory',
  meta: [
    { name: 'description', content: 'Find the best schools in Indonesia with comprehensive reviews and ratings.' }
  ]
})

// Reactive data
const selectedProvince = ref('')
const currentPage = ref(1)
const totalPages = ref(3)

// Sample school data
const schools = ref([
  {
    id: 1,
    name: 'Green School Bali',
    type: 'Integrated School',
    location: 'Badung, Bali',
    rating: 5,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Bali Island School',
    type: 'University',
    location: 'Denpasar, Bali',
    rating: 4,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'Canggu Community School',
    type: 'Vocational High School',
    location: 'Canggu, Bali',
    rating: 5,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=300&h=200&fit=crop'
  },
  {
    id: 4,
    name: 'SMA Negeri 1 Denpasar',
    type: 'High School',
    location: 'Denpasar, Bali',
    rating: 4,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=200&fit=crop'
  },
  {
    id: 5,
    name: 'SD Negeri 1 Ubud',
    type: 'Elementary School',
    location: 'Ubud, Bali',
    rating: 4,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=300&h=200&fit=crop'
  },
  {
    id: 6,
    name: 'SMP Kristen Kalam Kudus',
    type: 'Junior High School',
    location: 'Denpasar, Bali',
    rating: 5,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=200&fit=crop'
  },
  {
    id: 7,
    name: 'Universitas Udayana',
    type: 'University',
    location: 'Jimbaran, Bali',
    rating: 4,
    reviews: 289,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop'
  },
  {
    id: 8,
    name: 'SMK Negeri 1 Sukawati',
    type: 'Vocational High School',
    location: 'Sukawati, Bali',
    rating: 4,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=300&h=200&fit=crop'
  }
])

// Methods
const getBadgeClass = (type) => {
  const classes = {
    'Integrated School': 'bg-emerald-100 text-emerald-800',
    'University': 'bg-blue-100 text-blue-800',
    'Vocational High School': 'bg-purple-100 text-purple-800',
    'High School': 'bg-orange-100 text-orange-800',
    'Elementary School': 'bg-pink-100 text-pink-800',
    'Junior High School': 'bg-indigo-100 text-indigo-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

