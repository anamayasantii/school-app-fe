import { defineStore } from 'pinia';
import axios from '@/lib/axios';

// Updated base URL

export const useLocationStore = defineStore('location', {
    state: () => ({
        provinces: [],
        districts: [],
        subDistricts: [],
        schools: [],
        selectedProvince: null,
        selectedDistrict: null,
        selectedSubDistrict: null,
        selectedSchool: null,
    }),
    actions: {
        // Load provinces
        async loadProvinces() {
            try {
                const response = await axios.get('/provinces');
                //const result = await response.json();
                console.log('Provinces:', response.data.data);
                this.provinces = response.data.data;
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        },
        // Load districts by province ID
        async loadDistricts(provinceId) {
            if (!provinceId) {
                this.districts = [];
                this.subDistricts = [];
                this.schools = [];
                this.selectedDistrict = null;
                this.selectedSubDistrict = null;
                this.selectedSchool = null;
                return;
            }
            try {
                const response = await axios.get(baseUrl + 'provinces/' + provinceId + '/districts');
                console.log('KABUPATEN:', response.data.data);
                this.districts = response.data;
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        },
        // Load sub-districts by district ID
        async loadSubDistrict(districtId) {
            if (!districtId) {
                this.subDistricts = [];
                this.schools = [];
                this.selectedSubDistrict = null;
                this.selectedSchool = null;
                return;
            }
            try {
                const response = await axios.get(baseUrl + 'districts/' + districtId + '/sub-districts');
                this.subDistricts = response.data;
            } catch (error) {
                console.error('Error fetching sub-districts:', error);
            }
        },
        // Load schools by sub-district ID
        async loadSchool(subDistrictId) {
            if (!subDistrictId) {
                this.schools = [];
                this.selectedSchool = null;
                return;
            }
            try {
                const response = await axios.get(baseUrl + 'sub-districts/' + subDistrictId + '/school-details');
                this.schools = response.data;
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        },
    },
});
