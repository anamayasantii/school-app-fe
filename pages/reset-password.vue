<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="mb-12">
        <!-- <img src="/logo.svg" alt="Schoola Advisor" class="h-8" /> -->
      </div>

      <div v-if="!success" class="bg-white rounded-lg shadow-sm p-8">
        <h1 class="text-2xl font-semibold text-gray-900 mb-2">
          Atur Kata Sandi Baru
        </h1>
        <p class="text-gray-600 mb-6">
          Buat kata sandi aman baru di bawah ini.
        </p>

        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Kata Sandi Baru
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Kata Sandi Baru"
              required
              :disabled="isLoading"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div class="mb-6">
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2">
              Masukkan Kembali Kata Sandi Baru
            </label>
            <input
              id="password_confirmation"
              v-model="passwordConfirmation"
              type="password"
              placeholder="Masukkan Kembali Kata Sandi Baru"
              required
              :disabled="isLoading"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600">{{ errorMessage }}</p>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Memproses...' : 'Daftar' }}
          </button>
        </form>
      </div>

      <div v-else class="bg-teal-50 rounded-lg shadow-sm p-8 text-center">
        <div class="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 class="text-2xl font-semibold text-gray-900 mb-3">
          Perubahan Kata Sandi Berhasil!
        </h1>
        <p class="text-gray-600 mb-6">
          Kata sandi Anda telah berhasil diubah, kami akan memberi tahu Anda jika ada masalah lain di akun Anda.
        </p>

        <button
          @click="navigateTo('/auth/login')"
          class="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Kembali ke Halaman Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from '@/lib/axios';
import { ref } from 'vue';

definePageMeta({
    layout: 'authPage'
})

const route = useRoute();
const password = ref('');
const passwordConfirmation = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const success = ref(false);

const token = route.query.token;
const email = route.query.email;

onMounted(() => {
  if (!token || !email) {
    errorMessage.value = 'Token atau email tidak valid. Silakan ulangi proses forgot password.';
  }
});

const handleSubmit = async () => {
  if (password.value !== passwordConfirmation.value) {
    errorMessage.value = 'Kata sandi tidak cocok.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    await axios.post('/reset-password', {
      password: password.value,
      password_confirmation: passwordConfirmation.value,
      token: token,
      email: email
    });

    success.value = true;
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
};
</script>