<template>
  <div class="profile-info">
    <NuxtLink to="/profile">
      <div class="profile-picture">
        <div
          v-if="!hasProfileImage"
          class="w-12 h-12 rounded-full bg-primary-green flex items-center justify-center"
        >
          <span class="text-white font-semibold text-lg">{{ userInitials }}</span>
        </div>
        <img
          v-else
          :src="authStore.user.image"
          alt="Profile Picture"
          class="w-12 h-12 rounded-full object-cover"
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

const getInitials = (fullname) => {
  const parts = fullname.split(" ");
  const lastTwoParts = parts.slice(-2);
  return lastTwoParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const userInitials = computed(() => {
  if (!authStore.user || !authStore.user.fullname) return "U";
  return getInitials(authStore.user.fullname);
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