<template>
  <div>
    <section class="bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RankingHeader/>
      </div>
    </section>

    <section class="bg-bg-light">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RankingFilters
          :filters="filters"
          @update-filters="handleFiltersUpdate"
          :active-tab="activeTab"
          @change-education-level="handleEducationLevelChange"
        />

        <RankingList
          :schools="schools"
          :is-loading="isLoading"
          :current-education="activeTab"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/lib/axios";
import RankingHeader from "./RankingHeader.vue";
import RankingFilters from "./RankingFilters.vue";
import RankingList from "./RankingList.vue";

const schools = ref([]);
const isLoading = ref(false);
const activeTab = ref("sd");

const filters = ref({
  educationLevel: "sd",
  province: "",
  district: "",
  subDistrict: "",
  page: 1,
});

const handleEducationLevelChange = (level) => {
  activeTab.value = level;
  filters.value.educationLevel = level;
  filters.value.province = "";
  filters.value.district = "";
  filters.value.subDistrict = "";
  fetchSchools();
};

const handleFiltersUpdate = (newFilters) => {
  filters.value = { ...filters.value, ...newFilters };
  fetchSchools();
};

const fetchSchools = async () => {
  isLoading.value = true;

  try {
    const params = {
      page: filters.value.page,
      educationLevelName: filters.value.educationLevel,
    };

    if (filters.value.province) {
      params.provinceName = filters.value.province;
    }
    if (filters.value.district) {
      params.districtName = filters.value.district;
    }
    if (filters.value.subDistrict) {
      params.subDistrictName = filters.value.subDistrict;
    }

    const response = await axios.get("/ranking/school-details", { params });

    if (response.data.status === "success") {
      schools.value = response.data.data.slice(0, 8);
    } else {
      schools.value = [];
      console.error("API Error:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching schools:", error);
    schools.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSchools();
});
</script>
