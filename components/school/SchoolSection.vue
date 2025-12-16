<template>
  <div class="p-4 sm:p-6">
    <div class="flex items-center justify-between mb-4 sm:mb-6">
      <h2 class="text-xl sm:text-2xl font-bold text-[#28190C]">{{ title }}</h2>
      <button
        v-if="showExploreButton"
        @click="$emit('explore')"
        class="text-[#28190C] text-sm sm:text-base font-medium hover:underline flex items-center gap-1 sm:gap-2"
      >
        Jelajahi Semua
        <svg
          class="w-3 h-3 sm:w-4 sm:h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    <div v-if="loading" class="flex justify-center py-8 sm:py-12">
      <div
        class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#28190C]"
      ></div>
    </div>

    <div v-else-if="schools.length === 0" class="py-8 sm:py-12">
      <EmptyState 
        title="Tidak ada sekolah ditemukan"
        description="Belum ada data sekolah untuk ditampilkan"
      />
    </div>

    <div v-else>
      <div class="flex gap-4 overflow-x-auto pb-4 sm:hidden scrollbar-hide snap-x snap-mandatory">
        <div 
          v-for="school in schools"
          :key="school.id"
          class="flex-shrink-0 w-[280px] snap-start"
        >
          <SchoolCard :school="school" />
        </div>
      </div>

      <div class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <SchoolCard
          v-for="school in schools"
          :key="school.id"
          :school="school"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import SchoolCard from "@/components/shared/SchoolCard.vue";
import EmptyState from "@/components/school/EmptyState.vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  schools: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  showExploreButton: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['explore']);
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>