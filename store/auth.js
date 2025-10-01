// store/auth.js
import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import axios from '@/lib/axios'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  
  // Getters
  const isLoggedIn = computed(() => {
  const token = Cookies.get('token')
  console.log('Token:', token) // ✅ TAMBAH LOG INI
  console.log('User:', user.value)
  return !!token && !!user.value
})

  // Actions
  const initAuth = async () => {
  await fetchUser()
}

  const fetchUser = async () => {
  try {
    const token = Cookies.get('token')
    
    if (!token) {
      user.value = null
      return null
    }
    
    const response = await axios.get('/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.data.status === 'success') {
      user.value = response.data.data
      return user.value
    }
  } catch (error) {
    console.error('Fetch user error:', error)
    
    if (error.response?.status === 401) {
      Cookies.remove('token')
      user.value = null
    }
  }
}

  const logout = () => {
  // Hapus cookie
  Cookies.remove('token')
  // Clear user
  user.value = null
}

  return {
    user: readonly(user),
    isLoggedIn,
    fetchUser,
    logout,
    initAuth
  }
})