<!-- components/profile/Profile.vue -->
<template>
  <div class="bg-white rounded-xl border border-border-gray">
    <!-- Header -->
    <div class="px-6 py-4">
      <h2 class="text-xl font-semibold text-primary-green">Pengaturan Profil</h2>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Profile Photo Section -->
      <div class="flex items-start space-x-6 mb-8">
        <!-- Avatar -->
        <div class="relative">
          <div class="w-24 h-24 rounded-full overflow-hidden">
            <img
              v-if="profileData.avatar"
              :src="profileData.avatar"
              :alt="profileData.fullname"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="#082519"
              >
                <g
                  fill="none"
                  stroke="#082519"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                >
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"
                  />
                  <path
                    d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>

        <!-- Upload Info -->
        <div class="flex-1">
          <h3 class="text-lg font-medium text-gray-900 mb-1">Ubah Profil</h3>
          <p class="text-sm text-gray-600 mb-4">PNG, JPEG under 2MB</p>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileUpload"
            class="hidden"
          />

          <button
            @click="fileInput?.click()"
            class="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            Pilih Foto
          </button>
        </div>
      </div>

      <!-- Profile Form -->
      <div class="space-y-6 border border-border-gray p-3 border-b rounded-xl">
        <!-- Nama Lengkap -->
        <div
          class="flex justify-between items-center py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >NAMA LENGKAP</label
            >
          </div>
          <div class="flex-1 text-right">
            <span class="text-primary-green font-medium">{{
              profileData.fullname
            }}</span>
          </div>
        </div>

        <!-- NISN - Only for students -->
        <div
          v-if="isStudent"
          class="flex justify-between items-center py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >NISN/NIM</label
            >
          </div>
          <div class="flex-1 text-right">
            <span class="text-green-600 font-medium">{{
              profileData.nisn || "-"
            }}</span>
          </div>
        </div>

        <!-- Status -->
        <div
          class="flex justify-between items-center py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >STATUS</label
            >
          </div>
          <div class="flex-1 text-right">
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              v-if="isStudent"
            >
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Siswa
            </span>
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
              v-else-if="isParent"
            >
              <span class="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Orang Tua
            </span>
          </div>
        </div>

        <!-- Sekolah - Only for students -->
        <div
          v-if="isStudent"
          class="flex justify-between items-center py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >SEKOLAH</label
            >
          </div>
          <div class="flex-1 text-right flex items-center justify-end">
            <span class="text-primary-green font-medium">{{
              profileData.schoolDetails || "-"
            }}</span>
          </div>
        </div>

        <!-- Email -->
        <div
          class="flex justify-between items-center py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >EMAIL</label
            >
          </div>
          <div class="flex-1 text-right">
            <span class="text-primary-green font-medium">{{
              profileData.email
            }}</span>
          </div>
        </div>

        <!-- Tanggal Lahir - Only for students -->
        <div
          v-if="isStudent"
          class="flex justify-between items-center py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >TANGGAL LAHIR</label
            >
          </div>
          <div class="flex-1 text-right">
            <span class="text-primary-green font-medium">{{
              formatDate(profileData.birthDate)
            }}</span>
          </div>
        </div>

        <!-- No. Telp -->
        <div
          class="flex justify-between items-center py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >NO. TELP</label
            >
          </div>
          <div class="flex-1 text-right text-primary-green">
            <span class="">{{ profileData.phone || "-" }}</span>
          </div>
        </div>

        <!-- Alamat -->
        <div class="flex justify-between items-center py-4">
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >ALAMAT</label
            >
          </div>
          <div class="flex-1 text-right text-primary-green">
            <span class="">{{ profileData.address || "-" }}</span>
          </div>
        </div>
      </div>

      <!-- Edit Button -->
      <div class="flex justify-end mt-8">
        <button
          @click="handleEdit"
          class="inline-flex items-center px-4 py-2 gap-2 text-sm font-medium text-primary-green border border-border-gray -mx-3 px-3 rounded-xl"
        >
          <span>Ubah</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4319_2151)">
              <path
                d="M15.75 8.74831L12.25 5.24831M2.1875 18.8108L5.14882 18.4818C5.51063 18.4416 5.69153 18.4215 5.86062 18.3667C6.01063 18.3182 6.15339 18.2496 6.28503 18.1628C6.4334 18.0649 6.5621 17.9362 6.81951 17.6788L18.375 6.12331C19.3415 5.15681 19.3415 3.58981 18.375 2.62331C17.4085 1.65681 15.8415 1.65681 14.875 2.62331L3.31951 14.1788C3.0621 14.4362 2.9334 14.5649 2.83556 14.7133C2.74875 14.8449 2.68014 14.9877 2.63157 15.1377C2.57684 15.3068 2.55674 15.4877 2.51654 15.8495L2.1875 18.8108Z"
                stroke="#082519"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_4319_2151">
                <rect width="21" height="21" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Student Data Section for Parents -->
  <div
    v-if="isParent"
    class="bg-white rounded-lg shadow-sm border border-border-gray -mx-3 px-3 mt-6"
  >
    <!-- Header -->
    <div class="px-6 py-4 border-b border-border-gray -mx-3 px-3">
      <h2 class="text-xl font-semibold text-gray-900">Peserta Didik</h2>
    </div>

    <!-- Content -->
    <div class="p-6">
      <div class="space-y-6">
        <!-- Nama Lengkap -->
        <div
          class="flex justify-between items-center py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >NAMA LENGKAP</label
            >
          </div>
          <div class="flex-1 text-right">
            <span class="text-gray-900 font-medium">{{
              studentData.fullname || "-"
            }}</span>
          </div>
        </div>

        <!-- NISN -->
        <div
          class="flex justify-between items-center py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >NISN</label
            >
          </div>
          <div class="flex-1 text-right">
            <span class="text-green-600 font-medium">{{
              studentData.nisn || "-"
            }}</span>
          </div>
        </div>

        <!-- Status -->
        <div
          class="flex justify-between items-center py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >STATUS</label
            >
          </div>
          <div class="flex-1 text-right">
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Siswa Aktif
            </span>
          </div>
        </div>

        <!-- Tanggal Lahir -->
        <div
          class="flex justify-between items-center py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >TANGGAL LAHIR</label
            >
          </div>
          <div class="flex-1 text-right">
            <span class="text-gray-900 font-medium">{{
              formatDate(studentData.birthDate) || "-"
            }}</span>
          </div>
        </div>

        <!-- Sekolah -->
        <div
          class="flex justify-between items-center py-4 border-b border-border-gray -mx-3 px-3"
        >
          <div class="flex-1">
            <label
              class="text-sm font-medium text-[#ADB5BD] uppercase tracking-wider"
              >SEKOLAH</label
            >
          </div>
          <div class="flex-1 text-right flex items-center justify-end">
            <span class="text-gray-900 font-medium">{{
              studentData.schoolName || "-"
            }}</span>
          </div>
        </div>
      </div>

      <!-- Edit Button -->
      <div class="flex justify-end mt-8">
        <button
          @click="handleEditStudent"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          <span>Ubah</span>
          <svg
            class="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Education History Component - Always at the bottom -->
  <EducationHistory
    :educationData="educationHistory"
    @add="handleAddEducation"
    @edit="handleEditEducation"
    @delete="handleDeleteEducation"
  />

  <!-- Edit Profile Modal -->
  <ProfileEditModal
    :isOpen="isEditModalOpen"
    :userData="profileData"
    @close="handleCloseModal"
    @submit="handleSubmitEdit"
  />

  <!-- Edit Student Profile Modal -->
  <ProfileStudentEditModal
    :isOpen="isStudentEditModalOpen"
    :studentData="studentData"
    @close="handleCloseStudentModal"
    @submit="handleSubmitStudentEdit"
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

