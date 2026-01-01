<template>
  <DashboardLayout>
    <div class="container mx-auto py-8 px-4">
      <!-- Toast notification -->
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

      <!-- Reject Modal -->
      <Dialog v-model:open="showRejectModal">
        <DialogContent class="max-w-md">
          <DialogHeader>
            <DialogTitle>Alasan Reject Review</DialogTitle>
          </DialogHeader>
          <div class="mt-4 space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">
                Berikan alasan penolakan
              </label>
              <textarea
                v-model="rejectReason"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                placeholder="Tulis alasan penolakan review..."
              ></textarea>
            </div>
            <div class="flex gap-3 justify-end">
              <Button variant="outline" @click="closeRejectModal">
                Batal
              </Button>
              <Button
                @click="confirmReject"
                :disabled="!rejectReason.trim() || isRejecting"
                class="bg-red-600 hover:bg-red-700"
              >
                <span v-if="isRejecting">Processing...</span>
                <span v-else>Reject Review</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <h1 class="text-3xl font-bold mb-6">Review Pending</h1>

      <div v-if="loading" class="space-y-3">
        <Skeleton v-for="i in 3" :key="i" class="h-24 w-full" />
      </div>

      <div v-else-if="reviews.length === 0" class="text-center py-12">
        <p class="text-muted-foreground">Tidak ada review pending</p>
      </div>

      <div v-else class="space-y-2">
        <Card
          v-for="review in reviews"
          :key="review.id"
          class="hover:bg-gray-50 transition-colors"
        >
          <CardContent class="p-4">
            <div class="flex items-start gap-4">
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
                    <p class="line-clamp-2" :title="review.liked">
                      {{ review.liked }}
                    </p>
                  </div>
                  <div>
                    <p class="font-medium text-muted-foreground mb-1">
                      Perlu Diperbaiki:
                    </p>
                    <p class="line-clamp-2" :title="review.improved">
                      {{ review.improved }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-muted-foreground">{{
                      formatDate(review.createdAt)
                    }}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      @click="
                        openImageModal(review.schoolValidation?.[0]?.file)
                      "
                    >
                      Lihat Foto
                    </Button>
                  </div>

                  <div class="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      @click="openRejectModal(review)"
                      :disabled="processing[review.id]"
                    >
                      <span v-if="processing[review.id]">Processing...</span>
                      <span v-else>Reject</span>
                    </Button>
                    <Button
                      size="sm"
                      @click="handleApprove(review.id)"
                      :disabled="processing[review.id]"
                    >
                      <span v-if="processing[review.id]">Processing...</span>
                      <span v-else>Approve</span>
                    </Button>
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
const processing = ref({});

const toastMessage = ref("");
const toastTitle = ref("");
const toastVariant = ref("default");

const showImageModal = ref(false);
const selectedImage = ref("");

const showRejectModal = ref(false);
const rejectReason = ref("");
const selectedReview = ref(null);
const isRejecting = ref(false);

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

const openRejectModal = (review) => {
  selectedReview.value = review;
  rejectReason.value = "";
  showRejectModal.value = true;
};

const closeRejectModal = () => {
  showRejectModal.value = false;
  selectedReview.value = null;
  rejectReason.value = "";
};

const fetchPendingReviews = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/reviews/pending", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    reviews.value = response.data.data;
  } catch (error) {
    showToast("Error", "Gagal memuat review pending", "destructive");
  } finally {
    loading.value = false;
  }
};

const handleApprove = async (id) => {
  try {
    processing.value[id] = true;
    await axios.put(
      `/reviews/${id}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    showToast("Success", "Review berhasil diapprove");
    reviews.value = reviews.value.filter((r) => r.id !== id);
  } catch (error) {
    showToast("Error", "Gagal approve review", "destructive");
  } finally {
    processing.value[id] = false;
  }
};

const confirmReject = async () => {
  if (!selectedReview.value || !rejectReason.value.trim()) return;

  try {
    isRejecting.value = true;

    console.log("Rejecting review:", {
      reviewId: selectedReview.value.id,
      userId: selectedReview.value.userId,
      adminReason: rejectReason.value.trim(),
    });

    const response = await axios.put(
      `/reviews/${selectedReview.value.id}/reject`,
      {
        user_id: selectedReview.value.userId,
        admin_reason: rejectReason.value.trim(),
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    console.log("Reject response:", response.data);

    showToast("Success", "Review berhasil direject");
    reviews.value = reviews.value.filter(
      (r) => r.id !== selectedReview.value.id
    );
    closeRejectModal();
  } catch (error) {
    console.error("Reject error details:", error.response?.data);
    showToast("Error", "Gagal reject review", "destructive");
  } finally {
    isRejecting.value = false;
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
  fetchPendingReviews();
});
</script>
