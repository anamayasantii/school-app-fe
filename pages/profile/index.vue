<template>
  <ProfileLayout initial-tab="profile">
    <template #default="{ activeTab }">
      <ProfileSettings v-if="activeTab === 'profile'" />
      <ChangePassword v-else-if="activeTab === 'change-password'" />
        <SavedItems v-else-if="activeTab === 'saved'" />
        <MyReviews v-else-if="activeTab === 'reviews'" />
      <!-- dst... -->
    </template>
  </ProfileLayout>
</template>

<script setup>
import ProfileLayout from '@/components/profile/ProfileLayout.vue'
import ProfileSettings from '~/components/profile/Profile.vue'
import ChangePassword from '@/components/profile/ChangePassword.vue'
import SavedItems from '@/components/profile/SavedItems.vue'
import MyReviews from '~/components/profile/MyReviews.vue'
</script>