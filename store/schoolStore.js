import { defineStore } from 'pinia';
import axios from '@/lib/axios';

export const useSchoolStore = defineStore('school', {
    state: () => ({
        schools: [],
        selectedSchool: null,
    }),
    actions: {
        async getSchoolData() {
            try {
                const response = await axios.get('/school-details');
                console.log('SEKOLAH:', response.data);
                this.schools = response.data.data;
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        }
    }
})