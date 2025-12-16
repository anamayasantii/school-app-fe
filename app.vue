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

await authStore.initAuth()

// Init auth saat app start
onMounted(() => {
  authStore.initAuth()
})
</script>