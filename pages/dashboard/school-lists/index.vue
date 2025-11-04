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
import { Pencil, Trash2 } from 'lucide-vue-next'
import dashboardLayout from '~/layouts/dashboardLayout.vue'
import axios from '@/lib/axios'

definePageMeta({
  layout: 'dashboardLayout'
})

const schools = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const limit = ref(12)

// Delete confirmation dialog
const showDeleteDialog = ref(false)
const schoolToDelete = ref(null)

const fetchSchools = async (page = 1) => {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get('/school-details', {
      params: {
        page: page,
        limit: limit.value,
        search: searchQuery.value || undefined
      }
    })
    
    console.log('Response:', response.data)
    console.log('Search query:', searchQuery.value)
    
    // Cek apakah data adalah array (data kosong) atau object (ada hasil)
    if (Array.isArray(response.data.data)) {
      // Data kosong
      schools.value = []
      currentPage.value = 1
      totalPages.value = 1
    } else if (response.data.data && response.data.data.datas) {
      // Ada hasil
      schools.value = response.data.data.datas
      currentPage.value = response.data.data.meta.current_page
      totalPages.value = response.data.data.meta.last_page
    } else {
      schools.value = []
      currentPage.value = 1
      totalPages.value = 1
    }
  } catch (err) {
    error.value = err.message
    console.error('Fetch schools error:', err)
    console.error('Error response:', err.response?.data)
    
    schools.value = []
    currentPage.value = 1
    totalPages.value = 1
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchSchools(1)
}

const handlePageChange = (page) => {
  if (page < 1 || page > totalPages.value) return
  fetchSchools(page)
}

const handleEdit = (school) => {
  // TODO: Implement edit functionality
  console.log('Edit school:', school)
}

const confirmDelete = (school) => {
  schoolToDelete.value = school
  showDeleteDialog.value = true
}

const handleDelete = async () => {
  if (!schoolToDelete.value) return
  
  try {
    await axios.delete(`/school-details/${schoolToDelete.value.id}`)
    
    // Refresh list after delete
    await fetchSchools(currentPage.value)
    
    // Close dialog
    showDeleteDialog.value = false
    schoolToDelete.value = null
    
    alert('Sekolah berhasil dihapus')
  } catch (err) {
    console.error('Delete error:', err)
    alert('Gagal menghapus sekolah')
  }
}

const cancelDelete = () => {
  showDeleteDialog.value = false
  schoolToDelete.value = null
}

// Generate page numbers for pagination
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
  fetchSchools()
})
</script>

<template>
  <dashboardLayout>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">School List</h1>
      
      <!-- Header Actions -->
      <div class="flex justify-between items-center mb-6">
        <Button class="bg-gray-400 hover:bg-gray-500">
          Tambah +
        </Button>
        
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Search:</span>
          <Input
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            placeholder="Cari sekolah..."
            class="w-80"
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
      <div v-else class="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow class="bg-gray-100">
              <TableHead class="font-semibold text-black">ID</TableHead>
              <TableHead class="font-semibold text-black">School</TableHead>
              <TableHead class="font-semibold text-black">Province</TableHead>
              <TableHead class="font-semibold text-black">District</TableHead>
              <TableHead class="font-semibold text-black">Sub District</TableHead>
              <TableHead class="font-semibold text-black">Level</TableHead>
              <TableHead class="font-semibold text-black">Status</TableHead>
              <TableHead class="font-semibold text-black text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(school, index) in schools" :key="school.id">
              <TableCell>{{ (currentPage - 1) * limit + index + 1 }}</TableCell>
              <TableCell>{{ school.name }}</TableCell>
              <TableCell>{{ school.provinceName || '-' }}</TableCell>
              <TableCell>{{ school.districtName || '-' }}</TableCell>
              <TableCell>{{ school.subDistrictName || '-' }}</TableCell>
              <TableCell>{{ school.educationLevelName || '-' }}</TableCell>
              <TableCell>{{ school.statusName || '-' }}</TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-2">
                  <button
                    @click="handleEdit(school)"
                    class="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                  >
                    <Pencil class="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    @click="confirmDelete(school)"
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
            Apakah Anda yakin ingin menghapus sekolah "{{ schoolToDelete?.name }}"?
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