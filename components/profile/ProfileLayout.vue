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

    <!-- Logout Modal menggunakan Modal Component -->
    <Modal
      :isOpen="showLogoutModal"
      type="error"
      title="Keluar?"
      message="Anda selalu dapat masuk kembali kapan saja."
      confirmText="Ya, keluar"
      cancelText="Batal"
      :showCancel="true"
      @confirm="confirmLogout"
      @cancel="cancelLogout"
      @close="cancelLogout"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '~/store/auth'
import Modal from '~/components/common/Modal.vue'
import UserIcon from "~/assets/UserIcon.vue";
import KeyIcon from "~/assets/KeyIcon.vue";
import BookmarkIcon from "~/assets/BookmarkIcon.vue";
import ReviewIcon from "~/assets/ReviewIcon.vue";
import LogOutIcon from "~/assets/LogOutIcon.vue";

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
  if (!isLoggingOut.value) {
    showLogoutModal.value = false
  }
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