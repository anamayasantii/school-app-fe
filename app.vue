<template>
  <NuxtLayout>
    <div class="antialiased relative">
      <NuxtPage />
      <Modal
        :isOpen="showLoginModal"
        type="info"
        title="Login Diperlukan"
        message="Anda harus login terlebih dahulu untuk mengakses halaman ini."
        confirmText="Login"
        cancelText="Batal"
        :showCancel="true"
        @confirm="handleLoginRedirect"
        @cancel="handleCloseModal"
        @close="handleCloseModal"
      />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import Modal from '@/components/common/Modal.vue'

const authStore = useAuthStore()
const router = useRouter()

authStore.initAuth()

const showLoginModal = useState('showLoginModal', () => false)
const intendedRoute = useState('intendedRoute', () => null)
const fromMiddleware = useState('fromMiddleware', () => false)

const handleCloseModal = () => {
  showLoginModal.value = false
  
  if (fromMiddleware.value && intendedRoute.value) {
    router.push('/')
  }
  
  intendedRoute.value = null
  fromMiddleware.value = false
}

const handleLoginRedirect = () => {
  showLoginModal.value = false
  router.push({
    path: '/auth/login',
    query: intendedRoute.value ? { redirect: intendedRoute.value } : {}
  })
  
  intendedRoute.value = null
  fromMiddleware.value = false
}
</script>