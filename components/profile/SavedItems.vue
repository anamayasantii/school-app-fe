<!-- components/profile/SavedItems.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100">
      <h2 class="text-xl font-semibold text-gray-900">Disimpan</h2>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Saved Schools List -->
      <div class="space-y-6">
        <div 
          v-for="(school, index) in savedSchools" 
          :key="index"
          class="flex items-start space-x-4 relative"
        >
          <!-- School Image -->
          <div class=" bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 w-28 h-20">
            <img 
              :src="school.image" 
              :alt="school.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- School Details -->
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ school.name }}
            </h3>
            
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
                <span class="text-gray-900 font-medium">{{ school.rating }}</span>
              </div>
              
              <!-- Location -->
              <div class="flex items-center">
                <svg class="w-4 h-4 text-pink-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-gray-600 truncate">{{ school.location }}</span>
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
              <button
                @click="viewSchool(school)"
                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Edit
              </button>
              <button
                @click="removeFromSaved(index)"
                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Hapus
              </button>
              <button
                @click="viewSchool(school)"
                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Laporkan
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="savedSchools.length === 0" class="text-center py-16">
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
          class="px-6 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
        >
          Hapus Semua
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive data
const activeMenu = ref(null)

// Sample saved schools data
const savedSchools = ref([
  {
    name: 'SMK TI Bali Global Badung',
    image: '/images/schools/smk-bali-global.jpg',
    accreditationCode: 'A',
    rating: 4.2,
    location: 'Jl. Cendana Raya No. 5, De...'
  },
  {
    name: 'SMP Negeri 3 Sawan',
    image: '/images/schools/smp-sawan.jpg',
    accreditationCode: 'B',
    rating: 3.8,
    location: 'Jl. Cendana Raya No. 5, De...'
  },
  {
    name: 'Jakarta Intercultural School (JIS)',
    image: '/images/schools/jis.jpg',
    accreditationCode: 'Unggulan',
    rating: 4.9,
    location: 'Jl. Cendana Raya No. 5, De...'
  }
])

const getGradeColor = (accreditationCode) => {
  const colorMap = {
    Unggulan: "bg-[#FFB800]/[0.16] text-[#FFB800]",
    A: "bg-[#DE03F8]/[0.16] text-[#DE03F8]",
    B: "bg-[#AD53E7]/[0.16] text-[#AD53E7]",
    C: "bg-[#3D5BE9]/[0.16] text-[#3D5BE9]",
  };
  return colorMap[accreditationCode] || "bg-blue-100 text-blue-800";
};

// Methods
const toggleMenu = (index) => {
  activeMenu.value = activeMenu.value === index ? null : index
}

const closeMenu = () => {
  activeMenu.value = null
}

const viewSchool = (school) => {
  console.log('View school:', school)
  // TODO: Navigate to school detail page
  closeMenu()
}

const removeFromSaved = (index) => {
  const schoolName = savedSchools.value[index].name
  if (confirm(`Hapus "${schoolName}" dari daftar tersimpan?`)) {
    savedSchools.value.splice(index, 1)
  }
  closeMenu()
}

const removeAllSaved = () => {
  if (confirm('Hapus semua sekolah dari daftar tersimpan?')) {
    savedSchools.value = []
  }
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (activeMenu.value !== null && !event.target.closest('.relative')) {
    closeMenu()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Emits
const emit = defineEmits(['schoolRemoved', 'allRemoved', 'schoolViewed'])

// Expose methods for parent component
defineExpose({
  removeFromSaved,
  removeAllSaved,
  viewSchool
})
</script>