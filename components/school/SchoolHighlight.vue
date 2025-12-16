<template>
  <div v-if="schoolData.id" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
    <div class="text-center mb-8 sm:mb-12 md:mb-16">
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
        <span class="text-primary-green">Sorotan sekolah —</span>
        <br />
        <span class="text-primary-green">hari ini</span>
      </h1>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
      <div class="rounded-2xl sm:rounded-3xl overflow-hidden">
        <img
          v-if="schoolData.galleryImages && schoolData.galleryImages.length > 0"
          :src="schoolData.galleryImages[0]"
          :alt="schoolData.name"
          class="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
        />
        <div
          v-else
          class="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-800 flex items-center justify-center rounded-2xl sm:rounded-3xl"
        >
          <span class="text-gray-500 text-sm sm:text-base">No Image Available</span>
        </div>
      </div>

      <div class="space-y-4 sm:space-y-6">
        <h2 class="text-xl sm:text-2xl font-semibold text-primary-green">
          {{ schoolData.name }}
        </h2>

        <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span
            class="px-2.5 sm:px-3 py-1 bg-[#fff3d6] text-[#ffb901] rounded-full font-semibold text-xs sm:text-sm"
          >
            {{ schoolData.accreditationCode }}
          </span>
          <span class="text-primary-green text-xs sm:text-sm font-medium">Overall Grade</span>
          <span
            ><svg
              width="2"
              height="16"
              viewBox="0 0 2 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="hidden sm:block"
            >
              <rect width="2" height="16" rx="1" fill="#E7E7E7" />
            </svg>
          </span>
          <div class="flex items-center gap-1.5 sm:gap-2">
            <span class="w-4 h-4 sm:w-5 sm:h-5"><Star /></span>
            <span class="text-primary-green text-sm sm:text-base">{{ schoolData.rating || "0" }}</span>
          </div>
        </div>

        <div class="space-y-2.5 sm:space-y-3 pt-3 sm:pt-4 pb-3 sm:pb-4 border-t border-b border-gray-200">
          <template
            v-if="schoolData.facilities && schoolData.facilities.length > 0"
          >
            <div
              v-for="(facility, index) in schoolData.facilities"
              :key="index"
              class="flex items-center gap-2.5 sm:gap-3"
            >
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <span class="text-base sm:text-lg">{{ facility.icon }}</span>
              </div>
              <span class="text-gray-300 text-sm sm:text-base">{{ facility.name }}</span>
            </div>
          </template>
          <template v-else>
            <p class="text-gray-400 text-xs sm:text-sm">
              Informasi fasilitas belum tersedia
            </p>
          </template>
        </div>

        <div
          class="bg-white text-black rounded-xl sm:rounded-2xl p-4 sm:p-6 relative mt-6 sm:mt-8 border border-gray-200"
        >
          <h3 class="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Sekolah Terbaik Pilihan Kami</h3>
          <p class="text-gray-600 text-xs sm:text-sm mb-2">
            {{ schoolData.name }} dinominasikan sebagai Sekolah Terbaik di
            Indonesia oleh para siswa dan orang tua.
          </p>
        </div>
        <NuxtLink
          :to="`/school-details/${schoolData.id}`"
          class="bg-primary-green text-[#FFFFFF] text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-medium inline-block text-center w-full sm:w-auto"
        >
          Lihat Detail
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/lib/axios";
import Star from "~/assets/Star.vue";

const schoolData = ref({
  id: null,
  name: "",
  accreditationCode: "",
  provinceName: "",
  districtName: "",
  subDistrictName: "",
  village: "",
  street: null,
  galleryImages: [],
  rating: 0,
  reviewers: 0,
  facilities: [],
});

const fetchSchoolHighlight = async () => {
  try {
    const response = await axios.get("/school-detail/highlighted");

    if (response.data.status === "success" && response.data.data.length > 0) {
      schoolData.value = response.data.data[0];
    }
  } catch (error) {
    console.error("Error fetching school highlight:", error);
  }
};

onMounted(() => {
  fetchSchoolHighlight();
});
</script>