<!-- components/profile/ProfileEducationHistory.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 mt-6">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100">
      <h2 class="text-xl font-semibold text-gray-900">Riwayat Pendidikan</h2>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Education Item -->
      <div 
        v-for="(education, index) in educationHistory" 
        :key="index"
        class="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg"
        :class="{ 'mb-4': index < educationHistory.length - 1 }"
      >
        <!-- School Logo/Icon -->
        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
        </div>

        <!-- Education Details -->
        <div class="flex-1">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                {{ education.schoolName }}
                <span class="text-gray-400 font-normal text-base ml-2">
                  • {{ education.period }}
                </span>
              </h3>
              <p class="text-gray-600">{{ education.level }}</p>
            </div>
            
            <!-- Edit Button -->
            <button
              @click="handleEditEducation(education, index)"
              class="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <span>Ubah</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
          </div>

          <!-- Status Badge -->
          <div>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              {{ education.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="educationHistory.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Belum ada riwayat pendidikan</h3>
        <p class="text-gray-600 mb-4">Tambahkan riwayat pendidikan Anda</p>
      </div>

      <!-- Add Education Button - Always visible at bottom right -->
      <div class="flex justify-end mt-8">
        <button
          @click="handleAdd"
          class="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Tambah
        </button>
      </div>
    </div>

    <!-- Education Modal -->
    <ProfileEducationModal 
      :isOpen="isEducationModalOpen"
      :mode="modalMode"
      :educationData="selectedEducation"
      @close="handleCloseModal"
      @submit="handleSubmitModal"
      @delete="handleDeleteModal"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ProfileEducationModal from './ProfileEducationModal.vue'

const props = defineProps({
  educationData: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add', 'edit', 'delete'])

const isEducationModalOpen = ref(false)
const modalMode = ref('add')
const selectedEducation = ref({})

const educationHistory = computed(() => {
  return props.educationData || []
})

const handleAdd = () => {
  modalMode.value = 'add'
  selectedEducation.value = {}
  isEducationModalOpen.value = true
}

const handleEditEducation = (education, index) => {
  modalMode.value = 'edit'
  selectedEducation.value = { ...education, index }
  isEducationModalOpen.value = true
}

const handleCloseModal = () => {
  isEducationModalOpen.value = false
  selectedEducation.value = {}
}

const handleSubmitModal = (payload) => {
  if (payload.mode === 'add') {
    emit('add', payload.data)
  } else {
    emit('edit', { data: payload.data, index: selectedEducation.value.index })
  }
  handleCloseModal()
}

const handleDeleteModal = (educationData) => {
  emit('delete', { data: educationData, index: selectedEducation.value.index })
  handleCloseModal()
}
</script>