<template>
  <div class="w-full max-w-[1440px] mx-auto">
    <div class="relative overflow-hidden rounded-2xl h-[608px] group">
      <!-- Image Container -->
      <div class="relative w-full h-full">
        <!-- Image Display -->
        <div v-if="!isLoading && !error" class="w-full h-full">
          <!-- Gambar sekolah jika tersedia -->
          <img
            v-if="currentImages.length > 0"
            :src="currentImages[currentIndex]"
            :alt="school?.name || 'School Image'"
            class="w-full h-full object-cover"
          />

          <!-- Placeholder ketika gambar tidak tersedia -->
          <div
            v-else
            class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200"
          >
            <div class="text-center">
              <svg
                class="w-16 h-16 mx-auto text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <p class="text-gray-600 font-medium text-sm">
                {{ school?.name || "School Name" }}
              </p>
              <p class="text-gray-500 text-xs">No image available</p>
            </div>
          </div>
        </div>

        <!-- Loading state -->
        <div
          v-if="isLoading"
          class="absolute inset-0 bg-bg-light flex items-center justify-center"
        >
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"
          ></div>
        </div>

        <!-- Error state -->
        <div
          v-if="error"
          class="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center"
        >
          <p class="text-red-600">{{ error }}</p>
        </div>

        <!-- Navigation Arrows -->
        <div
          v-if="currentImages.length === 1"
          class="absolute inset-y-0 left-0 flex items-center"
        >
          <button
            @click="previousImage"
            class="ml-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2875 4.651C15.1504 4.59415 14.9996 4.57922 14.8541 4.60809C14.7086 4.63696 14.5749 4.70833 14.47 4.81319L6.96996 12.3132C6.90023 12.3828 6.84491 12.4656 6.80717 12.5566C6.76943 12.6477 6.75 12.7453 6.75 12.8438C6.75 12.9424 6.76943 13.04 6.80717 13.131C6.84491 13.2221 6.90023 13.3048 6.96996 13.3744L14.47 20.8744C14.5749 20.9795 14.7085 21.051 14.8541 21.08C14.9997 21.1089 15.1506 21.0941 15.2877 21.0373C15.4248 20.9805 15.542 20.8842 15.6244 20.7608C15.7068 20.6374 15.7507 20.4922 15.7506 20.3438V5.34381C15.7506 5.19548 15.7065 5.05048 15.6241 4.92716C15.5417 4.80385 15.4245 4.70774 15.2875 4.651Z"
                fill="#ADB5BD"
              />
            </svg>
          </button>
        </div>

        <div
          v-if="currentImages.length === 1"
          class="absolute inset-y-0 right-0 flex items-center"
        >
          <button
            @click="nextImage"
            class="mr-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0306 12.3137L9.53063 4.81372C9.42573 4.70871 9.29204 4.63718 9.14648 4.60819C9.00092 4.57921 8.85002 4.59406 8.71291 4.65087C8.57579 4.70769 8.45861 4.80391 8.37621 4.92735C8.29381 5.0508 8.24988 5.19592 8.25 5.34434V20.3443C8.24988 20.4928 8.29381 20.6379 8.37621 20.7613C8.45861 20.8848 8.57579 20.981 8.71291 21.0378C8.85002 21.0946 9.00092 21.1095 9.14648 21.0805C9.29204 21.0515 9.42573 20.98 9.53063 20.875L17.0306 13.375C17.1004 13.3053 17.1557 13.2226 17.1934 13.1315C17.2312 13.0405 17.2506 12.9429 17.2506 12.8443C17.2506 12.7458 17.2312 12.6482 17.1934 12.5571C17.1557 12.4661 17.1004 12.3834 17.0306 12.3137Z"
                fill="#ADB5BD"
              />
            </svg>
          </button>
        </div>

        <!-- Dots Indicator -->
        <div
          v-if="currentImages.length > 0"
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <div class="flex space-x-2">
            <button
              v-for="(image, index) in currentImages"
              :key="index"
              @click="currentIndex = index"
              class="w-1 h-1 rounded-full transition-all duration-200"
              :class="
                currentIndex === index
                  ? 'bg-white shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              "
            ></button>
          </div>
        </div>

        <!-- Image Counter -->
        <!-- <div v-if="currentImages.length === 1" class="absolute top-4 right-4">
          <div class="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
            {{ currentIndex + 1 }} / {{ currentImages.length }}
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from "@/lib/axios";
import { ref, onMounted, computed, onUnmounted } from "vue";

const route = useRoute();
const school = ref(null);
const isLoading = ref(true);
const error = ref(null);
const currentIndex = ref(0);

let autoSlideInterval = null;

const currentImages = computed(() => {
  if (!school.value) return [];

  if (school.value.galleryImages && school.value.galleryImages.length > 0) {
    return school.value.galleryImages;
  }

  if (school.value.image) {
    return [school.value.image];
  }

  return [];
});

const nextImage = () => {
  if (currentImages.value.length > 1) {
    currentIndex.value = (currentIndex.value + 1) % currentImages.value.length;
  }
};

const previousImage = () => {
  if (currentImages.value.length > 1) {
    currentIndex.value =
      currentIndex.value === 0
        ? currentImages.value.length - 1
        : currentIndex.value - 1;
  }
};

const startAutoSlide = () => {
  if (currentImages.value.length > 1) {
    autoSlideInterval = setInterval(() => {
      nextImage();
    }, 5000);
  }
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

const handleKeydown = (event) => {
  if (event.key === "ArrowLeft") {
    previousImage();
  } else if (event.key === "ArrowRight") {
    nextImage();
  }
};

const fetchSchoolData = async () => {
  try {
    const response = await axios.get(`/school-details/${route.params.id}`);
    school.value = response.data.data || {};
    isLoading.value = false;

    startAutoSlide();
  } catch (err) {
    console.error("Error fetching data:", err);
    error.value = "Failed to load school data";
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSchoolData();
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  stopAutoSlide();
  window.removeEventListener("keydown", handleKeydown);
});
</script>
