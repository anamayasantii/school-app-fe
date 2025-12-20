<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6"
  >
    <!-- Province Dropdown -->
    <div class="relative">
      <div
        @click="toggleProvince"
        class="relative flex items-center border border-[#28190C]/[0.12] font-medium rounded-lg p-3 cursor-pointer"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      >
        <label
          class="text-xs sm:text-sm text-[#76685A] mr-1.5 sm:mr-2 whitespace-nowrap"
          >Provinsi:</label
        >
        <span
          class="flex-1 text-xs sm:text-sm"
          :class="selectedProvince ? 'text-gray-700' : 'text-gray-400'"
        >
          {{ selectedProvince || "Semua" }}
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
        v-if="showProvinceDropdown && !disabled"
        class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-64 overflow-y-auto z-50"
      >
        <div
          @click="selectProvince('')"
          class="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between text-sm"
        >
          <span
            :class="
              !selectedProvince ? 'text-[#FF6B35] font-medium' : 'text-gray-700'
            "
            >Semua</span
          >
          <svg
            v-if="!selectedProvince"
            class="w-5 h-5 text-[#FF6B35]"
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
            <div class="w-6 text-xs font-medium text-gray-400 uppercase">
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
                selectedProvince === province.name
                  ? 'bg-[#FFF9F8]'
                  : 'hover:bg-gray-50'
              "
            >
              <span
                :class="
                  selectedProvince === province.name
                    ? 'text-[#FF6B35] font-medium'
                    : 'text-gray-700'
                "
              >
                {{ province.name }}
              </span>
              <svg
                v-if="selectedProvince === province.name"
                class="w-5 h-5 text-[#FF6B35]"
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

    <!-- District Dropdown -->
    <div class="relative">
      <div
        @click="toggleDistrict"
        class="relative flex items-center border border-gray-300 rounded-lg p-3 cursor-pointer"
        :class="{ 'opacity-50 cursor-not-allowed': !selectedProvince }"
      >
        <label
          class="text-xs sm:text-sm text-gray-600 mr-1.5 sm:mr-2 whitespace-nowrap"
          >Regency:</label
        >
        <span
          class="flex-1 text-xs sm:text-sm"
          :class="selectedDistrict ? 'text-gray-700' : 'text-gray-400'"
        >
          {{ selectedDistrict || "Semua" }}
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
        v-if="showDistrictDropdown && selectedProvince"
        class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-64 overflow-y-auto z-50"
      >
        <div
          @click="selectDistrict('')"
          class="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between text-sm"
        >
          <span
            :class="
              !selectedDistrict ? 'text-[#FF6B35] font-medium' : 'text-gray-700'
            "
            >Semua</span
          >
          <svg
            v-if="!selectedDistrict"
            class="w-5 h-5 text-[#FF6B35]"
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
            <div class="w-6 text-xs font-medium text-gray-400 uppercase">
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
                selectedDistrict === district.name
                  ? 'bg-[#FFF9F8]'
                  : 'hover:bg-gray-50'
              "
            >
              <span
                :class="
                  selectedDistrict === district.name
                    ? 'text-[#FF6B35] font-medium'
                    : 'text-gray-700'
                "
              >
                {{ district.name }}
              </span>
              <svg
                v-if="selectedDistrict === district.name"
                class="w-5 h-5 text-[#FF6B35]"
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

    <!-- SubDistrict Dropdown -->
    <div class="relative">
      <div
        @click="toggleSubDistrict"
        class="relative flex items-center border border-gray-300 rounded-lg p-3 cursor-pointer"
        :class="{ 'opacity-50 cursor-not-allowed': !selectedDistrict }"
      >
        <label
          class="text-xs sm:text-sm text-gray-600 mr-1.5 sm:mr-2 whitespace-nowrap"
          >Subdistrict:</label
        >
        <span
          class="flex-1 text-xs sm:text-sm"
          :class="selectedSubDistrict ? 'text-gray-700' : 'text-gray-400'"
        >
          {{ selectedSubDistrict || "Semua" }}
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
        v-if="showSubDistrictDropdown && selectedDistrict"
        class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-64 overflow-y-auto z-50"
      >
        <div
          @click="selectSubDistrict('')"
          class="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between text-sm"
        >
          <span
            :class="
              !selectedSubDistrict
                ? 'text-[#FF6B35] font-medium'
                : 'text-gray-700'
            "
            >Semua</span
          >
          <svg
            v-if="!selectedSubDistrict"
            class="w-5 h-5 text-[#FF6B35]"
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
            <div class="w-6 text-xs font-medium text-gray-400 uppercase">
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
                selectedSubDistrict === subDistrict.name
                  ? 'bg-[#FFF9F8]'
                  : 'hover:bg-gray-50'
              "
            >
              <span
                :class="
                  selectedSubDistrict === subDistrict.name
                    ? 'text-[#FF6B35] font-medium'
                    : 'text-gray-700'
                "
              >
                {{ subDistrict.name }}
              </span>
              <svg
                v-if="selectedSubDistrict === subDistrict.name"
                class="w-5 h-5 text-[#FF6B35]"
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
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  selectedProvince: {
    type: String,
    default: "",
  },
  selectedDistrict: {
    type: String,
    default: "",
  },
  selectedSubDistrict: {
    type: String,
    default: "",
  },
  provinceList: {
    type: Array,
    default: () => [],
  },
  districtList: {
    type: Array,
    default: () => [],
  },
  subDistrictList: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "update:selectedProvince",
  "update:selectedDistrict",
  "update:selectedSubDistrict",
]);

const showProvinceDropdown = ref(false);
const showDistrictDropdown = ref(false);
const showSubDistrictDropdown = ref(false);

const groupedProvinces = computed(() => {
  const sorted = [...props.provinceList].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return sorted.reduce((acc, province) => {
    const firstLetter = province.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(province);
    return acc;
  }, {});
});

const groupedDistricts = computed(() => {
  const sorted = [...props.districtList].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return sorted.reduce((acc, district) => {
    const firstLetter = district.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(district);
    return acc;
  }, {});
});

const groupedSubDistricts = computed(() => {
  const sorted = [...props.subDistrictList].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return sorted.reduce((acc, subDistrict) => {
    const firstLetter = subDistrict.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(subDistrict);
    return acc;
  }, {});
});

const toggleProvince = () => {
  if (!props.disabled) {
    showProvinceDropdown.value = !showProvinceDropdown.value;
    showDistrictDropdown.value = false;
    showSubDistrictDropdown.value = false;
  }
};

const toggleDistrict = () => {
  if (props.selectedProvince) {
    showDistrictDropdown.value = !showDistrictDropdown.value;
    showProvinceDropdown.value = false;
    showSubDistrictDropdown.value = false;
  }
};

const toggleSubDistrict = () => {
  if (props.selectedDistrict) {
    showSubDistrictDropdown.value = !showSubDistrictDropdown.value;
    showProvinceDropdown.value = false;
    showDistrictDropdown.value = false;
  }
};

const selectProvince = (value) => {
  emit("update:selectedProvince", value);
  showProvinceDropdown.value = false;
};

const selectDistrict = (value) => {
  emit("update:selectedDistrict", value);
  showDistrictDropdown.value = false;
};

const selectSubDistrict = (value) => {
  emit("update:selectedSubDistrict", value);
  showSubDistrictDropdown.value = false;
};
</script>