const authStore = useAuthStore();
const fileInput = ref(null);
const isEditModalOpen = ref(false);
const isStudentEditModalOpen = ref(false);

const isStudent = computed(() => {
  return authStore.user?.roles?.includes("student") || false;
});

const isParent = computed(() => {
  return authStore.user?.roles?.includes("parent") || false;
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

  const getSchoolName = (schoolDetails) => {
    if (!schoolDetails) return "";

    // Untuk student, schoolDetails adalah array
    if (Array.isArray(schoolDetails) && schoolDetails.length > 0) {
      const firstSchool = schoolDetails[0];
      return firstSchool.name || "";
    }

    return "";
  };

  return {
    fullname: authStore.user.fullname || "",
    nisn: authStore.user.nisn || "",
    roles: authStore.user.roles || [],
    schoolDetails: getSchoolName(authStore.user.schoolDetails),
    email: authStore.user.email || "",
    birthDate: authStore.user.dateOfBirth || "",
    phone: authStore.user.phoneNo || "",
    address: authStore.user.address || "",
    avatar: authStore.user.image || null,
  };
});

const studentData = computed(() => {
  if (!isParent.value || !authStore.user?.child) return {};

  const child = authStore.user.child[0];
  if (!child) return {};

  return {
    fullname: child.fullname || "",
    nisn: child.nisn || "",
    birthDate: child.dateOfBirth || "",
    schoolName: child.schoolDetail?.name || "",
    schoolDetailId: child.schoolDetailId || null,
    email: child.email || "",
    phone: child.phoneNo || "",
  };
});

