<template>
  <div class="bg-white rounded-xl border border-border-gray">
    <div class="px-4 py-3 md:px-6 md:py-4">
      <h2 class="text-lg md:text-xl font-semibold text-primary-green">
        Pengaturan Profil
      </h2>
    </div>

    <div class="p-4 md:p-6">
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 md:mb-8">
        <div class="relative flex-shrink-0">
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
            <img
              v-if="profileData.avatar"
              :src="profileData.avatar"
              :alt="profileData.fullname"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center rounded-full bg-primary-green">
              <span class="text-white font-semibold text-2xl md:text-3xl">{{ userInitials }}</span>
            </div>
          </div>
        </div>

        <div class="flex-1 text-center sm:text-left">
          <h3
            @click="fileInput?.click()"
            class="text-base md:text-lg font-medium text-primary-green mb-1 underline cursor-pointer"
          >
            Ubah Profil
          </h3>
          <p class="text-xs md:text-sm text-secondary-gray mb-3 md:mb-4">PNG, JPEG under 2MB</p>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileUpload"
            class="hidden"
          />
        </div>
      </div>

      <div class="space-y-4 md:space-y-6 border border-border-gray p-3 md:p-4 rounded-xl">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 md:py-4 border-b border-border-gray -mx-3 px-3">
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              NAMA LENGKAP
            </label>
          </div>
          <div class="flex-1 sm:text-right">
            <span class="text-sm md:text-base text-primary-green font-medium break-words">
              {{ profileData.fullname }}
            </span>
          </div>
        </div>

        <div
          v-if="isStudent"
          class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 md:py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              NISN/NIM
            </label>
          </div>
          <div class="flex-1 sm:text-right">
            <span class="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-[#EDF8F0] text-[#4CC16B]">
              <span class="mr-1 md:mr-2"><UserNum /></span>
              {{ profileData.nisn || "-" }}
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 md:py-4 border-b border-border-gray -mx-3 px-3">
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              STATUS
            </label>
          </div>
          <div class="flex-1 sm:text-right">
            <span
              class="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-[#E5F3FE] text-[#0789F2]"
              v-if="isStudent"
            >
              <span class="mr-1 md:mr-2"><UserStatus/></span>
              Siswa
            </span>
            <span
              class="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-[#FFF4EE] text-[#FA9E53]"
              v-else-if="isParent"
            >
              <span class="mr-1 md:mr-2"><UserCircle /></span>
              Orang Tua
            </span>
          </div>
        </div>

        <div
          v-if="isStudent"
          class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 md:py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              SEKOLAH
            </label>
          </div>
          <div class="flex-1 sm:text-right">
            <span class="text-sm md:text-base text-primary-green font-medium break-words">
              {{ profileData.schoolDetails || "-" }}
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 md:py-4 border-b border-border-gray -mx-3 px-3">
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              EMAIL
            </label>
          </div>
          <div class="flex-1 sm:text-right">
            <span class="text-sm md:text-base text-primary-green font-medium break-words">
              {{ profileData.email }}
            </span>
          </div>
        </div>

        <div
          v-if="isStudent"
          class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 md:py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              TANGGAL LAHIR
            </label>
          </div>
          <div class="flex-1 sm:text-right">
            <span class="text-sm md:text-base text-primary-green font-medium">
              {{ formatDate(profileData.birthDate) }}
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 md:py-4 border-b border-border-gray -mx-3 px-3">
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              NO. TELP
            </label>
          </div>
          <div class="flex-1 sm:text-right text-primary-green">
            <span class="text-sm md:text-base break-words">{{ profileData.phone || "-" }}</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 py-3 md:py-4">
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              ALAMAT
            </label>
          </div>
          <div class="flex-1 sm:text-right text-primary-green">
            <span class="text-sm md:text-base break-words">{{ profileData.address || "-" }}</span>
          </div>
        </div>
      </div>

      <div class="flex justify-center sm:justify-end mt-6 md:mt-8">
        <button
          @click="handleEdit"
          class="inline-flex items-center py-2 px-4 gap-2 text-sm font-medium text-primary-green border border-border-gray rounded-xl hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
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
    </div>
  </div>

  <div
    v-if="isParent"
    class="bg-white rounded-xl border border-border-gray mt-4 md:mt-6"
  >
    <div class="px-4 py-3 md:px-6 md:py-4">
      <h2 class="text-lg md:text-xl font-semibold text-primary-green">Peserta Didik</h2>
    </div>

    <div class="p-4 md:p-6">
      <div class="space-y-4 md:space-y-6 border border-border-gray p-3 md:p-4 rounded-xl">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 md:py-4 border-b border-border-gray -mx-3 px-3">
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              NAMA LENGKAP
            </label>
          </div>
          <div class="flex-1 sm:text-right">
            <span class="text-sm md:text-base text-primary-green font-medium break-words">
              {{ studentData.fullname || "-" }}
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 md:py-4 border-b border-border-gray -mx-3 px-3">
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              NISN
            </label>
          </div>
          <div class="flex-1 sm:text-right">
            <span class="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-[#EDF8F0] text-[#4CC16B]">
              <span class="mr-1 md:mr-2"><UserNum /></span>
              {{ studentData.nisn || "-" }}
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 md:py-4 border-b border-border-gray -mx-3 px-3">
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              STATUS
            </label>
          </div>
          <div class="flex-1 sm:text-right">
            <span class="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-[#E5F3FE] text-[#0789F2]">
              <span class="mr-1"><UserStatus /></span>
              Siswa Aktif
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 md:py-4 border-b border-border-gray -mx-3 px-3">
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              TANGGAL LAHIR
            </label>
          </div>
          <div class="flex-1 sm:text-right">
            <span class="text-sm md:text-base text-primary-green font-medium">
              {{ formatDate(studentData.birthDate) || "-" }}
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 md:py-4 -mx-3 px-3">
          <div class="flex-1">
            <label class="text-xs md:text-sm font-medium text-[#ADB5BD] uppercase tracking-wider">
              SEKOLAH
            </label>
          </div>
          <div class="flex-1 sm:text-right">
            <span class="text-sm md:text-base text-primary-green font-medium break-words">
              {{ studentData.schoolName || "-" }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex justify-center sm:justify-end mt-6 md:mt-8">
        <button
          @click="handleEditStudent"
          class="inline-flex items-center py-2 px-4 gap-2 text-sm font-medium text-primary-green border border-border-gray rounded-xl hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
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
    </div>
  </div>

  <!-- Education History Component -->
  <!-- <EducationHistory
    :educationData="educationHistory"
    @add="handleAddEducation"
    @edit="handleEditEducation"
    @delete="handleDeleteEducation"
  /> -->

  <!-- Modals -->
  <ProfileEditModal
    :isOpen="isEditModalOpen"
    :userData="profileData"
    @close="handleCloseModal"
    @submit="handleSubmitEdit"
  />

  <ProfileStudentEditModal
    :isOpen="isStudentEditModalOpen"
    :studentData="studentData"
    @close="handleCloseStudentModal"
    @submit="handleSubmitStudentEdit"
  />

  <Modal
    :isOpen="isModalOpen"
    :type="modalType"
    :title="modalTitle"
    :message="modalMessage"
    :confirmText="modalConfirmText"
    :cancelText="modalCancelText"
    :showCancel="showCancelButton"
    @confirm="handleModalConfirm"
    @cancel="handleModalCancel"
    @close="closeModal"
  />
</template>


<script setup>
import { useAuthStore } from "@/store/auth";
import { computed, onMounted, ref } from "vue";
import ProfileEditModal from "~/components/profile/ProfileEditModal.vue";
import ProfileStudentEditModal from "./ProfileStudentEditModal.vue";
import EducationHistory from "./EducationHistory.vue";
import Cookies from "js-cookie";
import axios from "@/lib/axios";
import UserStatus from "~/assets/UserStatus.vue";
import UserCircle from "~/assets/UserCircle.vue";
import UserNum from "~/assets/UserNum.vue";
import Modal from "~/components/common/Modal.vue";

const authStore = useAuthStore();
const fileInput = ref(null);
const isEditModalOpen = ref(false);
const isStudentEditModalOpen = ref(false);

const isModalOpen = ref(false);
const modalType = ref('success');
const modalTitle = ref('');
const modalMessage = ref('');
const modalConfirmText = ref('Oke');
const modalCancelText = ref('Batal');
const showCancelButton = ref(false);

const showModal = (type, title, message, options = {}) => {
  modalType.value = type;
  modalTitle.value = title;
  modalMessage.value = message;
  modalConfirmText.value = options.confirmText || 'Oke';
  modalCancelText.value = options.cancelText || 'Batal';
  showCancelButton.value = options.showCancel || false;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleModalConfirm = () => {
  console.log('Modal confirmed');
};

const handleModalCancel = () => {
  console.log('Modal cancelled');
};

const isStudent = computed(() => {
  return authStore.user?.role === "student" || false;
});

const isParent = computed(() => {
  return authStore.user?.role === "parent" || false;
});

const profileData = computed(() => {
  if (!authStore.user) {
    return {
      fullname: "",
      nisn: "",
      roles: [],
      schoolDetails: "",
      email: "",
      birthDate: "",
      phone: "",
      address: "",
      avatar: null,
    };
  }

  return {
    fullname: authStore.user.fullname || "",
    nisn: authStore.user.nisn || "",
    roles: authStore.user.role ? [authStore.user.role] : [],
    schoolDetails: authStore.user.schoolDetail || "",
    email: authStore.user.email || "",
    birthDate: authStore.user.birthdate || "",
    phone: authStore.user.phoneNo || "",
    address: authStore.user.address || "",
    avatar: authStore.user.image || null,
  };
});

const getInitials = (fullname) => {
  const parts = fullname.split(" ");
  const lastTwoParts = parts.slice(-2);
  return lastTwoParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const userInitials = computed(() => {
  if (!authStore.user || !authStore.user.fullname) return "U";
  return getInitials(authStore.user.fullname);
});

const studentData = computed(() => {
  if (!isParent.value || !authStore.user?.child) return {};

  const child = authStore.user.child[0];
  if (!child) return {};

  return {
    fullname: child.fullname || "",
    nisn: child.nisn || "",
    birthDate: child.birthdate || "",
    schoolName: child.schoolDetail || "",
    schoolDetailId: child.schoolDetailId || null,
    email: child.email || "",
    phone: child.phoneNo || "",
  };
});

const educationExperiences = ref([]);
const educationLevels = ref([]);
const loadingEducation = ref(false);

const educationHistory = computed(() => {
  const levelMapping = {
    SD: "Sekolah Dasar",
    SMP: "Sekolah Menengah Pertama",
    SMA: "Sekolah Menengah Atas",
    SMK: "Sekolah Menengah Kejuruan",
    Universitas: "Universitas",
  };

  return educationExperiences.value.map((exp) => {
    const level = educationLevels.value.find(
      (l) => l.id === exp.educationLevelId
    );
    const levelName = level?.name || "Loading...";

    return {
      id: exp.id,
      educationLevelId: exp.educationLevelId,
      schoolDetailId: exp.schoolDetailId,
      schoolName: exp.schoolName || "Loading...",
      level: levelMapping[levelName] || levelName,
      status: exp.status === "aktif" ? "Siswa Aktif" : "Alumni",
      period: `${formatDateShort(exp.startDate)} - ${formatDateShort(
        exp.endDate
      )}`,
      startDate: exp.startDate,
      endDate: exp.endDate,
      rawStatus: exp.status,
      galleryImages: exp.galleryImages || [],
    };
  });
});

const fetchEducationLevels = async () => {
  try {
    const response = await axios.get("/education-levels");
    educationLevels.value = response.data.data;
  } catch (error) {
    console.error("Error fetching education levels:", error);
  }
};

const fetchEducationExperiences = async () => {
  loadingEducation.value = true;
  try {
    const token = Cookies.get("token");
    const response = await axios.get("/experiences-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const experiences = response.data.data;

    const experiencesWithSchools = await Promise.all(
      experiences.map(async (exp) => {
        try {
          const schoolResponse = await axios.get(
            `/school-details/${exp.schoolDetailId}`
          );
          return {
            ...exp,
            schoolName: schoolResponse.data.data.name,
            galleryImages: schoolResponse.data.data.galleryImages || [],
          };
        } catch (error) {
          console.error("Error fetching school detail:", error);
          return {
            ...exp,
            schoolName: "Unknown School",
            galleryImages: [],
          };
        }
      })
    );

    educationExperiences.value = experiencesWithSchools;
  } catch (error) {
    console.error("Error fetching education experiences:", error);
  } finally {
    loadingEducation.value = false;
  }
};

const handleAddEducation = async (data) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.post("/education-experiences", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "success") {
      showModal('success', 'Berhasil Ditambahkan!', 'Riwayat pendidikan berhasil ditambahkan.');
      await fetchEducationExperiences();
    }
  } catch (error) {
    console.error("Error adding education:", error);
    showModal('error', 'Gagal Menambahkan!', error.response?.data?.message || 'Gagal menambahkan riwayat pendidikan.');
  }
};

const handleEditEducation = async ({ data, index }) => {
  try {
    const token = Cookies.get("token");
    const educationId = educationExperiences.value[index].id;

    const response = await axios.put(
      `/education-experiences/${educationId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === "success") {
      showModal('success', 'Berhasil Diupdate!', 'Riwayat pendidikan berhasil diupdate.');
      await fetchEducationExperiences();
    }
  } catch (error) {
    console.error("Error updating education:", error);
    showModal('error', 'Gagal Mengupdate!', error.response?.data?.message || 'Gagal mengupdate riwayat pendidikan.');
  }
};

const handleDeleteEducation = async ({ data, index }) => {
  try {
    const token = Cookies.get("token");
    const educationId = educationExperiences.value[index].id;

    const response = await axios.delete(
      `/education-experiences/${educationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === "success") {
      showModal('success', 'Berhasil Dihapus!', 'Riwayat pendidikan berhasil dihapus.');
      await fetchEducationExperiences();
    }
  } catch (error) {
    console.error("Error deleting education:", error);
    showModal('error', 'Gagal Menghapus!', error.response?.data?.message || 'Gagal menghapus riwayat pendidikan.');
  }
};

const formatDate = (date) => {
  if (!date) return "-";

  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (error) {
    return "-";
  }
};

const formatDateShort = (date) => {
  if (!date) return "-";

  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("id-ID", {
      month: "short",
      year: "numeric",
    });
  } catch (error) {
    return "-";
  }
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    showModal('error', 'File Terlalu Besar!', 'Ukuran file maksimal 2MB.');
    return;
  }

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (!allowedTypes.includes(file.type)) {
    showModal('error', 'Format File Salah!', 'Format file harus PNG, JPEG, GIF, atau WEBP.');
    return;
  }

  try {
    const token = Cookies.get("token");

    if (!token) {
      showModal('error', 'Sesi Berakhir!', 'Sesi Anda telah berakhir, silakan login kembali.');
      return;
    }

    const formData = new FormData();
    formData.append("files[]", file);

    const uploadResponse = await axios.post("/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (uploadResponse.data.message === "Upload Files Success") {
      const imageUrl = uploadResponse.data.data.urls[0];

      let requestBody = {};

      if (isStudent.value) {
        requestBody = {
          fullname: profileData.value.fullname,
          email: profileData.value.email,
          nisn: profileData.value.nisn,
          dateOfBirth: profileData.value.birthDate,
          phoneNo: profileData.value.phone,
          address: profileData.value.address,
          image: imageUrl,
        };
      } else if (isParent.value) {
        requestBody = {
          fullname: profileData.value.fullname,
          email: profileData.value.email,
          phoneNo: profileData.value.phone,
          address: profileData.value.address,
          image: imageUrl,
        };
      }

      const updateResponse = await axios.put("/user", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (updateResponse.data.status === "success") {
        await authStore.fetchUser();
        showModal('success', 'Foto Berhasil Diupdate!', 'Foto profil Anda berhasil diperbarui.');
      }
    } else {
      showModal('error', 'Upload Gagal!', 'Terjadi kesalahan saat mengupload foto.');
    }
  } catch (error) {
    console.error("Upload error:", error);
    if (error.response?.status === 401) {
      showModal('error', 'Sesi Berakhir!', 'Sesi Anda telah berakhir, silakan login kembali.');
    } else {
      showModal('error', 'Upload Gagal!', error.response?.data?.message || 'Gagal mengunggah foto.');
    }
  }
};

const handleEdit = () => {
  isEditModalOpen.value = true;
};

const handleEditStudent = () => {
  isStudentEditModalOpen.value = true;
};

const handleCloseModal = () => {
  isEditModalOpen.value = false;
};

const handleCloseStudentModal = () => {
  isStudentEditModalOpen.value = false;
};

const handleSubmitEdit = async (formData) => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      showModal('error', 'Sesi Berakhir!', 'Sesi Anda telah berakhir, silakan login kembali.');
      return;
    }

    let requestBody = {};

    if (isStudent.value) {
      requestBody = {
        fullname: formData.fullname || null,
        email: formData.email || null,
        nisn: formData.nisn || null,
        dateOfBirth: formData.birthDate || null,
        phoneNo: formData.phone || null,
        address: formData.address || null,
        image: null,
      };
    } else if (isParent.value) {
      requestBody = {
        fullname: formData.fullname || null,
        email: formData.email || null,
        phoneNo: formData.phone || null,
        address: formData.address || null,
        image: null,
      };
    }

    const response = await axios.put("/user", requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "success") {
      await authStore.fetchUser();
      isEditModalOpen.value = false;
      showModal('success', 'Profil Berhasil Diupdate!', 'Profil Anda berhasil diperbarui.');
    }
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.response?.status === 401) {
      showModal('error', 'Sesi Berakhir!', 'Sesi Anda telah berakhir, silakan login kembali.');
    } else {
      showModal('error', 'Update Gagal!', error.response?.data?.message || 'Gagal mengupdate profil.');
    }
  }
};

