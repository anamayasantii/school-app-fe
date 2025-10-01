<!-- components/profile/MyReviews.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100">
    <!-- Header -->
    <div class="px-6 py-4">
      <h2 class="text-xl font-semibold text-gray-900">
        Ulasan Saya({{ reviews.length }})
      </h2>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Reviews List -->
      <div class="space-y-8">
        <div v-for="(review, index) in reviews" :key="index">
          <!-- Review Header -->
          <div
            class="flex justify-between items-start mb-4 border-b border-gray-300 p-6"
          >
            <div
              class="flex items-center space-x-2 border border-gray-300 rounded-full px-4 py-1"
            >
              <span class="text-sm">Ulasan untuk</span>
              <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-900 underline">{{
                  review.schoolName
                }}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="#082519"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>

            <!-- Actions Menu -->
            <button
              @click="toggleMenu(index)"
              class="p-1 text-gray-400 hover:text-gray-600 transition-colors relative"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>

              <!-- Dropdown Menu -->
              <div
                v-show="activeMenu === index"
                class="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10"
              >
                <button
                  @click="editReview(review, index)"
                  class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Edit
                </button>
                <button
                  @click="deleteReview(index)"
                  class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </button>
          </div>

          <!-- Rating and Date -->
          <div class="flex items-center space-x-4 mb-4 p-6">
            <!-- Rating Stars -->
            <div class="flex items-center space-x-1">
              <span class="text-lg font-semibold text-gray-900">{{
                review.rating
              }}</span>
              <div class="flex space-x-1">
                <svg
                  v-for="star in 5"
                  :key="star"
                  :class="
                    star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                  "
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>

            <!-- Date -->
            <span class="text-sm text-gray-500">{{
              formatDate(review.date)
            }}</span>
          </div>

          <!-- Review Text -->
          <p class="text-gray-700 leading-relaxed mb-6 p-6 pt-0">
            {{ review.comment }}
          </p>

          <!-- Rating Categories -->
          <div class="grid grid-cols-5 gap-4 border-b border-gray-300 p-6">
            <div
              v-for="category in review.categories"
              :key="category.name"
              class="relative rounded-lg p-4 min-h-[90px] border border-gray-200"
            >
              <!-- Nilai di pojok kiri atas -->
              <div
                class="absolute top-3 left-3 text-md font-medium"
              >
                {{ category.score }}
              </div>

              <!-- Kategori di bawah tengah -->
              <div
                class="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 text-center"
              >
                {{ category.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="reviews.length === 0" class="text-center py-16">
        <svg
          class="w-16 h-16 text-gray-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Belum ada ulasan</h3>
        <p class="text-gray-600">
          Ulasan yang Anda berikan akan muncul di sini
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Reactive data
const activeMenu = ref(null);

// Sample reviews data
const reviews = ref([
  {
    schoolName: "Akademi Timedoor",
    rating: 4.8,
    date: "2025-08-22",
    comment:
      "Sekolah yang baik dengan fokus pada keterampilan praktis. Saya berharap ada lebih banyak pilihan elektif, tetapi kelas inti sangat kuat. Layanan dukungan juga dapat diandalkan. Sekolah yang baik dengan fokus p...",
    categories: [
      { name: "Fasilitas", score: 3 },
      { name: "Pembelajaran", score: 5 },
      { name: "Layanan", score: 5 },
      { name: "Keamanan", score: 4 },
      { name: "Aktivitas", score: 5 },
    ],
  },
  {
    schoolName: "Sekolah Interkultural Jakarta",
    rating: 4.8,
    date: "2025-08-22",
    comment:
      "Sekolah yang baik dengan fokus pada keterampilan praktis. Saya berharap ada lebih banyak pilihan elektif, tetapi kelas inti sangat kuat. Layanan dukungan juga dapat diandalkan. Sekolah yang baik dengan fokus p...",
    categories: [
      { name: "Fasilitas", score: 3 },
      { name: "Pembelajaran", score: 5 },
      { name: "Layanan", score: 5 },
      { name: "Keamanan", score: 4 },
      { name: "Aktivitas", score: 5 },
    ],
  },
]);

// Methods
const toggleMenu = (index) => {
  activeMenu.value = activeMenu.value === index ? null : index;
};

const closeMenu = () => {
  activeMenu.value = null;
};

const editReview = (review, index) => {
  console.log("Edit review:", review, index);
  // TODO: Open edit review modal/form
  closeMenu();
};

const deleteReview = (index) => {
  const schoolName = reviews.value[index].schoolName;
  if (confirm(`Hapus ulasan untuk "${schoolName}"?`)) {
    reviews.value.splice(index, 1);
  }
  closeMenu();
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (activeMenu.value !== null && !event.target.closest("button")) {
    closeMenu();
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Emits
const emit = defineEmits(["reviewEdited", "reviewDeleted"]);

// Expose methods for parent component
defineExpose({
  editReview,
  deleteReview,
});
</script>
