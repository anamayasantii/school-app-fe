<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 mb-4 sm:mb-5">
    <div
      v-for="status in statusList"
      :key="status.id"
      @click="$emit('select', status.name)"
      class="cursor-pointer"
    >
      <div
        :class="[
          'p-3 sm:p-4 md:p-5 border rounded-lg sm:rounded-xl transition-all duration-200 h-full',
          selectedStatus === status.name
            ? 'border-[#28190C]/[0.12] bg-[#F2ECE3] shadow-sm'
            : 'border-[#28190C]/[0.12] hover:border-[#28190C]/[0.2] hover:bg-[#f8f9fa] hover:shadow-sm',
        ]"
      >
        <div class="flex items-start space-x-2.5 sm:space-x-3">
          <div class="flex-shrink-0">
            <slot name="icon">
              <IconType class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
            </slot>
          </div>
          <div class="flex-1 min-w-0">
            <h3
              :class="[
                'text-sm sm:text-base md:text-lg font-medium mb-1 sm:mb-1.5',
                selectedStatus === status.name ? 'text-[#28190C]' : 'text-[#28190C]',
              ]"
            >
              {{ getStatusDisplayName(status.name) }}
            </h3>
            <p
              class="text-xs sm:text-sm text-secondary-gray font-regular leading-relaxed"
            >
              {{ getStatusDescription(status.name) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconType from "~/assets/IconType.vue";

const props = defineProps({
  statusList: {
    type: Array,
    default: () => []
  },
  selectedStatus: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['select']);

const getStatusDisplayName = (statusName) => {
  const displayNames = {
    'SPK': 'Sekolah Internasional',
    'Negeri': 'Sekolah Negeri',
    'Swasta': 'Sekolah Swasta'
  };
  return displayNames[statusName] || statusName;
};

const getStatusDescription = (statusName) => {
  const descriptions = {
    'Negeri': 'Didanai pemerintah, gratis atau biaya rendah.',
    'Swasta': 'Dikelola secara independen, berbasis biaya kuliah',
    'SPK': 'Kurikulum global, sering kali dalam bahasa Inggris.'
  };
  return descriptions[statusName] || '';
};
</script>