// Education Experience
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

    // Fetch school details untuk setiap experience
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
      alert("Riwayat pendidikan berhasil ditambahkan!");
      await fetchEducationExperiences();
    }
  } catch (error) {
    console.error("Error adding education:", error);
    alert(
      error.response?.data?.message || "Gagal menambahkan riwayat pendidikan"
    );
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
      alert("Riwayat pendidikan berhasil diupdate!");
      await fetchEducationExperiences();
    }
  } catch (error) {
    console.error("Error updating education:", error);
    alert(
      error.response?.data?.message || "Gagal mengupdate riwayat pendidikan"
    );
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
      alert("Riwayat pendidikan berhasil dihapus!");
      await fetchEducationExperiences();
    }
  } catch (error) {
    console.error("Error deleting education:", error);
    alert(
      error.response?.data?.message || "Gagal menghapus riwayat pendidikan"
    );
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
    alert("Ukuran file maksimal 2MB");
    return;
  }

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    alert("Format file harus PNG atau JPEG");
    return;
  }

  try {
    // TODO: Implementasi upload file
    console.log("File selected:", file);
    // Sementara hanya log, nanti bisa ditambahkan logic upload
  } catch (error) {
    console.error("Upload error:", error);
    alert("Gagal mengunggah foto");
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
      alert("Sesi Anda telah berakhir, silakan login kembali");
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
        image: null, // Will be implemented later
      };
    } else if (isParent.value) {
      requestBody = {
        fullname: formData.fullname || null,
        email: formData.email || null,
        phoneNo: formData.phone || null,
        address: formData.address || null,
        image: null, // Will be implemented later
      };
    }

    console.log(
      "Updating profile with token:",
      token ? "Token exists" : "No token"
    );
    console.log("Request body:", requestBody);

    const response = await axios.put("/user", requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "success") {
      await authStore.fetchUser();

      isEditModalOpen.value = false;

      alert("Profil berhasil diupdate!");
    }
  } catch (error) {
    console.error("Update profile error:", error);
    console.error("Error response:", error.response);

    if (error.response?.status === 401) {
      alert("Sesi Anda telah berakhir, silakan login kembali");
    } else {
      alert(error.response?.data?.message || "Gagal mengupdate profil");
    }
  }
};

const handleSubmitStudentEdit = async (formData) => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      alert("Sesi Anda telah berakhir, silakan login kembali");
      return;
    }

    const requestBody = {
      fullname: profileData.value.fullname || null,
      email: profileData.value.email || null,
      phoneNo: profileData.value.phone || null,
      address: profileData.value.address || null,
      image: null, // Will be implemented later

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

    console.log(
      "Updating student profile with token:",
      token ? "Token exists" : "No token"
    );
    console.log("Request body:", requestBody);

    const response = await axios.put("/user", requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "success") {
      await authStore.fetchUser();

      isStudentEditModalOpen.value = false;

      alert("Profil siswa berhasil diupdate!");
    }
  } catch (error) {
    console.error("Update student profile error:", error);
    console.error("Error response:", error.response);

    if (error.response?.status === 401) {
      alert("Sesi Anda telah berakhir, silakan login kembali");
    } else {
      alert(error.response?.data?.message || "Gagal mengupdate profil siswa");
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

  // Fetch education data
  await fetchEducationLevels();
  await fetchEducationExperiences();
});
</script>
