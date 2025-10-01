<template>
  <div class="header__auth flex justify-start items-center">
    <NuxtLink v-if="!isLoggedIn" to="/auth/login">
      <button class="login-button">
        Login
      </button>
    </NuxtLink>

    <div class="profile-menu">
      <ProfileMenu v-if="isLoggedIn"/>
    </div>
  </div>
</template>

<script setup>
import ProfileMenu from './ProfileMenu.vue'
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

// ✅ HAPUS onMounted, cukup computed aja
const isLoggedIn = computed(() => authStore.isLoggedIn)
</script>

<style scoped>
/* Login button sesuai spesifikasi Figma */
.login-button {
  width: 110px;
  height: 38px;
  margin: 0;
  padding: 12px 36px;
  border-radius: 32px;
  border: 1px solid rgba(40, 25, 12, 0.12);
  background: transparent;
  color: #28190C; /* text-gray-500 */
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* Sesuai spesifikasi gap dari Figma */
  overflow: hidden;
}

.login-button:focus {
  outline: none;
  ring: 2px;
  ring-color: #9CA3AF;
  ring-offset: 2px;
}

/* Existing styles */
.profile-menu {
  margin-right: 30px; /* Memperbesar jarak dari tombol login */
}
</style>