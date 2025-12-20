<template>
  <div class="mb-4 sm:mb-6 md:mb-8">
    <div
      class="flex flex-col sm:hidden bg-white border border-border-gray rounded-xl p-1 gap-1 w-full"
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

    <div
      class="hidden sm:flex bg-white border border-border-gray rounded-xl p-1 gap-1 w-full"
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

  <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
    <div class="w-full sm:flex-1 relative">
      <div
        @click="toggleProvince"
        class="relative flex items-center bg-white border border-border-gray font-medium rounded-lg p-2 py-3 cursor-pointer"
      >
        <label class="text-xs sm:text-sm text-secondary-gray mr-2 flex-shrink-0"
          >Province:</label
        >
        <span
          class="flex-1 text-xs sm:text-sm"
          :class="filters.province ? 'text-secondary-gray font-medium' : 'text-gray-400'"
        >
          {{ filters.province || "Semua" }}
        </span>
        <svg
          class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform"
          :class="{ 'rotate-180': showProvinceDropdown }"
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

      <div
        v-if="showProvinceDropdown"
        class="absolute top-full left-0 right-0 mt-2 bg-white border border-border-gray rounded-xl shadow-lg max-h-64 overflow-y-auto z-50"
      >
        <div
          @click="selectProvince('')"
          class="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between text-sm"
        >
          <span
            :class="
              !filters.province
                ? 'text-[#FC6E4C] font-medium'
                : 'text-secondary-gray font-medium'
            "
            >Semua</span
          >
          <svg
            v-if="!filters.province"
            class="w-5 h-5 text-[#FC6E4C]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <template v-for="(group, letter) in groupedProvinces" :key="letter">
          <div class="flex items-center px-4 py-1.5 bg-white">
            <div class="w-6 text-xs font-medium text-border-gray uppercase">
              {{ letter }}
            </div>
            <div class="flex-1 h-px bg-gray-200 ml-2"></div>
          </div>
          <div
            v-for="province in group"
            :key="province.id"
            @click="selectProvince(province.name)"
            class="cursor-pointer text-sm"
          >
            <div
              class="mx-2 px-3 py-2 rounded-lg flex items-center justify-between"
              :class="
                filters.province === province.name
                  ? 'bg-[#FFF9F8]'
                  : 'hover:bg-gray-50'
              "
            >
              <span
                :class="
                  filters.province === province.name
                    ? 'text-[#FC6E4C] font-medium'
                    : 'text-secondary-gray font-medium'
                "
              >
                {{ province.name }}
              </span>
              <svg
                v-if="filters.province === province.name"
                class="w-5 h-5 text-[#FC6E4C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="w-full sm:flex-1 relative">
      <div
        @click="toggleDistrict"
        class="relative flex items-center bg-white border border-border-gray font-medium rounded-lg p-2 py-3 cursor-pointer"
        :class="{ 'opacity-50 cursor-not-allowed': !filters.province }"
      >
        <label class="text-xs sm:text-sm text-secondary-gray mr-2 flex-shrink-0"
          >District:</label
        >
        <span
          class="flex-1 text-xs sm:text-sm"
          :class="filters.district ? 'text-secondary-gray font-medium' : 'text-gray-400'"
        >
          {{ filters.district || "Semua" }}
        </span>
        <svg
          class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform"
          :class="{ 'rotate-180': showDistrictDropdown }"
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

      <div
        v-if="showDistrictDropdown && filters.province"
        class="absolute top-full left-0 right-0 mt-2 bg-white border border-border-gray rounded-xl shadow-lg max-h-64 overflow-y-auto z-50"
      >
        <div
          @click="selectDistrict('')"
          class="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between text-sm"
        >
          <span
            :class="
              !filters.district
                ? 'text-[#FC6E4C] font-medium'
                : 'text-secondary-gray font-medium'
            "
            >Semua</span
          >
          <svg
            v-if="!filters.district"
            class="w-5 h-5 text-[#FC6E4C]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <template v-for="(group, letter) in groupedDistricts" :key="letter">
          <div class="flex items-center px-4 py-1.5 bg-white">
            <div class="w-6 text-xs font-medium text-border-gray uppercase">
              {{ letter }}
            </div>
            <div class="flex-1 h-px bg-gray-200 ml-2"></div>
          </div>
          <div
            v-for="district in group"
            :key="district.id"
            @click="selectDistrict(district.name)"
            class="cursor-pointer text-sm"
          >
            <div
              class="mx-2 px-3 py-2 rounded-lg flex items-center justify-between"
              :class="
                filters.district === district.name
                  ? 'bg-[#FFF9F8]'
                  : 'hover:bg-gray-50'
              "
            >
              <span
                :class="
                  filters.district === district.name
                    ? 'text-[#FC6E4C] font-medium'
                    : 'text-secondary-gray font-medium'
                "
              >
                {{ district.name }}
              </span>
              <svg
                v-if="filters.district === district.name"
                class="w-5 h-5 text-[#FC6E4C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="w-full sm:flex-1 relative">
      <div
        @click="toggleSubDistrict"
        class="relative flex items-center bg-white border border-border-gray font-medium rounded-lg p-2 py-3 cursor-pointer"
        :class="{ 'opacity-50 cursor-not-allowed': !filters.district }"
      >
        <label
          class="text-xs sm:text-sm text-secondary-gray mr-2 whitespace-nowrap flex-shrink-0"
          >Sub District:</label
        >
        <span
          class="flex-1 text-xs sm:text-sm"
          :class="filters.subDistrict ? 'text-secondary-gray font-medium' : 'text-gray-400'"
        >
          {{ filters.subDistrict || "Semua" }}
        </span>
        <svg
          class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform"
          :class="{ 'rotate-180': showSubDistrictDropdown }"
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

      <div
        v-if="showSubDistrictDropdown && filters.district"
        class="absolute top-full left-0 right-0 mt-2 bg-white border border-border-gray rounded-xl shadow-lg max-h-64 overflow-y-auto z-50"
      >
        <div
          @click="selectSubDistrict('')"
          class="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between text-sm"
        >
          <span
            :class="
              !filters.subDistrict
                ? 'text-[#FC6E4C] font-medium'
                : 'text-secondary-gray font-medium'
            "
            >Semua</span
          >
          <svg
            v-if="!filters.subDistrict"
            class="w-5 h-5 text-[#FC6E4C]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <template v-for="(group, letter) in groupedSubDistricts" :key="letter">
          <div class="flex items-center px-4 py-1.5 bg-white">
            <div class="w-6 text-xs font-medium text-border-gray uppercase">
              {{ letter }}
            </div>
            <div class="flex-1 h-px bg-gray-200 ml-2"></div>
          </div>
          <div
            v-for="subDistrict in group"
            :key="subDistrict.id"
            @click="selectSubDistrict(subDistrict.name)"
            class="cursor-pointer text-sm"
          >
            <div
              class="mx-2 px-3 py-2 rounded-lg flex items-center justify-between"
              :class="
                filters.subDistrict === subDistrict.name
                  ? 'bg-[#FFF9F8]'
                  : 'hover:bg-gray-50'
              "
            >
              <span
                :class="
                  filters.subDistrict === subDistrict.name
                    ? 'text-primary-green font-medium'
                    : 'text-secondary-gray font-medium'
                "
              >
                {{ subDistrict.name }}
              </span>
              <svg
                v-if="filters.subDistrict === subDistrict.name"
                class="w-5 h-5 text-primary-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>

  <div
    v-if="
      showProvinceDropdown || showDistrictDropdown || showSubDistrictDropdown
    "
    @click="closeAllDropdowns"
    class="fixed inset-0 z-40"
  ></div>
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

