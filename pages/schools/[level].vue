<template>
  <div class="min-h-screen">
    <LocationModal
      :show="showLocationModal"
      :province-list="provinceList"
      @skip="skipLocationModal"
      @confirm="confirmLocation"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <nav class="mt-6 sm:mt-8 px-4 sm:px-6 font-medium">
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

      <template v-if="!hasFilters && !currentSection">
        <div class="p-4 sm:p-6">
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

          <StatusFilterCards
            v-if="
              !selectedStatus &&
              !currentSection &&
              !selectedProvince &&
              !selectedDistrict &&
              !selectedSubDistrict
            "
            :status-list="statusList"
            :selected-status="selectedStatus"
            @select="applyStatusFilter"
          />
        </div>

        <SchoolSection
          title="Rekomendasi"
          :schools="recommendationSchools"
          :loading="loadingRecommendations"
          @explore="exploreSection('recommendations')"
        />

        <SchoolSection
          title="Pilihan Teratas"
          :schools="topPicksSchools"
          :loading="loadingTopPicks"
          @explore="exploreSection('top-picks')"
        />

        <SchoolSection
          title="Dekat Dengan Anda"
          :schools="nearbySchools"
          :loading="loadingNearby"
          @explore="exploreSection('nearby')"
        />
      </template>

      <template v-else>
        <div class="p-4 sm:p-6">
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

          <StatusFilterCards
            v-if="
              !selectedStatus &&
              !currentSection &&
              !selectedProvince &&
              !selectedDistrict &&
              !selectedSubDistrict
            "
            :status-list="statusList"
            :selected-status="selectedStatus"
            @select="applyStatusFilter"
          />
        </div>

        <LocationFilters
          v-if="
            currentSection === 'nearby' ||
            selectedStatus ||
            selectedProvince ||
            selectedDistrict ||
            selectedSubDistrict
          "
          v-model:selected-province="selectedProvince"
          v-model:selected-district="selectedDistrict"
          v-model:selected-sub-district="selectedSubDistrict"
          :province-list="provinceList"
          :district-list="districtList"
          :sub-district-list="subDistrictList"
          :disabled="currentSection === 'nearby'"
          class="px-4 sm:px-6"
        />

        <div
          class="flex items-center justify-between mb-4 sm:mb-6 pb-4 px-4 sm:px-6"
        >
          <div class="text-xs sm:text-sm text-[#1D2B29] font-medium">
            <span v-if="schools.length > 0 && pagination.total > 0">
              Showing {{ pagination.to }} of {{ pagination.total }} result{{
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

        <div v-else class="rounded-lg p-4 sm:p-6">
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
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";

import LocationModal from "@/components/school/LocationModal.vue";
import StatusFilterCards from "@/components/school/StatusFilterCards.vue";
import LocationFilters from "@/components/school/LocationFilters.vue";
import SchoolSection from "@/components/school/SchoolSection.vue";
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

const showLocationModal = ref(false);

const recommendationSchools = ref([]);
const topPicksSchools = ref([]);
const nearbySchools = ref([]);
const loadingRecommendations = ref(false);
const loadingTopPicks = ref(false);
const loadingNearby = ref(false);

const currentSection = ref("");

const schools = ref([]);
const statusList = ref([]);
const provinceList = ref([]);
const districtList = ref([]);
const subDistrictList = ref([]);
const loading = ref(false);
const searchQuery = ref(route.query.search || "");

const selectedStatus = ref(route.query.status || "");
const selectedProvince = ref(route.query.province || "");
const selectedDistrict = ref(route.query.district || "");
const selectedSubDistrict = ref(route.query.subDistrict || "");

const userProvince = ref("");

const pagination = ref({
  currentPage: 1,
  lastPage: 1,
  limit: 12,
  total: 0,
  from: 0,
  to: 0,
});

const hasFilters = computed(() => {
  return !!(
    selectedStatus.value ||
    selectedProvince.value ||
    selectedDistrict.value ||
    selectedSubDistrict.value
  );
});

const getLevelTitle = (levelParam) => {
  const titles = {
    sd: "Sekolah Dasar",
    smp: "Sekolah Menengah Pertama",
    sma: "Sekolah Menengah Atas",
    smk: "Sekolah Menengah Kejuruan",
    universitas: "Universitas",
  };
  return titles[levelParam] || levelParam;
};

const skipLocationModal = () => {
  showLocationModal.value = false;
  userProvince.value = "";
  sessionStorage.setItem("locationModalShown", "true");
};

const confirmLocation = (province) => {
  if (province) {
    userProvince.value = province;
    showLocationModal.value = false;
    sessionStorage.setItem("locationModalShown", "true");
    sessionStorage.setItem("userProvince", province);
    fetchNearbySchools();
  }
};

const exploreSection = (section) => {
  currentSection.value = section;
  pagination.value.currentPage = 1;

  if (section === "recommendations") {
    router.push({
      path: `/schools/${level}`,
      query: {},
    });
    fetchAllRecommendations();
  } else if (section === "top-picks") {
    router.push({
      path: `/schools/${level}`,
      query: {},
    });
    fetchAllTopPicks();
  } else if (section === "nearby") {
    selectedProvince.value = userProvince.value;
    selectedDistrict.value = "";
    selectedSubDistrict.value = "";

    router.push({
      path: `/schools/${level}`,
      query: { provinceName: userProvince.value },
    });

    fetchAllNearby();
  }
};

const fetchRecommendations = async () => {
  try {
    loadingRecommendations.value = true;
    const response = await axios.get("/schools/recommendations");
    recommendationSchools.value = (response.data.data || []).slice(0, 3);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    recommendationSchools.value = [];
  } finally {
    loadingRecommendations.value = false;
  }
};

const fetchTopPicks = async () => {
  try {
    loadingTopPicks.value = true;
    const response = await axios.get("/ranking/school-details", {
      params: { educationLevelName: level },
    });
    topPicksSchools.value = (response.data.data || []).slice(0, 3);
  } catch (error) {
    console.error("Error fetching top picks:", error);
    topPicksSchools.value = [];
  } finally {
    loadingTopPicks.value = false;
  }
};

const fetchNearbySchools = async () => {
  try {
    loadingNearby.value = true;
    const params = {
      educationLevelName: level,
    };
    if (userProvince.value) {
      params.provinceName = userProvince.value;
    }
    const response = await axios.get("/school-details", { params });
    nearbySchools.value = (response.data.data.datas || []).slice(0, 3);
  } catch (error) {
    console.error("Error fetching nearby schools:", error);
    nearbySchools.value = [];
  } finally {
    loadingNearby.value = false;
  }
};

const fetchAllRecommendations = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/schools/recommendations");
    schools.value = response.data.data || [];
    pagination.value = {
      currentPage: 1,
      lastPage: 1,
      limit: schools.value.length,
      total: schools.value.length,
      from: 1,
      to: schools.value.length,
    };
  } catch (error) {
    console.error("Error fetching all recommendations:", error);
    schools.value = [];
  } finally {
    loading.value = false;
  }
};

