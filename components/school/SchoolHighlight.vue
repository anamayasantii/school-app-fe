<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-semibold leading-tight">
        <span class="text-primary-green">Sorotan sekolah —</span>
        <br />
        <span class="text-primary-green">hari ini</span>
      </h1>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
      <!-- Image -->
      <div class="rounded-3xl overflow-hidden">
        <img
          v-if="schoolData.galleryImages && schoolData.galleryImages.length > 0"
          :src="schoolData.galleryImages[0]"
          :alt="schoolData.name"
          class="w-full h-[500px] object-cover"
        />
        <div
          v-else
          class="w-full h-[500px] bg-gray-800 flex items-center justify-center rounded-3xl"
        >
          <span class="text-gray-500">No Image Available</span>
        </div>
      </div>

      <!-- Info -->
      <div class="space-y-6">
        <!-- School Name -->
        <h2 class="text-2xl font-semibold text-primary-green">
          {{ schoolData.name }}
        </h2>

        <!-- Grade and Rating -->
        <div class="flex items-center gap-4 flex-wrap">
          <span
            class="px-3 py-1 bg-[#fff3d6] text-[#ffb901] rounded-full font-semibold"
          >
            {{ schoolData.accreditationCode }}
          </span>
          <span class="text-primary-green text-sm font-medium">Overall Grade</span>
          <span
            ><svg
              width="2"
              height="16"
              viewBox="0 0 2 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="2" height="16" rx="1" fill="#E7E7E7" />
            </svg>
          </span>
          <div class="flex items-center gap-2">
            <span><Star /></span>
            <span class="text-primary-green">{{ schoolData.rating || "0" }}</span>
          </div>
        </div>

        <!-- Features -->
        <div class="space-y-3 pt-4 pb-4 border-t border-b border-gray-200">
          <template
            v-if="schoolData.facilities && schoolData.facilities.length > 0"
          >
            <div
              v-for="(facility, index) in schoolData.facilities"
              :key="index"
              class="flex items-center gap-3"
            >
              <div
                class="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <span class="text-lg">{{ facility.icon }}</span>
              </div>
              <span class="text-gray-300">{{ facility.name }}</span>
            </div>
          </template>
          <template v-else>
            <p class="text-gray-400 text-sm">
              Informasi fasilitas belum tersedia
            </p>
          </template>
        </div>

        <!-- Info Card -->
        <div
          class="bg-white text-black rounded-2xl p-6 relative mt-8 border border-gray-200"
        >
          <h3 class="text-xl font-bold mb-3">Sekolah Terbaik Pilihan Kami</h3>
          <p class="text-gray-600 text-sm mb-2">
            {{ schoolData.name }} dinominasikan sebagai Sekolah Terbaik di
            Indonesia oleh para siswa dan orang tua.
          </p>
        </div>
        <NuxtLink
          :to="`/school-details/${schoolData.id}`"
          class="bg-primary-green text-[#FFFFFF] text-xs px-4 py-3 rounded-lg font-medium inline-block text-center"
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