const provinces = ref([]);
const districts = ref([]);
const subDistricts = ref([]);

const showProvinceDropdown = ref(false);
const showDistrictDropdown = ref(false);
const showSubDistrictDropdown = ref(false);

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

const groupedProvinces = computed(() => {
  const grouped = {};
  provinces.value.forEach((province) => {
    const firstLetter = province.name.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(province);
  });
  return grouped;
});

const groupedDistricts = computed(() => {
  const grouped = {};
  districts.value.forEach((district) => {
    const firstLetter = district.name.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(district);
  });
  return grouped;
});

const groupedSubDistricts = computed(() => {
  const grouped = {};
  subDistricts.value.forEach((subDistrict) => {
    const firstLetter = subDistrict.name.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(subDistrict);
  });
  return grouped;
});

const toggleProvince = () => {
  showProvinceDropdown.value = !showProvinceDropdown.value;
  showDistrictDropdown.value = false;
  showSubDistrictDropdown.value = false;
};

const toggleDistrict = () => {
  if (!props.filters.province) return;
  showDistrictDropdown.value = !showDistrictDropdown.value;
  showProvinceDropdown.value = false;
  showSubDistrictDropdown.value = false;
};

const toggleSubDistrict = () => {
  if (!props.filters.district) return;
  showSubDistrictDropdown.value = !showSubDistrictDropdown.value;
  showProvinceDropdown.value = false;
  showDistrictDropdown.value = false;
};

const closeAllDropdowns = () => {
  showProvinceDropdown.value = false;
  showDistrictDropdown.value = false;
  showSubDistrictDropdown.value = false;
};

const selectProvince = async (provinceName) => {
  emit("updateFilters", {
    province: provinceName,
    district: "",
    subDistrict: "",
  });
  closeAllDropdowns();

  if (provinceName) {
    await fetchDistricts(provinceName);
  } else {
    districts.value = [];
  }
  subDistricts.value = [];
};

const selectDistrict = async (districtName) => {
  emit("updateFilters", {
    district: districtName,
    subDistrict: "",
  });
  closeAllDropdowns();

  if (districtName) {
    await fetchSubDistricts(districtName);
  } else {
    subDistricts.value = [];
  }
};

const selectSubDistrict = (subDistrictName) => {
  emit("updateFilters", {
    subDistrict: subDistrictName,
  });
  closeAllDropdowns();
};

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

const fetchDistricts = async (provinceName) => {
  try {
    const response = await axios.get("/districts", {
      params: { provinceName: provinceName },
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

const fetchSubDistricts = async (districtName) => {
  try {
    const response = await axios.get("/sub-districts", {
      params: { districtName: districtName },
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

onMounted(() => {
  fetchProvinces();
});
</script>

<style scoped>
button {
  user-select: none;
}
</style>
