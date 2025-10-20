<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header dengan spesifikasi Figma -->
    <header class="w-full h-[120px] border-b border-[#F2ECE3] pt-8 pb-8 px-60">
      <!-- Inner container untuk logo, navbar, dan tombol login -->
      <div class="w-full h-10 flex items-center justify-between">
        <!-- Logo Section -->
        <div class="flex items-center">
          <nuxt-link to="/">
            <img
              src="assets/images/logo-footer.png"
              alt="School Advisor"
              class="h-10"
            />
          </nuxt-link>
        </div>

        <!-- Navigation Section -->
        <nav class="items-center flex space-x-8 text-xs relative">
          <a href="/" class="text-[#76685A]"> Home </a>

          <!-- Explore School with Dropdown -->
          <div
            class="relative"
            @mouseenter="isDropdownOpen = true"
            @mouseleave="isDropdownOpen = false"
          >
            <button
              class="text-[#76685A] flex items-center gap-1 hover:text-[#5a4d42] transition-colors"
              @click="isDropdownOpen = !isDropdownOpen"
            >
              Explore School
              <svg
                class="w-3 h-3 transition-transform duration-200"
                :class="{ 'rotate-180': isDropdownOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="isDropdownOpen"
                class="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
              >
                <div v-if="loading" class="px-4 py-3 text-gray-400 text-xs">
                  Loading...
                </div>

                <div v-else-if="error" class="px-4 py-3 text-red-500 text-xs">
                  {{ error }}
                </div>

                <template v-else>
                  <nuxt-link
                    v-for="level in educationLevels.filter(
                      (l) => l.name !== 'SPK SMA'
                    )"
                    :key="level.id"
                    :to="`/schools/${level.name.toLowerCase()}`"
                    class="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group"
                    @click="isDropdownOpen = false"
                  >
                    <!-- Logo SVG Component dengan v-if -->
                    <div
                      class="w-5 h-5 mr-3 text-[#76685A] group-hover:text-[#5a4d42] flex-shrink-0"
                    >
                      <IconSD
                        v-if="level.name === 'SD'"
                        class="w-full h-full"
                      />
                      <IconSMP
                        v-else-if="level.name === 'SMP'"
                        class="w-full h-full"
                      />
                      <IconSMA
                        v-else-if="level.name === 'SMA'"
                        class="w-full h-full"
                      />
                      <IconSMK
                        v-else-if="level.name === 'SMK'"
                        class="w-full h-full"
                      />
                      <IconUniversity
                        v-else-if="level.name === 'Universitas'"
                        class="w-full h-full"
                      />
                      <IconSD v-else class="w-full h-full" />
                    </div>

                    <span
                      class="text-[#76685A] text-xs group-hover:text-[#5a4d42]"
                    >
                      {{ level.name }}
                    </span>
                  </nuxt-link>
                </template>
              </div>
            </transition>
          </div>

          <a href="/about-us" class="text-[#76685A]"> About Us </a>
          <a href="/ranking" class="text-[#76685A]"> Ranking </a>
        </nav>

        <!-- Auth Menu Section -->
        <div class="flex items-center">
          <AuthMenu />
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <!-- Logo and Contact Section -->
          <div class="lg:col-span-1">
            <div class="flex items-center mb-6">
              <div
                class="bg-black rounded-full flex items-center justify-center mr-3"
              >
                <nuxt-link to="/">
                  <img
                    src="assets/images/logo-footer.png"
                    alt="School Advisor"
                    class="h-10"
                  />
                </nuxt-link>
              </div>
            </div>

            <div class="mb-6">
              <p class="text-sm text-gray-600 mb-2">General Inquiry</p>
              <a
                href="mailto:hallo@schoolaadvisor.com"
                class="text-gray-900 hover:text-gray-700 transition-colors"
              >
                hallo@schoolaadvisor.com
              </a>
            </div>

            <!-- Social Media Icons -->
            <div class="flex space-x-4">
              <a
                href="#"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h6v4l-3-2-3 2V6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Menu 1 -->
          <div>
            <ul class="space-y-4">
              <li>
                <NuxtLink
                  to="/"
                  class="text-gray-900 hover:text-gray-700 transition-colors font-medium"
                >
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/explore-school"
                  class="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Explore School
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/about"
                  class="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  About Us
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/contact"
                  class="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Contact Us
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Menu 2 -->
          <div>
            <ul class="space-y-4">
              <li>
                <NuxtLink
                  to="/privacy"
                  class="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Privacy Policy
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/terms"
                  class="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Terms & Condition
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/review-guide"
                  class="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Review Writing Guide
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/career"
                  class="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Career/Collaboration
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Newsletter Section -->
          <div>
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">
                Subscribe to our newsletter
              </h4>
              <form class="space-y-3">
                <div>
                  <label for="email" class="sr-only">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  class="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Submit
                </button>
              </form>
            </div>

            <!-- Social Media Links -->
            <div class="space-y-3">
              <a
                href="#"
                class="block text-gray-600 hover:text-gray-800 transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                class="block text-gray-600 hover:text-gray-800 transition-colors"
              >
                Tiktok
              </a>
              <a
                href="#"
                class="block text-gray-600 hover:text-gray-800 transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                class="block text-gray-600 hover:text-gray-800 transition-colors"
              >
                Youtube
              </a>
            </div>
          </div>
        </div>

        <!-- Bottom Copyright -->
        <div class="border-t border-gray-200 pt-8">
          <p class="text-sm text-gray-600 text-left lg:text-left">
            Copyright © 2025 School Advisor. All Rights Reserved. Powered by PT.
            Timedoor Indonesia.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import AuthMenu from "@/components/header/AuthMenu.vue";
import { ref, onMounted } from "vue";
import axios from "@/lib/axios";
import IconSD from "@/assets/IconSd.vue";
import IconSMP from "@/assets/IconSmp.vue";
import IconSMA from "@/assets/IconSma.vue";
import IconSMK from "@/assets/IconSmk.vue";
import IconUniversity from "@/assets/IconKuliah.vue";

const isDropdownOpen = ref(false);
const educationLevels = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchEducationLevels = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get("/education-levels");
    educationLevels.value = response.data.data;
  } catch (err) {
    error.value = "Failed to load education levels";
    console.error("Error fetching education levels:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchEducationLevels();
});
</script>

<style scoped>
/* Ensure header stays fixed height and proper spacing */
header {
  height: 100px; /* Fixed height sesuai Figma */
  max-width: 1920px; /* Max width sesuai Figma */
  margin: 0 auto; /* Center the header */
}

/* Responsive adjustments */
@media (max-width: 1536px) {
  header {
    padding-left: 8rem; /* Reduce padding on smaller screens */
    padding-right: 8rem;
  }
}

@media (max-width: 1024px) {
  header {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  nav {
    gap: 1rem; /* Reduce spacing on tablets */
  }
}

@media (max-width: 768px) {
  header {
    padding-left: 1rem;
    padding-right: 1rem;
    height: 80px; /* Smaller height on mobile */
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  nav {
    display: none; /* Hide navigation on mobile, you might want to add a mobile menu */
  }
}

.absolute.left-0 {
  max-height: 400px;
  overflow-y: auto;
}

.absolute.left-0::-webkit-scrollbar {
  width: 4px;
}

.absolute.left-0::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.absolute.left-0::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.absolute.left-0::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
