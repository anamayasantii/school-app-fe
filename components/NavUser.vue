<script setup>
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-vue-next"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/store/auth'
import { computed } from 'vue'

const { isMobile } = useSidebar()
const authStore = useAuthStore()

// Computed untuk mendapatkan data user dari store
const userData = computed(() => {
  if (!authStore.user) {
    return {
      name: '',
      email: '',
      avatar: null
    }
  }

  return {
    name: authStore.user.fullname || '',
    email: authStore.user.email || '',
    avatar: authStore.user.image || null
  }
})

const handleLogout = async () => {
  try {
    Cookies.remove('token')
    await navigateTo('dashboard/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage v-if="userData.avatar" :src="userData.avatar" :alt="userData.name" />
              <AvatarFallback class="rounded-lg">
                {{ userData.name.charAt(0).toUpperCase() || 'U' }}
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ userData.name }}</span>
              <span class="truncate text-xs">{{ userData.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuItem @click="handleLogout">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>