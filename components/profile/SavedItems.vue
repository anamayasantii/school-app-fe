<!-- components/profile/SavedItems.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100">
      <h2 class="text-xl font-semibold text-gray-900">Disimpan</h2>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <svg class="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Gagal memuat data</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button
          @click="fetchSavedSchools"
          class="px-6 py-2 bg-pink-500 text-white text-sm font-medium rounded-lg hover:bg-pink-600 transition-colors"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Saved Schools List -->
      <div v-else-if="savedSchools.length > 0" class="space-y-6">
        <div 
          v-for="(school, index) in savedSchools" 
          :key="school.id"
          class="flex items-start space-x-4 relative"
        >
          <!-- School Image -->
          <NuxtLink
            :to="`/school-details/${school.id}`"
            class="bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 w-28 h-20 cursor-pointer"
          >
            <img 
              :src="getSchoolImage(school)" 
              :alt="school.name"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
          </NuxtLink>

          <!-- School Details -->
          <div class="flex-1 min-w-0">
            <NuxtLink :to="`/school-details/${school.id}`">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 hover:text-pink-600 transition-colors cursor-pointer">
                {{ school.name }}
              </h3>
            </NuxtLink>
            
            <!-- School Info Row -->
            <div class="flex items-center space-x-6 text-sm">
              <!-- Akreditasi -->
              <div class="flex items-center">
                <div
                  :class="[
                    'inline-flex items-center px-5 py-1 rounded-full text-xs font-bold',
                    getGradeColor(school.accreditationCode),
                  ]"
                >
                  {{ school.accreditationCode }}
                </div>
              </div>
              
              <!-- Rating -->
              <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-gray-900 font-medium">{{ school.rating || 0 }}</span>
              </div>
              
              <!-- Location -->
              <div class="flex items-center">
                <svg class="w-4 h-4 text-pink-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-gray-600 truncate">{{ getLocation(school) }}</span>
              </div>
            </div>
          </div>

          <!-- Actions Menu -->
          <div class="relative">
            <button
              @click="toggleMenu(index)"
              class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            <div 
              v-show="activeMenu === index"
              class="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10"
            >
              <NuxtLink :to="`/school-details/${school.id}`">
                <button
                  class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Lihat Detail
                </button>
              </NuxtLink>
              <button
                @click="removeFromSaved(school, index)"
                class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors"
                :disabled="removingId === school.id"
              >
                {{ removingId === school.id ? 'Menghapus...' : 'Hapus' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Belum ada sekolah tersimpan</h3>
        <p class="text-gray-600">Sekolah yang Anda simpan akan muncul di sini</p>
      </div>

      <!-- Remove All Button -->
      <div v-if="savedSchools.length > 0" class="flex justify-end mt-8">
        <button
          @click="removeAllSaved"
          class="px-6 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
          :disabled="isRemoving"
        >
          {{ isRemoving ? 'Menghapus...' : 'Hapus Semua' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from '@/lib/axios'
import Cookies from 'js-cookie'

const activeMenu = ref(null)
const savedSchools = ref([])
const isLoading = ref(false)
const error = ref(null)
const removingId = ref(null)
const isRemoving = ref(false)

const fetchSavedSchools = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const token = Cookies.get('token')
    
    if (!token) {
      error.value = 'Anda harus login terlebih dahulu'
      return
    }
    
    const response = await axios.get('/school-details/saved', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.data.status === 'success') {
      savedSchools.value = response.data.data
    }
  } catch (err) {
    console.error('Fetch saved schools error:', err)
    error.value = err.response?.data?.message || 'Gagal memuat sekolah tersimpan'
    
    if (err.response?.status === 401) {
      error.value = 'Sesi Anda telah berakhir, silakan login kembali'
    }
  } finally {
    isLoading.value = false
  }
}

const getSchoolImage = (school) => {
  if (school.galleryImages && school.galleryImages.length > 0) {
    return school.galleryImages[0]
  }
  return '/images/placeholder-school.jpg'
}

const handleImageError = (event) => {
  event.target.src = '/images/placeholder-school.jpg'
}

const getLocation = (school) => {
  const parts = []
  if (school.street) parts.push(school.street)
  if (school.subDistrictName) parts.push(school.subDistrictName)
  if (school.districtName) parts.push(school.districtName)
  
  const location = parts.join(', ')
  return location.length > 40 ? location.substring(0, 37) + '...' : location
}

const getGradeColor = (accreditationCode) => {
  const colorMap = {
    Unggulan: "bg-[#FFB800]/[0.16] text-[#FFB800]",
    A: "bg-[#DE03F8]/[0.16] text-[#DE03F8]",
    B: "bg-[#AD53E7]/[0.16] text-[#AD53E7]",
    C: "bg-[#3D5BE9]/[0.16] text-[#3D5BE9]",
  }
  return colorMap[accreditationCode] || "bg-blue-100 text-blue-800"
}

const toggleMenu = (index) => {
  activeMenu.value = activeMenu.value === index ? null : index
}

const closeMenu = () => {
  activeMenu.value = null
}

const removeFromSaved = async (school, index) => {
  closeMenu()
  
  if (!confirm(`Hapus "${school.name}" dari daftar tersimpan?`)) {
    return
  }
  
  removingId.value = school.id
  
  try {
    const token = Cookies.get('token')
    
    await axios.post('/school-details/save', 
      {
        schoolDetailId: school.id
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    
    savedSchools.value.splice(index, 1)
    
    emit('schoolRemoved', school)
  } catch (err) {
    console.error('Remove school error:', err)
    alert(err.response?.data?.message || 'Gagal menghapus sekolah. Silakan coba lagi.')
  } finally {
    removingId.value = null
  }
}

const removeAllSaved = async () => {
  if (!confirm('Hapus semua sekolah dari daftar tersimpan?')) {
    return
  }
  
  isRemoving.value = true
  
  try {
    const token = Cookies.get('token')
    
    // TODO: Replace with actual DELETE endpoint when available
    // await axios.delete('/school-details/saved', {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // })
    
    savedSchools.value = []
    
    emit('allRemoved')
  } catch (err) {
    console.error('Remove all schools error:', err)
    alert('Gagal menghapus semua sekolah. Silakan coba lagi.')
  } finally {
    isRemoving.value = false
  }
}

const handleClickOutside = (event) => {
  if (activeMenu.value !== null && !event.target.closest('.relative')) {
    closeMenu()
  }
}

onMounted(() => {
  fetchSavedSchools()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const emit = defineEmits(['schoolRemoved', 'allRemoved', 'schoolViewed'])

defineExpose({
  fetchSavedSchools,
  removeFromSaved,
  removeAllSaved
})
</script>