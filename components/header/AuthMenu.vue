<template>
  <div class="header__auth flex justify-start items-center">
    <NuxtLink v-if="!isLoggedIn" to="/login">
      <!-- Tombol Login sesuai spesifikasi Figma -->
      <button class="login-button">
        Login
      </button>
    </NuxtLink>

    <div class="profile-menu ml-6">
      <ProfileMenu v-if="isLoggedIn"/>
    </div>
  </div>
</template>

<script setup>
import ProfileMenu from './ProfileMenu.vue';
import { computed } from 'vue';
import { useAuthStore } from '@/store/auth'; // Ganti ini untuk menggunakan Pinia

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isAuthenticated); // Mengambil status login dari store Pinia
</script>

<style scoped>
/* Login button sesuai spesifikasi Figma */
.login-button {
  width: 115px;
  height: 46px;
  padding: 12px 36px;
  border-radius: 32px;
  border: 1px solid rgba(40, 25, 12, 0.12);
  background: transparent;
  color: #28190C; /* text-gray-500 */
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* Sesuai spesifikasi gap dari Figma */
}

.login-button:focus {
  outline: none;
  ring: 2px;
  ring-color: #9CA3AF;
  ring-offset: 2px;
}

.login-button:active {
  transform: scale(0.98);
}

/* Existing styles */
.btn {
  padding: 8px 16px;
  border-radius: 7px;
  cursor: pointer;
  margin-right: 12px;
}

.btn-register {
  background-color: white;
  color: #4c4d4d;
  border: 1px solid #466543;
}

.btn-login {
  background-color: #466543;
  color: white;
  border: none;
}

.btn:hover {
  opacity: 0.8;
}

.profile-menu {
  margin-right: 30px; /* Memperbesar jarak dari tombol login */
}
</style>