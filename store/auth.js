// store/auth.js
import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import axios from '@/lib/axios'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = computed(() => {
  const token = Cookies.get('token')
  console.log('Token:', token)
  console.log('User:', user.value)
  return !!token && !!user.value
})

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
    
    console.log('Fetch user response:', response.data)
    
    if (response.data.status === 'success') {
      user.value = response.data.data
      
      console.log('User set to:', user.value)
      console.log('User roles:', user.value?.roles)
      
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
  Cookies.remove('token')
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