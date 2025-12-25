<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="mb-12">
        <!-- <img src="/logo.svg" alt="Schoola Advisor" class="h-8" /> -->
         <!-- <Logo class="h-8" /> -->
      </div>

      <div class="p-8">
        <h1 class="text-2xl font-semibold text-gray-900 mb-2">
          Lupa Kata Sandi
        </h1>
        <p class="text-gray-600 mb-6">
          Masukkan alamat email yang terkait dengan akun Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
        </p>

        <form @submit.prevent="handleSubmit">
          <div class="mb-6">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Email"
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
            {{ isLoading ? 'Mengirim...' : 'Kirim Tautan' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from '@/assets/Logo.vue';
import axios from '@/lib/axios';
import { ref } from 'vue';

definePageMeta({
    layout: 'authPage'
})

const email = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    await axios.post('/forgot-password', {
      email: email.value
    });

    await navigateTo('/announcement-forgot-password');
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
};
</script>