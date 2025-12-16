<script>
export const description = "A simple login form."
</script>

<script setup>
import LoginForm from "@/components/admin/LoginForm.vue"
import authPage from "~/layouts/authPage.vue";

definePageMeta({
  layout: 'authPage'
})
</script>

<template>
  <authPage>
    <div class="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  </authPage>
</template>
