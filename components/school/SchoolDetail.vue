<template>
  <div>
    <!-- Tabs -->
    <div class="sticky top-0 z-10 pb-4">
      <div class="max-w-full mx-auto pt-8">
        <div class="flex bg-[#F2ECE3] rounded-xl p-1 gap-1 w-fit">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="scrollToSection(tab.id)"
            :class="[
              'flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap',
              activeTab === tab.id ? 'bg-[#28190C] text-[#F9F6F1]' : 'text-[#76685A] hover:bg-gray-200'
            ]"
          >
            <span class="text-sm">{{ tab.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Content Sections -->
    <div class="max-w-full mx-auto pb-8">
      
      <!-- Overview Section -->
      <div id="overview" class="section mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Overview</h2>
        <p class="text-gray-700 leading-relaxed text-base">
          Sekolah Pelita Harapan (SPH) Pluit Village adalah bagian dari jaringan sekolah Pelita Harapan yang didirikan dengan visi untuk memberikan generasi muda Indonesia yang berkarakter kuat, cerdas, dan berlandasan nilai-nilai Kristiani. Terletak di kawasan strategis Jakarta Utara, SPH Pluit Village menawarkan lingkungan belajar yang aman, modern, dan mendukung perkembangan akademik maupun spiritual siswa.
        </p>
      </div>

      <!-- Location Section -->
      <div id="location" class="section mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Location</h2>
        <p class="text-gray-700 text-base mb-4">
          Jl. Pluit Indah, RT.1/RW.4, Pluit, Kec. Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450
        </p>
        <div class="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-sm">View on Google Maps</span>
        </div>
      </div>

      <!-- Official Contact Section -->
      <div id="official-contact" class="section mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Official Contact</h2>
        <div class="space-y-4">
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
            </svg>
            <span class="text-gray-700">(021) 6667 1234</span>
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
            </svg>
            <span class="text-gray-700">+62 812 3456 7890</span>
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            <span class="text-gray-700">info.pluit@sph.edu</span>
          </div>
        </div>
      </div>

      <!-- Facility Section -->
      <div id="facility" class="section mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Facility</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <div class="space-y-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
              </svg>
              <span class="text-gray-700">Ruang Kelas Ber-AC</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-gray-700">Laboratorium Sains Terpadu</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-gray-700">Perpustakaan Modern</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
              </svg>
              <span class="text-gray-700">Keamanan 24 Jam & Akses Kartu Pelajar</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-gray-700">Lapangan Olahraga Indoor & Outdoor</span>
            </div>
          </div>
          <div class="space-y-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 4l-3.707 2.923a1 1 0 01-1.33-.067L8 8l-4 3h12V8z"></path>
              </svg>
              <span class="text-gray-700">Studio Musik & Ruang Kesenian</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-gray-700">Ruang Konseling & Bimbingan</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-gray-700">Kantin Sehat</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a2 2 0 114 0v2H7V9zm5 3H6v2a2 2 0 002 2h6a2 2 0 002-2v-2h-4z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-gray-700">Akses Internet & Wi-Fi di Sekolah</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Education Program Section -->
      <div id="education-program" class="section mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Education Program</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Jenjang Pendidikan</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Kindergarten (TK A - TK B)</li>
              <li>• Primary School (SD)</li>
              <li>• Middle School (SMP)</li>
              <li>• Senior High School (SMA)</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Kurikulum</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Bilingual Learning Environment</li>
              <li>• Character & Faith-Based Education</li>
              <li>• STEM & Creative Integration</li>
              <li>• Global Citizenship & Community Service</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Estimated Price Section -->
      <div id="pricing" class="section mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Estimated Price</h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-50">
                <th class="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">Education Level</th>
                <th class="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">One-Time Fee</th>
                <th class="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">Monthly Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">Elementary School (SD)</td>
                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">Rp 15 - 25 Juta</td>
                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">Rp 3 - 5 Juta</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">Junior High School (SMP)</td>
                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">Rp 25 - 40 Juta</td>
                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">Rp 4 - 6 Juta</td>
              </tr>
              <tr>
                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">Senior High School (SMA)</td>
                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">Rp 45 - 70 Juta</td>
                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">Rp 5 - 8 Juta</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive data
const activeTab = ref('overview')
const isScrolling = ref(false) // Flag untuk prevent conflict

const tabs = [
  { id: 'overview', name: 'Overview' },
  { id: 'location', name: 'Location' },
  { id: 'official-contact', name: 'Official Contact' },
  { id: 'facility', name: 'Facility' },
  { id: 'education-program', name: 'Education Program' },
  { id: 'pricing', name: 'Pricing' }
]

// Smooth scroll function
// Smooth scroll function
const scrollToSection = (sectionId) => {
  isScrolling.value = true
  activeTab.value = sectionId
  
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center' // Ubah dari 'start' ke 'center'
    })
    
    setTimeout(() => {
      isScrolling.value = false
    }, 1000)
  }
}

// Intersection Observer to update active tab based on scroll position
onMounted(() => {
  const sections = document.querySelectorAll('.section')
  const options = {
    threshold: 0.5,
    rootMargin: '-100px 0px -100px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    // Skip update jika sedang smooth scrolling dari klik tab
    if (isScrolling.value) return
    
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeTab.value = entry.target.id
      }
    })
  }, options)

  sections.forEach((section) => {
    observer.observe(section)
  })
})
</script>