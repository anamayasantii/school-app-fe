<!-- components/profile/ProfileSettings.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100">
      <h2 class="text-xl font-semibold text-gray-900">Pengaturan Profil</h2>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Profile Photo Section -->
      <div class="flex items-start space-x-6 mb-8">
        <!-- Avatar -->
        <div class="relative">
          <div class="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
            <img 
              v-if="profileData.avatar" 
              :src="profileData.avatar" 
              :alt="profileData.fullname"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Upload Info -->
        <div class="flex-1">
          <h3 class="text-lg font-medium text-gray-900 mb-1">Ubah Profil</h3>
          <p class="text-sm text-gray-600 mb-4">PNG, JPEG under 2MB</p>
          
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileUpload"
            class="hidden"
          />
          
          <button
            @click="fileInput?.click()"
            class="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            Pilih Foto
          </button>
        </div>
      </div>

      <!-- Profile Form -->
      <div class="space-y-6">
        <!-- Nama Lengkap -->
        <div class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">NAMA LENGKAP</label>
          </div>
          <div class="flex-1 text-right">
            <span class="text-gray-900 font-medium">{{ profileData.fullname }}</span>
          </div>
        </div>

        <!-- NISN - Only for students -->
        <div v-if="isStudent" class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">NISN/NIM</label>
          </div>
          <div class="flex-1 text-right">
            <span class="text-green-600 font-medium">{{ profileData.nisn || '-'  }}</span>
          </div>
        </div>

        <!-- Status -->
        <div class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">STATUS</label>
          </div>
          <div class="flex-1 text-right">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800" v-if="isStudent">
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              {{ profileData.status }}
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800" v-else>
              <span class="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              {{ profileData.status }}
            </span>
          </div>
        </div>

        <!-- Sekolah - Only for students -->
        <div v-if="isStudent" class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">SEKOLAH</label>
          </div>
          <div class="flex-1 text-right flex items-center justify-end">
            <span class="text-gray-900 font-medium">{{ profileData.schoolDetails || '-'  }}</span>
          </div>
        </div>

        <!-- Email -->
        <div class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">EMAIL</label>
          </div>
          <div class="flex-1 text-right">
            <span class="text-gray-900 font-medium">{{ profileData.email }}</span>
          </div>
        </div>

        <!-- Tanggal Lahir - Only for students -->
        <div v-if="isStudent" class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">TANGGAL LAHIR</label>
          </div>
          <div class="flex-1 text-right">
            <span class="text-gray-900 font-medium">{{ formatDate(profileData.birthDate) }}</span>
          </div>
        </div>

        <!-- No. Telp -->
        <div class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">NO. TELP</label>
          </div>
          <div class="flex-1 text-right">
            <span class="">{{ profileData.phone || '-' }}</span>
          </div>
        </div>

        <!-- Alamat -->
        <div class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">ALAMAT</label>
          </div>
          <div class="flex-1 text-right">
            <span class="">{{ profileData.address || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- Edit Button -->
      <div class="flex justify-end mt-8">
        <button
          @click="handleEdit"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          <span>Ubah</span>
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Student Data Section for Parents -->
  <div v-if="isParent" class="bg-white rounded-lg shadow-sm border border-gray-100 mt-6">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100">
      <h2 class="text-xl font-semibold text-gray-900">Peserta Didik</h2>
    </div>

    <!-- Content -->
    <div class="p-6">
      <div class="space-y-6">
        <!-- Nama Lengkap -->
        <div class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">NAMA LENGKAP</label>
          </div>
          <div class="flex-1 text-right">
            <span class="text-gray-900 font-medium">{{ studentData.fullname || '-' }}</span>
          </div>
        </div>

        <!-- NISN -->
        <div class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">NISN</label>
          </div>
          <div class="flex-1 text-right">
            <span class="text-green-600 font-medium">{{ studentData.nisn || '-' }}</span>
          </div>
        </div>

        <!-- Status -->
        <div class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">STATUS</label>
          </div>
          <div class="flex-1 text-right">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              {{ studentData.status || 'Siswa Aktif' }}
            </span>
          </div>
        </div>

        <!-- Tanggal Lahir -->
        <div class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">TANGGAL LAHIR</label>
          </div>
          <div class="flex-1 text-right">
            <span class="text-gray-900 font-medium">{{ formatDate(studentData.birthDate) || '-' }}</span>
          </div>
        </div>

        <!-- Sekolah -->
        <div class="flex justify-between items-center py-4 border-b border-gray-100">
          <div class="flex-1">
            <label class="text-sm font-medium text-gray-500 uppercase tracking-wider">SEKOLAH</label>
          </div>
          <div class="flex-1 text-right flex items-center justify-end">
            <span class="text-gray-900 font-medium">{{ studentData.schoolName || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- Edit Button -->
      <div class="flex justify-end mt-8">
        <button
          @click="handleEditStudent"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          <span>Ubah</span>
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Education History Component - Always at the bottom -->
  <EducationHistory 
    :educationData="educationHistory"
    @add="handleAddEducation"
    @edit="handleEditEducation"
  />

  <!-- Edit Profile Modal -->
  <ProfileEditModal 
    :isOpen="isEditModalOpen"
    :userData="profileData"
    @close="handleCloseModal"
    @submit="handleSubmitEdit"
  />

  <!-- Edit Student Profile Modal -->
  <ProfileStudentEditModal 
    :isOpen="isStudentEditModalOpen"
    :studentData="studentData"
    @close="handleCloseStudentModal"
    @submit="handleSubmitStudentEdit"
  />
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import { computed, onMounted, ref } from 'vue'
import ProfileEditModal from '~/components/profile/ProfileEditModal.vue'
import ProfileStudentEditModal from './ProfileStudentEditModal.vue'
import EducationHistory from './EducationHistory.vue'

// Store
const authStore = useAuthStore()

// Refs
const fileInput = ref(null)

// Modal state
const isEditModalOpen = ref(false)
const isStudentEditModalOpen = ref(false)

// Computed properties for role checking
const isStudent = computed(() => {
  return authStore.user?.roles?.includes('student') || false
})

const isParent = computed(() => {
  return authStore.user?.roles?.includes('parent') || false
})

// Computed properties
const profileData = computed(() => {
  if (!authStore.user) {
    return {
      fullname: '',
      nisn: '',
      status: '',
      schoolDetails: '',
      email: '',
      birthDate: '',
      phone: '',
      address: '',
      avatar: null
    }
  }

  // Helper function untuk mendapatkan nama sekolah
  const getSchoolName = (schoolDetails) => {
    if (!schoolDetails) return ''
    
    // Untuk student, schoolDetails adalah array
    if (Array.isArray(schoolDetails) && schoolDetails.length > 0) {
      const firstSchool = schoolDetails[0]
      return firstSchool.name || ''
    }
    
    return ''
  }

  return {
    fullname: authStore.user.fullname || '',
    nisn: authStore.user.nisn || '',
    status: getStatus(authStore.user.roles),
    schoolDetails: getSchoolName(authStore.user.schoolDetails),
    email: authStore.user.email || '',
    birthDate: authStore.user.dateOfBirth || '',
    phone: authStore.user.phoneNo || '',
    address: authStore.user.address || '',
    avatar: authStore.user.image || null
  }
})

// Student data for parents (dari API response)
const studentData = computed(() => {
  if (!isParent.value || !authStore.user?.child) return {}
  
  // Ambil data anak pertama (bisa disesuaikan jika ada multiple children)
  const child = authStore.user.child[0]
  if (!child) return {}
  
  return {
    fullname: child.fullname || '',
    nisn: child.nisn || '',
    status: 'Siswa Aktif', // Default status untuk siswa
    birthDate: child.dateOfBirth || '',
    schoolName: child.schoolDetail?.name || '',
    email: child.email || '',
    phone: child.phoneNo || ''
  }
})

// Education history for all roles
const educationHistory = computed(() => {
  // TODO: Fetch from API - bisa dari endpoint terpisah atau bagian dari user data
  // Sementara return empty array, nanti bisa diisi dari API
  return []
})

// Methods
const getStatus = (roles) => {
  if (!roles || roles.length === 0) return ''
  
  // Mapping roles ke status display dalam bahasa Indonesia
  const roleMapping = {
    'student': 'Siswa',
    'parent': 'Orang Tua',
    'teacher': 'Guru',
    'admin': 'Administrator'
  }
  
  return roleMapping[roles[0]] || roles[0]
}

const formatDate = (date) => {
  if (!date) return '-'
  
  try {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch (error) {
    return '-'
  }
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validasi ukuran file (2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran file maksimal 2MB')
    return
  }

  // Validasi tipe file
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (!allowedTypes.includes(file.type)) {
    alert('Format file harus PNG atau JPEG')
    return
  }

  try {
    // TODO: Implementasi upload file
    console.log('File selected:', file)
    // Sementara hanya log, nanti bisa ditambahkan logic upload
  } catch (error) {
    console.error('Upload error:', error)
    alert('Gagal mengunggah foto')
  }
}

const handleEdit = () => {
  // Edit profile - open modal
  isEditModalOpen.value = true
}

const handleEditStudent = () => {
  // Edit student data for parents
  isStudentEditModalOpen.value = true
}

const handleCloseModal = () => {
  isEditModalOpen.value = false
}

const handleCloseStudentModal = () => {
  isStudentEditModalOpen.value = false
}

const handleSubmitEdit = async (formData) => {
  try {
    // TODO: Implement API call to update profile
    console.log('Updating profile with data:', formData)
    
    // After successful update, refresh user data
    await authStore.fetchUser()
    
    // Close modal
    isEditModalOpen.value = false
    
    // Show success message
    alert('Profil berhasil diupdate!')
    
  } catch (error) {
    console.error('Update profile error:', error)
    alert('Gagal mengupdate profil')
  }
}

const handleSubmitStudentEdit = async (formData) => {
  try {
    // TODO: Implement API call to update student profile
    console.log('Updating student profile with data:', formData)
    
    // After successful update, refresh user data
    await authStore.fetchUser()
    
    // Close modal
    isStudentEditModalOpen.value = false
    
    // Show success message
    alert('Profil siswa berhasil diupdate!')
    
  } catch (error) {
    console.error('Update student profile error:', error)
    alert('Gagal mengupdate profil siswa')
  }
}

// Education History Handlers
const handleAddEducation = () => {
  console.log('Add education')
  // TODO: Implement add education modal/functionality
}

const handleEditEducation = (data) => {
  console.log('Edit education:', data)
  // TODO: Implement edit education modal/functionality
  // data contains { education, index }
}

// Lifecycle
onMounted(async () => {
  // Pastikan user data sudah diload
  if (!authStore.user) {
    await authStore.fetchUser()
  }
})
</script>