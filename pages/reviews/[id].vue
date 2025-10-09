<template>
  <div>
    <ReviewSteps 
      v-if="school"
      :schoolId="id" 
      :schoolName="school.name" 
    />
    <div v-else-if="loading" class="min-h-screen flex items-center justify-center">
      <p>Loading...</p>
    </div>
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <p class="text-red-600">Error loading school data</p>
    </div>
  </div>
</template>

<script setup>
import ReviewSteps from '@/components/review/index.vue'
import axios from '@/lib/axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const school = ref(null)
const loading = ref(true)
const error = ref(false)

const fetchSchoolData = async () => {
  try {
    const response = await axios.get(`/school-details/${id}`)
    school.value = response.data.data || {}
    loading.value = false
  } catch (err) {
    console.error('Error fetching school data:', err)
    error.value = true
    loading.value = false
  }
}

onMounted(() => {
  fetchSchoolData()
})
</script>