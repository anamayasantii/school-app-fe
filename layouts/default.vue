<template>
  <div class="flex flex-col min-h-screen">
    <header class="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div
        class="max-w-5xl mx-auto px-3 xs:px-4 sm:px-5 lg:px-8 h-20 flex items-center justify-between"
      >
        <div class="flex items-center">
          <nuxt-link to="/" class="flex items-center">
            <div class="w-8 h-12 sm:w-9 sm:h-9 lg:w-10 lg:h-10">
              <Logo />
            </div>
          </nuxt-link>
        </div>

        <div class="flex items-center space-x-3 sm:space-x-3 lg:space-x-6">
          <nav
            class="hidden sm:flex items-center space-x-3 lg:space-x-6 text-xs lg:text-sm"
          >
            <a
              href="/"
              class="text-gray-700 hover:text-gray-900 whitespace-nowrap"
            >
              Beranda
            </a>

            <div
              class="relative"
              @mouseenter="isDropdownOpen = true"
              @mouseleave="isDropdownOpen = false"
            >
              <button
                class="text-gray-700 hover:text-gray-900 flex items-center gap-1 whitespace-nowrap"
                @click="isDropdownOpen = !isDropdownOpen"
              >
                Jelajahi
                <svg
                  class="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 transition-transform duration-200"
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
                  class="absolute left-0 mt-2 w-[320px] sm:w-[360px] md:w-[400px] lg:w-[440px] xl:w-[480px] bg-white rounded-lg shadow-xl border border-gray-100 py-3 z-50"
                >
                  <div v-if="loading" class="px-4 py-3 text-gray-400 text-sm">
                    Loading...
                  </div>

                  <div v-else-if="error" class="px-4 py-3 text-red-500 text-sm">
                    {{ error }}
                  </div>

                  <template v-else>
                    <div class="flex p-3 min-h-[140px]">
                      <div class="w-1/2 pr-2">
                        <div class="flex flex-col gap-2">
                          <nuxt-link
                            to="/schools/sd"
                            class="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group rounded-md"
                            @click="isDropdownOpen = false"
                          >
                            <div
                              class="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-gray-700 group-hover:text-gray-900 flex-shrink-0"
                            >
                              <IconSD class="w-full h-full" />
                            </div>
                            <span
                              class="text-gray-700 text-sm sm:text-base group-hover:text-gray-900 font-medium"
                              >SD</span
                            >
                          </nuxt-link>

                          <nuxt-link
                            to="/schools/smp"
                            class="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group rounded-md"
                            @click="isDropdownOpen = false"
                          >
                            <div
                              class="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-gray-700 group-hover:text-gray-900 flex-shrink-0"
                            >
                              <IconSMP class="w-full h-full" />
                            </div>
                            <span
                              class="text-gray-700 text-sm sm:text-base group-hover:text-gray-900 font-medium"
                              >SMP</span
                            >
                          </nuxt-link>

                          <nuxt-link
                            to="/schools/sma"
                            class="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group rounded-md"
                            @click="isDropdownOpen = false"
                          >
                            <div
                              class="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-gray-700 group-hover:text-gray-900 flex-shrink-0"
                            >
                              <IconSMA class="w-full h-full" />
                            </div>
                            <span
                              class="text-gray-700 text-sm sm:text-base group-hover:text-gray-900 font-medium"
                              >SMA</span
                            >
                          </nuxt-link>
                        </div>
                      </div>

                      <div class="w-1/2 pl-2">
                        <div class="flex flex-col gap-2">
                          <nuxt-link
                            to="/schools/smk"
                            class="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group rounded-md"
                            @click="isDropdownOpen = false"
                          >
                            <div
                              class="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-gray-700 group-hover:text-gray-900 flex-shrink-0"
                            >
                              <IconSMK class="w-full h-full" />
                            </div>
                            <span
                              class="text-gray-700 text-sm sm:text-base group-hover:text-gray-900 font-medium"
                              >SMK</span
                            >
                          </nuxt-link>

                          <nuxt-link
                            to="/schools/universitas"
                            class="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group rounded-md"
                            @click="isDropdownOpen = false"
                          >
                            <div
                              class="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-gray-700 group-hover:text-gray-900 flex-shrink-0"
                            >
                              <IconUniversity class="w-full h-full" />
                            </div>
                            <span
                              class="text-gray-700 text-sm sm:text-base group-hover:text-gray-900 font-medium"
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

            <!-- <a
              href="/about-us"
              class="text-gray-700 hover:text-gray-900 whitespace-nowrap"
            >
              Tentang Kami
            </a> -->
            <!-- <a
              href="/ranking"
              class="text-gray-700 hover:text-gray-900 whitespace-nowrap"
            >
              Peringkat Sekolah
            </a> -->
          </nav>

          <!-- <div
            class="relative hidden sm:block"
            @mouseenter="isLangOpen = true"
            @mouseleave="isLangOpen = false"
          >
            <button
              class="flex items-center gap-1 text-gray-700 hover:text-gray-900"
              @click="isLangOpen = !isLangOpen"
            >
              <IndoFlag class="w-5 h-5" />
              <svg
                class="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 transition-transform duration-200"
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
                class="absolute right-0 mt-2 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
              >
                <button
                  @click="changeLang('id')"
                  class="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <IndoFlag class="w-5 h-5" />
                  <span class="ml-2 text-sm">Indonesia</span>
                </button>
                <button
                  @click="changeLang('en')"
                  class="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <EngFlag class="w-5 h-5" />
                  <span class="ml-2 text-sm">English</span>
                </button>
              </div>
            </transition>
          </div> -->

          <AuthMenu />

          <!-- Mobile Menu Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="sm:hidden text-gray-700 hover:text-gray-900"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="isMobileMenuOpen"
          class="sm:hidden bg-white border-t border-gray-200 shadow-lg"
        >
          <div class="px-4 py-3 space-y-3">
            <a
              href="/"
              class="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3"
              @click="isMobileMenuOpen = false"
            >
              Beranda
            </a>

            <div class="py-2 px-3">
              <div class="font-medium text-gray-900 mb-3">Jelajahi</div>
              <div class="grid grid-cols-2 gap-2">
                <nuxt-link
                  to="/schools/sd"
                  class="flex items-center py-3 px-3 hover:bg-gray-50 rounded-lg"
                  @click="isMobileMenuOpen = false"
                >
                  <IconSD class="w-5 h-5 mr-2" />
                  <span class="text-gray-700">SD</span>
                </nuxt-link>
                <nuxt-link
                  to="/schools/smp"
                  class="flex items-center py-3 px-3 hover:bg-gray-50 rounded-lg"
                  @click="isMobileMenuOpen = false"
                >
                  <IconSMP class="w-5 h-5 mr-2" />
                  <span class="text-gray-700">SMP</span>
                </nuxt-link>
                <nuxt-link
                  to="/schools/sma"
                  class="flex items-center py-3 px-3 hover:bg-gray-50 rounded-lg"
                  @click="isMobileMenuOpen = false"
                >
                  <IconSMA class="w-5 h-5 mr-2" />
                  <span class="text-gray-700">SMA</span>
                </nuxt-link>
                <nuxt-link
                  to="/schools/smk"
                  class="flex items-center py-3 px-3 hover:bg-gray-50 rounded-lg"
                  @click="isMobileMenuOpen = false"
                >
                  <IconSMK class="w-5 h-5 mr-2" />
                  <span class="text-gray-700">SMK</span>
                </nuxt-link>
                <nuxt-link
                  to="/schools/universitas"
                  class="flex items-center py-3 px-3 hover:bg-gray-50 rounded-lg col-span-2"
                  @click="isMobileMenuOpen = false"
                >
                  <IconUniversity class="w-5 h-5 mr-2" />
                  <span class="text-gray-700">Universitas</span>
                </nuxt-link>
              </div>
            </div>

            <!-- <a
              href="/about-us"
              class="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3"
              @click="isMobileMenuOpen = false"
            >
              Tentang Kami
            </a> -->
            <!-- <a
              href="/ranking"
              class="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3"
              @click="isMobileMenuOpen = false"
            >
              Peringkat Sekolah
            </a> -->

            <!-- <div class="pt-4 border-t border-gray-200">
              <div class="font-medium text-gray-900 mb-3">Bahasa</div>
              <div class="flex gap-2">
                <button
                  @click="changeLang('id')"
                  class="flex items-center px-4 py-3 bg-gray-100 rounded-lg flex-1 justify-center"
                >
                  <IndoFlag class="w-5 h-5 mr-2" />
                  <span class="text-sm">Indonesia</span>
                </button>
                <button
                  @click="changeLang('en')"
                  class="flex items-center px-4 py-3 bg-gray-100 rounded-lg flex-1 justify-center"
                >
                  <EngFlag class="w-5 h-5 mr-2" />
                  <span class="text-sm">English</span>
                </button>
              </div>
            </div> -->
          </div>
        </div>
      </transition>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="py-8 sm:py-12 lg:py-16">
      <div class="max-w-6xl mx-auto px-3 xs:px-4 sm:px-5 lg:px-8">
        <div
          class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-6 sm:mb-10 lg:mb-12"
        >
          <!-- Logo & Contact - Full width on mobile -->
          <div class="col-span-2 lg:col-span-1 mb-4 lg:mb-0">
            <div class="flex items-center mb-3 sm:mb-6">
              <div class="flex items-center mr-3">
                <nuxt-link to="/" class="flex items-center">
                  <div class="w-8 h-8 sm:w-10 sm:h-10">
                    <Logo />
                  </div>
                </nuxt-link>
              </div>
            </div>

            <div class="mb-3 sm:mb-6">
              <p class="text-xs text-gray-600 mb-1">General Inquiry</p>
              <a
                href="mailto:hallo@schoolaadvisor.com"
                class="text-gray-900 hover:text-gray-700 transition-colors text-sm"
              >
                hallo@schoolpedia.com
              </a>
            </div>

            <div class="flex space-x-3 sm:space-x-4">
              <a
                href="#"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
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
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
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
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Navigation - 1 column on mobile -->
          <div>
            <ul class="space-y-2 lg:space-y-3">
              <li>
                <NuxtLink
                  to="/"
                  class="text-gray-900 hover:text-gray-700 transition-colors font-medium text-sm"
                >
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="#"
                  class="text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm"
                >
                  Explore School
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="#"
                  class="text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm"
                >
                  About Us
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="#"
                  class="text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm"
                >
                  Contact Us
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Policies - 1 column on mobile -->
          <div>
            <ul class="space-y-2 lg:space-y-3">
              <li>
                <NuxtLink
                  to="#"
                  class="text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm"
                >
                  Privacy Policy
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="#"
                  class="text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm"
                >
                  Terms & Condition
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="#"
                  class="text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm"
                >
                  Review Writing Guide
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="#"
                  class="text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm"
                >
                  Career/Collaboration
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Newsletter & Social - Full width on mobile -->
          <div class="col-span-2 lg:col-span-1">
            <div class="mb-4 sm:mb-6">
              <h4
                class="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3"
              >
                Subscribe to our newsletter
              </h4>
              <form class="space-y-2">
                <div>
                  <label for="email" class="sr-only">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    class="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  class="w-full bg-gray-900 text-white py-2 px-4 text-xs sm:text-sm rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Submit
                </button>
              </form>
            </div>

            <div
              class="grid grid-cols-2 gap-2 sm:space-y-0 sm:grid-cols-1 lg:space-y-2"
            >
              <a
                href="#"
                class="text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm"
              >
                Instagram
              </a>
              <a
                href="#"
                class="text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm"
              >
                Tiktok
              </a>
              <a
                href="#"
                class="text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm"
              >
                Facebook
              </a>
              <a
                href="#"
                class="text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm"
              >
                Youtube
              </a>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4 sm:pt-6">
          <p class="text-xs text-gray-600 text-left">
            Copyright © {{ currentYear }} School Advisor. All Rights Reserved. Powered by PT.
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

const currentYear = new Date().getFullYear();
const isDropdownOpen = ref(false);
const isLangOpen = ref(false);
const isMobileMenuOpen = ref(false);
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
  isLangOpen.value = false;
  isMobileMenuOpen.value = false;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
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

button {
  min-height: 44px;
  min-width: 44px;
}

@media (max-width: 640px) {
  button {
    min-height: 40px;
    min-width: 40px;
  }

  .absolute.left-0,
  .absolute.right-0 {
    width: 100vw;
    max-width: 320px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
