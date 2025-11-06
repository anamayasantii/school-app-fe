<script setup>
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-vue-next'
import dashboardLayout from '~/layouts/dashboardLayout.vue'
import Cookies from 'js-cookie'
import axios from '@/lib/axios'

definePageMeta({
  layout: 'dashboardLayout'
})

const users = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const limit = ref(10)
const showDeleteDialog = ref(false)
const userToDelete = ref(null)

const getFirstName = (fullname) => {
  if (!fullname) return '-'
  const names = fullname.trim().split(' ')
  return names[0]
}

const getLastName = (fullname) => {
  if (!fullname) return '-'
  const names = fullname.trim().split(' ')
  return names.length > 1 ? names.slice(1).join(' ') : '-'
}

const getUsername = (email) => {
  if (!email) return '-'
  return email.split('@')[0]
}   

const getRoleDisplay = (roles) => {
  if (!roles || roles.length === 0) return '-'
  return roles[0].charAt(0).toUpperCase() + roles[0].slice(1)
}

const getNISN = (user) => {
  return user.nisn || '-'
}

const fetchUsers = async (page = 1) => {
  loading.value = true
  error.value = null
  
  try {
    const token = Cookies.get('token')
    
    if (!token) {
      error.value = 'Token tidak ditemukan, silakan login kembali'
      await navigateTo('/login')
      return
    }

    const response = await axios.get('/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page: page,
        limit: limit.value
      }
    })
    
    console.log('Response:', response.data)
    
    if (Array.isArray(response.data.data)) {
      users.value = []
      currentPage.value = 1
      totalPages.value = 1
    } else if (response.data.data && response.data.data.datas) {
      users.value = response.data.data.datas
      currentPage.value = response.data.data.meta.current_page
      totalPages.value = response.data.data.meta.last_page
    } else {
      users.value = []
      currentPage.value = 1
      totalPages.value = 1
    }
  } catch (err) {
    error.value = err.message
    console.error('Fetch users error:', err)
    console.error('Error response:', err.response?.data)
    
    if (err.response?.status === 401) {
      Cookies.remove('token')
      await navigateTo('/login')
    }
    
    users.value = []
    currentPage.value = 1
    totalPages.value = 1
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page) => {
  if (page < 1 || page > totalPages.value) return
  fetchUsers(page)
}

const handleRowClick = (user) => {
  navigateTo(`/dashboard/user-lists/${user.id}`)
}

const confirmDelete = (user, event) => {
  event.stopPropagation()
  userToDelete.value = user
  showDeleteDialog.value = true
}

const handleDelete = async () => {
  if (!userToDelete.value) return
  
  try {
    const token = Cookies.get('token')
    
    if (!token) {
      alert('Token tidak ditemukan, silakan login kembali')
      await navigateTo('/login')
      return
    }

    await axios.delete(`/users/${userToDelete.value.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    await fetchUsers(currentPage.value)
    
    showDeleteDialog.value = false
    userToDelete.value = null
    
    alert('User berhasil dihapus')
  } catch (err) {
    console.error('Delete error:', err)
    
    if (err.response?.status === 401) {
      Cookies.remove('token')
      await navigateTo('/login')
    } else {
      alert('Gagal menghapus user')
    }
  }
}

const cancelDelete = () => {
  showDeleteDialog.value = false
  userToDelete.value = null
}

const pageNumbers = computed(() => {
  const pages = []
  const maxVisible = 3
  
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage.value <= 2) {
      pages.push(1, 2, 3)
    } else if (currentPage.value >= totalPages.value - 1) {
      pages.push(totalPages.value - 2, totalPages.value - 1, totalPages.value)
    } else {
      pages.push(currentPage.value - 1, currentPage.value, currentPage.value + 1)
    }
  }
  
  return pages
})

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <dashboardLayout>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">User List</h1>
      
      <!-- Header Actions -->
      <div class="flex justify-end items-center mb-6">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Search:</span>
          <Input
            v-model="searchQuery"
            placeholder="Cari user..."
            class="w-80"
            disabled
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <p>Loading...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-red-500 text-center py-8">
        <p>Error: {{ error }}</p>
      </div>

      <!-- Table -->
      <div v-else class="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow class="bg-gray-200">
              <TableHead class="font-semibold text-black">ID</TableHead>
              <TableHead class="font-semibold text-black">First Name</TableHead>
              <TableHead class="font-semibold text-black">Last Name</TableHead>
              <TableHead class="font-semibold text-black">Username</TableHead>
              <TableHead class="font-semibold text-black">Email</TableHead>
              <TableHead class="font-semibold text-black">Role</TableHead>
              <TableHead class="font-semibold text-black">NIS</TableHead>
              <TableHead class="font-semibold text-black">Phone</TableHead>
              <TableHead class="font-semibold text-black text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow 
              v-for="(user, index) in users" 
              :key="user.id"
              @click="handleRowClick(user)"
              class="cursor-pointer hover:bg-gray-50"
            >
              <TableCell>{{ (currentPage - 1) * limit + index + 1 }}</TableCell>
              <TableCell>{{ getFirstName(user.fullname) }}</TableCell>
              <TableCell>{{ getLastName(user.fullname) }}</TableCell>
              <TableCell>{{ getUsername(user.email) }}</TableCell>
              <TableCell>
                <a :href="`mailto:${user.email}`" class="text-blue-600 hover:underline">
                  {{ user.email }}
                </a>
              </TableCell>
              <TableCell>{{ getRoleDisplay(user.roles) }}</TableCell>
              <TableCell>{{ getNISN(user) }}</TableCell>
              <TableCell>{{ user.phoneNo || '-' }}</TableCell>
              <TableCell>
                <div class="flex justify-end gap-2">
                  <button
                    @click="confirmDelete(user, $event)"
                    class="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                  >
                    <Trash2 class="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-end items-center gap-2 mt-6">
        <Button
          @click="handlePageChange(currentPage - 1)"
          :disabled="currentPage === 1"
          variant="outline"
          class="bg-gray-300 hover:bg-gray-400"
        >
          Previous
        </Button>
        
        <Button
          v-for="page in pageNumbers"
          :key="page"
          @click="handlePageChange(page)"
          :variant="currentPage === page ? 'default' : 'outline'"
          :class="currentPage === page ? 'bg-gray-700 text-white' : 'bg-gray-300 hover:bg-gray-400'"
        >
          {{ page }}
        </Button>
        
        <Button
          @click="handlePageChange(currentPage + 1)"
          :disabled="currentPage === totalPages"
          variant="outline"
          class="bg-gray-300 hover:bg-gray-400"
        >
          Next
        </Button>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <Dialog :open="showDeleteDialog" @update:open="cancelDelete">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus user "{{ userToDelete?.fullname }}"?
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button @click="cancelDelete" variant="outline">
            Batal
          </Button>
          <Button @click="handleDelete" variant="destructive">
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </dashboardLayout>
</template>