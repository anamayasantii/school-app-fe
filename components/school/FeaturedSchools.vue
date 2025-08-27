<template>
  <div class="flex flex-col items-center max-w-6xl mx-auto w-full p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="school in schools"
        :key="school.id"
        class="flex flex-col bg-[#F2ECE3] shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 w-64"
      >
        <div class="relative">
          <img
            v-if="school.galleryImages && school.galleryImages.length > 0"
            :src="school.galleryImages[0]"
            alt="Image of school"
            class="w-full h-48 object-cover rounded-t-xl"
          />
        </div>

        <div class="p-4">
          <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 dark:text-white">
            {{ school.schoolName }}
          </h3>

          <div class="flex items-center text-gray-500 text-sm mb-3">
            <svg
              class="w-4 h-4 mr-1"
              width="24"
              height="24"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C11.337 12 10.7011 11.7366 10.2322 11.2678C9.76339 10.7989 9.5 10.163 9.5 9.5C9.5 8.83696 9.76339 8.20107 10.2322 7.73223C10.7011 7.26339 11.337 7 12 7C12.663 7 13.2989 7.26339 13.7678 7.73223C14.2366 8.20107 14.5 8.83696 14.5 9.5C14.5 9.8283 14.4353 10.1534 14.3097 10.4567C14.1841 10.76 13.9999 11.0356 13.7678 11.2678C13.5356 11.4999 13.26 11.6841 12.9567 11.8097C12.6534 11.9353 12.3283 12 12 12ZM12 2.5C10.1435 2.5 8.36301 3.2375 7.05025 4.55025C5.7375 5.86301 5 7.64348 5 9.5C5 14.75 12 22.5 12 22.5C12 22.5 19 14.75 19 9.5C19 7.64348 18.2625 5.86301 16.9497 4.55025C15.637 3.2375 13.8565 2.5 12 2.5Z"
                fill="#F52936"
              />
            </svg>
            {{ school.subDistrictName }}, {{ school.districtName }}
          </div>

          <div class="flex items-center">
            <div class="flex items-center">
              <div class="flex items-center text-yellow-400">
                <!-- Single star -->
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.13L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77Z"
                    fill="#FFB800"
                  />
                </svg>
                <!-- Rating number -->
                <span class="ml-1 text-sm text-gray-800 font-medium dark:text-white">
                  {{ school.rating }}
                </span>
              </div>
              <!-- Review count -->
              <span class="ml-2 text-sm text-gray-600 dark:text-neutral-400">
                ({{ school.reviewers }} Reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "@/lib/axios";

const schools = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("/school-detail/featured");
    schools.value = response.data.data;
  } catch (error) {
    console.error("Error fetching featured schools:", error);
  }
});
</script>