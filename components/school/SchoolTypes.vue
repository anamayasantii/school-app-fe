<template>
  <div class="py-6 sm:py-8 flex flex-col items-center justify-center">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

      <div class="grid grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-8 w-full">
        <NuxtLink
          v-for="level in topRowLevels"
          :key="level.id"
          :to="`/schools/${level.id}`"
        >
          <div class="border border-border-gray rounded-lg sm:rounded-xl px-2 py-3 sm:px-3 sm:py-4 md:px-4 md:py-6 flex flex-col items-center text-center transition duration-300 h-full w-full">
            <span class="mb-2 sm:mb-3">
              <component :is="level.icon" class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </span>
            <div class="text-primary-green font-bold text-xs sm:text-sm md:text-base mb-1">
              {{ level.title }}
            </div>
            <div class="hidden sm:block text-xs sm:text-sm mb-1 text-secondary-gray">
              {{ level.description }}
            </div>
            <div v-if="level.age" class="hidden sm:block mt-2 text-xs tracking-wide font-regular text-[#232a25]">
              {{ level.age }}
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full">
        <NuxtLink
          v-for="level in bottomRowLevels"
          :key="level.id"
          :to="`/schools/${level.id}`"
        >
          <div class="border border-border-gray rounded-lg sm:rounded-xl px-2 py-3 sm:px-3 sm:py-4 md:px-4 md:py-6 flex flex-col items-center text-center transition duration-300 h-full w-full">
            <span class="mb-2 sm:mb-3">
              <component :is="level.icon" class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </span>
            <div class="text-[#28190C] font-bold text-xs sm:text-sm md:text-base mb-1">
              {{ level.title }}
            </div>
            <div class="hidden sm:block text-xs sm:text-sm mb-1 text-secondary-gray">
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
    title: "Sekolah Dasar",
    description: "Temukan lembaga pendidikan dasar untuk anak usia 6-12 tahun"
  },
  {
    id: 'smp',
    icon: IconSMP,
    title: "Sekolah Menengah Pertama",
    description: "Temukan sekolah menengah untuk siswa usia 12-15 tahun"
  },
  {
    id: 'sma',
    icon: IconSMA,
    title: "Sekolah Menengah Atas",
    description: "Jelajahi sekolah menengah akademik untuk siswa usia 15-18 tahun"
  }
])

const bottomRowLevels = ref([
  {
    id: 'smk',
    icon: IconSMK,
    title: "Sekolah Menengah Kejuruan",
    description: "Sekolah menengah kejuruan menawarkan pelatihan keterampilan"
  },
  {
    id: 'universitas',
    icon: IconUniversity,
    title: "Universitas",
    description: "Teliti pilihan pendidikan tinggi di seluruh Indonesia"
  }
])
</script>