<template>
  <div class="py-8 flex flex-col items-center justify-center">
    <div class="max-w-6xl mx-auto px-6 w-full">

      <!-- 3 button di atas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        <NuxtLink
          v-for="level in topRowLevels"
          :key="level.id"
          :to="`/schools/${level.key}`"
        >
          <div class="border border-[#E9ECEF] rounded-xl px-4 py-6 flex flex-col items-center text-center transition duration-300 h-full w-full">
            <span class="mb-3"><component :is="educationLevelMap[level.key]?.icon" /></span>
            <div class="text-[#28190C] font-manrope-bold text-base mb-1">{{ educationLevelMap[level.key]?.title }}</div>
            <div class="text-sm mb-1 text-[#76685A]">{{ educationLevelMap[level.key]?.description }}</div>
            <div v-if="educationLevelMap[level.key]?.age" class="mt-2 text-xs tracking-wide font-manrope-regular text-[#232a25]">
              {{ educationLevelMap[level.key]?.age }}
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- 2 button di bawah -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <NuxtLink
          v-for="level in bottomRowLevels"
          :key="level.id"
          :to="`/schools/${level.key}`"
        >
          <div class="border border-[#E9ECEF] rounded-xl px-4 py-6 flex flex-col items-center text-center transition duration-300 h-full w-full">
            <span class="mb-3"><component :is="educationLevelMap[level.key]?.icon" /></span>
            <div class="text-[#28190C] font-manrope-bold text-base mb-1">{{ educationLevelMap[level.key]?.title }}</div>
            <div class="text-sm mb-1 text-[#76685A]">{{ educationLevelMap[level.key]?.description }}</div>
            <div v-if="educationLevelMap[level.key]?.age" class="mt-2 text-xs tracking-wide font-manrope-regular text-[#232a25]">
              {{ educationLevelMap[level.key]?.age }}
            </div>
          </div>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from '@/lib/axios'
import IconSD from '@/assets/IconSd.vue'
import IconSMP from '@/assets/IconSmp.vue'
import IconSMA from '@/assets/IconSma.vue'
import IconSMK from '@/assets/IconSmk.vue'
import IconUniversity from '@/assets/IconKuliah.vue'

const educationLevelMap = {
  sd: {
    icon: IconSD,
    title: "Elementary School (SD)",
    description: "Find primary education institutions for children ages 6-12",
  },
  smp: {
    icon: IconSMP,
    title: "Junior High School (SMP)",
    description: "Discover middle schools for students ages 12-15",
  },
  sma: {
    icon: IconSMA,
    title: "Senior High School (SMA)",
    description: "Explore academic high schools for students ages 15-18",
  },
  smk: {
    icon: IconSMK,
    title: "Vocational High School (SMK)",
    description: "Find vocational high schools offering specialized skills training",
  },
  universitas: {
    icon: IconUniversity,
    title: "University",
    description: "Research higher education options across Indonesia",
  }
}

// Utility untuk map nama API ke slug yang dipakai di mapping dan routing
const getSlug = (name) => {
  if (!name) return ''
  name = name.toLowerCase()
  if (name.includes('elementary') || name.includes('sd')) return 'sd'
  if (name.includes('junior') || name.includes('smp')) return 'smp'
  if (name.includes('senior') || name.includes('sma')) return 'sma'
  if (name.includes('vocational') || name.includes('smk')) return 'smk'
  if (name.includes('university') || name.includes('universitas')) return 'universitas'
  return ''
}

const educationLevelsRaw = ref([])

const fetchEducationLevels = async () => {
  try {
    const response = await axios.get('/education-levels')
    educationLevelsRaw.value = response.data.data || response.data
  } catch (error) {
    educationLevelsRaw.value = []
    console.error('Error fetching education levels:', error)
  }
}

// Build unique slug->data map
const educationLevelsBySlug = computed(() => {
  const result = {}
  for (const item of educationLevelsRaw.value) {
    const slug = getSlug(item.name)
    if (slug && !result[slug]) {
      result[slug] = item
    }
  }
  return result
})

// Untuk grid box per baris
const topRowSlugs = ['sd', 'smp', 'sma']
const bottomRowSlugs = ['smk', 'universitas']

const topRowLevels = computed(() => 
  topRowSlugs
    .map(slug => educationLevelsBySlug.value[slug] && { ...educationLevelsBySlug.value[slug], key: slug })
    .filter(Boolean)
)
const bottomRowLevels = computed(() => 
  bottomRowSlugs
    .map(slug => educationLevelsBySlug.value[slug] && { ...educationLevelsBySlug.value[slug], key: slug })
    .filter(Boolean)
)

onMounted(fetchEducationLevels)
</script>