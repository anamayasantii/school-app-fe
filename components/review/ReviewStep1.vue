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
            v-model="form.fullName"
            type="text"
            placeholder="Contoh: John Doe"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Alamat Email -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2">Alamat Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Contoh: john.doe@gmail.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Nomor Telepon -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2">Nomor Telepon</label>
          <input
            v-model="form.phoneNo"
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
              v-model="form.status"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Pilih Hubungan</option>
              <option value="aktif">Siswa Aktif</option>
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
            <button
              type="button"
              @click="form.isVerified = !form.isVerified"
              :class="[
                'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                form.isVerified ? 'border-black bg-black' : 'border-gray-300 bg-white'
              ]"
            >
              <svg v-if="form.isVerified" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
          <label class="ml-3 text-sm">
            Saya dapat memberikan verifikasi hubungan saya dengan sekolah ini
          </label>
        </div>

        <!-- Info Box -->
        <div v-if="form.isVerified" class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p class="text-sm text-blue-700">
            Dapatkan lencana terverifikasi khusus untuk memberikan verifikasi hubungan Anda dengan Sekolah
          </p>
        </div>

        <!-- File Upload Section - Conditional -->
        <div v-if="form.isVerified" class="mb-6">
          <h3 class="text-lg font-semibold mb-4">Unggah Berkas</h3>
          
          <!-- Upload Area -->
          <div v-if="!form.file" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <div v-if="isUploading" class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <svg v-else class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p class="text-gray-600 mb-1">
                <span v-if="isUploading">Mengunggah...</span>
                <span v-else>
                  Seret dan jatuhkan berkas di sini atau 
                  <label for="fileUpload" class="text-blue-600 underline cursor-pointer">Pilih berkas</label>
                </span>
              </p>
              <input
                id="fileUpload"
                type="file"
                @change="handleFileUpload"
                class="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                :disabled="isUploading"
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
                <p class="font-medium text-sm">{{ form.fileName }}</p>
                <p class="text-xs text-gray-500">{{ fileSize }}</p>
              </div>
            </div>
            <button
              @click="handleFileDelete"
              class="text-gray-400 hover:text-red-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between pt-6">
          <button 
            type="button"
            class="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            @click="handleNext"
            :disabled="!isFormValid || isUploading"
            :class="[
              'px-8 py-3 rounded-lg font-medium transition-colors flex items-center',
              isFormValid && !isUploading
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
import axios from '@/lib/axios'
import Cookies from 'js-cookie'

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['next', 'updateFormData'])

const authStore = useAuthStore()

const form = ref({
  fullName: '',
  email: '',
  phoneNo: '',
  status: '',
  file: null,
  fileName: '',
  fileUrl: '',
  isVerified: false
})

const isUploading = ref(false)

// Load data dari props atau user saat mounted
onMounted(() => {
  // Cek apakah ada data yang tersimpan di props
  if (props.formData?.step1) {
    form.value = { ...props.formData.step1 }
  } else {
    // Load dari user data
    const user = authStore.user
    
    if (user.role === 'parent' && user.child && user.child.length > 0) {
      const child = user.child[0]
      form.value.fullName = child.fullname || ''
      form.value.status = child.status || ''
      form.value.email = user.email || ''
      form.value.phoneNo = user.phoneNo || ''
    } else {
      form.value.fullName = user.fullname || ''
      form.value.email = user.email || ''
      form.value.phoneNo = user.phoneNo || ''
    }
  }
})

// Watch props untuk update saat kembali dari step berikutnya
watch(() => props.formData?.step1, (newData) => {
  if (newData) {
    form.value = { ...newData }
  }
}, { deep: true })

// Computed untuk validasi form
const isFormValid = computed(() => {
  return form.value.fullName && 
         form.value.email && 
         form.value.phoneNo && 
         form.value.status &&
         (form.value.isVerified ? form.value.file : true)
})

// Computed untuk file size
const fileSize = computed(() => {
  if (form.value.file) {
    const sizeInMB = (form.value.file.size / (1024 * 1024)).toFixed(2)
    return `${sizeInMB} MB`
  }
  return ''
})

// Handle file upload
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  isUploading.value = true

  try {
    const token = Cookies.get('token')
    const formDataUpload = new FormData()
    formDataUpload.append('files[]', file)

    const response = await axios.post('/upload', formDataUpload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })

    const fileUrl = response.data.data.urls[0]
    
    form.value.file = file
    form.value.fileName = file.name
    form.value.fileUrl = fileUrl
    
    // Auto save setelah upload
    emit('updateFormData', { step1: form.value })
  } catch (error) {
    console.error('Upload error:', error)
    alert('Gagal upload file')
  } finally {
    isUploading.value = false
  }
}

// Handle file delete
const handleFileDelete = () => {
  form.value.file = null
  form.value.fileName = ''
  form.value.fileUrl = ''
  
  // Auto save setelah delete
  emit('updateFormData', { step1: form.value })
}

// Handle next
const handleNext = () => {
  if (!isFormValid.value) return
  
  // Emit save dulu
  emit('save', { step1: form.value })
  
  // Lanjut ke step 2
  emit('next')
}
</script>