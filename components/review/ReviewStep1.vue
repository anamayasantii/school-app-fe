<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Progress Steps -->
      <div class="flex items-center justify-center mb-12">
        <div class="flex items-center">
          <!-- Step 1 - Active -->
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold mb-2">
              1
            </div>
            <div class="text-sm font-medium text-black text-center">Detail<br/>Anda</div>
          </div>
          
          <div class="w-32 h-0.5 bg-gray-300 mx-4 mt-[-30px]"></div>
          
          <!-- Step 2 - Inactive -->
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-white border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center font-semibold mb-2">
              2
            </div>
            <div class="text-sm text-gray-400 text-center">Tinjau Sekolah</div>
          </div>
          
          <div class="w-32 h-0.5 bg-gray-300 mx-4 mt-[-30px]"></div>
          
          <!-- Step 3 - Inactive -->
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-white border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center font-semibold mb-2">
              3
            </div>
            <div class="text-sm text-gray-400 text-center">Langkah Terakhir</div>
          </div>
        </div>
      </div>

      <!-- Form Content -->
      <div class="bg-white rounded-lg p-8 shadow-sm">
        <h1 class="text-3xl font-bold mb-2">Mari kita mulai dengan detail Anda</h1>
        <p class="text-gray-600 mb-8">Silakan isi kolom di bawah ini dengan detail kontak Anda.</p>

        <!-- Nama Lengkap -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2">Nama Lengkap</label>
          <input
            v-model="formData.fullName"
            type="text"
            placeholder="Contoh: John Doe"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Alamat Email -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2">Alamat Email</label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="Contoh: john.doe@gmail.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Nomor Telepon -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2">Nomor Telepon</label>
          <input
            v-model="formData.phone"
            type="tel"
            placeholder="Contoh: 8888-8888-8888"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Hubungan dengan Sekolah -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2">Hubungan dengan Sekolah</label>
          <div class="relative">
            <select
              v-model="formData.relationship"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Pilih Hubungan</option>
              <option value="siswa_aktif">Siswa Aktif</option>
              <option value="alumni">Alumni</option>
            </select>
            <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- Checkbox Verification -->
        <div class="flex items-start mb-6">
          <div class="flex items-center h-5 mt-1">
            <div class="w-5 h-5 rounded border-2 border-black bg-black flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <label class="ml-3 text-sm">
            Saya dapat memberikan verifikasi hubungan saya dengan sekolah ini
          </label>
        </div>

        <!-- Info Box -->
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p class="text-sm text-blue-700">
            Dapatkan lencana terverifikasi khusus untuk memberikan verifikasi hubungan Anda dengan Sekolah
          </p>
        </div>

        <!-- File Upload Section - Conditional -->
        <div v-if="formData.relationship" class="mb-6">
          <h3 class="text-lg font-semibold mb-4">Unggah Berkas</h3>
          
          <!-- Upload Area -->
          <div v-if="!formData.file" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p class="text-gray-600 mb-1">
                Seret dan jatuhkan berkas di sini atau 
                <label for="fileUpload" class="text-blue-600 underline cursor-pointer">Pilih berkas</label>
              </p>
              <input
                id="fileUpload"
                type="file"
                @change="handleFileUpload"
                class="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
          </div>

          <!-- Uploaded File Display -->
          <div v-else class="border border-gray-300 rounded-lg p-4 flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-red-100 rounded flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                </svg>
              </div>
              <div>
                <p class="font-medium text-sm">{{ formData.fileName }}</p>
                <p class="text-xs text-gray-500">{{ fileSize }}</p>
              </div>
            </div>
            <button
              @click="handleFileDelete"
              class="text-gray-400 hover:text-red-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between pt-6">
          <button class="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors">
            Batal
          </button>
          <button
            :disabled="!isFormValid"
            :class="[
              'px-8 py-3 rounded-lg font-medium transition-colors flex items-center',
              isFormValid
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            Selanjutnya
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const formData = ref({
  fullName: '',
  email: '',
  phone: '',
  relationship: '',
  file: null,
  fileName: ''
})

onMounted(() => {
  formData.value.fullName = authStore.user.fullname
  formData.value.email = authStore.user.email
  formData.value.phone = authStore.user.phone
})

// Computed untuk validasi form
const isFormValid = computed(() => {
  return formData.value.fullName && 
         formData.value.email && 
         formData.value.phone && 
         formData.value.relationship &&
         (formData.value.relationship ? formData.value.file : true)
})

// Computed untuk file size
const fileSize = computed(() => {
  if (formData.value.file) {
    const sizeInMB = (formData.value.file.size / (1024 * 1024)).toFixed(2)
    return `${sizeInMB} MB`
  }
  return ''
})

// Handle file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    formData.value.file = file
    formData.value.fileName = file.name
  }
}

// Handle file delete
const handleFileDelete = () => {
  formData.value.file = null
  formData.value.fileName = ''
}
</script>

<style scoped>
/* Custom styling jika diperlukan */
</style>