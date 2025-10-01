<!-- components/profile/FormStepOne.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left Side - Background -->
    <div class="flex-1 relative bg-cover bg-center bg-no-repeat" 
         :style="`background-image: url('${backgroundImage}')`">
    </div>

    <!-- Right Side - Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <!-- Progress Indicator -->
        <div class="text-center mb-8">
          <div class="text-sm text-teal-600 font-medium mb-2">LANGKAH {{ currentStep }} DARI 3</div>
          <div class="flex justify-center space-x-2 mb-6">
          </div>
        </div>

        <!-- Form Title -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">
            {{ userRole === 'student' ? 'Lengkapi Informasi Diri' : 'Tambahkan Peserta Didik Anda' }}
          </h1>
          <p class="text-gray-600">
            {{ userRole === 'student' 
                ? 'Tambahkan informasi tentang Anda.' 
                : 'Tambahkan informasi tentang peserta didik Anda.' }}
          </p>
        </div>

        <!-- Form Fields -->
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ userRole === 'student' ? 'Nama Lengkap' : 'Nama Lengkap Peserta Didik' }}
            </label>
            <input
              v-model="form.fullname"
              type="text"
              :class="[
                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent',
                userRole === 'student' ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
              ]"
              :readonly="userRole === 'student'"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Lahir
            </label>
            <input
              v-model="form.dateOfBirth"
              type="date"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nomer Induk Siswa Nasional/Nomor Induk Mahasiswa
            </label>
            <input
              v-model="form.nisn"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="NISN/NIM"
            />
          </div>

          <div v-if="userRole === 'parent'">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Hubungan dengan Peserta Didik
            </label>
            <div class="relative">
              <select
                v-model="form.relation"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Pilih hubungan</option>
                <option value="Orang Tua">Orang Tua</option>
                <option value="Wali">Wali</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4 pt-6">
          <button
            type="button"
            @click="handlePrev"
            class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Kembali
          </button>
          <button
            type="button"
            @click="handleNext"
            :disabled="!isFormValid"
            :class="[
              'flex-1 px-6 py-3 rounded-lg font-medium transition-colors',
              isFormValid 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            ]"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import backgroundImage from '~/assets/images/register1.jpg'
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'

// Props
const props = defineProps({
  currentStep: Number,
  formData: Object
})

// Emits
const emit = defineEmits(['next', 'prev', 'save'])

const authStore = useAuthStore()
const currentStep = props.currentStep || 1

// Form data local
const form = ref({
  fullname: '',
  dateOfBirth: '',
  nisn: '',
  relation: ''
})

// Computed
const userRole = computed(() => {
  const roles = authStore.user?.roles
  
  // Handle array of roles
  if (Array.isArray(roles)) {
    return roles.includes('parent') ? 'parent' : 'student'
  }
  
  // Handle string role (fallback)
  return roles || 'student'
})

const isFormValid = computed(() => {
  const requiredFields = ['dateOfBirth', 'nisn']
  
  if (userRole.value === 'parent') {
    requiredFields.push('fullname', 'relation')
  }
  
  return requiredFields.every(field => form.value[field])
})

// Methods
const handleNext = () => {
  if (!isFormValid.value) return
  
  // Save data to parent
  emit('save', form.value, 1)
  
  // Go to next step
  emit('next')
}

const handlePrev = () => {
  emit('prev')
}

// Watchers
watch(() => props.formData?.step1, (newData) => {
  if (newData) {
    Object.assign(form.value, newData)
  }
}, { immediate: true })

// Initialize
onMounted(() => {
  if (userRole.value === 'student' && authStore.user?.fullname) {
    form.value.fullname = authStore.user.fullname
  }
})
</script>