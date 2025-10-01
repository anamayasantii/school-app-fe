<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br py-16 pb-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- Button sesuai spesifikasi Figma -->
        <div class="mb-8 flex justify-center">
          <NuxtLink to="/ranking" class="figma-button">
            <span class="text-[#F9F6F1] underline"
              >Lihat 10 Sekolah Dasar Terbaik {{ currentYear }}</span
            >
            <div class="arrow-container">
              <!-- Panah pertama (terlihat normal) -->
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
              <!-- Panah kedua (tersembunyi di kiri) -->
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
          class="text-3xl font-manrope-extrabold md:text-6xl mb-4 py-4"
        >
          Pencarian sekolah lebih
          <br />
          sederhana dan mudah.
        </h1>

        <div class="flex justify-center mb-12">
          <div class="search-container">
            <svg
              class="search-icon h-6 w-6"
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
              type="text"
              placeholder="Cari sekolah mana pun"
              class="search-input"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Education Categories -->
    <section class="py-7">
      <SchoolTypes />
    </section>

    <section class="py-7">
      <IndexSchools />
    </section>

    <!-- Featured Schools -->
    <!-- <section class="py-16">
      <FeaturedSchools />
    </section> -->

    <!-- Indonesian Leaderboard -->
    <section class="py-16">
      <Leaderboard />
    </section>

    <!-- Recent Reviews -->
    <section class="py-16">
      <RecentReviews />
    </section>
  </div>
</template>

<script setup>
import SchoolTypes from "~/components/school/SchoolTypes.vue";
//import FeaturedSchools from "~/components/school/FeaturedSchools.vue";
import Leaderboard from "~/components/school/Leaderboard.vue";
import RecentReviews from "~/components/review/RecentReviews.vue";
import IndexSchools from "~/components/home/index.vue";

const currentYear = new Date().getFullYear();
</script>

<style scoped>
/* Button sesuai spesifikasi Figma */
.figma-button {
  width: 360px;
  height: 46px;
  padding: 12px 24px;
  gap: 16px;
  border-radius: 80px;
  background-color: #28190c; /* Dark brown background sesuai gambar */
  border: none;
  color: #ffffff; /* White text */
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center; /* Space between text and arrow */
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
  /* Panah utama - terlihat normal */
  opacity: 1;
  transform: translateX(0);
}

.arrow-2 {
  /* Panah kedua - tersembunyi di sebelah kiri */
  opacity: 0;
  transform: translateX(-20px);
}

.figma-button:hover .arrow-1 {
  /* Saat hover, panah pertama bergerak ke kanan dan menghilang */
  opacity: 0;
  transform: translateX(20px);
}

.figma-button:hover .arrow-2 {
  /* Saat hover, panah kedua muncul dari kiri dan bergerak ke posisi normal */
  opacity: 1;
  transform: translateX(0);
}

/* Keyframe animation untuk efek yang lebih smooth */
@keyframes slideRight {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(8px);
  }
  100% {
    transform: translateX(6px);
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .figma-button {
    width: 100%;
    max-width: 350px;
    font-size: 14px;
    padding: 10px 20px;
  }
}

/* Additional custom styles if needed */
.hero-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
}

.search-container {
      width: 690px;
      height: 45px;
      border-radius: 32px;
      background-color: #FBFBFB;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 24px;
    }
    
    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-size: 16px;
    }
    
    .search-input::placeholder {
      color: #082519;
    }
    
    .search-icon {
      color: #082519;
      flex-shrink: 0;
    }
    
    /* Responsive design */
    @media (max-width: 768px) {
      .search-container {
        width: 100%;
        max-width: 500px;
        height: 64px;
        gap: 16px;
      }
    }
    
    @media (max-width: 480px) {
      .search-container {
        height: 56px;
        padding: 16px;
        gap: 12px;
      }
      
      .search-input {
        font-size: 14px;
      }
    }
</style>
