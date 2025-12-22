<template>
  <DashboardLayout>
    <div class="container mx-auto py-8 px-4">
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

      <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Tambah Highlight Sekolah</h1>

        <Card>
          <CardContent class="p-6">
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium mb-2 block">
                  Cari Sekolah
                </label>
                <div class="relative">
                  <Search
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  />
                  <Input
                    v-model="searchQuery"
                    placeholder="Ketik minimal 2 karakter untuk mencari..."
                    class="pl-10"
                    @focus="showResults = true"
                  />
                </div>

                <div
                  v-if="showResults && searchQuery.length >= 2"
                  class="mt-2 border rounded-lg shadow-lg bg-white max-h-96 overflow-y-auto"
                >
                  <div v-if="isSearching" class="p-4 text-center">
                    <Loader2 class="h-5 w-5 animate-spin mx-auto" />
                    <p class="text-sm text-muted-foreground mt-2">
                      Mencari...
                    </p>
                  </div>

                  <div
                    v-else-if="schools.length === 0"
                    class="p-4 text-center text-sm text-muted-foreground"
                  >
                    Tidak ada sekolah ditemukan
                  </div>

                  <div v-else class="divide-y">
                    <button
                      v-for="school in schools"
                      :key="school.id"
                      @click="selectSchool(school)"
                      class="w-full p-4 hover:bg-gray-50 transition-colors text-left flex items-start gap-3"
                    >
                      <img
                        v-if="school.galleryImages?.[0]"
                        :src="school.galleryImages[0]"
                        alt=""
                        class="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div
                        class="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0"
                        v-else
                      >
                        <span class="text-2xl text-gray-400">🏫</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between gap-2">
                          <h3 class="font-semibold text-sm">
                            {{ school.name }}
                          </h3>
                          <span
                            v-if="school.accreditationCode"
                            class="px-2 py-1 text-xs border rounded flex-shrink-0"
                          >
                            {{ school.accreditationCode }}
                          </span>
                        </div>
                        <p class="text-xs text-muted-foreground mt-1">
                          {{ school.subDistrictName }}, {{ school.districtName
                          }}, {{ school.provinceName }}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="selectedSchool" class="space-y-4">
                <div>
                  <label class="text-sm font-medium mb-2 block">
                    Sekolah Terpilih
                  </label>
                  <Card class="border-2 border-primary">
                    <CardContent class="p-4">
                      <div class="flex items-start gap-3">
                        <img
                          v-if="selectedSchool.galleryImages?.[0]"
                          :src="selectedSchool.galleryImages[0]"
                          alt=""
                          class="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div
                          class="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0"
                          v-else
                        >
                          <span class="text-3xl text-gray-400">🏫</span>
                        </div>
                        <div class="flex-1">
                          <div class="flex items-start justify-between gap-2">
                            <h3 class="font-semibold">
                              {{ selectedSchool.name }}
                            </h3>
                            <span
                              v-if="selectedSchool.accreditationCode"
                              class="px-2 py-1 text-xs border rounded"
                            >
                              {{ selectedSchool.accreditationCode }}
                            </span>
                          </div>
                          <p class="text-sm text-muted-foreground mt-1">
                            {{ selectedSchool.subDistrictName }},
                            {{ selectedSchool.districtName }},
                            {{ selectedSchool.provinceName }}
                          </p>
                          <div class="flex items-center gap-2 mt-2">
                            <span class="text-sm">⭐ {{ selectedSchool.rating }}</span>
                            <span class="text-sm text-muted-foreground"
                              >({{ selectedSchool.reviewers }} reviews)</span
                            >
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div class="flex gap-3">
                  <Button
                    variant="outline"
                    class="flex-1"
                    @click="clearSelection"
                  >
                    Batal
                  </Button>
                  <Button
                    class="flex-1"
                    @click="submitHighlight"
                    :disabled="isSubmitting"
                  >
                    <Loader2
                      v-if="isSubmitting"
                      class="h-4 w-4 animate-spin mr-2"
                    />
                    <span v-if="isSubmitting">Memproses...</span>
                    <span v-else>Tambah Highlight</span>
                  </Button>
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
import { ref, watch } from "vue";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { Search, X, Loader2 } from "lucide-vue-next";
import DashboardLayout from "~/layouts/dashboardLayout.vue";

definePageMeta({
  layout: "dashboardLayout",
});

const searchQuery = ref("");
const schools = ref([]);
const selectedSchool = ref(null);
const isSearching = ref(false);
const isSubmitting = ref(false);
const showResults = ref(false);

const toastMessage = ref("");
const toastTitle = ref("");
const toastVariant = ref("default");

let searchTimeout = null;

const showToast = (title, message, variant = "default") => {
  toastTitle.value = title;
  toastMessage.value = message;
  toastVariant.value = variant;

  setTimeout(() => {
    toastMessage.value = "";
  }, 5000);
};

const searchSchools = async (query) => {
  if (query.length < 2) {
    schools.value = [];
    showResults.value = false;
    return;
  }

  try {
    isSearching.value = true;
    const response = await axios.get(
      `http://103.150.226.108/api/school-details?search=${query}`
    );
    
    if (response.data.status === "success") {
      schools.value = response.data.data.datas;
    }
  } catch (error) {
    showToast("Error", "Gagal mencari sekolah", "destructive");
    schools.value = [];
  } finally {
    isSearching.value = false;
  }
};

watch(searchQuery, (newValue) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  if (newValue.length < 2) {
    schools.value = [];
    showResults.value = false;
    return;
  }

  searchTimeout = setTimeout(() => {
    searchSchools(newValue);
  }, 500);
});

const selectSchool = (school) => {
  selectedSchool.value = school;
  showResults.value = false;
  searchQuery.value = school.name;
};

const clearSelection = () => {
  selectedSchool.value = null;
  searchQuery.value = "";
  schools.value = [];
};

const submitHighlight = async () => {
  if (!selectedSchool.value) return;

  try {
    isSubmitting.value = true;
    await axios.post(
      "http://103.150.226.108/api/school-details/highlight",
      {
        highlight_id: selectedSchool.value.id,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    showToast("Success", "Sekolah berhasil ditambahkan ke highlight");
    clearSelection();
  } catch (error) {
    showToast(
      "Error",
      error.response?.data?.message || "Gagal menambahkan highlight",
      "destructive"
    );
  } finally {
    isSubmitting.value = false;
  }
};
</script>