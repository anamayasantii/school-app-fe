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
          
          <div class="w-32 h-0.5 bg-gray-400 mx-4 mt-[-30px]"></div>
          
          <!-- Step 2 - Active -->
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold mb-2">
              2
            </div>
            <div class="text-sm text-black font-medium text-center">Tinjau Sekolah</div>
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
        <h1 class="text-3xl font-bold mb-2">Tulis ulasan</h1>
        <p class="text-gray-600 mb-8">Silakan isi kolom di bawah ini dengan detail kontak Anda.</p>

        <!-- Penilaian Keseluruhan -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold mb-2">Penilaian Keseluruhan</h2>
          <p class="text-sm text-gray-600 mb-4">Bagaimana Anda menilai sekolah ini secara keseluruhan?</p>
          
          <!-- Star Rating Display (Read-only, filled by backend) -->
          <div class="flex gap-2">
            <svg 
              v-for="star in 5" 
              :key="star"
              class="w-10 h-10"
              :class="star <= overallRating ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>

        <!-- Ulasan Anda -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold mb-4">Ulasan Anda</h2>
          <p class="text-sm text-gray-600 mb-4">Bagikan pemikiran Anda di sini</p>

          <!-- Rating Categories -->
          <div class="space-y-4 mb-6">
            <!-- Fasilitas & Peralatan -->
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Fasilitas & Peralatan</span>
              <div class="flex gap-4">
                <label 
                  v-for="rating in 5" 
                  :key="'fasilitas-' + rating"
                  class="cursor-pointer"
                >
                  <input 
                    type="radio" 
                    :value="rating" 
                    v-model="ratings.fasilitas"
                    class="sr-only"
                  />
                  <span 
                    class="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors"
                    :class="ratings.fasilitas === rating ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-600 hover:border-gray-400'"
                  >
                    {{ rating }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Proses Pembelajaran -->
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Proses Pembelajaran</span>
              <div class="flex gap-4">
                <label 
                  v-for="rating in 5" 
                  :key="'pembelajaran-' + rating"
                  class="cursor-pointer"
                >
                  <input 
                    type="radio" 
                    :value="rating" 
                    v-model="ratings.pembelajaran"
                    class="sr-only"
                  />
                  <span 
                    class="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors"
                    :class="ratings.pembelajaran === rating ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-600 hover:border-gray-400'"
                  >
                    {{ rating }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Layanan Sekolah -->
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Layanan Sekolah</span>
              <div class="flex gap-4">
                <label 
                  v-for="rating in 5" 
                  :key="'layanan-' + rating"
                  class="cursor-pointer"
                >
                  <input 
                    type="radio" 
                    :value="rating" 
                    v-model="ratings.layanan"
                    class="sr-only"
                  />
                  <span 
                    class="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors"
                    :class="ratings.layanan === rating ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-600 hover:border-gray-400'"
                  >
                    {{ rating }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Keamanan Sekolah -->
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Keamanan Sekolah</span>
              <div class="flex gap-4">
                <label 
                  v-for="rating in 5" 
                  :key="'keamanan-' + rating"
                  class="cursor-pointer"
                >
                  <input 
                    type="radio" 
                    :value="rating" 
                    v-model="ratings.keamanan"
                    class="sr-only"
                  />
                  <span 
                    class="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors"
                    :class="ratings.keamanan === rating ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-600 hover:border-gray-400'"
                  >
                    {{ rating }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Kegiatan Sekolah -->
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Kegiatan Sekolah</span>
              <div class="flex gap-4">
                <label 
                  v-for="rating in 5" 
                  :key="'kegiatan-' + rating"
                  class="cursor-pointer"
                >
                  <input 
                    type="radio" 
                    :value="rating" 
                    v-model="ratings.kegiatan"
                    class="sr-only"
                  />
                  <span 
                    class="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors"
                    :class="ratings.kegiatan === rating ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-600 hover:border-gray-400'"
                  >
                    {{ rating }}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Pengalaman Anda -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold mb-4">Pengalaman Anda di {{ schoolName }}</h2>
          <p class="text-sm text-gray-600 mb-4">Bagikan pemikiran Anda di sini</p>

          <!-- Apa yang paling Anda sukai? -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Apa yang paling Anda sukai?</label>
            <textarea
              v-model="experience.liked"
              rows="4"
              maxlength="1000"
              placeholder="Jelaskan apa yang paling Anda sukai"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1 text-right">{{ experience.liked.length }}/1000</p>
          </div>

          <!-- Apa yang bisa diperbaiki? -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Apa yang bisa diperbaiki?</label>
            <textarea
              v-model="experience.improved"
              rows="4"
              maxlength="1000"
              placeholder="Jelaskan apa yang bisa diperbaiki"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1 text-right">{{ experience.improved.length }}/1000</p>
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
            @click="handleNext"
            :disabled="!isFormValid"
            :class="[
              'px-8 py-3 rounded-lg font-medium transition-colors flex items-center',
              isFormValid
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            Berikutnya
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
const props = defineProps({
  schoolName: {
    type: String,
    default: 'Jakarta Intercultural School'
  }
})

const emit = defineEmits(['next', 'back'])

// Ratings untuk 5 kategori
const ratings = ref({
  fasilitas: null,
  pembelajaran: null,
  layanan: null,
  keamanan: null,
  kegiatan: null
})

// Experience text
const experience = ref({
  liked: '',
  improved: ''
})

// Overall rating (akan di-set dari backend berdasarkan 5 kategori)
const overallRating = ref(0)

// Computed untuk validasi form
const isFormValid = computed(() => {
  return ratings.value.fasilitas !== null &&
         ratings.value.pembelajaran !== null &&
         ratings.value.layanan !== null &&
         ratings.value.keamanan !== null &&
         ratings.value.kegiatan !== null &&
         experience.value.liked.trim() !== '' &&
         experience.value.improved.trim() !== ''
})

// Handle next button
const handleNext = () => {
  if (isFormValid.value) {
    // Kirim data ke parent atau API
    emit('next', {
      ratings: ratings.value,
      experience: experience.value
    })
  }
}

// Watch perubahan ratings untuk update overall (simulasi, nanti dari backend)
watch(ratings, (newRatings) => {
  const allRatings = Object.values(newRatings)
  if (allRatings.every(r => r !== null)) {
    const sum = allRatings.reduce((acc, val) => acc + val, 0)
    overallRating.value = Math.round(sum / allRatings.length)
  } else {
    overallRating.value = 0
  }
}, { deep: true })
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>