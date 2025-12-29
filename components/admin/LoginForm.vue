<script setup>
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Cookies from 'js-cookie'
import { useAuthStore } from '@/store/auth'
import axios from '@/lib/axios'

definePageMeta({
  layout: 'authPage'
})

const isLoading = ref(false)
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    
    const response = await axios.post('/login', {
      email: form.email,
      password: form.password
    })
    
    if (response.data.status === 'success') {
      const { token, expiresAt } = response.data.data
      
      Cookies.set('token', token, { 
        expires: new Date(expiresAt),
        secure: true,
        sameSite: 'strict'
      })
      
      const authStore = useAuthStore()
      const userData = await authStore.fetchUser()

      console.log('User data:', userData)
      console.log('User role:', userData?.role)
      
      if (userData?.role !== 'admin') {
        Cookies.remove('token')
        authStore.logout()
        
        errorMessage.value = 'Hanya admin yang bisa login di sini. Silakan login di /auth/login'
        return
      }
      
      // Gunakan replace agar tidak bisa back ke login page
      await navigateTo('/dashboard', { replace: true })
    } else {
      errorMessage.value = response.data.message || 'Login gagal'
    }
    
  } catch (error) {
    console.error('Login failed:', error)
    
    if (error.response?.status === 401) {
      errorMessage.value = 'Email atau password salah'
    } else if (error.response?.status === 422) {
      errorMessage.value = 'Data tidak valid'
    } else {
      errorMessage.value = error.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">
        Login
      </CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleSubmit" class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            required
          />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
          </div>
          <Input 
            id="password" 
            v-model="form.password"
            type="password" 
            required 
          />
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
          {{ errorMessage }}
        </div>

        <Button type="submit" class="w-full" :disabled="isLoading">
          <span v-if="!isLoading">Login</span>
          <span v-else>Loading...</span>
        </Button>
      </form>
    </CardContent>
  </Card>
</template>