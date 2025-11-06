<template>
  <div class="profile-info">
    <NuxtLink to="/profile">
      <div class="profile-picture">
        <!-- SVG ketika belum ada foto profil -->
        <svg
          v-if="!hasProfileImage"
          class="w-10 h-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="#082519"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          >
            <path
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"
            />
            <path
              d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"
            />
          </g>
        </svg>

        <!-- Image ketika sudah ada foto profil -->
        <img
          v-else
          :src="authStore.user.image"
          alt="Profile Picture"
          class="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
        />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const hasProfileImage = computed(() => {
  return authStore.user && authStore.user.image;
});
</script>

<style scoped>
.profile-info {
  padding: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease-in-out;
  display: inline-block;
}
</style>
