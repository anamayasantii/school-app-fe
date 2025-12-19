<template>
  <div class="bg-white rounded-lg border border-border-gray mt-4 md:mt-6">
    <div class="px-4 py-3 md:px-6 md:py-4">
      <h2 class="text-lg md:text-xl font-semibold text-primary-green">Riwayat Pendidikan</h2>
    </div>

    <div class="p-4 md:p-6">
      <div
        v-for="(education, index) in educationHistory"
        :key="index"
        class="p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors"
        :class="{ 'mb-3 md:mb-4': index < educationHistory.length - 1 }"
      >
        <div class="md:hidden">
          <div class="flex items-start gap-3 mb-3">
            <div class="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                v-if="education.galleryImages && education.galleryImages.length > 0"
                :src="education.galleryImages[0]"
                :alt="education.schoolName"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full bg-border-gray flex flex-col items-center justify-center">
                <svg class="w-5 h-5 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-xs text-secondary-gray mb-0.5">{{ education.period }}</p>
              <p class="text-xs text-gray-600 font-medium">{{ education.level }}</p>
            </div>
          </div>

          <h3 class="text-base font-semibold text-primary-green mb-2 break-words">
            {{ education.schoolName }}
          </h3>

          <div class="mb-3">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#E5F3FE] text-[#0789F2]">
              <span class="mr-1"><UserStatus /></span>
              {{ education.status }}
            </span>
          </div>

          <button
            @click="handleEditEducation(education, index)"
            class="inline-flex items-center px-3 py-1.5 text-xs font-medium gap-2 text-primary-green border border-border-gray rounded-xl hover:bg-white transition-colors w-full justify-center"
          >
            <span>Ubah</span>
            <svg width="12" height="12" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_4319_2151)">
                <path d="M15.75 8.74831L12.25 5.24831M2.1875 18.8108L5.14882 18.4818C5.51063 18.4416 5.69153 18.4215 5.86062 18.3667C6.01063 18.3182 6.15339 18.2496 6.28503 18.1628C6.4334 18.0649 6.5621 17.9362 6.81951 17.6788L18.375 6.12331C19.3415 5.15681 19.3415 3.58981 18.375 2.62331C17.4085 1.65681 15.8415 1.65681 14.875 2.62331L3.31951 14.1788C3.0621 14.4362 2.9334 14.5649 2.83556 14.7133C2.74875 14.8449 2.68014 14.9877 2.63157 15.1377C2.57684 15.3068 2.55674 15.4877 2.51654 15.8495L2.1875 18.8108Z" stroke="#082519" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_4319_2151">
                  <rect width="21" height="21" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        <div class="hidden md:flex items-start gap-4">
          <div class="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              v-if="education.galleryImages && education.galleryImages.length > 0"
              :src="education.galleryImages[0]"
              :alt="education.schoolName"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full bg-border-gray flex flex-col items-center justify-center">
              <svg class="w-6 h-6 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>

          <div class="flex-1">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="text-lg font-semibold text-primary-green mb-1">
                  {{ education.schoolName }}
                  <span class="text-secondary-gray font-normal text-base ml-2">
                    • {{ education.period }}
                  </span>
                </h3>
                <p class="text-gray-600">{{ education.level }}</p>
              </div>

              <button
                @click="handleEditEducation(education, index)"
                class="inline-flex items-center px-3 py-2 text-sm font-medium gap-2 text-primary-green border border-border-gray rounded-xl hover:bg-white transition-colors"
              >
                <span>Ubah</span>
                <svg width="14" height="14" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_4319_2151)">
                    <path d="M15.75 8.74831L12.25 5.24831M2.1875 18.8108L5.14882 18.4818C5.51063 18.4416 5.69153 18.4215 5.86062 18.3667C6.01063 18.3182 6.15339 18.2496 6.28503 18.1628C6.4334 18.0649 6.5621 17.9362 6.81951 17.6788L18.375 6.12331C19.3415 5.15681 19.3415 3.58981 18.375 2.62331C17.4085 1.65681 15.8415 1.65681 14.875 2.62331L3.31951 14.1788C3.0621 14.4362 2.9334 14.5649 2.83556 14.7133C2.74875 14.8449 2.68014 14.9877 2.63157 15.1377C2.57684 15.3068 2.55674 15.4877 2.51654 15.8495L2.1875 18.8108Z" stroke="#082519" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_4319_2151">
                      <rect width="21" height="21" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>

            <div>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#E5F3FE] text-[#0789F2]">
                <span class="mr-2"><UserStatus /></span>
                {{ education.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="educationHistory.length === 0" class="text-center py-8 md:py-12">
        <svg class="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
        <h3 class="text-base md:text-lg font-medium text-primary-green mb-1 md:mb-2">Belum ada riwayat pendidikan</h3>
        <p class="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Tambahkan riwayat pendidikan Anda</p>
      </div>

      <div class="flex justify-center sm:justify-end mt-6 md:mt-8">
        <button
          @click="handleAdd"
          class="inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 bg-primary-green text-white text-sm md:text-base font-medium rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
        >
          Tambah
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
        </button>
      </div>
    </div>

    <ProfileEducationModal
      :isOpen="isEducationModalOpen"
      :mode="modalMode"
      :educationData="selectedEducation"
      @close="handleCloseModal"
      @submit="handleSubmitModal"
      @delete="handleDeleteModal"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import ProfileEducationModal from "./ProfileEducationModal.vue";
import UserStatus from "~/assets/UserStatus.vue";

const props = defineProps({
  educationData: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["add", "edit", "delete"]);

const isEducationModalOpen = ref(false);
const modalMode = ref("add");
const selectedEducation = ref({});

const educationHistory = computed(() => {
  return props.educationData || [];
});

const handleAdd = () => {
  modalMode.value = "add";
  selectedEducation.value = {};
  isEducationModalOpen.value = true;
};

const handleEditEducation = (education, index) => {
  modalMode.value = "edit";
  selectedEducation.value = { ...education, index };
  isEducationModalOpen.value = true;
};

const handleCloseModal = () => {
  isEducationModalOpen.value = false;
  selectedEducation.value = {};
};

const handleSubmitModal = (payload) => {
  if (payload.mode === "add") {
    emit("add", payload.data);
  } else {
    emit("edit", { data: payload.data, index: selectedEducation.value.index });
  }
  handleCloseModal();
};

const handleDeleteModal = (educationData) => {
  emit("delete", { data: educationData, index: selectedEducation.value.index });
  handleCloseModal();
};
</script>
