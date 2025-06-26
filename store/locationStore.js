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
                console.log('PROVINSI:', response.data);
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
                const response = await axios.get('/provinces/' + provinceId + '/districts');
                console.log('KABUPATEN:', response.data);
                this.districts = response.data.data;
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        },
        // Load sub-districts by district ID
        async loadSubDistricts(districtId) {
            if (!districtId) {
                this.subDistricts = [];
                this.schools = [];
                this.selectedSubDistrict = null;
                this.selectedSchool = null;
                return;
            }
            try {
                const response = await axios.get('/districts/' + districtId + '/sub-districts');
                console.log('KECAMATAN:', response.data);
                this.subDistricts = response.data.data;
            } catch (error) {
                console.error('Error fetching sub-districts:', error);
            }
        },
        // Load schools by sub-district ID
        async loadSchools(subDistrictId) {
            if (!subDistrictId) {
                this.schools = [];
                this.selectedSchool = null;
                return;
            }
            try {
                const response = await axios.get('/sub-districts/' + subDistrictId + '/school-details');
                console.log('SEKOLAH:', response.data);
                this.schools = response.data.data;
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        },
    },
});
