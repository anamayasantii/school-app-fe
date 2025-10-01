<template>
  <div>
    <ReviewSteps 
      :schoolId="id" 
      :schoolName="schoolName" 
    />
  </div>
</template>

<script setup>
import ReviewSteps from '@/components/review/index.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// Get route params
const route = useRoute()
const id = route.params.id  // ← Simple!

// Ambil data sekolah
//const schoolName = ref('Jakarta Intercultural School')
// Atau dari API:
const { data: school } = await useFetch(`/api/schools/${id}`)
</script>
