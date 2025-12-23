<template>
  <div class="min-h-screen">
    <section class="bg-gradient-to-br py-8 sm:py-12 md:py-16 pb-0">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="mb-6 sm:mb-8 flex justify-center px-4">
          <NuxtLink to="/ranking" class="figma-button w-full sm:w-[360px]">
            <span class="text-[#F9F6F1] underline text-sm sm:text-base">
              Lihat 10 Sekolah Dasar Terbaik {{ currentYear }}
            </span>
            <div class="arrow-container">
              <svg
                class="arrow-icon arrow-1"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
              <svg
                class="arrow-icon arrow-2"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>
        </div>

        <h1
          class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold mb-4 py-4 max-w-3xl tracking-tight mx-auto px-4"
        >
          Pencarian sekolah lebih sederhana dan mudah.
        </h1>

        <div class="flex justify-center mb-8 sm:mb-12 px-4">
          <SearchSchool />
        </div>
      </div>
    </section>

    <section class="py-6 sm:py-7">
      <SchoolTypes />
    </section>

    <section class="py-6 sm:py-7">
      <IndexSchools />
    </section>

    <section class="py-12 sm:py-16">
      <client-only>
        <Leaderboard />
      </client-only>
    </section>

    <section class="py-12 sm:py-16">
      <SchoolHighlight />
    </section>

    <section class="py-12 sm:py-16">
      <RecentReviews />
    </section>
  </div>
</template>

<script setup>
import SchoolTypes from "~/components/school/SchoolTypes.vue";
import SearchSchool from "~/components/school/SearchSchool.vue";
import Leaderboard from "~/components/school/Leaderboard.vue";
import RecentReviews from "~/components/review/RecentReviews.vue";
import IndexSchools from "~/components/home/index.vue";
import SchoolHighlight from "~/components/school/SchoolHighlight.vue";

const currentYear = new Date().getFullYear();

</script>

<style scoped>
.figma-button {
  height: 46px;
  padding: 12px 24px;
  gap: 16px;
  border-radius: 80px;
  background-color: #082519;
  border: none;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
}

.figma-button:hover {
  transform: translateY(0);
  background-color: #1a110a;
}

.figma-button:focus {
  outline: none;
  ring: 2px;
  ring-color: rgba(40, 25, 12, 0.5);
  ring-offset: 2px;
}

.arrow-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 16px;
  height: 16px;
}

.arrow-icon {
  position: absolute;
  width: 16px;
  height: 16px;
  transition: all 0.3s ease-out;
}

.arrow-1 {
  opacity: 1;
  transform: translateX(0);
}

.arrow-2 {
  opacity: 0;
  transform: translateX(-20px);
}

.figma-button:hover .arrow-1 {
  opacity: 0;
  transform: translateX(20px);
}

.figma-button:hover .arrow-2 {
  opacity: 1;
  transform: translateX(0);
}
</style>
