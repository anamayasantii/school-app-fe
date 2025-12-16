<template>
  <LoginForm />
</template>

<script setup>
import LoginForm from "~/components/auth/LoginForm.vue";

useHead({
  title: "Masuk - Schoola Advisor",
  meta: [
    {
      name: "description",
      content:
        "Masuk ke akun School Review Anda untuk mengakses fitur-fitur terbaik kami dan temukan sekolah impian Anda dengan mudah.",
    },
  ],
});

definePageMeta({
  layout: "authPage",
});
</script>
