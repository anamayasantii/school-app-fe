<template>
  <div class="rounded-xl bg-[#F2ECE3]">
    <NuxtLink
      :to="`/school-details/${school.id}`"
      class="block cursor-pointer"
    >
      <div class="relative overflow-hidden rounded-t-xl bg-gray-100">
        <!-- Actual Image -->
        <img
          v-if="school.galleryImages && school.galleryImages.length > 0"
          :src="school.galleryImages[0]"
          :alt="school.name"
          class="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
        />

        <!-- Placeholder when no image -->
        <div
          v-else
          class="w-full h-48 flex items-center justify-center bg-gradient-to-br rounded-xl bg-[#F2ECE3] cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          <div class="text-center">
            <svg
              class="w-16 h-16 mx-auto text-[#76685A] mb-2"
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
            <p class="text-[#76685A] font-medium text-sm">
              {{ school.name }}
            </p>
            <p class="text-[#76685A] text-xs">No image available</p>
          </div>
        </div>
      </div>

      <div class="p-4">
        <h3 class="font-semibold text-[#1D2B29] mb-2 line-clamp-2">
          {{ school.name }}
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
          <div class="flex items-center text-yellow-400">
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

            <span class="ml-1 text-sm text-gray-800 font-medium">
              {{ school.rating }}
            </span>
          </div>

          <span class="ml-2 text-sm text-gray-600">
            ({{ school.reviewers }} Reviews)
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
// Define props
const props = defineProps({
  school: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* Custom line-clamp utility if not available in your CSS framework */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>