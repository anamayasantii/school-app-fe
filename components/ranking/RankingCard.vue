<template>
  <div>
    <div class="p-4 sm:p-6 md:p-10">
      <div class="flex items-start gap-3 sm:gap-4 md:gap-6">
        <div class="flex-shrink-0 self-center">
          <div
            :class="[
              'w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-black font-bold text-xs',
              getRankColor(rank),
            ]"
          >
            #{{ rank }}
          </div>
        </div>

        <div v-if="rank <= 3" class="flex-shrink-0">
          <img
            v-if="school.galleryImages && school.galleryImages.length > 0"
            :src="school.galleryImages[0]"
            :alt="school.schoolName"
            class="w-20 h-16 sm:w-28 sm:h-20 md:w-40 md:h-28 object-cover rounded-xl sm:rounded-2xl"
            @error="handleImageError"
          />

          <div v-else class="w-20 h-16 sm:w-28 sm:h-20 md:w-40 md:h-30 flex items-center justify-center rounded-xl sm:rounded-2xl bg-gray-100">
            <div class="text-center px-2">
              <svg
                class="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto text-primary-green-dark"
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
              <p class="text-primary-green-dark text-xs mt-1 line-clamp-1 hidden sm:block">{{ school.schoolName }}</p>
            </div>
          </div>
        </div>

        <div class="flex-1 min-w-0 self-center">
          <div class="mb-2 sm:mb-3 md:mb-4">
            <h3 class="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 line-clamp-2">
              {{ school.schoolName }}
            </h3>
          </div>

          <div class="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-2">
            <div
              :class="[
                'inline-flex items-center px-2.5 sm:px-3 md:px-5 py-0.5 sm:py-1 rounded-full text-xs font-bold',
                getGradeColor(school.accreditationCode),
              ]"
            >
              {{ school.accreditationCode }}
            </div>
            <span class="text-xs">Overall Grade</span>

            <span class="text-xs hidden sm:inline"
              ><svg
                width="2"
                height="17"
                viewBox="0 0 2 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="0.5" width="2" height="16" rx="1" fill="#E7E7E7" />
              </svg>
            </span>

            <div class="flex items-center gap-1">
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2866 3.45454C11.517 2.9876 11.6323 2.75413 11.7887 2.67953C11.9249 2.61463 12.083 2.61463 12.2191 2.67953C12.3756 2.75413 12.4908 2.9876 12.7213 3.45454L14.908 7.8845C14.976 8.02236 15.01 8.09128 15.0598 8.1448C15.1038 8.19218 15.1566 8.23057 15.2152 8.25784C15.2815 8.28864 15.3575 8.29976 15.5096 8.32199L20.4009 9.03693C20.916 9.11221 21.1735 9.14985 21.2927 9.27566C21.3964 9.38511 21.4452 9.53552 21.4254 9.685C21.4027 9.8568 21.2163 10.0384 20.8434 10.4016L17.3054 13.8476C17.1951 13.9551 17.1399 14.0088 17.1043 14.0727C17.0728 14.1293 17.0526 14.1914 17.0448 14.2557C17.036 14.3283 17.049 14.4042 17.0751 14.556L17.9099 19.4233C17.9979 19.9367 18.0419 20.1934 17.9592 20.3457C17.8872 20.4782 17.7593 20.5712 17.611 20.5987C17.4405 20.6303 17.21 20.5091 16.749 20.2666L12.3763 17.9671C12.24 17.8954 12.1719 17.8596 12.1001 17.8455C12.0366 17.833 11.9712 17.833 11.9077 17.8455C11.8359 17.8596 11.7678 17.8954 11.6316 17.9671L7.25883 20.2666C6.79782 20.5091 6.56732 20.6303 6.39688 20.5987C6.24859 20.5712 6.12063 20.4782 6.04864 20.3457C5.96591 20.1934 6.00993 19.9367 6.09798 19.4233L6.93279 14.556C6.95882 14.4042 6.97183 14.3283 6.96303 14.2557C6.95523 14.1914 6.93502 14.1293 6.90351 14.0727C6.86793 14.0088 6.81278 13.9551 6.70249 13.8476L3.16447 10.4016C2.79157 10.0384 2.60512 9.8568 2.58243 9.685C2.56269 9.53552 2.61146 9.38511 2.71516 9.27566C2.83434 9.14985 3.09188 9.11221 3.60695 9.03693L8.49822 8.32199C8.65033 8.29976 8.72639 8.28864 8.79262 8.25784C8.85127 8.23057 8.90407 8.19218 8.94809 8.1448C8.99781 8.09128 9.03184 8.02236 9.09988 7.8845L11.2866 3.45454Z"
                  fill="#FFB800"
                />
              </svg>

              <span class="text-xs sm:text-sm font-semibold text-gray-900">
                {{ school.rating.toFixed(1) }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex-shrink-0 self-center">
          <NuxtLink
            :to="`/school-details/${school.id}`"
            class="block cursor-pointer"
          >
            <button
              class="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="#082519"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  school: {
    type: Object,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
});

const handleImageError = (event) => {
  event.target.style.display = "none";
};

const getRankColor = (rank) => {
  if (rank === 1) return "bg-[#FFB800] text-white";
  if (rank === 2) return "bg-[#9E9E9E] text-white";
  if (rank === 3) return "bg-[#885A21] text-white";
  return "border border-gray-300 text-black";
};

const getGradeColor = (accreditationCode) => {
  const colorMap = {
    Unggulan: "bg-[#FFB800]/[0.16] text-[#FFB800]",
    A: "bg-[#DE03F8]/[0.16] text-[#DE03F8]",
    B: "bg-[#AD53E7]/[0.16] text-[#AD53E7]",
    C: "bg-[#3D5BE9]/[0.16] text-[#3D5BE9]",
  };
  return colorMap[accreditationCode] || "bg-blue-100 text-blue-800";
};

const viewDetails = (school) => {
  console.log("View details for:", school.schoolName);
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>