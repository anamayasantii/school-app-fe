<template>
  <div class="min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="mt-6 sm:mt-8 font-medium">
        <ol
          class="flex flex-wrap items-center space-x-2 text-xs sm:text-sm text-secondary-gray"
        >
          <li><a href="/">Beranda</a></li>
          <li><span class="mx-2">›</span></li>
          <li><a href="">Jelajahi Sekolah</a></li>
          <li><span class="mx-2">›</span></li>
          <li :class="selectedStatus ? 'text-[#76685A]' : 'text-[#28190C]'">
            {{ getLevelTitle(level) }}
          </li>
          <template v-if="selectedStatus">
            <li><span class="mx-2">›</span></li>
            <li class="text-[#28190C]">
              {{
                selectedStatus === "SPK"
                  ? "Nasional Plus/Internasional"
                  : selectedStatus
              }}
            </li>
          </template>
        </ol>
      </nav>

      <div class="py-4 sm:py-6">
        <div class="mb-4 sm:mb-6">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <IconSd
                v-if="level === 'sd'"
                class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              />
              <SmpIcon
                v-else-if="level === 'smp'"
                class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              />
              <SmaIcon
                v-else-if="level === 'sma'"
                class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              />
              <SmkIcon
                v-else-if="level === 'smk'"
                class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              />
              <UniversitasIcon
                v-else-if="level === 'universitas'"
                class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              />
            </div>
            <h2 class="font-bold text-xl sm:text-2xl text-[#28190C]">
              {{ getLevelTitle(level) }}
            </h2>
          </div>
        </div>

        <!-- Status Filter Cards with Transition -->
        <transition
          name="fade-slide"
          @after-leave="showLocationFilters = true"
        >
          <StatusFilterCards
            v-if="!selectedStatus"
            :status-list="statusList"
            :selected-status="selectedStatus"
            @select="applyStatusFilter"
          />
        </transition>

        <!-- Location Filters with Transition -->
        <transition name="fade-slide">
          <LocationFilters
            v-if="selectedStatus && showLocationFilters"
            v-model:selected-province="selectedProvince"
            v-model:selected-district="selectedDistrict"
            v-model:selected-sub-district="selectedSubDistrict"
            :province-list="provinceList"
            :district-list="districtList"
            :sub-district-list="subDistrictList"
            class="mb-4 sm:mb-6"
          />
        </transition>
      </div>

      <div
        class="flex items-center justify-between mb-4 sm:mb-6 pb-4"
      >
        <div class="text-xs sm:text-sm text-[#1D2B29] font-medium">
          <span v-if="schools.length > 0 && pagination.total > 0">
            Showing {{ pagination.from }} - {{ pagination.to }} of {{ pagination.total }} result{{
              pagination.total !== 1 ? "s" : ""
            }}
          </span>
          <span v-else-if="loading"> Loading... </span>
          <span v-else> No results found </span>
        </div>
      </div>

      <div
        v-if="loading"
        class="flex justify-center items-center py-8 sm:py-12"
      >
        <div
          class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"
        ></div>
      </div>

      <div v-else class="rounded-lg">
        <EmptyState
          v-if="schools.length === 0"
          title="Tidak ada sekolah ditemukan"
          description="Coba ubah filter pencarian Anda"
          icon="search"
        />

        <div v-else>
          <div
            class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 mb-6 sm:mb-8"
          >
            <SchoolCard
              v-for="school in schools"
              :key="school.id"
              :school="school"
            />
          </div>
        </div>
      </div>

      <Pagination
        v-if="!loading && schools.length > 0"
        :current-page="pagination.currentPage"
        :total-pages="pagination.lastPage"
        @change-page="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";

import StatusFilterCards from "@/components/school/StatusFilterCards.vue";
import LocationFilters from "@/components/school/LocationFilters.vue";
import Pagination from "@/components/school/Pagination.vue";
import EmptyState from "@/components/school/EmptyState.vue";
import SchoolCard from "@/components/shared/SchoolCard.vue";

import IconSd from "@/assets/IconSd2.vue";
import SmpIcon from "@/assets/IconSmp2.vue";
import SmaIcon from "@/assets/IconSma2.vue";
import SmkIcon from "@/assets/IconSmk2.vue";
import UniversitasIcon from "@/assets/IconKuliah2.vue";

const route = useRoute();
const router = useRouter();

const level = route.params.level || "sd";

const schools = ref([]);
const statusList = ref([]);
const provinceList = ref([]);
const districtList = ref([]);
const subDistrictList = ref([]);
const loading = ref(false);

const selectedStatus = ref(route.query.status || "");
const selectedProvince = ref(route.query.provinceName || "");
const selectedDistrict = ref(route.query.districtName || "");
const selectedSubDistrict = ref(route.query.subDistrictName || "");

const showLocationFilters = ref(false);

const pagination = ref({
  currentPage: 1,
  lastPage: 1,
  limit: 12,
  total: 0,
  from: 0,
  to: 0,
});

const getLevelTitle = (levelParam) => {
  const titles = {
    sd: "Sekolah Dasar",
    smp: "Sekolah Menengah Pertama",
    sma: "Sekolah Menengah Akhir",
    smk: "Sekolah Menengah Kejuruan",
    universitas: "Universitas",
  };
  return titles[levelParam] || levelParam;
};

