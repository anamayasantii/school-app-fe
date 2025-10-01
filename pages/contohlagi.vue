<!-- components/profile/ProfileLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header (gunakan existing header component) -->
    <!-- Assuming ada header component -->
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Pengaturan</h1>
      </div>

      <div class="flex gap-8">
        <!-- Sidebar Menu -->
        <div class="w-64 flex-shrink-0">
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <nav class="space-y-1 p-2">
              <NuxtLink
                v-for="item in menuItems"
                :key="item.id"
                :to="item.route"
                :class="[
                  'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                ]"
                @click="setActiveTab(item.id)"
              >
                <component 
                  :is="item.icon" 
                  :class="[
                    'w-5 h-5 mr-3',
                    activeTab === item.id ? 'text-blue-700' : 'text-gray-400'
                  ]"
                />
                {{ item.name }}
                <component 
                  v-if="item.id === 'logout'"
                  :is="TriangleAlertIcon" 
                  class="w-4 h-4 ml-auto text-red-500"
                />
              </NuxtLink>
            </nav>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1">
          <slot :activeTab="activeTab" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  UserIcon, 
  KeyIcon, 
  BookmarkIcon, 
  StarIcon, 
  LogOutIcon,
  TriangleAlertIcon 
} from 'lucide-vue-next'

// Props
const props = defineProps({
  initialTab: {
    type: String,
    default: 'profile'
  }
})

// Reactive data
const activeTab = ref(props.initialTab)

// Menu items configuration
const menuItems = [
  {
    id: 'profile',
    name: 'Profil',
    icon: UserIcon,
    route: '/profile'
  },
  {
    id: 'change-password',
    name: 'Ganti Kata Sandi',
    icon: KeyIcon,
    route: '/profile/change-password'
  },
  {
    id: 'saved',
    name: 'Disimpan',
    icon: BookmarkIcon,
    route: '/profile/saved'
  },
  {
    id: 'reviews',
    name: 'Ulasan Saya',
    icon: StarIcon,
    route: '/profile/reviews'
  },
  {
    id: 'logout',
    name: 'Keluar',
    icon: LogOutIcon,
    route: '/logout'
  }
]

// Methods
const setActiveTab = (tabId) => {
  if (tabId === 'logout') {
    // Handle logout logic
    handleLogout()
    return
  }
  activeTab.value = tabId
}

const handleLogout = () => {
  // Implement logout logic
  console.log('Logout clicked')
  // Example: 
  // await $auth.logout()
  // navigateTo('/login')
}

// Emits
const emit = defineEmits(['tabChanged'])

// Watch for tab changes
watch(activeTab, (newTab) => {
  emit('tabChanged', newTab)
})
</script>

<style scoped>
/* Custom styles if needed */
</style>