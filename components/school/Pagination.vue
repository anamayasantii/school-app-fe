<template>
  <div
    v-if="totalPages > 1"
    class="flex justify-center px-4 sm:px-6 pb-12 sm:pb-16"
  >
    <div class="flex items-center space-x-1 sm:space-x-2 gap-1 sm:gap-2">
      <button
        @click="$emit('change-page', currentPage - 1)"
        :disabled="currentPage === 1"
        :class="buttonClass(false, currentPage === 1)"
        class="text-xs sm:text-sm"
      >
        Previous
      </button>

      <template v-for="page in visiblePages" :key="page">
        <button
          v-if="page !== '...'"
          @click="$emit('change-page', page)"
          :class="buttonClass(page === currentPage)"
          class="text-xs sm:text-sm"
        >
          {{ page }}
        </button>
        <div
          v-else
          class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-primary-green bg-[#F8F9FA] rounded-md min-w-[32px] sm:min-w-[40px] flex items-center justify-center"
        >
          ...
        </div>
      </template>

      <button
        @click="$emit('change-page', currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="buttonClass(false, currentPage === totalPages)"
        class="text-xs sm:text-sm"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['change-page']);

const visiblePages = computed(() => {
  const current = props.currentPage;
  const last = props.totalPages;
  const pages = [];

  if (last <= 7) {
    for (let i = 1; i <= last; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (current <= 4) {
      for (let i = 2; i <= 5; i++) pages.push(i);
      pages.push("...");
    } else if (current >= last - 3) {
      pages.push("...");
      for (let i = last - 4; i <= last - 1; i++) pages.push(i);
    } else {
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push("...");
    }
    if (last > 1) pages.push(last);
  }

  return pages;
});

const buttonClass = (isActive, isDisabled = false) => {
  const baseClasses = "px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-colors min-w-[32px] sm:min-w-[40px]";
  const activeClasses = "bg-primary-green text-[#F8F9FA]";
  const inactiveClasses = "text-primary-green bg-[#F8F9FA]";
  const disabledClasses = "text-primary-green bg-[#F8F9FA] cursor-not-allowed opacity-50";
  
  if (isDisabled) return `${baseClasses} ${disabledClasses}`;
  if (isActive) return `${baseClasses} ${activeClasses}`;
  return `${baseClasses} ${inactiveClasses}`;
};
</script>