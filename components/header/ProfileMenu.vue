<template>
  <div class="profile-info">
    <!-- Profile Picture Only -->
     <NuxtLink to="/profile">
    <div class="profile-picture">
      <img
        :src="profileImage"
        alt="Profile Picture"
        class="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
      />
    </div>
  </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import profilePictureDefault from '@/assets/images/profile-picture.png'

const authStore = useAuthStore()

// Computed untuk gambar profil
const profileImage = computed(() => {
  if (authStore.user && authStore.user.image) {
    return authStore.user.image
  }
  return profilePictureDefault
})
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