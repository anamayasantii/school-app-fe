// import { useAuthStore } from '@/store/auth'

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const authStore = useAuthStore()
//   const token = useCookie('token')

//   if (!token.value) {
//     return navigateTo('/dashboard/login')
//   }

//   if (!authStore.user) {
//     await authStore.fetchUser()
//   }

//   if (authStore.user?.role !== 'admin') {
//     return navigateTo('/')
//   }
// })