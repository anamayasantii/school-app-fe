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

  <div class="flex flex-col sm:flex-row gap-4 mb-8">
    <!-- Province Filter -->
    <div class="flex-1">
      <div
        class="relative flex items-center bg-white border border-[#E9ECEF] font-manrope-medium rounded-lg p-2 py-0.5"
      >
        <label class="text-sm text-[#6C757D] mr-2">Province:</label>
        <select
          :value="filters.province"
          @change="onProvinceChange"
          class="appearance-none block w-full px-4 py-2 bg-transparent text-gray-700 focus:outline-none text-sm"
        >
          <option value="">Semua</option>
          <option
            v-for="province in provinces"
            :key="province.id"
            :value="province.name"
          >
            {{ province.name }}
          </option>
        </select>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- District Filter -->
    <div class="flex-1">
      <div
        class="relative flex items-center bg-white border border-[#E9ECEF] font-manrope-medium rounded-lg p-2 py-0.5"
      >
        <label class="text-sm text-[#6C757D] mr-2">District:</label>
        <select
          :value="filters.district"
          @change="onDistrictChange"
          :disabled="!filters.province"
          class="appearance-none block w-full px-4 py-2 bg-transparent focus:outline-none text-sm disabled:cursor-not-allowed"
          :class="!filters.province ? 'text-gray-400' : 'text-gray-700'"
        >
          <option value="">Semua</option>
          <option
            v-for="district in districts"
            :key="district.id"
            :value="district.name"
          >
            {{ district.name }}
          </option>
        </select>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Sub District Filter -->
    <div class="flex-1">
      <div
        class="relative flex items-center bg-white border border-[#E9ECEF] font-manrope-medium rounded-lg p-2 py-0.5"
      >
        <label class="text-sm text-[#6C757D] mr-2 whitespace-nowrap"
          >Sub District:</label
        >
        <select
          :value="filters.subDistrict"
          @change="onSubDistrictChange"
          :disabled="!filters.district"
          class="appearance-none flex-1 px-4 py-2 bg-transparent focus:outline-none text-sm disabled:cursor-not-allowed"
          :class="!filters.district ? 'text-gray-400' : 'text-gray-700'"
        >
          <option value="">Semua</option>
          <option
            v-for="subDistrict in subDistricts"
            :key="subDistrict.id"
            :value="subDistrict.name"
          >
            {{ subDistrict.name }}
          </option>
        </select>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "@/lib/axios";

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
  activeTab: {
    type: String,
    default: "sd",
  },
});

const emit = defineEmits(["updateFilters", "changeEducationLevel"]);

// Local data for dropdown options
const provinces = ref([]);
const districts = ref([]);
const subDistricts = ref([]);

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

// Fetch provinces from real API
const fetchProvinces = async () => {
  try {
    const response = await axios.get("/provinces");
    if (response.data.status === "success") {
      provinces.value = response.data.data;
    } else {
      provinces.value = [];
      console.error("Error fetching provinces:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching provinces:", error);
    provinces.value = [];
  }
};

// Fetch districts based on province from real API
const fetchDistricts = async (provinceName) => {
  try {
    const response = await axios.get("/districts", {
      params: { provinceName: provinceName }, // ✅ Fixed parameter name
    });
    if (response.data.status === "success") {
      districts.value = response.data.data;
    } else {
      districts.value = [];
      console.error("Error fetching districts:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching districts:", error);
    districts.value = [];
  }
};

// Fetch sub districts based on district from real API
const fetchSubDistricts = async (districtName) => {
  try {
    const response = await axios.get("/sub-districts", {
      params: { districtName: districtName }, // ✅ Fixed parameter name
    });
    if (response.data.status === "success") {
      subDistricts.value = response.data.data;
    } else {
      subDistricts.value = [];
      console.error("Error fetching sub districts:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching sub districts:", error);
    subDistricts.value = [];
  }
};

const onProvinceChange = async (event) => {
  const province = event.target.value;
  // Update filters
  emit("updateFilters", {
    province: province,
    district: "", // Reset district
    subDistrict: "", // Reset sub district
  });
  // Fetch districts for selected province
  if (province) {
    await fetchDistricts(province);
  } else {
    districts.value = [];
  }
  subDistricts.value = []; // Clear sub districts when province changes
};

const onDistrictChange = async (event) => {
  const district = event.target.value;
  // Update filters
  emit("updateFilters", {
    district: district,
    subDistrict: "", // Reset sub district
  });
  // Fetch sub districts for selected district
  if (district) {
    await fetchSubDistricts(district);
  } else {
    subDistricts.value = [];
  }
};

const onSubDistrictChange = (event) => {
  const subDistrict = event.target.value;
  // Update filters
  emit("updateFilters", {
    subDistrict: subDistrict,
  });
};

// Initialize provinces on mount
onMounted(() => {
  fetchProvinces();
});
</script>
