<template>
  <div class="bg-[#FCF9F5] min-h-screen">
    <!-- Breadcrumb -->
    <div class="text-xs text-gray-400 py-6 px-4 max-w-6xl mx-auto">
      Home / Explore School / Jakarta / Sekolah Pelita Harapan Pluit Village
    </div>

    <div class="max-w-6xl mx-auto px-4">
      <!-- Header & Actions -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-center md:gap-6">
        <div>
          <h1 class="text-2xl font-bold mb-2">Sekolah Pelita Harapan Pluit Village</h1>
          <div class="flex items-center gap-3 text-xs text-gray-600 mb-2">
            <span class="flex items-center gap-1">
              <span class="text-yellow-500">★</span> 4.5/5
            </span>
            <span>(120 reviews)</span>
            <span class="rounded bg-green-50 text-green-600 px-2 py-0.5 ml-2">Recommended by 89% reviewers</span>
          </div>
        </div>
        <div class="flex mt-2 md:mt-0 gap-4">
          <button class="text-sm flex items-center gap-2 border px-3 py-1.5 rounded-lg border-[#F2ECE3] bg-[#F2ECE3]">
            📷 Add Photo
          </button>
          <button class="text-sm flex items-center gap-2 border px-3 py-1.5 rounded-lg border-[#F2ECE3] bg-[#F2ECE3]">
            ❤️ Save
          </button>
        </div>
      </div>

      <!-- GALLERY -->
      <div class="grid grid-cols-4 gap-2 mt-4 mb-8">
        <img src="assets/images/icon-kuliah.jpg" alt="School Main" class="col-span-2 row-span-2 object-cover rounded-xl h-48 md:h-64 w-full" />
      </div>

      <!-- NAVIGATION TABS -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button class="px-4 py-2 text-sm rounded-lg bg-[#F2ECE3] font-medium text-[#1D2B29]">Overview</button>
        <button class="px-4 py-2 text-sm rounded-lg bg-[#F2ECE3] text-gray-500">Location</button>
        <button class="px-4 py-2 text-sm rounded-lg bg-[#F2ECE3] text-gray-500">Facility</button>
        <button class="px-4 py-2 text-sm rounded-lg bg-[#F2ECE3] text-gray-500">Fee</button>
        <button class="px-4 py-2 text-sm rounded-lg bg-[#F2ECE3] text-gray-500">Review</button>
      </div>

      <!-- 2 COLUMN DETAILS LAYOUT -->
      <div class="flex flex-col md:flex-row md:gap-8">
        <div class="flex-1 space-y-8">
          <!-- Overview -->
          <div>
            <h2 class="font-bold mb-1 text-md">Overview</h2>
            <p class="text-gray-700 text-sm">
              SPH Pluit Village merupakan sekolah unggulan di Jakarta dengan kurikulum nasional dan internasional. Fasilitas lengkap dengan lingkungan belajar yang nyaman. SPH Pluit Village mendorong pengembangan karakter, inovasi, dan prestasi akademik anak didik.
            </p>
          </div>
          <!-- Location -->
          <div>
            <h2 class="font-bold mb-1 text-md">Location</h2>
            <p class="text-gray-700 text-sm mb-1">
              Jl. Pluit Selatan Raya No. 1, Penjaringan, Jakarta Utara, DKI Jakarta, 14450
            </p>
            <div class="flex items-center gap-2 mb-1 text-sm text-green-700">
              <svg width="18" height="18" class="inline mr-1" fill="none" viewBox="0 0 24 25"><path d="M12 12C11.337 ..." fill="#55C859"/></svg>
              <a href="#" class="underline">View on Google Maps</a>
            </div>
          </div>
          <!-- Official Contact -->
          <div>
            <h2 class="font-bold mb-1 text-md">Official Contact</h2>
            <div class="flex flex-col text-sm text-gray-700">
              <span>☎️ 021 6667 1234</span>
              <span>☎️ 0822 2334 1230</span>
              <span>✉️ info@sph.edu</span>
            </div>
          </div>
          <!-- Facility -->
          <div>
            <h2 class="font-bold mb-1 text-md">Facility</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-sm">
              <span>🏫 Kelas Ber-AC, Aula</span>
              <span>⚽️ Lapangan & Sarana Lengkap</span>
              <span>🧑‍💻 Peralatan Komputer & IT</span>
              <span>📖 Perpustakaan modern</span>
              <span>🛡️ Keamanan 24 jam & CCTV</span>
              <span>🅿️ Lahan parkir luas</span>
              <span>🎨 Studio Musik & Seni Kreatif</span>
              <span>🧪 Laboratorium Lengkap</span>
            </div>
          </div>
          <!-- Education Program -->
          <div>
            <h2 class="font-bold mb-1 text-md">Education Program</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-sm">
              <div>
                <b>Jenjang Pendidikan:</b>
                <ul class="list-disc pl-5">
                  <li>Kindergarten - TK</li>
                  <li>Primary - SD</li>
                  <li>Middle School - SMP</li>
                  <li>Senior High - SMA</li>
                </ul>
              </div>
              <div>
                <b>Kurikulum:</b>
                <ul class="list-disc pl-5">
                  <li>IB (International Baccalaureate) Primary Years</li>
                  <li>Cambridge British National Curriculum</li>
                  <li>STEAM Creative Exploration</li>
                  <li>National Curriculum (Kurikulum Nasional) </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Estimated Fees -->
          <div>
            <h2 class="font-bold mb-1 text-md">Estimated Price</h2>
            <table class="w-full text-xs mb-2">
              <thead>
                <tr class="bg-[#f2ece3]">
                  <th class="p-2">Education Level</th>
                  <th class="p-2">One-Time Fee</th>
                  <th class="p-2">Monthly Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-2">Kindergarten</td>
                  <td class="p-2">Rp15.500.000</td>
                  <td class="p-2">Rp3.500.000</td>
                </tr>
                <tr>
                  <td class="p-2">Primary</td>
                  <td class="p-2">Rp25.000.000</td>
                  <td class="p-2">Rp4.000.000</td>
                </tr>
                <tr>
                  <td class="p-2">Middle School</td>
                  <td class="p-2">Rp35.000.000</td>
                  <td class="p-2">Rp5.000.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- RATINGS & REVIEWS - SIDEBAR / BOTTOM ON MOBILE -->
        <div class="flex-1 mt-10 md:mt-0 md:pl-8 space-y-8">
          <!-- Ratings -->
          <div>
            <h2 class="font-bold mb-1 text-md">Ratings</h2>
            <div class="flex items-center gap-2 text-yellow-500 text-lg font-bold mb-1">
              <svg class="w-5 h-5" fill="#FFB800" viewBox="0 0 24 25"><path d="M12 17.77L18.18 ..."/></svg>
              4.5 <span class="text-gray-800 text-sm font-normal">/ 5.0</span>
            </div>
            <div class="w-full bg-[#f3ede2] rounded h-2 mb-2">
              <div class="bg-yellow-400 rounded h-2" style="width:85%"></div>
            </div>
            <div class="text-xs text-gray-500 mb-4">120 total reviews</div>
            <div class="flex items-center text-xs gap-2 mb-1">
              <span>5</span><span class="text-yellow-400">★</span>
              <div class="w-28 h-1 bg-[#f3ede2] rounded"><div class="bg-yellow-400 h-1 rounded" style="width:75%"></div></div>
              <span>90</span>
            </div>
            <div class="flex items-center text-xs gap-2 mb-1">
              <span>4</span><span class="text-yellow-400">★</span>
              <div class="w-28 h-1 bg-[#f3ede2] rounded"><div class="bg-yellow-400 h-1 rounded" style="width:15%"></div></div>
              <span>22</span>
            </div>
            <div class="flex items-center text-xs gap-2 mb-1">
              <span>3</span><span class="text-yellow-400">★</span>
              <div class="w-28 h-1 bg-[#f3ede2] rounded"><div class="bg-yellow-400 h-1 rounded" style="width:5%"></div></div>
              <span>6</span>
            </div>
            <div class="flex items-center text-xs gap-2 mb-1">
              <span>2</span><span class="text-yellow-400">★</span>
              <div class="w-28 h-1 bg-[#f3ede2] rounded"><div class="bg-yellow-400 h-1 rounded" style="width:2%"></div></div>
              <span>2</span>
            </div>
            <div class="flex items-center text-xs gap-2 mb-1">
              <span>1</span><span class="text-yellow-400">★</span>
              <div class="w-28 h-1 bg-[#f3ede2] rounded"><div class="bg-yellow-400 h-1 rounded" style="width:1%"></div></div>
              <span>0</span>
            </div>
          </div>
          <!-- Review Submission -->
          <div class="bg-[#f7f1e6] rounded-xl p-4">
            <h3 class="font-bold text-sm mb-2">Write a review about Sekolah Pelita Harapan Pluit Village</h3>
            <div class="grid grid-cols-2 gap-2 text-sm mb-2">
              <label>Kelengkapan Fasilitas:</label>
              <div>
                <input type="radio" name="facility" value="1" /> 1
                <input type="radio" name="facility" value="2" /> 2
                <input type="radio" name="facility" value="3" /> 3
                <input type="radio" name="facility" value="4" /> 4
                <input type="radio" name="facility" value="5" /> 5
              </div>
              <label>Proses Pembelajaran:</label>
              <div>
                <input type="radio" name="learning" value="1" /> 1
                <input type="radio" name="learning" value="2" /> 2
                <input type="radio" name="learning" value="3" /> 3
                <input type="radio" name="learning" value="4" /> 4
                <input type="radio" name="learning" value="5" /> 5
              </div>
              <label>Pelayanan Sekolah:</label>
              <div>
                <input type="radio" name="service" value="1" /> 1
                <input type="radio" name="service" value="2" /> 2
                <input type="radio" name="service" value="3" /> 3
                <input type="radio" name="service" value="4" /> 4
                <input type="radio" name="service" value="5" /> 5
              </div>
              <label>Keamanan:</label>
              <div>
                <input type="radio" name="security" value="1" /> 1
                <input type="radio" name="security" value="2" /> 2
                <input type="radio" name="security" value="3" /> 3
                <input type="radio" name="security" value="4" /> 4
                <input type="radio" name="security" value="5" /> 5
              </div>
            </div>
            <textarea class="w-full rounded border border-gray-200 mt-2 mb-2" rows="3" placeholder="Tulis review mu disini"></textarea>
            <div class="flex gap-2">
              <button class="px-4 py-2 rounded-lg bg-[#FFD36B] font-medium">Create</button>
              <button class="px-4 py-2 rounded-lg bg-gray-200 font-medium">Post Review</button>
            </div>
          </div>
        </div>
      </div>

      <!-- REVIEW LIST -->
      <div class="mt-12">
        <h2 class="font-bold mb-4 text-md">Reviews about Sekolah Pelita Harapan Pluit Village</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="rounded-xl bg-[#F2ECE3] p-6">
            <div class="flex items-center gap-3 mb-2">
              <img src="assets/images/icon-kuliah.jpg" class="w-8 h-8 rounded-full object-cover" />
              <div>
                <div class="font-bold text-sm">Ayu Setiawati <span class="text-gray-400 font-normal text-xs ml-2">August 2025</span></div>
                <div class="flex gap-1 text-xs text-gray-600 mb-1">
                  <span>Parent</span> · <span>SD</span> · <span>Jakarta</span>
                </div>
              </div>
            </div>
            <div class="flex items-center text-yellow-400 mb-1">
              <svg width="16" height="16" fill="#FFB800" viewBox="0 0 24 25"><path d="M12 17.77L..." /></svg>
              <span class="ml-1 font-semibold text-gray-800">5.0</span>
            </div>
            <div class="font-bold mb-1">Superb Experience!</div>
            <div class="text-gray-700 text-sm mb-2">
              Fasilitas lengkap, guru perhatian, dan lingkungan sekolah sangat positif untuk anak-anak kami. Sangat direkomendasikan!
            </div>
          </div>
          <div class="rounded-xl bg-[#F2ECE3] p-6">
            <div class="flex items-center gap-3 mb-2">
              <img src="assets/images/icon-kuliah.jpg" class="w-8 h-8 rounded-full object-cover" />
              <div>
                <div class="font-bold text-sm">Bagus Santoso <span class="text-gray-400 font-normal text-xs ml-2">March 2025</span></div>
                <div class="flex gap-1 text-xs text-gray-600 mb-1">
                  <span>Parent</span> · <span>SMP</span> · <span>Jakarta</span>
                </div>
              </div>
            </div>
            <div class="flex items-center text-yellow-400 mb-1">
              <svg width="16" height="16" fill="#FFB800" viewBox="0 0 24 25"><path d="M12 17.77L..." /></svg>
              <span class="ml-1 font-semibold text-gray-800">5.0</span>
            </div>
            <div class="font-bold mb-1">Superb Experience!</div>
            <div class="text-gray-700 text-sm mb-2">
              Anak kami senang belajar di SPH Pluit Village. Kurikulum variatif, fasilitas modern, dan lingkungan aman membuat kami puas.
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <footer class="border-t border-[#EEEEEE] mt-16 pt-8 text-center text-xs text-gray-500 pb-8">
        <div class="mb-2 flex justify-center items-center gap-2">
          <svg width="32" height="32" fill="none" class="inline-block"><circle cx="16" cy="16" r="16" fill="#F2ECE3"/></svg>
          <span>School Advisor</span>
        </div>
        <p>Subscribe to our newsletter</p>
        <form class="flex justify-center mt-2 gap-2">
          <input type="email" class="border px-3 py-1 rounded-lg" placeholder="Email address" />
          <button class="bg-[#FFD36B] text-[#1D2B29] px-4 py-1 rounded-lg font-medium">Subscribe</button>
        </form>
        <div class="mt-8 text-[10px] text-gray-400">
          &copy; 2025 School Advisor. All rights reserved.
        </div>
      </footer>
    </div>
  </div>
</template>
