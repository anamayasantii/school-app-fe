<template>
  <section class="max-w-6xl mx-auto p-6">
    <h2 class="text-2xl font-manrope-bold text-gray-900 mb-6">
      Recent Reviews
    </h2>

    <div class="relative">
      <!-- Btn kiri -->
      <button
        class="nav-btn left-0 -translate-x-1/2"
        :class="{ 'opacity-30 pointer-events-none': atStart }"
        @click="scrollPrev"
        aria-label="Previous"
      >
        <svg
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <!-- Track: sejajar dgn container, gap 24px -->
      <div
        ref="track"
        class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
      >
        <!-- Card: 564px, tinggi 272px -->
        <article
          v-for="review in reviews"
          :key="review.id"
          class="snap-start shrink-0 bg-[#F2ECE3] rounded-2xl border border-[#E8E1D6] shadow-sm min-w-[564px] max-w-[564px] h-[272px] p-6 relative"
        >
          <!-- Header -->
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
              <img
                v-if="review.image && review.image.length > 0"
                :src="review.image"
                alt="Profile Picture"
                class="w-16 h-16 rounded-full object-cover"
              />
              <div
                v-else
                class="w-16 h-16 rounded-full bg-[#76685A] flex items-center justify-center text-white font-bold"
              >
                {{ getInitials(review.username) }}
              </div>
              <div>
                <div
                  class="text-[16px] font-manrope-bold text-[#28190C] leading-none"
                >
                  {{ review.username }}
                </div>
                <!-- Updated: Sejajar ke samping dan hanya tampilkan tahun -->
                <div
                  class="mt-2 flex items-center gap-4 text-[12px] text-[#28190C]"
                >
                  <span
                    v-if="review.createdAt"
                    class="inline-flex items-center gap-1.5"
                  >
                    <svg
                      class="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                    >
                      <rect x="3" y="4.5" width="18" height="16" rx="3" />
                      <path d="M8 2.5v4M16 2.5v4M3 9h18" />
                    </svg>
                    Enrolled in {{ getYear(review.createdAt) }}
                  </span>
                  <span
                    class="inline-flex items-center gap-1.5 text-[#28190C]"
                  >
                    <svg
                      class="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                    >
                      <path d="M3 10.5L12 6l9 4.5-9 4.5-9-4.5Z" />
                      <path d="M7 12.8V17c0 1.7 2.6 3 5 3s5-1.3 5-3v-4.2" />
                    </svg>
                    {{ review.schoolDetailName }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Stars -->
            <div class="flex items-center text-[#FFB800]">
              <svg
                v-for="star in 5"
                :key="star"
                class="size-6"
                viewBox="0 0 24 24"
                :fill="star <= (review.rating || 0) ? '#FFB800' : '#28190C'"
                :opacity="star <= (review.rating || 0) ? 1 : 0.12"
              >
                <path
                  d="M12 3.8l2.5 5.1 5.7.8-4.1 4 1 5.7L12 16.9 6.9 19.4l1-5.7-4.1-4 5.7-.8L12 3.8z"
                />
              </svg>
            </div>
          </div>

          <!-- Body -->
          <p
            class="text-[13px] leading-relaxed text-[#76685A] line-clamp-3 mt-10 font-manrope-regular"
          >
            {{ review.reviewText }}
          </p>

          <!-- Footer - Fixed at bottom -->
          <div class="absolute bottom-6 right-6">
            <a
              class="inline-flex items-center gap-1 text-sm font-manrope-semibold text-[#0FAE13] hover:underline"
              href="#"
            >
              See Full Reviews
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          </div>
        </article>
      </div>

      <!-- Btn kanan -->
      <button
        class="nav-btn right-0 translate-x-1/2"
        :class="{ 'opacity-30 pointer-events-none': atEnd }"
        @click="scrollNext"
        aria-label="Next"
      >
        <svg
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import axios from "@/lib/axios";

const reviews = ref([]);

// -- fetch tetap --
const fetchReviews = async () => {
  try {
    const response = await axios.get("/reviews/recent");
    reviews.value = response.data.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

// Carousel
const track = ref(null);
const atStart = ref(true);
const atEnd = ref(false);

// STEP = lebar kartu (564) + gap (24)
const STEP = 588;

const getInitials = (username) => {
  const nameParts = username.split(" ");
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials;
};

// Fungsi untuk mengambil tahun saja dari tanggal
const getYear = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.getFullYear();
};

const updateArrows = () => {
  if (!track.value) return;
  const el = track.value;
  atStart.value = el.scrollLeft <= 2;
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
};
const scrollPrev = () =>
  track.value?.scrollBy({ left: -STEP, behavior: "smooth" });
const scrollNext = () =>
  track.value?.scrollBy({ left: STEP, behavior: "smooth" });

onMounted(async () => {
  await fetchReviews();
  await nextTick();
  updateArrows();
  track.value?.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows, { passive: true });
});
onBeforeUnmount(() => {
  track.value?.removeEventListener("scroll", updateArrows);
  window.removeEventListener("resize", updateArrows);
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.nav-btn {
  @apply absolute top-1/2 -translate-y-1/2 grid place-items-center
         w-8 h-8 rounded-full bg-[#2B2015] text-white shadow ring-1 ring-black/5
         hover:bg-[#20170F] transition;
  z-index: 10;
}
.size-5 {
  width: 20px;
  height: 20px;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
}
</style>
