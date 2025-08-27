<script>
export const description = 'A login form with email and password. There\'s an option to login with Google and a link to sign up if you don\'t have an account.'
export const iframeHeight = '600px'
export const containerClass = 'w-full h-screen flex items-center justify-center px-4'
</script>

<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/store/auth'

const router = useRouter() // ✅ useRouter di component
const authStore = useAuthStore()

// Reactive data untuk form
const loginData = ref({
  email: "",
  password: ""
})

// Ambil state dari store
const isLoading = computed(() => authStore.isLoading)
const errorMessage = computed(() => authStore.error)

// ✅ Function untuk handle login + navigation
const login = async () => {
  const result = await authStore.login(loginData.value)
  
  if (result.success) {
    alert(result.message)
    // ✅ Navigation di-handle di component
    router.push('/') // atau route yang sesuai
  }
  // Error sudah di-handle di store dan akan muncul di errorMessage computed
}

// Function untuk redirect ke register
const goToRegister = () => {
  router.push('/register')
}

// Clear error saat user mulai mengetik
const clearError = () => {
  if (authStore.error) {
    authStore.clearError()
  }
}

definePageMeta({
  layout: "AuthPage",
});
</script>

<!-- template tetap sama -->

<template>
  <form @submit.prevent="login">
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
        <div class="grid gap-4">
          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ errorMessage }}
          </div>
          
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              v-model="loginData.email"
              :disabled="isLoading"
              @input="clearError"
              required
            />
          </div>
          
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password"
              v-model="loginData.password"
              :disabled="isLoading"
              @input="clearError"
              required 
            />
            <a href="#" class="ml-auto inline-block text-sm underline">
              Forgot your password?
            </a>
          </div>
          
          <Button 
            type="submit" 
            class="w-full"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Logging in...</span>
            <span v-else>Login</span>
          </Button>
        </div>
        
        <div class="mt-4 text-center text-sm">
          Belum punya akun?
          <a href="#" @click.prevent="goToRegister" class="underline">
            Register
          </a>
        </div>
      </CardContent>
    </Card>
  </form>
</template>