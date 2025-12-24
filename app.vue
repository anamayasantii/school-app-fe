<template>
  <NuxtLayout>
    <div class="antialiased relative">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

// Panggil langsung tanpa onMounted
authStore.initAuth()
</script>