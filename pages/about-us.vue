<template>
  <section class="bg-white py-20">
    <div class="max-w-5xl mx-auto px-6 text-center">
      <!-- Heading -->
      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        Proses yang disederhanakan<br />dalam satu platform.
      </h1>
      
      <!-- Description -->
      <p class="text-lg text-gray-700 max-w-4xl mx-auto mb-10">
        Komprehensif, mudah dinavigasi untuk mengakses informasi kunci tentang penawaran, budaya, dan fasilitas masing-masing institusi.
      </p>
      
      <!-- CTA Button -->
      <button class="bg-[#1a3a2e] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#142d24] transition mb-8">
        Baca Selengkapnya
      </button>
      
      <!-- User Avatars & Text -->
      <div class="flex items-center justify-center gap-4">
        <div class="flex -space-x-3">
          <img src="" alt="User 1" class="w-12 h-12 rounded-full border-2 border-white object-cover" />
          <img src="" alt="User 2" class="w-12 h-12 rounded-full border-2 border-white object-cover" />
          <img src="" alt="User 3" class="w-12 h-12 rounded-full border-2 border-white object-cover" />
          <img src="" alt="User 4" class="w-12 h-12 rounded-full border-2 border-white object-cover" />
        </div>
        <p class="text-gray-900 font-medium">
          24.000+ Siswa & Orang Tua Dibantu
        </p>
      </div>
    </div>
  </section>
  <section class="bg-white py-16">
    <div class="max-w-5xl mx-auto px-6">
      <!-- Hero Image -->
      <div class="mb-16">
        <img 
          src="@/assets/images/about-us1.jpg" 
          alt="Team Meeting" 
          class="w-full h-[400px] object-cover rounded-3xl"
        />
      </div>
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Stat 1 -->
        <div>
          <h3 class="text-4xl font-bold text-gray-900 mb-2">1.200+</h3>
          <p class="text-gray-600">Sekolah Terdaftar</p>
        </div>
        
        <!-- Stat 2 -->
        <div>
          <h3 class="text-4xl font-bold text-gray-900 mb-2">40.000+</h3>
          <p class="text-gray-600">Pengguna Aktif</p>
        </div>
        
        <!-- Stat 3 -->
        <div>
          <h3 class="text-4xl font-bold text-gray-900 mb-2">27,5 Juta+</h3>
          <p class="text-gray-600">Jam Disimpan</p>
        </div>
        
        <!-- Stat 4 -->
        <div>
          <h3 class="text-4xl font-bold text-gray-900 mb-2">32+</h3>
          <p class="text-gray-600">Provinsi Tercover</p>
        </div>
      </div>
    </div>
  </section>
  <section class="bg-white py-16">
    <div class="max-w-5xl mx-auto px-6">
      <!-- Section Title -->
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
        Jelajahi sekolah-sekolah<br />Anda berdasarkan kategori.
      </h2>

      <!-- Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <!-- Left Column: Cari & Saring -->
        <div class="bg-gray-50 rounded-3xl p-8">
          <!-- Category Cards -->
          <div class="space-y-6 mb-8">
            <!-- Sekolah Negeri -->
            <div class="bg-white rounded-2xl p-6 flex items-start gap-4">
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-1">Sekolah Negeri</h3>
                <p class="text-sm text-gray-600">Sekolah yang didanai pemerintah yang menawarkan pendidikan gratis.</p>
              </div>
            </div>

            <!-- Sekolah Swasta -->
            <div class="bg-white rounded-2xl p-6 flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zm0 2.18L18.18 7 12 9.82 5.82 7 12 4.18zM2 17l10 5 10-5v-5l-10 5-10-5v5z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-1">Sekolah Swasta</h3>
                <p class="text-sm text-gray-600">Sekolah yang didanai secara independen dengan biaya pendidikan.</p>
              </div>
            </div>
          </div>

          <!-- Section Info -->
          <div class="mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Cari & Saring</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Schoolpedia membantu siswa dan orang tua menemukan informasi detail tentang sekolah, termasuk fasilitas, program, dan sejarah.
            </p>
          </div>

          <!-- CTA Button -->
          <button class="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition">
            Pelajari lebih lanjut
          </button>
        </div>

        <!-- Right Column: Bandingkan & Putuskan -->
        <div class="bg-gray-50 rounded-3xl p-8">
          <!-- School Cards -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            <!-- School Card 1 -->
            <div class="bg-white rounded-xl overflow-hidden">
              <div class="relative">
                <img src="" alt="School" class="w-full h-32 object-cover" />
                <span class="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full font-medium">🎓 Terakreditasi A</span>
                <span class="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded-full font-medium">🏛️ Kebangsaan</span>
              </div>
              <div class="p-3">
                <span class="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded mb-2 font-medium">✓ Terverifikasi</span>
                <h4 class="text-sm font-bold text-gray-900 mb-2">Sekolah Internasional Inggris (...</h4>
                <div class="flex items-center gap-1 text-xs text-gray-600 mb-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  </svg>
                  <span>Jakarta, Jawa</span>
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <div class="flex items-center gap-1">
                    <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <span class="text-xs font-bold">4.3</span>
                  </div>
                  <span class="text-xs text-gray-500">(171 Ulasan)</span>
                </div>
                <div class="flex items-center gap-1 text-xs">
                  <span class="text-gray-600">💰</span>
                  <span class="font-medium text-gray-900">Tidak Keseluruhan</span>
                </div>
              </div>
            </div>

            <!-- School Card 2 -->
            <div class="bg-white rounded-xl overflow-hidden">
              <div class="relative">
                <img src="" alt="School" class="w-full h-32 object-cover" />
                <span class="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full font-medium">🎓 Terakreditasi A</span>
                <span class="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded-full font-medium">🏰 Budaya</span>
              </div>
              <div class="p-3">
                <span class="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded mb-2 font-medium">✓ Terverifikasi</span>
                <h4 class="text-sm font-bold text-gray-900 mb-2">Sekolah Interkultural Jakarta (...</h4>
                <div class="flex items-center gap-1 text-xs text-gray-600 mb-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  </svg>
                  <span>Jakarta, Jawa</span>
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <div class="flex items-center gap-1">
                    <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <span class="text-xs font-bold">4.5</span>
                  </div>
                  <span class="text-xs text-gray-500">(180 Ulasan)</span>
                </div>
                <div class="flex items-center gap-1 text-xs">
                  <span class="text-gray-600">💰</span>
                  <span class="font-medium text-gray-900">Tidak Keseluruhan</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Section Info -->
          <div class="mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Bandingkan & Putuskan</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Schoolpedia membantu siswa dan orang tua menemukan informasi detail tentang sekolah, termasuk fasilitas, program, dan sejarah.
            </p>
          </div>

          <!-- CTA Button -->
          <button class="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition">
            Pelajari lebih lanjut
          </button>
        </div>
      </div>

      <!-- Bottom Section: Sekolah, Terurut -->
      <div class="bg-gray-50 rounded-3xl p-8">
        <!-- Carousel Preview -->
        <div class="flex items-center gap-4 mb-8 overflow-hidden">
          <div class="relative flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold absolute -top-2 -left-2 z-10">
              #1
            </div>
            <img src="" alt="Green School Bali" class="w-48 h-32 object-cover rounded-xl" />
          </div>
          <div class="flex-1">
            <h4 class="text-lg font-bold text-gray-900 mb-2">Green School Bali</h4>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1 text-sm">
                <span>💰</span>
                <span class="font-medium">Nilai Keseluruhan</span>
              </div>
              <div class="flex items-center gap-1 text-sm">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span class="font-bold">5.0</span>
              </div>
            </div>
          </div>
          <div class="relative flex-shrink-0">
            <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-sm font-bold text-white absolute -top-2 -left-2 z-10">
              #2
            </div>
            <img src="" alt="School 2" class="w-48 h-32 object-cover rounded-xl" />
          </div>
        </div>

        <!-- Section Info -->
        <div class="mb-6">
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Sekolah, Terurut.</h3>
          <p class="text-gray-600 text-sm leading-relaxed max-w-2xl">
            Schoolpedia membantu siswa dan orang tua menemukan informasi detail tentang sekolah, termasuk fasilitas, program, dan sejarah.
          </p>
        </div>

        <!-- CTA Button -->
        <button class="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition">
          Pelajari lebih lanjut
        </button>
      </div>
    </div>
  </section>
</template>