const fetchAllTopPicks = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/ranking/school-details", {
      params: { educationLevelName: level },
    });
    schools.value = response.data.data || [];
    pagination.value = {
      currentPage: 1,
      lastPage: 1,
      limit: schools.value.length,
      total: schools.value.length,
      from: 1,
      to: schools.value.length,
    };
  } catch (error) {
    console.error("Error fetching all top picks:", error);
    schools.value = [];
  } finally {
    loading.value = false;
  }
};

const fetchAllNearby = async () => {
  try {
    loading.value = true;
    const params = {
      educationLevelName: level,
      page: pagination.value.currentPage,
      limit: pagination.value.limit,
    };

    if (selectedProvince.value) {
      params.provinceName = selectedProvince.value;
    }
    if (selectedDistrict.value) {
      params.districtName = selectedDistrict.value;
    }
    if (selectedSubDistrict.value) {
      params.subDistrictName = selectedSubDistrict.value;
    }

    const response = await axios.get("/school-details", { params });
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
    console.error("Error fetching all nearby schools:", error);
    schools.value = [];
  } finally {
    loading.value = false;
  }
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
    if (searchQuery.value) query.search = searchQuery.value;

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
  currentSection.value = "";

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

    if (currentSection.value === "nearby") {
      fetchAllNearby();
    } else {
      fetchSchoolsByLevel();
    }
  }
};

watch(
  () => selectedProvince.value,
  () => {
    fetchDistrictsByProvince();
    if (hasFilters.value || currentSection.value === "nearby") {
      pagination.value.currentPage = 1;

      const query = {};
      if (selectedProvince.value) query.provinceName = selectedProvince.value;
      if (selectedStatus.value) query.status = selectedStatus.value;

      router.push({
        path: `/schools/${level}`,
        query: query,
      });

      if (currentSection.value === "nearby") {
        fetchAllNearby();
      } else {
        fetchSchoolsByLevel();
      }
    }
  }
);

watch(
  () => selectedDistrict.value,
  () => {
    fetchSubDistrictsByDistrict();
    if (hasFilters.value || currentSection.value === "nearby") {
      pagination.value.currentPage = 1;

      const query = {};
      if (selectedProvince.value) query.provinceName = selectedProvince.value;
      if (selectedDistrict.value) query.districtName = selectedDistrict.value;
      if (selectedStatus.value) query.status = selectedStatus.value;

      router.push({
        path: `/schools/${level}`,
        query: query,
      });

      if (currentSection.value === "nearby") {
        fetchAllNearby();
      } else {
        fetchSchoolsByLevel();
      }
    }
  }
);

watch(
  () => selectedSubDistrict.value,
  () => {
    if (hasFilters.value || currentSection.value === "nearby") {
      pagination.value.currentPage = 1;

      const query = {};
      if (selectedProvince.value) query.provinceName = selectedProvince.value;
      if (selectedDistrict.value) query.districtName = selectedDistrict.value;
      if (selectedSubDistrict.value)
        query.subDistrictName = selectedSubDistrict.value;
      if (selectedStatus.value) query.status = selectedStatus.value;

      router.push({
        path: `/schools/${level}`,
        query: query,
      });

      if (currentSection.value === "nearby") {
        fetchAllNearby();
      } else {
        fetchSchoolsByLevel();
      }
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

    if (
      selectedStatus.value ||
      selectedProvince.value ||
      selectedDistrict.value ||
      selectedSubDistrict.value
    ) {
      currentSection.value = "";
      fetchSchoolsByLevel();
    } else {
      currentSection.value = "";
      schools.value = [];
    }
  },
  { deep: true }
);

onMounted(() => {
  const modalShown = sessionStorage.getItem("locationModalShown");
  const savedProvince = sessionStorage.getItem("userProvince");

  console.log("Modal shown:", modalShown); 
  console.log("Saved province:", savedProvince); 

  if (!modalShown) {
    showLocationModal.value = true;
  } else if (savedProvince) {
    userProvince.value = savedProvince;
  }

  if (route.query.status) selectedStatus.value = route.query.status;
  if (route.query.provinceName)
    selectedProvince.value = route.query.provinceName;
  if (route.query.districtName)
    selectedDistrict.value = route.query.districtName;
  if (route.query.subDistrictName)
    selectedSubDistrict.value = route.query.subDistrictName;

  fetchFilters();
  fetchRecommendations();
  fetchTopPicks();

  if (userProvince.value) {
    fetchNearbySchools();
  }
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
</style>
