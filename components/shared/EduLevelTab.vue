komponen navigasi tab
<template>
  <!-- Education Level Tabs -->
  <div class="mb-6 sm:mb-8">
    <!-- Mobile: Stack vertically -->
    <div
      class="flex flex-col sm:hidden bg-white border border-[#E9ECEF] rounded-xl p-1 gap-1 w-full"
    >
      <button
        v-for="tab in educationTabs"
        :key="tab.value"
        @click="$emit('changeEducationLevel', tab.value)"
        :class="[
          'flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium transition-colors',
          activeTab === tab.value
            ? 'bg-[#1D2B29] text-white'
            : 'text-[#6C7370] hover:bg-gray-200',
        ]"
      >
        <span class="text-base w-4 h-4" v-html="tab.icon"></span>
        {{ tab.name }}
      </button>
    </div>

    <!-- Desktop: Horizontal - FULL WIDTH VERSION -->
    <div
      class="hidden sm:flex bg-white border border-[#E9ECEF] rounded-xl p-1 gap-1 w-full"
    >
      <button
        v-for="tab in educationTabs"
        :key="tab.value"
        @click="$emit('changeEducationLevel', tab.value)"
        :class="[
          'flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex-1',
          activeTab === tab.value
            ? 'bg-[#1F1F1F] text-[#FFFFFF]'
            : 'text-[#1F1F1F] hover:bg-gray-200',
        ]"
      >
        <span class="text-sm w-4 h-4" v-html="tab.icon"></span>
        {{ tab.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
// Define props
const props = defineProps({
  activeTab: {
    type: String,
    default: "sd",
  },
});

// Define emits
const emit = defineEmits(["changeEducationLevel"]);

// Education tabs data
const educationTabs = [
  {
    name: "SD",
    value: "sd",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
    </svg>`,
  },
  {
    name: "SMP",
    value: "smp",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
    </svg>`,
  },
  {
    name: "SMA",
    value: "sma",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 16.18l-5-2.73V13L12 16.18 17 13v3.45l-5 2.73zm6.82-9.18L12 6.28 5.18 10 12 13.72 18.82 10z"/>
    </svg>`,
  },
  {
    name: "SMK",
    value: "smk",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
    </svg>`,
  },
  {
    name: "Universitas",
    value: "universitas",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 16l-5 2.73-5-2.73v-3.72L12 15l5-2.73V16z"/>
    </svg>`,
  },
];
</script>

<style scoped>
/* Additional styles if needed */
button {
  user-select: none;
}
</style>