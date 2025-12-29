import { useAuthStore } from '@/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const authStore = useAuthStore()
    
    if (!authStore.isLoggedIn) {
      useState('showLoginModal', () => true)
      useState('intendedRoute', () => to.fullPath)
      useState('fromMiddleware', () => true)
      return abortNavigation()
    }
  }
})