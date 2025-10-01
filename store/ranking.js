import { defineStore } from 'pinia'
import axios from '@/lib/axios'

export const useRankingStore = defineStore('ranking', {
  state: () => ({
    // Schools data
    schools: [],
    isLoading: false,
    error: null,

    // Filters
    filters: {
      educationLevel: 'sd',
      province: '',
      regency: '',
      district: '',
      page: 1
    },

    // Filter options
    provinces: [],
    regencies: [],
    districts: []
  }),

  actions: {
    // Set education level and fetch schools
    async setEducationLevel(level) {
      this.filters.educationLevel = level
      // Reset location filters when changing education level
      this.filters.province = ''
      this.filters.regency = ''
      this.filters.district = ''
      await this.fetchSchools()
    },

    // Fetch schools based on current filters
    async fetchSchools() {
      this.isLoading = true
      this.error = null

      try {
        const params = {
          page: this.filters.page,
          educationLevelName: this.filters.educationLevel
        }

        // Add location filters if selected
        if (this.filters.province) {
          params.provinceName = this.filters.province
        }
        if (this.filters.regency) {
          params.districtName = this.filters.regency
        }
        if (this.filters.district) {
          params.subDistrictName = this.filters.district
        }

        const response = await axios.get('/ranking/school-details', { params })

        if (response.data.status === 'success') {
          // Limit to top 8 schools
          this.schools = response.data.data.slice(0, 8)
        } else {
          this.schools = []
          this.error = 'Failed to fetch schools'
        }
      } catch (error) {
        console.error('Error fetching schools:', error)
        this.schools = []
        this.error = error.message || 'An error occurred while fetching schools'
      } finally {
        this.isLoading = false
      }
    },

    // Fetch provinces (replace with actual API call)
    async fetchProvinces() {
      try {
        // Replace with actual API call
        // const response = await axios.get('/locations/provinces')
        // this.provinces = response.data.data
        
        // Sample data for now
        this.provinces = [
          { id: 1, name: 'Bali' },
          { id: 2, name: 'Jakarta' },
          { id: 3, name: 'Jawa Barat' },
          { id: 4, name: 'Jawa Timur' },
          { id: 5, name: 'Sumatera Utara' }
        ]
      } catch (error) {
        console.error('Error fetching provinces:', error)
        this.provinces = []
      }
    },

    // Fetch regencies based on province (replace with actual API call)
    async fetchRegencies(provinceName) {
      try {
        // Replace with actual API call
        // const response = await axios.get(`/locations/regencies/${provinceName}`)
        // this.regencies = response.data.data

        // Sample data for now
        const regencyData = {
          'Bali': [
            { id: 1, name: 'Badung' },
            { id: 2, name: 'Denpasar' },
            { id: 3, name: 'Gianyar' },
            { id: 4, name: 'Tabanan' }
          ],
          'Jakarta': [
            { id: 5, name: 'Jakarta Pusat' },
            { id: 6, name: 'Jakarta Selatan' },
            { id: 7, name: 'Jakarta Barat' },
            { id: 8, name: 'Jakarta Utara' }
          ]
        }
        
        this.regencies = regencyData[provinceName] || []
      } catch (error) {
        console.error('Error fetching regencies:', error)
        this.regencies = []
      }
    },

    // Fetch districts based on regency (replace with actual API call)
    async fetchDistricts(regencyName) {
      try {
        // Replace with actual API call
        // const response = await axios.get(`/locations/districts/${regencyName}`)
        // this.districts = response.data.data

        // Sample data for now
        const districtData = {
          'Badung': [
            { id: 1, name: 'Kuta' },
            { id: 2, name: 'Mengwi' },
            { id: 3, name: 'Abiansemal' }
          ],
          'Denpasar': [
            { id: 4, name: 'Denpasar Selatan' },
            { id: 5, name: 'Denpasar Barat' },
            { id: 6, name: 'Denpasar Timur' }
          ]
        }

        this.districts = districtData[regencyName] || []
      } catch (error) {
        console.error('Error fetching districts:', error)
        this.districts = []
      }
    },

    // Reset all filters
    resetFilters() {
      this.filters = {
        educationLevel: 'sd',
        province: '',
        regency: '',
        district: '',
        page: 1
      }
      this.schools = []
      this.regencies = []
      this.districts = []
    }
  },

  getters: {
    // Get current education level name
    currentEducationName: (state) => {
      const names = {
        'sd': 'Elementary',
        'smp': 'Junior High',
        'sma': 'Senior High',
        'smk': 'Vocational',
        'universitas': 'University'
      }
      return names[state.filters.educationLevel] || 'School'
    },

    // Get total schools count
    totalSchools: (state) => state.schools.length,

    // Check if any filters are active
    hasActiveFilters: (state) => {
      return !!(state.filters.province || state.filters.regency || state.filters.district)
    }
  }
})