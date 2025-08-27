<template>
  <div class="bg-[#F9F6F1] flex flex-col min-h-screen">
    <!-- Header dengan spesifikasi Figma -->
    <header class="w-full h-[120px] bg-[#F9F6F1] border-b border-[#F2ECE3] pt-8 pb-8 px-60">
      <!-- Inner container untuk logo, navbar, dan tombol login -->
      <div class="w-full h-14 flex items-center justify-between">
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
        <nav class="flex items-center space-x-8">
          <a href="/" class="text-[#76685A]">
            Home
          </a>
          <a href="/explore-school" class="text-[#76685A]">
            Explore School
          </a>
          <a href="/schools/smp" class="text-[#76685A]">
            Write a Review
          </a>
          <a href="/schools/sma" class="text-[#76685A]">
            About Us
          </a>
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
    <footer class="bg-[#F9F6F1] text-[#1D2B29] py-12 border-t border-[#F2ECE3]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div>
            <div class="flex items-center mb-4">
              <span class="text-xl font-bold text-[#1D2B29]">Schoola</span>
            </div>
            <p class="mb-4 text-gray-600 leading-relaxed">
              Your trusted partner in finding the perfect educational institution.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-500 hover:text-[#1D2B29] transition-colors duration-200">
                <i class="fab fa-facebook text-lg"></i>
              </a>
              <a href="#" class="text-gray-500 hover:text-[#1D2B29] transition-colors duration-200">
                <i class="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" class="text-gray-500 hover:text-[#1D2B29] transition-colors duration-200">
                <i class="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" class="text-gray-500 hover:text-[#1D2B29] transition-colors duration-200">
                <i class="fab fa-linkedin text-lg"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="font-semibold mb-4 text-[#1D2B29]">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-600 hover:text-[#1D2B29] transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-[#1D2B29] transition-colors duration-200">
                  Explore Schools
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-[#1D2B29] transition-colors duration-200">
                  Write a Review
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-[#1D2B29] transition-colors duration-200">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h3 class="font-semibold mb-4 text-[#1D2B29]">Support</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-600 hover:text-[#1D2B29] transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-[#1D2B29] transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-[#1D2B29] transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-[#1D2B29] transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="font-semibold mb-4 text-[#1D2B29]">Contact Info</h3>
            <div class="space-y-3">
              <p class="flex items-center text-gray-600">
                <i class="fas fa-envelope mr-3 text-[#1D2B29]"></i>
                contact@schoola.com
              </p>
              <p class="flex items-center text-gray-600">
                <i class="fas fa-phone mr-3 text-[#1D2B29]"></i>
                +62 123 456 789
              </p>
              <p class="flex items-center text-gray-600">
                <i class="fas fa-map-marker-alt mr-3 text-[#1D2B29]"></i>
                Jakarta, Indonesia
              </p>
            </div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-8 pt-8 border-t border-[#F2ECE3]">
          <p class="text-gray-500 text-sm">
            &copy; 2024 Schoola. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import AuthMenu from "@/components/header/AuthMenu.vue";
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
</style>