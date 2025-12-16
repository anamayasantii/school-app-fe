<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
    <div
      class="relative flex items-center border border-[#28190C]/[0.12] font-medium rounded-lg p-2"
    >
      <label class="text-xs sm:text-sm text-[#76685A] mr-1.5 sm:mr-2 whitespace-nowrap">Provinsi:</label>
      <select
        :value="selectedProvince"
        @change="$emit('update:selectedProvince', $event.target.value)"
        :disabled="disabled"
        :class="[
          'appearance-none block w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-transparent text-gray-700 focus:outline-none text-xs sm:text-sm',
          disabled ? 'cursor-not-allowed' : '',
        ]"
      >
        <option value="">Provinsi</option>
        <option
          v-for="province in provinceList"
          :key="province.id"
          :value="province.name"
        >
          {{ province.name }}
        </option>
      </select>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none"
      >
        <svg
          class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

    <div
      class="relative flex items-center border border-gray-300 rounded-lg p-2"
    >
      <label class="text-xs sm:text-sm text-gray-600 mr-1.5 sm:mr-2 whitespace-nowrap">Regency:</label>
      <select
        :value="selectedDistrict"
        @change="$emit('update:selectedDistrict', $event.target.value)"
        :disabled="!selectedProvince"
        :class="[
          'appearance-none block w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-transparent text-gray-700 focus:outline-none text-xs sm:text-sm',
          !selectedProvince ? 'bg-gray-100 cursor-not-allowed' : '',
        ]"
      >
        <option value="">Kabupaten</option>
        <option
          v-for="district in districtList"
          :key="district.id"
          :value="district.name"
        >
          {{ district.name }}
        </option>
      </select>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none"
      >
        <svg
          class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

    <div
      class="relative flex items-center border border-gray-300 rounded-lg p-2"
    >
      <label class="text-xs sm:text-sm text-gray-600 mr-1.5 sm:mr-2 whitespace-nowrap">Subdistrict:</label>
      <select
        :value="selectedSubDistrict"
        @change="$emit('update:selectedSubDistrict', $event.target.value)"
        :disabled="!selectedDistrict"
        :class="[
          'appearance-none block w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-transparent text-gray-700 focus:outline-none text-xs sm:text-sm',
          !selectedDistrict ? 'bg-gray-100 cursor-not-allowed' : '',
        ]"
      >
        <option value="">Kecamatan</option>
        <option
          v-for="subDistrict in subDistrictList"
          :key="subDistrict.id"
          :value="subDistrict.name"
        >
          {{ subDistrict.name }}
        </option>
      </select>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none"
      >
        <svg
          class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedProvince: {
    type: String,
    default: ''
  },
  selectedDistrict: {
    type: String,
    default: ''
  },
  selectedSubDistrict: {
    type: String,
    default: ''
  },
  provinceList: {
    type: Array,
    default: () => []
  },
  districtList: {
    type: Array,
    default: () => []
  },
  subDistrictList: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:selectedProvince', 'update:selectedDistrict', 'update:selectedSubDistrict']);
</script>