<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div class="flex justify-center mb-6">
          <div class="bg-blue-100 rounded-full p-4">
            <svg class="h-16 w-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Periksa Email Anda</h2>
        <p class="text-gray-600">SILAKAN PERIKSA PESAN EMAIL PADA <b>KOTAK MASUK</b> ATAU <b>FOLDER SPAM</b> UNTUK MENGGANTI KATA SANDI.</p>
      <br />
        <p class="text-gray-600 font-extrabold">PERLU DIPERHATIKAN BAHWA EMAIL VERIFIKASI MUNGKIN MENGALAMI KETERLAMBATAN PENGIRIMAN SEKITAR 2–5 MENIT, MOHON DITUNGGU.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'authPage'
})
</script>