const handleSubmitStudentEdit = async (formData) => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      showModal('error', 'Sesi Berakhir!', 'Sesi Anda telah berakhir, silakan login kembali.');
      return;
    }

    const requestBody = {
      fullname: profileData.value.fullname || null,
      email: profileData.value.email || null,
      phoneNo: profileData.value.phone || null,
      address: profileData.value.address || null,
      image: null,

      child: {
        fullname: formData.fullname || null,
        dateOfBirth: formData.dateOfBirth || null,
        nisn: formData.nisn || null,
        email: formData.email || null,
        phoneNo: formData.phoneNo || null,
        schoolDetailId: formData.schoolDetailId || null,
        schoolValidation: formData.schoolValidation || null,
      },
    };

    const response = await axios.put("/user", requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "success") {
      await authStore.fetchUser();
      isStudentEditModalOpen.value = false;
      showModal('success', 'Profil Siswa Berhasil Diupdate!', 'Profil siswa berhasil diperbarui.');
    }
  } catch (error) {
    console.error("Update student profile error:", error);

    if (error.response?.status === 401) {
      showModal('error', 'Sesi Berakhir!', 'Sesi Anda telah berakhir, silakan login kembali.');
    } else {
      showModal('error', 'Update Gagal!', error.response?.data?.message || 'Gagal mengupdate profil siswa.');
    }
  }
};

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUser();
  }

  const token = Cookies.get("token");
  console.log("Token available:", token ? "Yes" : "No");
  console.log("User data:", authStore.user);

  await fetchEducationLevels();
  await fetchEducationExperiences();
});
</script>
