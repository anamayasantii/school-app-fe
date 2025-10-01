<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Progress Steps -->
      <div class="flex items-center justify-center mb-12">
        <div class="flex items-center">
          <!-- Step 1 - Completed -->
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold mb-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="text-sm font-medium text-green-500 text-center">Detail Anda</div>
          </div>
          
          <div class="w-32 h-0.5 bg-green-500 mx-4 mt-[-30px]"></div>
          
          <!-- Step 2 - Completed -->
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold mb-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="text-sm text-green-500 font-medium text-center">Tinjau Sekolah</div>
          </div>
          
          <div class="w-32 h-0.5 bg-gray-400 mx-4 mt-[-30px]"></div>
          
          <!-- Step 3 - Active -->
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold mb-2">
              3
            </div>
            <div class="text-sm text-black font-medium text-center">Langkah Terakhir</div>
          </div>
        </div>
      </div>

      <!-- Form Content -->
      <div class="bg-white rounded-lg p-8 shadow-sm">
        <h1 class="text-3xl font-bold mb-2">Baca pedoman</h1>
        <p class="text-gray-600 mb-8">Silakan isi kolom di bawah ini dengan rincian kontak Anda.</p>

        <!-- Pedoman Section -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold mb-3">Pedoman</h2>
          <p class="text-sm text-gray-700 mb-4">Bagaimana Anda menilai sekolah ini secara keseluruhan?</p>

          <!-- List Pedoman -->
          <ul class="space-y-2 mb-6">
            <li class="flex items-start text-sm text-gray-700">
              <span class="inline-block w-1.5 h-1.5 bg-black rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              <span>Bersikaplah jujur dan konstruktif dalam umpan balik Anda</span>
            </li>
            <li class="flex items-start text-sm text-gray-700">
              <span class="inline-block w-1.5 h-1.5 bg-black rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              <span>Fokus pada pengalaman pribadi Anda</span>
            </li>
            <li class="flex items-start text-sm text-gray-700">
              <span class="inline-block w-1.5 h-1.5 bg-black rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              <span>Hindari membagikan informasi pribadi tentang individu</span>
            </li>
            <li class="flex items-start text-sm text-gray-700">
              <span class="inline-block w-1.5 h-1.5 bg-black rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              <span>Ulasan dimoderasi sebelum diterbitkan</span>
            </li>
            <li class="flex items-start text-sm text-gray-700">
              <span class="inline-block w-1.5 h-1.5 bg-black rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              <span>Ulasan yang terverifikasi ditandai dengan lencana khusus</span>
            </li>
          </ul>

          <!-- Checkbox 1 -->
          <div class="flex items-start mb-4">
            <label class="flex items-start cursor-pointer">
              <div class="flex items-center h-5 mt-0.5">
                <input
                  type="checkbox"
                  v-model="agreements.agreement1"
                  class="hidden"
                />
                <div 
                  class="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                  :class="agreements.agreement1 ? 'border-black bg-black' : 'border-gray-300 bg-white'"
                >
                  <svg 
                    v-if="agreements.agreement1"
                    class="w-4 h-4 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    stroke-width="3"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span class="ml-3 text-sm text-gray-700">Saya setuju dengan pedoman</span>
            </label>
          </div>

          <!-- Checkbox 2 -->
          <div class="flex items-start">
            <label class="flex items-start cursor-pointer">
              <div class="flex items-center h-5 mt-0.5">
                <input
                  type="checkbox"
                  v-model="agreements.agreement2"
                  class="hidden"
                />
                <div 
                  class="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                  :class="agreements.agreement2 ? 'border-black bg-black' : 'border-gray-300 bg-white'"
                >
                  <svg 
                    v-if="agreements.agreement2"
                    class="w-4 h-4 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    stroke-width="3"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span class="ml-3 text-sm text-gray-700">Saya mengakui konsekuensi dari pedoman</span>
            </label>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between pt-6">
          <button 
            @click="$emit('back')"
            class="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </button>
          <button
            @click="handleSubmit"
            :disabled="!isFormValid"
            :class="[
              'px-8 py-3 rounded-lg font-medium transition-colors flex items-center',
              isFormValid
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            Kirim
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
const emit = defineEmits(['submit', 'back'])

// Agreements checkboxes
const agreements = ref({
  agreement1: false,
  agreement2: false
})

// Computed untuk validasi form - harus centang semua
const isFormValid = computed(() => {
  return agreements.value.agreement1 && agreements.value.agreement2
})

// Handle submit button
const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit')
  }
}
</script>

<style scoped>
/* Custom styling jika diperlukan */
</style>