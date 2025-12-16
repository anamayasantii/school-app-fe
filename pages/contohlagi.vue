<template>
  <div
    class="min-h-screen"
    style="
      background: linear-gradient(
        to bottom,
        rgba(14, 153, 111, 0.12) 0%,
        rgba(14, 153, 111, 0.05) 50%,
        rgba(255, 255, 255, 0) 100%
      );
    "
  >
    <!-- Progress Steps Section -->
    <div class="bg-white py-4 md:py-8">
      <div class="max-w-3xl mx-auto px-4">
        <div class="flex items-center justify-center">
          <div
            class="flex items-center justify-between w-full max-w-md md:max-w-2xl"
          >
            <!-- Step 1 - Completed -->
            <div class="flex flex-col items-center flex-1">
              <div
                class="w-8 h-8 md:w-10 md:h-10 bg-[#0E996F] text-white rounded-full flex items-center justify-center font-semibold mb-1 md:mb-2"
              >
                <svg
                  class="w-4 h-4 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div
                class="text-xs md:text-sm font-medium text-[#0E996F] text-center leading-tight"
              >
                Detail Anda
              </div>
            </div>

            <div
              class="flex-shrink-0 w-12 sm:w-20 md:w-32 h-0.5 bg-[#0E996F] mx-1 sm:mx-2 md:mx-4 mt-[-24px] md:mt-[-30px]"
            ></div>

            <!-- Step 2 - Completed -->
            <div class="flex flex-col items-center flex-1">
              <div
                class="w-8 h-8 md:w-10 md:h-10 bg-[#0E996F] text-white rounded-full flex items-center justify-center font-semibold mb-1 md:mb-2"
              >
                <svg
                  class="w-4 h-4 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div
                class="text-xs md:text-sm text-[#0E996F] font-medium text-center leading-tight"
              >
                Tinjau Sekolah
              </div>
            </div>

            <div
              class="flex-shrink-0 w-12 sm:w-20 md:w-32 h-0.5 bg-[#0E996F] mx-1 sm:mx-2 md:mx-4 mt-[-24px] md:mt-[-30px]"
            ></div>

            <!-- Step 3 - Completed -->
            <div class="flex flex-col items-center flex-1">
              <div
                class="w-8 h-8 md:w-10 md:h-10 bg-[#0E996F] text-white rounded-full flex items-center justify-center font-semibold mb-1 md:mb-2"
              >
                <svg
                  class="w-4 h-4 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div
                class="text-xs md:text-sm text-[#0E996F] font-medium text-center leading-tight"
              >
                Langkah Terakhir
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Message Section - Full Height with Gradient -->
    <div
      class="flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12 sm:py-16 md:py-20"
    >
      <div class="max-w-2xl mx-auto text-center">
        <!-- Success Icon -->
        <div class="mb-6 md:mb-8 flex justify-center">
          <div
            class="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center"
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20"
            >
              <path
                d="M47.2143 16.25C46.6176 15.214 45.6337 14.4575 44.4792 14.1469C43.3247 13.8363 42.0941 13.997 41.0581 14.5938C40.0221 15.1905 39.2655 16.1743 38.9549 17.3289C38.6443 18.4834 38.8051 19.714 39.4018 20.75L33.3368 10.25C32.7401 9.21499 31.7566 8.45943 30.6028 8.14953C29.449 7.83962 28.2193 8.00076 27.1843 8.5975C26.1493 9.19424 25.3937 10.1777 25.0838 11.3315C24.7739 12.4853 24.9351 13.715 25.5318 14.75L24.0968 12.25C23.5001 11.215 22.5166 10.4594 21.3628 10.1495C20.209 9.83962 18.9793 10.0008 17.9443 10.5975C16.9093 11.1942 16.1537 12.1777 15.8438 13.3315C15.5339 14.4853 15.6951 15.715 16.2918 16.75L17.1268 18.1925C15.8892 17.8855 14.5886 17.9492 13.3869 18.3759C12.1853 18.8025 11.1356 19.5732 10.3687 20.5919C9.60181 21.6107 9.15147 22.8325 9.07378 24.1053C8.9961 25.378 9.29449 26.6455 9.93182 27.75L10.6818 29.05C9.61866 29.1849 8.60536 29.5806 7.73211 30.2018C6.85885 30.823 6.15275 31.6505 5.67665 32.6106C5.20055 33.5708 4.96923 34.6337 5.00328 35.7048C5.03733 36.776 5.3357 37.8221 5.87182 38.75L14.6893 54C16.8903 57.8076 20.2831 60.7851 24.3441 62.4734C28.4052 64.1616 32.9089 64.4666 37.1605 63.3414C41.4121 62.2163 45.1754 59.7234 47.8697 56.2474C50.5641 52.7714 52.0398 48.5054 52.0693 44.1075C53.8518 41.3283 54.8346 38.1121 54.91 34.8113C54.9854 31.5105 54.1505 28.2527 52.4968 25.395L47.2143 16.25ZM47.5143 48.14C46.691 51.1989 44.9798 53.9453 42.5968 56.0325C40.2138 58.1196 37.2658 59.4539 34.1251 59.8669C30.9843 60.2799 27.7916 59.7531 24.95 58.3529C22.1085 56.9528 19.7454 54.7421 18.1593 52L9.34182 36.75C9.17767 36.4654 9.07118 36.1512 9.02845 35.8254C8.98572 35.4996 9.00758 35.1686 9.09278 34.8512C9.17798 34.5339 9.32485 34.2364 9.525 33.9758C9.72516 33.7153 9.97468 33.4967 10.2593 33.3325C10.8342 33.001 11.5172 32.9114 12.1581 33.0835C12.4754 33.1687 12.7729 33.3155 13.0335 33.5157C13.2941 33.7158 13.5127 33.9654 13.6768 34.25L18.7468 43C19.012 43.4598 19.449 43.7954 19.9617 43.9331C20.4744 44.0707 21.0207 43.999 21.4806 43.7337C21.9404 43.4685 22.276 43.0315 22.4136 42.5188C22.5512 42.0062 22.4795 41.4598 22.2143 41L13.4018 25.75C13.0703 25.1738 12.9812 24.4895 13.1542 23.8477C13.3272 23.2059 13.7481 22.659 14.3243 22.3275C14.9005 21.996 15.5848 21.9069 16.2266 22.0799C16.8685 22.2529 17.4153 22.6738 17.7468 23.25L25.6993 37C25.9645 37.4598 26.4015 37.7954 26.9142 37.9331C27.4269 38.0707 27.9732 37.999 28.4331 37.7337C28.8929 37.4685 29.2285 37.0315 29.3661 36.5188C29.5037 36.0062 29.432 35.4598 29.1668 35L22.6668 23.75C22.3353 23.1748 22.2458 22.4915 22.4181 21.8503C22.5904 21.2092 23.0104 20.6628 23.5856 20.3312C24.1608 19.9997 24.8441 19.9103 25.4852 20.0826C26.1264 20.2549 26.6728 20.6748 27.0043 21.25L36.1293 37C36.3945 37.4598 36.8316 37.7954 37.3442 37.9331C37.8569 38.0707 38.4032 37.999 38.8631 37.7337C39.3229 37.4685 39.6585 37.0315 39.7961 36.5188C39.9337 36.0062 39.862 35.4598 39.5968 35L36.4468 29.5625C36.2082 28.986 36.1938 28.3411 36.4064 27.7545C36.6189 27.168 37.0432 26.6821 37.5958 26.3923C38.1483 26.1026 38.7893 26.0299 39.3927 26.1886C39.9961 26.3473 40.5183 26.7259 40.8568 27.25L45.9118 36C46.9695 37.8171 47.6557 39.8261 47.9308 41.9105C48.2059 43.9949 48.0643 46.1132 47.5143 48.1425V48.14ZM40.0518 6V2C40.0518 1.46957 40.2625 0.960859 40.6376 0.585786C41.0127 0.210714 41.5214 0 42.0518 0C42.5823 0 43.091 0.210714 43.466 0.585786C43.8411 0.960859 44.0518 1.46957 44.0518 2V6C44.0518 6.53043 43.8411 7.03914 43.466 7.41421C43.091 7.78929 42.5823 8 42.0518 8C41.5214 8 41.0127 7.78929 40.6376 7.41421C40.2625 7.03914 40.0518 6.53043 40.0518 6ZM48.3568 7.5L50.3568 4.225C50.4936 4.00044 50.6732 3.80501 50.8855 3.64987C51.0977 3.49473 51.3385 3.38292 51.5939 3.32082C51.8494 3.25872 52.1146 3.24755 52.3744 3.28795C52.6342 3.32834 52.8835 3.41951 53.1081 3.55625C53.3326 3.69299 53.5281 3.87262 53.6832 4.08489C53.8383 4.29715 53.9501 4.5379 54.0122 4.79337C54.0743 5.04885 54.0855 5.31406 54.0451 5.57385C54.0047 5.83365 53.9136 6.08294 53.7768 6.3075L51.7768 9.585C51.5979 9.87792 51.3466 10.1199 51.0471 10.2876C50.7477 10.4553 50.4101 10.543 50.0668 10.5425C49.7113 10.5431 49.362 10.4488 49.055 10.2696C48.748 10.0903 48.4943 9.83235 48.3201 9.52241C48.1459 9.21248 48.0575 8.8617 48.064 8.50623C48.0704 8.15075 48.1715 7.80342 48.3568 7.5ZM59.6068 15.915L55.8443 17.1275C55.6455 17.1913 55.4381 17.2242 55.2293 17.225C54.7518 17.2264 54.2895 17.0569 53.9261 16.7472C53.5626 16.4374 53.322 16.0079 53.2477 15.5362C53.1734 15.0644 53.2704 14.5817 53.521 14.1752C53.7717 13.7688 54.1595 13.4654 54.6143 13.32L58.3793 12.1075C58.8842 11.9447 59.4331 11.9892 59.9052 12.2311C60.3774 12.473 60.734 12.8926 60.8968 13.3975C61.0596 13.9024 61.0151 14.4513 60.7732 14.9234C60.5313 15.3955 60.1117 15.7522 59.6068 15.915Z"
                fill="#0E996F"
              />
            </svg>
          </div>
        </div>

        <!-- Success Title -->
        <h1
          class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0E996F] mb-3 md:mb-4 px-4"
        >
          Ulasan Anda telah dikirim.
        </h1>

        <!-- Success Description -->
        <p
          class="text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl mx-auto mb-6 md:mb-8 px-4"
        >
          Ulasan Anda tentang
          <span class="font-semibold">{{ schoolName }}</span> telah berhasil
          dikirim. Kami menghargai umpan balik Anda dan berharap dapat
          membagikan wawasan Anda kepada orang lain.
        </p>

        <!-- Continue Button -->
        <NuxtLink :to="`/school-details/${schoolId}`">
          <button
            class="bg-black text-white px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center justify-center w-full sm:w-auto"
          >
            Lanjutkan
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  schoolId: {
    type: [String, Number],
    required: true,
  },
  schoolName: {
    type: String,
    default: "Jakarta Intercultural School",
  },
});
</script>