const fetchSchoolsByLevel = async () => {
  try {
    loading.value = true;
    const query = {
      educationLevelName: level,
      page: pagination.value.currentPage,
      limit: pagination.value.limit,
    };

    if (selectedStatus.value) query.statusName = selectedStatus.value;
    if (selectedProvince.value) query.provinceName = selectedProvince.value;
    if (selectedDistrict.value) query.districtName = selectedDistrict.value;
    if (selectedSubDistrict.value)
      query.subDistrictName = selectedSubDistrict.value;

    Object.keys(query).forEach((key) => {
      if (!query[key]) delete query[key];
    });

    const response = await axios.get("/school-details", { params: query });
    schools.value = response.data.data.datas || [];

    if (response.data.data.meta) {
      const meta = response.data.data.meta;
      pagination.value = {
        currentPage: meta.current_page,
        lastPage: meta.last_page,
        limit: meta.limit,
        total: meta.total,
        from: meta.current_page * meta.limit - meta.limit + 1,
        to: Math.min(meta.current_page * meta.limit, meta.total),
      };
    }
  } catch (error) {
    console.error("Error fetching schools:", error);
    schools.value = [];
  } finally {
    loading.value = false;
  }
};

const fetchFilters = async () => {
  try {
    const [statusResponse, provinceResponse] = await Promise.all([
      axios.get("/school-status"),
      axios.get("/provinces"),
    ]);
    statusList.value = statusResponse.data.data || [];
    provinceList.value = provinceResponse.data.data || [];
  } catch (error) {
    console.error("Error fetching filters:", error);
  }
};

const fetchDistrictsByProvince = async () => {
  if (selectedProvince.value) {
    try {
      const response = await axios.get("/districts", {
        params: { provinceName: selectedProvince.value },
      });
      districtList.value = response.data.data;
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  } else {
    districtList.value = [];
    selectedDistrict.value = "";
    selectedSubDistrict.value = "";
  }
};

const fetchSubDistrictsByDistrict = async () => {
  if (selectedDistrict.value) {
    try {
      const response = await axios.get("/sub-districts", {
        params: { districtName: selectedDistrict.value },
      });
      subDistrictList.value = response.data.data;
    } catch (error) {
      console.error("Error fetching sub-districts:", error);
    }
  } else {
    subDistrictList.value = [];
    selectedSubDistrict.value = "";
  }
};

const applyStatusFilter = (status) => {
  selectedStatus.value = status;
  pagination.value.currentPage = 1;
  showLocationFilters.value = false;

  const query = { status: status };
  router.push({
    path: `/schools/${level}`,
    query: query,
  });

  fetchSchoolsByLevel();
};

const changePage = (page) => {
  if (
    page >= 1 &&
    page <= pagination.value.lastPage &&
    page !== pagination.value.currentPage
  ) {
    pagination.value.currentPage = page;
    fetchSchoolsByLevel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

watch(
  () => selectedProvince.value,
  () => {
    fetchDistrictsByProvince();
    if (selectedStatus.value) {
      pagination.value.currentPage = 1;

      const query = { status: selectedStatus.value };
      if (selectedProvince.value) query.provinceName = selectedProvince.value;

      router.push({
        path: `/schools/${level}`,
        query: query,
      });

      fetchSchoolsByLevel();
    }
  }
);

watch(
  () => selectedDistrict.value,
  () => {
    fetchSubDistrictsByDistrict();
    if (selectedStatus.value) {
      pagination.value.currentPage = 1;

      const query = { status: selectedStatus.value };
      if (selectedProvince.value) query.provinceName = selectedProvince.value;
      if (selectedDistrict.value) query.districtName = selectedDistrict.value;

      router.push({
        path: `/schools/${level}`,
        query: query,
      });

      fetchSchoolsByLevel();
    }
  }
);

watch(
  () => selectedSubDistrict.value,
  () => {
    if (selectedStatus.value) {
      pagination.value.currentPage = 1;

      const query = { status: selectedStatus.value };
      if (selectedProvince.value) query.provinceName = selectedProvince.value;
      if (selectedDistrict.value) query.districtName = selectedDistrict.value;
      if (selectedSubDistrict.value)
        query.subDistrictName = selectedSubDistrict.value;

      router.push({
        path: `/schools/${level}`,
        query: query,
      });

      fetchSchoolsByLevel();
    }
  }
);

watch(
  () => route.query,
  (newQuery) => {
    selectedStatus.value = newQuery.status || "";
    selectedProvince.value = newQuery.provinceName || "";
    selectedDistrict.value = newQuery.districtName || "";
    selectedSubDistrict.value = newQuery.subDistrictName || "";
    
    if (selectedStatus.value) {
      showLocationFilters.value = true;
    } else {
      showLocationFilters.value = false;
    }
    
    pagination.value.currentPage = 1;
    fetchSchoolsByLevel();
  },
  { deep: true }
);

onMounted(() => {
  if (route.query.status) {
    selectedStatus.value = route.query.status;
    showLocationFilters.value = true;
  }
  if (route.query.provinceName)
    selectedProvince.value = route.query.provinceName;
  if (route.query.districtName)
    selectedDistrict.value = route.query.districtName;
  if (route.query.subDistrictName)
    selectedSubDistrict.value = route.query.subDistrictName;

  fetchFilters();
  fetchSchoolsByLevel();
});
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>