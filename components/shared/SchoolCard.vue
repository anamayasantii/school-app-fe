<template>
  <div class="rounded-xl bg-white border border-border-gray">
    <NuxtLink :to="`/school-details/${school.id}`" class="block cursor-pointer">
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

        <div class="flex items-center text-sm mb-3">
          <svg
            class="w-4 h-4 mr-2 flex-shrink-0"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.2485 11.3982C23.2462 11.7151 23.1421 12.0229 22.9515 12.2761C22.7609 12.5293 22.494 12.7145 22.1901 12.8044L22.1713 12.81L14.8588 14.8575L12.8113 22.17L12.8057 22.1888C12.7157 22.4926 12.5304 22.7595 12.2772 22.9501C12.024 23.1406 11.7163 23.2448 11.3994 23.2472H11.3713C11.0606 23.2501 10.7568 23.1551 10.5032 22.9755C10.2496 22.7959 10.059 22.541 9.95851 22.2469L3.84226 5.75724C3.84028 5.75238 3.83871 5.74736 3.83757 5.74224C3.74617 5.47677 3.73111 5.19097 3.7941 4.91737C3.85709 4.64376 3.99561 4.39333 4.1939 4.19455C4.39218 3.99578 4.64227 3.85664 4.91573 3.79298C5.18918 3.72931 5.47501 3.74367 5.7407 3.83442L5.7557 3.83911L22.2482 9.95724C22.5468 10.0593 22.805 10.2542 22.985 10.5135C23.1649 10.7727 23.2573 11.0827 23.2485 11.3982Z"
              fill="#FF4672"
            />
          </svg>

          <span class="leading-none">
            {{ school.subDistrictName }}, {{ school.districtName }}
          </span>
        </div>

        <div class="flex items-center">
          <div class="flex items-center text-yellow-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.9646 10.7681L17.7459 14.4084L19.0312 19.8524C19.1021 20.148 19.0838 20.4579 18.9787 20.7431C18.8736 21.0282 18.6863 21.2758 18.4405 21.4546C18.1947 21.6334 17.9015 21.7353 17.5978 21.7475C17.2941 21.7597 16.9936 21.6816 16.7343 21.5231L11.9999 18.6093L7.26275 21.5231C7.00347 21.6807 6.70335 21.758 6.4002 21.7454C6.09704 21.7327 5.8044 21.6307 5.55913 21.4521C5.31386 21.2734 5.12692 21.0262 5.02185 20.7416C4.91679 20.457 4.89829 20.1476 4.96869 19.8524L6.25869 14.4084L2.03994 10.7681C1.81053 10.5698 1.64462 10.3083 1.56293 10.0163C1.48123 9.72433 1.48737 9.41473 1.58058 9.1262C1.67379 8.83767 1.84994 8.58299 2.08703 8.39397C2.32412 8.20495 2.61164 8.08997 2.91369 8.06339L8.44494 7.61714L10.5787 2.45339C10.6942 2.17196 10.8908 1.93124 11.1434 1.76183C11.3961 1.59241 11.6934 1.50195 11.9976 1.50195C12.3018 1.50195 12.5991 1.59241 12.8518 1.76183C13.1044 1.93124 13.301 2.17196 13.4165 2.45339L15.5493 7.61714L21.0806 8.06339C21.3832 8.08898 21.6716 8.20332 21.9095 8.39208C22.1475 8.58084 22.3244 8.83562 22.4182 9.1245C22.512 9.41338 22.5185 9.72352 22.4368 10.0161C22.3551 10.3086 22.1889 10.5705 21.959 10.769L21.9646 10.7681Z"
                fill="#FFB800"
              />
            </svg>

            <span class="ml-1 text-sm text-primary-green font-medium">
              {{ school.rating }}
            </span>
          </div>

          <span class="ml-2 text-sm text-primary-green">
            ({{ school.reviewers }} Ulasan)
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
