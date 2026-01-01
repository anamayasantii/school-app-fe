<template>
  <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    <div class="hidden md:flex md:flex-1 relative bg-cover bg-center bg-no-repeat" 
         :style="`background-image: url('${backgroundImage}')`">
    </div>

    <div class="flex-1 flex items-center justify-center px-6 sm:px-8 py-8 md:py-12">
      <div class="w-full max-w-md">
        <div class="text-center mb-6 md:mb-8">
          <div class="text-sm text-teal-600 font-medium mb-2">
            LANGKAH {{ currentStep }} DARI 3
          </div>
        </div>

        <div class="text-center mb-6 md:mb-8">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {{ userRole === 'student' ? 'Lengkapi Informasi Diri' : 'Tambahkan Peserta Didik Anda' }}
          </h1>
          <p class="text-sm sm:text-base text-gray-600">
            {{ userRole === 'student' 
                ? 'Tambahkan informasi tentang Anda.' 
                : 'Tambahkan informasi tentang peserta didik Anda.' }}
          </p>
        </div>

        <div class="space-y-4 md:space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ userRole === 'student' ? 'Nama Lengkap' : 'Nama Lengkap Peserta Didik' }}
            </label>
            <input
              v-model="form.fullname"
              type="text"
              :class="[
                'w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base',
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
              class="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nomor Induk Siswa Nasional/Nomor Induk Mahasiswa
            </label>
            <input
              v-model="form.nisn"
              type="text"
              class="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
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
                class="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white text-sm sm:text-base"
              >
                <option value="">Pilih hubungan</option>
                <option value="Orang Tua">Orang Tua</option>
                <option value="Wali">Wali</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 pt-6">
          <button
            type="button"
            @click="handlePrev"
            class="w-full sm:flex-1 px-6 py-2.5 md:py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Kembali
          </button>
          <button
            type="button"
            @click="handleNext"
            :disabled="!isFormValid"
            :class="[
              'w-full sm:flex-1 px-6 py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base',
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
import backgroundImage from '~/assets/images/complete1.jpg'
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'

const props = defineProps({
  currentStep: Number,
  formData: Object
})

const emit = defineEmits(['next', 'prev', 'save'])

const authStore = useAuthStore()
const currentStep = props.currentStep || 1

const form = ref({
  fullname: '',
  dateOfBirth: '',
  nisn: '',
  relation: ''
})

const userRole = computed(() => {
  return authStore.user?.role || 'student'
})

const isFormValid = computed(() => {
  const requiredFields = ['dateOfBirth', 'nisn']
  
  if (userRole.value === 'parent') {
    requiredFields.push('fullname', 'relation')
  }
  
  return requiredFields.every(field => form.value[field])
})

const handleNext = () => {
  if (!isFormValid.value) return
  
  emit('save', form.value, 1)
  
  emit('next')
}

const handlePrev = () => {
  emit('prev')
}

watch(() => props.formData?.step1, (newData) => {
  if (newData) {
    Object.assign(form.value, newData)
  }
}, { immediate: true })

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUser()
  }
  
  if (userRole.value === 'student' && authStore.user?.fullname) {
    form.value.fullname = authStore.user.fullname
  }
})
</script>

<style scoped>
.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}

.bg-no-repeat {
  background-repeat: no-repeat;
}

input:focus,
select:focus {
  outline: none;
}

@media (max-width: 640px) {
  input, select, button {
    font-size: 16px;
  }
}
</style>