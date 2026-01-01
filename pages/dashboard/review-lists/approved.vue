<template>
  <DashboardLayout>
    <div class="container mx-auto py-8 px-4">
      <!-- Toast Notification -->
      <div
        v-if="toastMessage"
        class="fixed top-4 right-4 z-50 bg-white border rounded-lg shadow-lg p-4 max-w-md animate-in slide-in-from-top-5"
      >
        <div class="flex items-start gap-3">
          <div class="flex-1">
            <h3
              class="font-semibold"
              :class="
                toastVariant === 'destructive'
                  ? 'text-red-600'
                  : 'text-green-600'
              "
            >
              {{ toastTitle }}
            </h3>
            <p class="text-sm text-gray-600 mt-1">{{ toastMessage }}</p>
          </div>
          <button
            @click="toastMessage = ''"
            class="text-gray-400 hover:text-gray-600"
          >
            <X class="h-4 w-4" />
          </button>
        </div>
      </div>

      <!-- Image Modal -->
      <Dialog v-model:open="showImageModal">
        <DialogContent class="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Foto Bukti Review</DialogTitle>
          </DialogHeader>
          <div class="mt-4">
            <img
              v-if="selectedImage"
              :src="selectedImage"
              alt="Foto bukti"
              class="w-full h-auto rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      <h1 class="text-3xl font-bold mb-6">Review Approved</h1>

      <div v-if="loading" class="space-y-3">
        <Skeleton v-for="i in 3" :key="i" class="h-24 w-full" />
      </div>

      <div v-else-if="reviews.length === 0" class="text-center py-12">
        <p class="text-muted-foreground">Tidak ada review approved</p>
      </div>

      <div v-else class="space-y-2">
        <Card
          v-for="review in reviews"
          :key="review.id"
          class="hover:bg-gray-50 transition-colors"
        >
          <CardContent class="p-4">
            <div class="flex items-start gap-4">
              <!-- Avatar -->
              <div class="h-12 w-12 flex-shrink-0 rounded-full overflow-hidden">
                <img
                  v-if="review.image"
                  :src="review.image"
                  :alt="review.fullname"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center bg-primary text-white"
                >
                  <span class="font-semibold">{{
                    getInitials(review.fullname)
                  }}</span>
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 class="font-semibold text-base">
                      {{ review.fullname }}
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      {{ review.schoolDetailName }}
                    </p>
                  </div>
                  <div class="flex items-center gap-1 flex-shrink-0">
                    <span class="font-semibold">{{ review.rating }}</span>
                    <span class="text-yellow-500">★</span>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <p class="font-medium text-muted-foreground mb-1">
                      Yang Disukai:
                    </p>
                    <p class="line-clamp-2">{{ review.liked || "-" }}</p>
                  </div>
                  <div>
                    <p class="font-medium text-muted-foreground mb-1">
                      Perlu Diperbaiki:
                    </p>
                    <p class="line-clamp-2">{{ review.improved || "-" }}</p>
                  </div>
                </div>

                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-muted-foreground">{{
                      formatDate(review.createdAt)
                    }}</span>
                    <Button
                      v-if="review.image"
                      variant="outline"
                      size="sm"
                      @click="openImageModal(review.schoolValidation?.[0]?.file)"
                    >
                      Lihat Foto
                    </Button>
                  </div>

                  <div class="flex items-center gap-2">
                    <span
                      class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                      >Approved</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-vue-next";
import DashboardLayout from "~/layouts/dashboardLayout.vue";

definePageMeta({
  layout: "dashboardLayout",
});

const reviews = ref([]);
const loading = ref(true);

// Toast state
const toastMessage = ref("");
const toastTitle = ref("");
const toastVariant = ref("default");

// Image modal state
const showImageModal = ref(false);
const selectedImage = ref("");

const showToast = (title, message, variant = "default") => {
  toastTitle.value = title;
  toastMessage.value = message;
  toastVariant.value = variant;

  setTimeout(() => {
    toastMessage.value = "";
  }, 5000);
};

const openImageModal = (imageUrl) => {
  selectedImage.value = imageUrl;
  showImageModal.value = true;
};

const getInitials = (fullname) => {
  const parts = fullname.split(" ");
  const lastTwoParts = parts.slice(-2);
  return lastTwoParts.map((part) => part.charAt(0).toUpperCase()).join("");
};

const fetchApprovedReviews = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/reviews/approved", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    reviews.value = response.data.data;
  } catch (error) {
    showToast("Error", "Gagal memuat review approved", "destructive");
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  fetchApprovedReviews();
});
</script>
