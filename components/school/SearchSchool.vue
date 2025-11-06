<template>
  <div class="relative w-full max-w-[690px]">
    <div
      class="w-full h-[45px] rounded-[32px] bg-[#FBFBFB] px-6 flex items-center gap-6 relative z-20"
    >
      <svg
        class="w-6 h-6 text-[#082519] flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
      <input
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        :placeholder="
          isFocused
            ? 'Cari sekolah berdasarkan nama, lokasi, atau jenjang pendidikan'
            : 'Cari sekolah mana pun'
        "
        class="flex-1 bg-transparent border-none outline-none text-base text-[#082519] placeholder:text-[#082519] placeholder:opacity-60"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleSearch"
      />
    </div>

    <!-- Dropdown Results -->
    <div
      v-if="showDropdown"
      class="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-lg max-h-[500px] overflow-y-auto z-30"
    >
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="py-8 px-8 flex flex-col items-center gap-3 text-gray-500"
      >
        <div class="loading-spinner"></div>
        <span>Mencari sekolah...</span>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="searchQuery && schools.length === 0"
        class="py-8 px-8 text-center text-gray-500"
      >
        <p>Tidak ada hasil untuk "{{ searchQuery }}"</p>
      </div>

      <!-- Search Results -->
      <div v-else-if="schools.length > 0" class="p-4">
        <NuxtLink
          v-for="school in schools"
          :key="school.id"
          :to="`/school-details/${school.id}`"
          class="flex gap-4 p-4 rounded-xl transition-colors cursor-pointer no-underline text-inherit hover:bg-gray-50"
        >
          <img
            :src="school.galleryImages[0] || '/placeholder-school.jpg'"
            :alt="school.name"
            class="w-20 h-20 rounded-xl object-cover flex-shrink-0"
          />
          <div class="flex-1 flex flex-col gap-2 justify-center">
            <p class="text-[15px] text-gray-900 m-0 font-medium leading-tight text-left">
              {{ school.name }}
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              <span
                class="inline-flex items-center justify-center w-8 h-4 bg-red-50 text-red-600 font-semibold text-xs rounded-full"
              >
                {{ school.accreditationCode }}
              </span>
              <span class="text-sm">Overall Grade</span>
              <svg width="2" height="16" viewBox="0 0 2 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="2" height="16" rx="1" fill="#F8F9FA"/>
              </svg>
              <div class="flex items-center gap-1">
                <svg
                  class="text-yellow-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="14"
                  height="14"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
                <span class="text-xs font-semibold">{{
                  school.rating || 0
                }}</span>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- See All Results Button -->
        <NuxtLink
          v-if="hasMore"
          :to="`/school-result?search=${searchQuery}`"
          class="w-1/4 py-4 mt-2 border border-gray-200 rounded-xl bg-white text-gray-900 text-xs font-medium cursor-pointer transition-all no-underline block text-center hover:bg-gray-50 hover:border-gray-300"
        >
          See all result from "{{ searchQuery }}"
        </NuxtLink>
      </div>
    </div>

    <!-- Overlay -->
    <div
      v-if="showDropdown"
      class="fixed inset-0 bg-black bg-opacity-30 z-10"
      @click="closeDropdown"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "@/lib/axios";

const searchQuery = ref("");
const schools = ref([]);
const isFocused = ref(false);
const showDropdown = ref(false);
const isLoading = ref(false);
const hasMore = ref(false);
let searchTimeout = null;

const handleFocus = () => {
  isFocused.value = true;
  showDropdown.value = true;
};

const handleBlur = () => {
  setTimeout(() => {
    isFocused.value = false;
  }, 200);
};

const closeDropdown = () => {
  showDropdown.value = false;
};

const handleSearch = async () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  if (!searchQuery.value.trim()) {
    schools.value = [];
    return;
  }

  searchTimeout = setTimeout(async () => {
    isLoading.value = true;
    try {
      const { data } = await axios.get("/school-details", {
        params: {
          search: searchQuery.value,
          limit: 3,
        },
      });

      if (data.status === "success" && data.data?.datas) {
        schools.value = data.data.datas;
        hasMore.value = data.data.meta.total > schools.value.length;
      } else {
        schools.value = [];
        hasMore.value = false;
      }
    } catch (error) {
      console.error("Error searching schools:", error);
      schools.value = [];
      hasMore.value = false;
    } finally {
      isLoading.value = false;
    }
  }, 500);
};

watch(showDropdown, (newVal) => {
  if (!newVal) {
    schools.value = [];
    searchQuery.value = "";
  }
});
</script>

<style scoped>
.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top-color: #082519;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .relative {
    max-width: 500px;
  }
}

@media (max-width: 480px) {
  .h-\[45px\] {
    height: 56px;
  }
  
  .px-6 {
    padding-left: 16px;
    padding-right: 16px;
  }
  
  .gap-6 {
    gap: 12px;
  }
}
</style>