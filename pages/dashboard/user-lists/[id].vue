<script setup>
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-vue-next'
import dashboardLayout from '~/layouts/dashboardLayout.vue'

definePageMeta({
  layout: 'dashboardLayout'
})

const route = useRoute()
const userId = route.params.id

// Dummy data untuk sementara
const user = ref({
  id: userId,
  fullname: 'John Doe Smith',
  email: 'john.doe@example.com',
  phoneNo: '081234567890',
  nisn: '1234567890',
  roles: ['student'],
  address: 'Jl. Contoh No. 123, Jakarta',
  dateOfBirth: '2005-05-15',
  gender: 'Male',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-10-20T14:45:00Z'
})

const loading = ref(false)

const goBack = () => {
  navigateTo('/dashboard/user-lists')
}

// Helper functions
const getFirstName = (fullname) => {
  if (!fullname) return '-'
  return fullname.trim().split(' ')[0]
}

const getLastName = (fullname) => {
  if (!fullname) return '-'
  const names = fullname.trim().split(' ')
  return names.length > 1 ? names.slice(1).join(' ') : '-'
}

const getRoleDisplay = (roles) => {
  if (!roles || roles.length === 0) return '-'
  return roles[0].charAt(0).toUpperCase() + roles[0].slice(1)
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatDateTime = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleString('id-ID', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <dashboardLayout>
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-6">
        <Button @click="goBack" variant="outline" size="icon">
          <ArrowLeft class="w-4 h-4" />
        </Button>
        <h1 class="text-3xl font-bold">User Detail</h1>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <p>Loading...</p>
      </div>

      <!-- User Detail Card -->
      <div v-else class="bg-white rounded-lg border p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Full Name -->
          <div>
            <label class="text-sm font-semibold text-gray-600">Full Name</label>
            <p class="text-lg mt-1">{{ user.fullname }}</p>
          </div>

          <!-- First Name -->
          <div>
            <label class="text-sm font-semibold text-gray-600">First Name</label>
            <p class="text-lg mt-1">{{ getFirstName(user.fullname) }}</p>
          </div>

          <!-- Last Name -->
          <div>
            <label class="text-sm font-semibold text-gray-600">Last Name</label>
            <p class="text-lg mt-1">{{ getLastName(user.fullname) }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="text-sm font-semibold text-gray-600">Email</label>
            <p class="text-lg mt-1">
              <a :href="`mailto:${user.email}`" class="text-blue-600 hover:underline">
                {{ user.email }}
              </a>
            </p>
          </div>

          <!-- Phone Number -->
          <div>
            <label class="text-sm font-semibold text-gray-600">Phone Number</label>
            <p class="text-lg mt-1">{{ user.phoneNo || '-' }}</p>
          </div>

          <!-- NISN -->
          <div>
            <label class="text-sm font-semibold text-gray-600">NISN</label>
            <p class="text-lg mt-1">{{ user.nisn || '-' }}</p>
          </div>

          <!-- Role -->
          <div>
            <label class="text-sm font-semibold text-gray-600">Role</label>
            <p class="text-lg mt-1">{{ getRoleDisplay(user.roles) }}</p>
          </div>

          <!-- Gender -->
          <div>
            <label class="text-sm font-semibold text-gray-600">Gender</label>
            <p class="text-lg mt-1">{{ user.gender || '-' }}</p>
          </div>

          <!-- Date of Birth -->
          <div>
            <label class="text-sm font-semibold text-gray-600">Date of Birth</label>
            <p class="text-lg mt-1">{{ formatDate(user.dateOfBirth) }}</p>
          </div>

          <!-- Address -->
          <div class="md:col-span-2">
            <label class="text-sm font-semibold text-gray-600">Address</label>
            <p class="text-lg mt-1">{{ user.address || '-' }}</p>
          </div>

          <!-- Created At -->
          <div>
            <label class="text-sm font-semibold text-gray-600">Created At</label>
            <p class="text-lg mt-1">{{ formatDateTime(user.createdAt) }}</p>
          </div>

          <!-- Updated At -->
          <div>
            <label class="text-sm font-semibold text-gray-600">Last Updated</label>
            <p class="text-lg mt-1">{{ formatDateTime(user.updatedAt) }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 mt-8 pt-6 border-t">
          <Button @click="goBack" variant="outline">
            Kembali
          </Button>
        </div>
      </div>
    </div>
  </dashboardLayout>
</template>