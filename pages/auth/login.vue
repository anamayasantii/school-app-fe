<template>
  <LoginForm />
</template>

<script setup>
import LoginForm from '~/components/auth/LoginForm.vue'

// Page meta
definePageMeta({
  layout: 'authPage'
})

// SEO
useSeoMeta({
  title: 'Login - Schools Advisor',
  description: 'Masuk ke akun Schools Advisor Anda'
})
</script>