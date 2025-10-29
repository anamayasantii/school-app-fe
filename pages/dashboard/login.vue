<script lang="ts">
export const description = "A simple login form."
</script>

<script setup>
import LoginForm from "@/components/LoginForm.vue"

definePageMeta({
  layout: 'authPage'
})
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center px-4">
    <LoginForm />
  </div>
</template>
