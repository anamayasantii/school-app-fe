<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div
        class="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between"
      >
        <!-- Logo Section -->
        <div class="flex items-center">
          <nuxt-link to="/" class="flex items-center">
            <div class="w-8 h-8 mr-2">
              <Logo/>
            </div>
          </nuxt-link>
        </div>

        <!-- Right Section: Navigation, Language & Auth -->
        <div class="flex items-center space-x-6">
          <!-- Navigation Section -->
          <nav class="flex items-center space-x-6 text-sm">
            <a href="/" class="text-gray-700 hover:text-gray-900"> Beranda </a>

            <!-- Jelajahi with Dropdown -->
            <div
              class="relative"
              @mouseenter="isDropdownOpen = true"
              @mouseleave="isDropdownOpen = false"
            >
              <button
                class="text-gray-700 hover:text-gray-900 flex items-center gap-1"
                @click="isDropdownOpen = !isDropdownOpen"
              >
                Jelajahi
                <svg
                  class="w-4 h-4 transition-transform duration-200"
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
                  <div v-if="loading" class="px-4 py-3 text-gray-400 text-sm">
                    Loading...
                  </div>

                  <div v-else-if="error" class="px-4 py-3 text-red-500 text-sm">
                    {{ error }}
                  </div>

                  <template v-else>
                    <div class="flex p-2 min-h-[120px]">
                      <!-- Kolom Kiri -->
                      <div class="w-1/2 pr-1">
                        <div class="flex flex-col gap-1">
                          <nuxt-link
                            to="/schools/sd"
                            class="flex items-center px-3 py-2 hover:bg-gray-50 transition-colors group rounded-md"
                            @click="isDropdownOpen = false"
                          >
                            <div
                              class="w-4 h-4 mr-2 text-gray-700 group-hover:text-gray-900 flex-shrink-0"
                            >
                              <IconSD class="w-full h-full" />
                            </div>
                            <span
                              class="text-gray-700 text-sm group-hover:text-gray-900"
                              >SD</span
                            >
                          </nuxt-link>

                          <nuxt-link
                            to="/schools/smp"
                            class="flex items-center px-3 py-2 hover:bg-gray-50 transition-colors group rounded-md"
                            @click="isDropdownOpen = false"
                          >
                            <div
                              class="w-4 h-4 mr-2 text-gray-700 group-hover:text-gray-900 flex-shrink-0"
                            >
                              <IconSMP class="w-full h-full" />
                            </div>
                            <span
                              class="text-gray-700 text-sm group-hover:text-gray-900"
                              >SMP</span
                            >
                          </nuxt-link>

                          <nuxt-link
                            to="/schools/sma"
                            class="flex items-center px-3 py-2 hover:bg-gray-50 transition-colors group rounded-md"
                            @click="isDropdownOpen = false"
                          >
                            <div
                              class="w-4 h-4 mr-2 text-gray-700 group-hover:text-gray-900 flex-shrink-0"
                            >
                              <IconSMA class="w-full h-full" />
                            </div>
                            <span
                              class="text-gray-700 text-sm group-hover:text-gray-900"
                              >SMA</span
                            >
                          </nuxt-link>
                        </div>
                      </div>

                      <!-- Kolom Kanan -->
                      <div class="w-1/2 pl-1">
                        <div class="flex flex-col gap-1">
                          <nuxt-link
                            to="/schools/smk"
                            class="flex items-center px-3 py-2 hover:bg-gray-50 transition-colors group rounded-md"
                            @click="isDropdownOpen = false"
                          >
                            <div
                              class="w-4 h-4 mr-2 text-gray-700 group-hover:text-gray-900 flex-shrink-0"
                            >
                              <IconSMK class="w-full h-full" />
                            </div>
                            <span
                              class="text-gray-700 text-sm group-hover:text-gray-900"
                              >SMK</span
                            >
                          </nuxt-link>

                          <nuxt-link
                            to="/schools/universitas"
                            class="flex items-center px-3 py-2 hover:bg-gray-50 transition-colors group rounded-md"
                            @click="isDropdownOpen = false"
                          >
                            <div
                              class="w-4 h-4 mr-2 text-gray-700 group-hover:text-gray-900 flex-shrink-0"
                            >
                              <IconUniversity class="w-full h-full" />
                            </div>
                            <span
                              class="text-gray-700 text-sm group-hover:text-gray-900"
                              >Universitas</span
                            >
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </transition>
            </div>

            <a href="/about-us" class="text-gray-700 hover:text-gray-900">
              Tentang Kami
            </a>
            <a href="/ranking" class="text-gray-700 hover:text-gray-900">
              Peringkat Sekolah
            </a>
          </nav>

          <!-- Language Selector -->
          <div
            class="relative"
            @mouseenter="isLangOpen = true"
            @mouseleave="isLangOpen = false"
          >
            <button
              class="flex items-center gap-1 text-gray-700 hover:text-gray-900"
              @click="isLangOpen = !isLangOpen"
            >
              <IndoFlag/>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': isLangOpen }"
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

            <!-- Language Dropdown -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="isLangOpen"
                class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
              >
                <button
                  @click="changeLang('id')"
                  class="w-full flex items-center px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  <IndoFlag/>
                  <span class="ml-2 text-sm">Indonesia</span>
                </button>
                <button
                  @click="changeLang('en')"
                  class="w-full flex items-center px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  <EngFlag/>
                  <span class="ml-2 text-sm">English</span>
                </button>
              </div>
            </transition>
          </div>

          <!-- Auth Menu -->
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
import Logo from "~/assets/Logo.vue";
import IndoFlag from "~/assets/IndoFlag.vue";
import EngFlag from "~/assets/EngFlag.vue";

const isDropdownOpen = ref(false);
const isLangOpen = ref(false);
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

const changeLang = (lang) => {
  console.log("Change language to:", lang);
  // Implementasi ganti bahasa
  isLangOpen.value = false;
};

onMounted(() => {
  fetchEducationLevels();
});
</script>

<style scoped>
header {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.absolute.left-0,
.absolute.right-0 {
  max-height: 400px;
  overflow-y: auto;
}

.absolute.left-0::-webkit-scrollbar,
.absolute.right-0::-webkit-scrollbar {
  width: 4px;
}

.absolute.left-0::-webkit-scrollbar-track,
.absolute.right-0::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.absolute.left-0::-webkit-scrollbar-thumb,
.absolute.right-0::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.absolute.left-0::-webkit-scrollbar-thumb:hover,
.absolute.right-0::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
