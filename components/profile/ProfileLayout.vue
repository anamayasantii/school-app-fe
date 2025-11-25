<template>
  <div class="min-h-screen bg-[#FBFBFB]">
    <!-- Header Pengaturan dengan background putih full -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-2xl font-semibold text-primary-green">Pengaturan</h1>
      </div>
    </div>

    <!-- Content Area -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-8">
        <!-- Sidebar Menu -->
        <div class="w-64 flex-shrink-0">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <nav class="space-y-1 p-2">
              <button
                v-for="item in menuItems"
                :key="item.id"
                :class="[
                  'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-left',
                  activeTab === item.id
                    ? 'bg-[#F8F9FA] text-primary-green'
                    : item.id === 'logout'
                    ? 'text-[#F52228] hover:bg-red-50'
                    : 'text-secondary-gray hover:bg-bg-light hover:text-primary-green'
                ]"
                @click="setActiveTab(item.id)"
                :disabled="isLoggingOut && item.id === 'logout'"
              >
                <component 
                  :is="item.icon" 
                  :class="[
                    'w-5 h-5 mr-3',
                    activeTab === item.id 
                      ? 'text-primary-green' 
                      : item.id === 'logout'
                      ? 'text-[#F52228]'
                      : 'text-secondary-gray'
                  ]"
                />
                <span v-if="isLoggingOut && item.id === 'logout'">
                  Keluar...
                </span>
                <span v-else>
                  {{ item.name }}
                </span>
              </button>
            </nav>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1">
          <slot :activeTab="activeTab" />
        </div>
      </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div 
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="cancelLogout"
        ></div>

        <!-- Modal panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <LogOutIcon class="h-6 w-6 text-red-600" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-primary-green">
                  Konfirmasi Keluar
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Apakah Anda yakin ingin keluar dari akun Anda? Anda perlu login kembali untuk mengakses fitur-fitur yang memerlukan autentikasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              @click="confirmLogout"
              :disabled="isLoggingOut"
            >
              <span v-if="isLoggingOut" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
              <span v-else>Ya, Keluar</span>
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="cancelLogout"
              :disabled="isLoggingOut"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '~/store/auth'
import UserIcon from "~/assets/UserIcon.vue";
import KeyIcon from "~/assets/KeyIcon.vue";
import BookmarkIcon from "~/assets/BookmarkIcon.vue";
import ReviewIcon from "~/assets/ReviewIcon.vue";
import LogOutIcon from "~/assets/LogOutIcon.vue";

// Props
const props = defineProps({
  initialTab: {
    type: String,
    default: 'profile'
  }
})

const authStore = useAuthStore()
const router = useRouter()

const activeTab = ref(props.initialTab)
const showLogoutModal = ref(false)
const isLoggingOut = ref(false)

const menuItems = [
  {
    id: 'profile',
    name: 'Profil',
    icon: UserIcon,
  },
  {
    id: 'change-password',
    name: 'Ganti Kata Sandi',
    icon: KeyIcon,
  },
  {
    id: 'saved',
    name: 'Disimpan',
    icon: BookmarkIcon,
  },
  {
    id: 'reviews',
    name: 'Ulasan Saya',
    icon: ReviewIcon,
  },
  {
    id: 'logout',
    name: 'Keluar',
    icon: LogOutIcon,
  }
]

const setActiveTab = (tabId) => {
  if (tabId === 'logout') {
    showLogoutModal.value = true
    return
  }
  activeTab.value = tabId
}

const confirmLogout = async () => {
  try {
    isLoggingOut.value = true
    authStore.logout()
    await router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    isLoggingOut.value = false
    showLogoutModal.value = false
  }
}

const cancelLogout = () => {
  showLogoutModal.value = false
}

const emit = defineEmits(['tabChanged'])

watch(activeTab, (newTab) => {
  emit('tabChanged', newTab)
})
</script>

<style scoped>
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>