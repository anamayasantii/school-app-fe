<template>
  <div class="min-h-screen container mx-auto py-6 px-16">
    <!-- Search Bar - Full Width at Top -->
    <div class="py-4">
      <div class="max-w-5xl mx-auto">
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4"
          >
            <svg
              class="flex-shrink-0 size-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            class="py-3 ps-11 pe-4 block w-full border border-[#28190C]/[0.12] rounded-lg text-sm bg-transparent"
            placeholder="Search review by School or University"
          />
        </div>
      </div>
    </div>

    <!-- Main Layout: Sidebar + Content -->
    <div class="max-w-5xl mx-auto flex">
      <!-- Left Sidebar -->
      <div class="w-[400px] p-6 space-y-8">
        <!-- Level Section -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Level</h3>
          <div class="space-y-2">
            <button
              v-for="level in schoolLevels"
              :key="level.id"
              @click="toggleFilter('levels', level.id)"
              :class="[
                'flex items-center w-full px-4 py-3 text-sm text-start rounded-lg transition-all duration-200',
                activeFilters.levels.includes(level.id)
                  ? 'bg-gray-100 text-gray-900 border border-gray-200'
                  : 'text-gray-600 hover:bg-gray-50',
              ]"
            >
              <component
                :is="level.icon"
                class="flex-shrink-0 size-4 me-3 text-gray-500"
              />
              <span>{{ level.name }}</span>
            </button>
          </div>
        </div>

        <!-- Type Section -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Type</h3>
          <div class="space-y-2">
            <button
              v-for="type in schoolTypes"
              :key="type.id"
              @click="toggleFilter('types', type.id)"
              :class="[
                'flex items-center w-full px-4 py-3 text-sm text-start rounded-lg transition-all duration-200',
                activeFilters.types.includes(type.id)
                  ? 'bg-gray-100 text-gray-900 border border-gray-200'
                  : 'text-gray-600 hover:bg-gray-50',
              ]"
            >
              <component
                :is="type.icon"
                class="flex-shrink-0 size-4 me-3 text-gray-500"
              />
              <span>{{ type.name }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Right Main Content -->
      <div class="flex-1 p-6">
        <!-- Filter Dropdowns Row -->
        <div class="p-4 mb-6">
          <div class="flex items-center gap-6">
            <!-- Province -->
            <div class="flex items-center gap-2 rounded-lg border border-gray-200 ">
              <label class="text-sm font-medium text-gray-700 whitespace-nowrap"
                >Province:</label
              >
              <select
                v-model="activeFilters.province"
                class="py-2 px-3 rounded-md text-sm bg-transparent"
              >
                <option
                  v-for="province in provinces"
                  :key="province"
                  :value="province"
                >
                  {{ province }}
                </option>
              </select>
            </div>

            <!-- Regency/City -->
            <div class="flex items-center gap-2 rounded-lg border border-gray-200 ">
              <label class="text-sm font-medium text-gray-700 whitespace-nowrap"
                >Regency/City:</label
              >
              <select
                v-model="activeFilters.city"
                class="py-2 px-3 rounded-md text-sm bg-transparent"
              >
                <option v-for="city in cities" :key="city" :value="city">
                  {{ city }}
                </option>
              </select>
            </div>

            <!-- Subdistrict -->
            <div class="flex items-center gap-2 rounded-lg border">
              <label class="text-sm font-medium text-gray-700 whitespace-nowrap"
                >Subdistrict:</label
              >
              <select
                v-model="activeFilters.subdistrict"
                class="py-2 px-3 rounded-md text-sm bg-transparent"
              >
                <option
                  v-for="subdistrict in subdistricts"
                  :key="subdistrict"
                  :value="subdistrict"
                >
                  {{ subdistrict }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <AllReview />
      </div>
    </div>
  </div>
</template>

<script setup>
import AllReview from "@/components/review/AllReview.vue";
// Icons
const BookIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
};

const GraduationCapIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
};

const BuildingIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v8h4"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-4"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
};

const UniversityIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="1"/><path d="M22 20V8h-4l-6-4-6 4H2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2"/><path d="M6 17v.01"/><path d="M6 13v.01"/><path d="M18 17v.01"/><path d="M18 13v.01"/><path d="M14 22v-5a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5"/></svg>`,
};

// Reactive data
const searchQuery = ref("");

const activeFilters = reactive({
  levels: [],
  types: [],
  province: "All",
  city: "All",
  subdistrict: "All",
  sortBy: "Newest",
});

// Filter options
const schoolLevels = [
  { id: "elementary", name: "Elementary School (SD)", icon: BookIcon },
  { id: "junior", name: "Junior High School (SMP)", icon: GraduationCapIcon },
  { id: "senior", name: "Senior High School (SMA)", icon: BuildingIcon },
  {
    id: "vocational",
    name: "Vocational High School (SMK)",
    icon: BuildingIcon,
  },
  { id: "university", name: "University", icon: UniversityIcon },
];

const schoolTypes = [
  { id: "integrated", name: "Integrated School", icon: BuildingIcon },
  { id: "public", name: "Public School", icon: BuildingIcon },
  { id: "international", name: "International School", icon: BuildingIcon },
];

const provinces = [
  "All",
  "DKI Jakarta",
  "West Java",
  "Central Java",
  "East Java",
];
const cities = ["All", "Jakarta", "Bandung", "Surabaya", "Semarang"];
const subdistricts = ["All", "Menteng", "Cipete", "Kelapa Gading", "Bekasi"];
const sortOptions = ["Newest", "Oldest", "Highest Rating", "Lowest Rating"];

// Methods
const toggleFilter = (type, value) => {
  const index = activeFilters[type].indexOf(value);
  if (index > -1) {
    activeFilters[type].splice(index, 1);
  } else {
    activeFilters[type].push(value);
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
