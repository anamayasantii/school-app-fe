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
import { Trash2, Eye } from 'lucide-vue-next'
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
const showImageDialog = ref(false)
const selectedImage = ref(null)

const getChildName = (user) => {
  if (user.role !== 'parent' || !user.child || user.child.length === 0) {
    return '-'
  }
  return user.child.map(c => c.fullname).join(', ')
}

const getRoleDisplay = (role) => {
  if (!role) return '-'
  const roleMap = {
    'admin': 'Admin',
    'parent': 'Parent',
    'student': 'Student'
  }
  return roleMap[role] || role.charAt(0).toUpperCase() + role.slice(1)
}

const getNISN = (user) => {
  return user.nisn || '-'
}

const getSchoolName = (user) => {
  return user.schoolDetail || '-'
}

const getSchoolValidation = (user) => {
  if (user.riwayatPendidikan && user.riwayatPendidikan.length > 0) {
    const activeSchool = user.riwayatPendidikan.find(r => r.status === 'aktif')
    return activeSchool?.schoolValidation || null
  }
  return null
}

const openImageDialog = (imageUrl, event) => {
  event.stopPropagation()
  selectedImage.value = imageUrl
  showImageDialog.value = true
}

const closeImageDialog = () => {
  showImageDialog.value = false
  selectedImage.value = null
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

      <div v-if="loading" class="text-center py-8">
        <p>Loading...</p>
      </div>

      <div v-else-if="error" class="text-red-500 text-center py-8">
        <p>Error: {{ error }}</p>
      </div>

      <div v-else class="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow class="bg-gray-200">
              <TableHead class="font-semibold text-black">ID</TableHead>
              <TableHead class="font-semibold text-black">Fullname</TableHead>
              <TableHead class="font-semibold text-black">Child Name</TableHead>
              <TableHead class="font-semibold text-black">Email</TableHead>
              <TableHead class="font-semibold text-black">Role</TableHead>
              <TableHead class="font-semibold text-black">NISN/NIM</TableHead>
              <TableHead class="font-semibold text-black">School Name</TableHead>
              <TableHead class="font-semibold text-black">Image</TableHead>
              <TableHead class="font-semibold text-black text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow 
              v-for="(user, index) in users" 
              :key="user.id"
              class=" hover:bg-gray-50"
            >
              <TableCell>{{ (currentPage - 1) * limit + index + 1 }}</TableCell>
              <TableCell>{{ user.fullname || '-' }}</TableCell>
              <TableCell>{{ getChildName(user) }}</TableCell>
              <TableCell>
                <a :href="`mailto:${user.email}`" class="text-blue-600 hover:underline">
                  {{ user.email }}
                </a>
              </TableCell>
              <TableCell>{{ getRoleDisplay(user.role) }}</TableCell>
              <TableCell>{{ getNISN(user) }}</TableCell>
              <TableCell>{{ getSchoolName(user) }}</TableCell>
              <TableCell>
                <button
                  v-if="getSchoolValidation(user)"
                  @click="openImageDialog(getSchoolValidation(user), $event)"
                  class="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  <Eye class="w-4 h-4 text-blue-600" />
                </button>
                <span v-else class="text-gray-400">-</span>
              </TableCell>
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

    <Dialog :open="showImageDialog" @update:open="closeImageDialog">
      <DialogContent class="max-w-3xl">
        <DialogHeader>
          <DialogTitle>School Validation Image</DialogTitle>
        </DialogHeader>
        <div class="flex justify-center items-center">
          <img 
            v-if="selectedImage" 
            :src="selectedImage" 
            alt="School Validation" 
            class="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        </div>
        <DialogFooter>
          <Button @click="closeImageDialog" variant="outline">
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </dashboardLayout>
</template>