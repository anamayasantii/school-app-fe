<template>
  <div class="py-8 flex flex-col items-center justify-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- 3 button di atas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        <NuxtLink
          v-for="level in topRowLevels"
          :key="level.id"
          :to="`/schools/${level.id}`"
        >
          <div class="border border-border-gray rounded-xl px-4 py-6 flex flex-col items-center text-center transition duration-300 h-full w-full">
            <span class="mb-3">
              <component :is="level.icon" />
            </span>
            <div class="text-primary-green font-bold text-base mb-1">
              {{ level.title }}
            </div>
            <div class="text-sm mb-1 text-secondary-gray">
              {{ level.description }}
            </div>
            <div v-if="level.age" class="mt-2 text-xs tracking-wide font-regular text-[#232a25]">
              {{ level.age }}
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- 2 button di bawah -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <NuxtLink
          v-for="level in bottomRowLevels"
          :key="level.id"
          :to="`/schools/${level.id}`"
        >
          <div class="border border-border-gray rounded-xl px-4 py-6 flex flex-col items-center text-center transition duration-300 h-full w-full">
            <span class="mb-3">
              <component :is="level.icon" />
            </span>
            <div class="text-[#28190C] font-bold text-base mb-1">
              {{ level.title }}
            </div>
            <div class="text-sm mb-1 text-secondary-gray">
              {{ level.description }}
            </div>
          </div>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IconSD from '@/assets/IconSd.vue'
import IconSMP from '@/assets/IconSmp.vue'
import IconSMA from '@/assets/IconSma.vue'
import IconSMK from '@/assets/IconSmk.vue'
import IconUniversity from '@/assets/IconKuliah.vue'

const topRowLevels = ref([
  {
    id: 'sd',
    icon: IconSD,
    title: "Elementary School (SD)",
    description: "Find primary education institutions for children ages 6-12"
  },
  {
    id: 'smp',
    icon: IconSMP,
    title: "Junior High School (SMP)",
    description: "Discover middle schools for students ages 12-15"
  },
  {
    id: 'sma',
    icon: IconSMA,
    title: "Senior High School (SMA)",
    description: "Explore academic high schools for students ages 15-18"
  }
])

const bottomRowLevels = ref([
  {
    id: 'smk',
    icon: IconSMK,
    title: "Vocational High School (SMK)",
    description: "Find vocational high schools offering specialized skills training"
  },
  {
    id: 'universitas',
    icon: IconUniversity,
    title: "University",
    description: "Research higher education options across Indonesia"
  }
])
</script>