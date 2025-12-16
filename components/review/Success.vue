<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Progress Steps -->
    <div class="bg-white py-8">
      <div class="max-w-3xl mx-auto px-4">
        <div class="flex items-center justify-center">
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
            
            <div class="w-32 h-0.5 bg-green-500 mx-4 mt-[-30px]"></div>
            
            <!-- Step 3 - Completed -->
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold mb-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="text-sm text-green-500 font-medium text-center">Langkah Terakhir</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Content -->
    <div class="bg-gradient-to-b from-green-50 to-green-100 py-20">
      <div class="max-w-2xl mx-auto px-4 text-center">
        <!-- Clapping Hands Icon -->
        <div class="mb-8 flex justify-center">
          <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.5 2C11.5 2 10.67 2.09 9.74 3.16C9.27 3.69 8.92 4.41 8.7 5.34L8.23 7.28C8.05 8.03 7.64 8.71 7.06 9.21L4.72 11.28C3.78 12.13 3.78 13.61 4.72 14.46C5.28 14.96 6.04 15.13 6.74 14.93L9.93 14.08C10.74 13.85 11.61 14.03 12.27 14.56L14.66 16.46C15.5 17.13 16.7 17.13 17.54 16.46L18.35 15.81C19.47 14.93 19.68 13.29 18.8 12.17L16.84 9.58C16.3 8.87 16.06 8 16.18 7.14L16.5 4.86C16.66 3.64 15.96 2.5 14.84 2.13C13.5 1.69 12.08 2 11.5 2ZM4.5 11L2.47 8.97C1.5 8 1.5 6.45 2.47 5.47C3.44 4.5 4.99 4.5 5.97 5.47L8 7.5L6.69 8.81L4.5 11ZM7.5 17L5.47 19.03C4.5 20 4.5 21.55 5.47 22.53C6.44 23.5 7.99 23.5 8.97 22.53L11 20.5L9.69 19.19L7.5 17ZM19.5 8L21.53 5.97C22.5 5 22.5 3.45 21.53 2.47C20.56 1.5 19.01 1.5 18.03 2.47L16 4.5L17.31 5.81L19.5 8Z"/>
            </svg>
          </div>
        </div>

        <!-- Success Message -->
        <h1 class="text-3xl md:text-4xl font-bold text-green-700 mb-4">
          Ulasan Anda telah dikirim.
        </h1>
        
        <p class="text-gray-700 leading-relaxed max-w-xl mx-auto mb-8">
          Ulasan Anda tentang <span class="font-semibold">{{ schoolName }}</span> telah berhasil dikirim.<br/>
          Kami menghargai umpan balik Anda dan berharap dapat<br/>
          membagikan wawasan Anda kepada orang lain.
        </p>

        <!-- Button -->
        <NuxtLink :to="`/school-details/${schoolId}`">
          <button class="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center">
            Lanjutkan
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  schoolId: {
    type: [String, Number],
    required: true
  },
  schoolName: {
    type: String,
    default: 'Jakarta Intercultural School'
  }
})
</script>

<style scoped>
/* Custom styling jika diperlukan */
</style>