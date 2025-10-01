<template>
  <div class="container mx-auto py-6 px-16">
    <div class="flex space-x-8">
      <!-- Sidebar -->
      <div class="border border-[#28190C14]/0.8 p-6 rounded-lg w-96 h-56">
        <h3 class="text-[#28190C] text-lg font-semibold mb-6">Account Settings</h3>
        <ul class="space-y-4">
          <li>
            <a href="#" class="text-[#28190C]">Profile</a>
          </li>
          <li>
            <a href="#" class="text-[#28190C]">Change Password</a>
          </li>
          <li>
            <a href="#" class="text-[#28190C]">Favorite</a>
          </li>
          <li>
            <a href="#" class="text-[#28190C]">Logout</a>
          </li>
        </ul>
      </div>

      <!-- Profile Section -->
      <div class="flex-1">
        <div class="border border-[#28190C14]/0.8 p-6 rounded-lg text-white">
          <div class="flex items-center mb-6">
            <div class="w-24 h-24 rounded-full bg-gray-500 overflow-hidden">
              <img src="" alt="Profile Picture" class="w-full h-full object-cover" />
            </div>
            <div class="ml-4">
              <p class="text-2xl font-semibold">Michael</p>
              <p class="text-gray-400">Male</p>
            </div>
          </div>

          <form class="space-y-6">
            <div>
              <label for="first-name" class="block text-gray-300">First Name</label>
              <input type="text" id="first-name" class="w-full p-2 mt-2 rounded-lg bg-gray-700 text-white" value="Michael" />
            </div>

            <div>
              <label for="last-name" class="block text-gray-300">Last Name</label>
              <input type="text" id="last-name" class="w-full p-2 mt-2 rounded-lg bg-gray-700 text-white" value="Annaert" />
            </div>

            <div>
              <label for="gender" class="block text-gray-300">Gender</label>
              <select id="gender" class="w-full p-2 mt-2 rounded-lg bg-gray-700 text-white">
                <option value="male" selected>Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label for="phone-number" class="block text-gray-300">Phone Number</label>
              <input type="text" id="phone-number" class="w-full p-2 mt-2 rounded-lg bg-gray-700 text-white" value="+62 8197 9921 6647" />
            </div>

            <div>
              <label for="email" class="block text-gray-300">Email Address</label>
              <input type="email" id="email" class="w-full p-2 mt-2 rounded-lg bg-gray-700 text-white" value="michael.annaert@gmail.com" />
            </div>

            <div>
              <label for="education" class="block text-gray-300">Education</label>
              <div class="mt-2">
                <div class="flex justify-between items-center mb-4">
                  <p>Universitas Udayana</p>
                  <p class="text-gray-400">Oct 2022 - Now</p>
                </div>
                <div class="flex justify-between items-center mb-4">
                  <p>Sekolah Menengah Kejuruan TI Bali Global Badung</p>
                  <p class="text-gray-400">Oct 2016 - Jan 2022</p>
                </div>
                <div class="flex justify-between items-center mb-4">
                  <p>Sekolah Menengah Pertama 3 Sawan</p>
                  <p class="text-gray-400">Oct 2012 - Jan 2016</p>
                </div>
              </div>
            </div>

            <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-lg">Update Account</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps();
</script>

<style scoped>
/* Additional custom styling */
</style>
