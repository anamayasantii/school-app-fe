<template>
  <DashboardLayout>
  <div class="max-w-5xl mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Tambah Sekolah</h1>
      <p class="text-gray-600">Lengkapi form di bawah untuk menambahkan sekolah baru</p>
    </div>

    <!-- Toast Notification -->
    <div v-if="toastMessage" class="fixed top-4 right-4 z-50 bg-white border rounded-lg shadow-lg p-4 max-w-md animate-in slide-in-from-top-5">
      <div class="flex items-start gap-3">
        <div class="flex-1">
          <h3 class="font-semibold" :class="toastVariant === 'destructive' ? 'text-red-600' : 'text-green-600'">
            {{ toastTitle }}
          </h3>
          <p class="text-sm text-gray-600 mt-1">{{ toastMessage }}</p>
        </div>
        <button @click="toastMessage = ''" class="text-gray-400 hover:text-gray-600">
          <X class="h-4 w-4" />
        </button>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-lg font-semibold mb-4">Informasi Dasar</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label for="name">Nama Sekolah *</Label>
            <Input id="name" v-model="formData.name" required />
          </div>

          <div>
            <Label for="institutionCode">Kode Institusi *</Label>
            <Input id="institutionCode" v-model="formData.institutionCode" required />
          </div>

          <div>
            <Label for="schoolId">Sekolah Induk</Label>
            <Select v-model="formData.schoolId">
              <SelectTrigger>
                <SelectValue placeholder="Pilih sekolah induk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="school in schools" :key="school.id" :value="school.id.toString()">
                  {{ school.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="statusId">Status Sekolah *</Label>
            <Select v-model="formData.statusId" required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="status in statuses" :key="status.id" :value="status.id.toString()">
                  {{ status.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="educationLevelId">Jenjang Pendidikan *</Label>
            <Select v-model="formData.educationLevelId" required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenjang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="level in educationLevels" :key="level.id" :value="level.id.toString()">
                  {{ level.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="ownershipStatus">Status Kepemilikan *</Label>
            <Input id="ownershipStatus" v-model="formData.ownershipStatus" placeholder="Contoh: Negeri, Swasta" required />
          </div>

          <div>
            <Label for="principal">Kepala Sekolah *</Label>
            <Input id="principal" v-model="formData.principal" required />
          </div>

          <div>
            <Label for="operator">Operator</Label>
            <Input id="operator" v-model="formData.operator" />
          </div>

          <div>
            <Label for="curriculum">Kurikulum *</Label>
            <Input id="curriculum" v-model="formData.curriculum" placeholder="Contoh: Kurikulum Merdeka" required />
          </div>

          <div>
            <Label for="accreditationId">Akreditasi *</Label>
            <Select v-model="formData.accreditationId" required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih akreditasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="acc in accreditations" :key="acc.id" :value="acc.id.toString()">
                  {{ acc.code }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <!-- Legal & Operational -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-lg font-semibold mb-4">Informasi Legal & Operasional</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label for="dateEstablishmentDecree">Tanggal SK Pendirian</Label>
            <Input id="dateEstablishmentDecree" type="date" v-model="formData.dateEstablishmentDecree" />
          </div>

          <div>
            <Label for="operationalLicense">Nomor Izin Operasional</Label>
            <Input id="operationalLicense" v-model="formData.operationalLicense" />
          </div>

          <div>
            <Label for="dateOperationalLicense">Tanggal Izin Operasional</Label>
            <Input id="dateOperationalLicense" type="date" v-model="formData.dateOperationalLicense" />
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-lg font-semibold mb-4">Statistik</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label for="numStudent">Jumlah Siswa</Label>
            <Input id="numStudent" type="number" v-model="formData.numStudent" />
          </div>

          <div>
            <Label for="numTeacher">Jumlah Guru</Label>
            <Input id="numTeacher" type="number" v-model="formData.numTeacher" />
          </div>

          <div>
            <Label for="tuitionFee">Biaya SPP</Label>
            <Input id="tuitionFee" v-model="formData.tuitionFee" placeholder="0" />
          </div>
        </div>
      </div>

      <!-- Facilities -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-lg font-semibold mb-4">Fasilitas</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div v-for="facility in facilities" :key="facility.id" class="flex items-center space-x-2">
            <input 
              type="checkbox"
              :id="`facility-${facility.id}`" 
              :checked="formData.facilityIds.includes(facility.id)"
              @change="(e) => handleFacilityChange(facility.id, e.target.checked)"
              class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
            />
            <Label :for="`facility-${facility.id}`" class="cursor-pointer">
              {{ facility.name }}
            </Label>
          </div>
        </div>
      </div>

      <!-- Contacts -->
      <div class="bg-white p-6 rounded-lg border">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Kontak</h2>
          <Button type="button" @click="addContact" variant="outline" size="sm">
            <Plus class="h-4 w-4 mr-2" />
            Tambah Kontak
          </Button>
        </div>
        <div class="space-y-3">
          <div v-for="(contact, index) in formData.contacts" :key="index" class="flex gap-2">
            <Select v-model="contact.type">
              <SelectTrigger class="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="type in contactTypes" :key="type" :value="type">
                  {{ type }}
                </SelectItem>
              </SelectContent>
            </Select>
            <Input v-model="contact.value" placeholder="Masukkan nilai kontak" class="flex-1" />
            <Button type="button" variant="destructive" size="icon" @click="removeContact(index)">
              <X class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <!-- Media -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-lg font-semibold mb-4">Media</h2>
        <div class="space-y-4">
          <div>
            <Label>Gambar Sekolah *</Label>
            <div class="mt-2">
              <label class="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div class="flex flex-col items-center">
                  <Loader2 v-if="uploading" class="h-8 w-8 animate-spin text-gray-400" />
                  <template v-else>
                    <Upload class="h-8 w-8 text-gray-400" />
                    <span class="mt-2 text-sm text-gray-600">Upload gambar</span>
                  </template>
                </div>
                <input type="file" multiple accept="image/*" class="hidden" @change="handleFileUpload" :disabled="uploading" />
              </label>
            </div>
            <div v-if="formData.imageUrl.length > 0" class="mt-3 space-y-2">
              <div v-for="(url, index) in formData.imageUrl" :key="index" class="flex items-center gap-2 p-2 border rounded">
                <img :src="url" :alt="`Preview ${index + 1}`" class="h-12 w-12 object-cover rounded" />
                <span class="flex-1 text-sm truncate">{{ url }}</span>
                <Button type="button" variant="ghost" size="icon" @click="removeImage(index)">
                  <X class="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label for="movie">URL Video</Label>
            <Input id="movie" v-model="formData.movie" placeholder="https://example.com/video.mp4" />
          </div>
        </div>
      </div>

      <!-- Address -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-lg font-semibold mb-4">Alamat</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label for="provinceId">Provinsi *</Label>
            <Select v-model="formData.address.provinceId" required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih provinsi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="province in provinces" :key="province.id" :value="province.id.toString()">
                  {{ province.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="districtId">Kabupaten *</Label>
            <Select v-model="formData.address.districtId" :disabled="!formData.address.provinceId" required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kabupaten" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="district in districts" :key="district.id" :value="district.id.toString()">
                  {{ district.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="subDistrictId">Kecamatan *</Label>
            <Select v-model="formData.address.subDistrictId" :disabled="!formData.address.districtId" required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kecamatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="subDistrict in subDistricts" :key="subDistrict.id" :value="subDistrict.id.toString()">
                  {{ subDistrict.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="village">Kelurahan/Desa</Label>
            <Input id="village" v-model="formData.address.village" />
          </div>

          <div class="md:col-span-2">
            <Label for="street">Jalan</Label>
            <Input id="street" v-model="formData.address.street" />
          </div>

          <div>
            <Label for="postalCode">Kode Pos</Label>
            <Input id="postalCode" v-model="formData.address.postalCode" />
          </div>

          <div>
            <Label for="latitude">Latitude</Label>
            <Input id="latitude" v-model="formData.address.latitude" placeholder="-8.6705" />
          </div>

          <div>
            <Label for="longitude">Longitude</Label>
            <Input id="longitude" v-model="formData.address.longitude" placeholder="115.2126" />
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-lg font-semibold mb-4">Informasi Tambahan</h2>
        <div class="space-y-4">
          <div>
            <Label for="examInfo">Informasi Ujian</Label>
            <textarea 
              id="examInfo" 
              v-model="formData.examInfo" 
              rows="3"
              class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            ></textarea>
          </div>

          <div class="flex items-center space-x-2">
            <input 
              type="checkbox"
              id="isRecommended" 
              :checked="formData.isRecommended === 1" 
              @change="(e) => formData.isRecommended = e.target.checked ? 1 : 0"
              class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
            />
            <Label for="isRecommended" class="cursor-pointer">Sekolah Rekomendasi</Label>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <Button type="button" variant="outline" @click="navigateTo('/dashboard/school-lists')">
          Batal
        </Button>
        <Button type="submit" :disabled="loading">
          <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
          Simpan
        </Button>
      </div>
    </form>
  </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from '@/lib/axios'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Plus, X, Upload } from 'lucide-vue-next'
import DashboardLayout from '~/layouts/dashboardLayout.vue'

// definePageMeta({
//   layout: 'dashboardLayout'
// })

const loading = ref(false)
const uploading = ref(false)

// Toast state
const toastMessage = ref('')
const toastTitle = ref('')
const toastVariant = ref('default')

const showToast = (title, message, variant = 'default') => {
  toastTitle.value = title
  toastMessage.value = message
  toastVariant.value = variant
  
  setTimeout(() => {
    toastMessage.value = ''
  }, 5000)
}

// Dropdown data
const schools = ref([])
const statuses = ref([])
const educationLevels = ref([])
const accreditations = ref([])
const facilities = ref([])
const provinces = ref([])
const districts = ref([])
const subDistricts = ref([])

const contactTypes = ['phone', 'email', 'website', 'whatsapp', 'facebook', 'instagram', 'other']

// Form state
const formData = ref({
  name: '',
  institutionCode: '',
  schoolId: '',
  statusId: '',
  educationLevelId: '',
  ownershipStatus: '',
  dateEstablishmentDecree: '',
  operationalLicense: '',
  dateOperationalLicense: '',
  principal: '',
  operator: '',
  accreditationId: '',
  curriculum: '',
  facilityIds: [],
  contacts: [],
  tuitionFee: '',
  numStudent: '',
  numTeacher: '',
  imageUrl: [],
  movie: '',
  examInfo: '',
  address: {
    provinceId: '',
    districtId: '',
    subDistrictId: '',
    village: '',
    street: '',
    postalCode: '',
    latitude: '',
    longitude: ''
  },
  isRecommended: 0
})

// Fetch dropdown data
onMounted(async () => {
  try {
    const [
      schoolsRes,
      statusesRes,
      levelsRes,
      accreditationsRes,
      facilitiesRes,
      provincesRes
    ] = await Promise.all([
      axios.get('/schools'),
      axios.get('/school-status'),
      axios.get('/education-levels'),
      axios.get('/accreditations'),
      axios.get('/facilities'),
      axios.get('/provinces')
    ])

    schools.value = schoolsRes.data.data
    statuses.value = statusesRes.data.data
    educationLevels.value = levelsRes.data.data
    accreditations.value = accreditationsRes.data.data
    facilities.value = facilitiesRes.data.data
    provinces.value = provincesRes.data.data
  } catch (error) {
    showToast('Error', 'Gagal memuat data dropdown', 'destructive')
  }
})

// Watch province changes
watch(() => formData.value.address.provinceId, async (newVal) => {
  if (!newVal) {
    districts.value = []
    subDistricts.value = []
    return
  }

  try {
    const selectedProvince = provinces.value.find(p => p.id.toString() === newVal)
    if (!selectedProvince) return

    const response = await axios.get('/districts', {
      params: { provinceName: selectedProvince.name }
    })
    districts.value = response.data.data
    subDistricts.value = []
    formData.value.address.districtId = ''
    formData.value.address.subDistrictId = ''
  } catch (error) {
    showToast('Error', 'Gagal memuat data kabupaten', 'destructive')
  }
})

// Watch district changes
watch(() => formData.value.address.districtId, async (newVal) => {
  if (!newVal) {
    subDistricts.value = []
    return
  }

  try {
    const selectedDistrict = districts.value.find(d => d.id.toString() === newVal)
    if (!selectedDistrict) return

    const response = await axios.get('/sub-districts', {
      params: { districtName: selectedDistrict.name }
    })
    subDistricts.value = response.data.data
    formData.value.address.subDistrictId = ''
  } catch (error) {
    showToast('Error', 'Gagal memuat data kecamatan', 'destructive')
  }
})

// Handle file upload
const handleFileUpload = async (e) => {
  const token = Cookies.get('token')

  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  uploading.value = true;
  const formDataUpload = new FormData();
  files.forEach((file) => {
    formDataUpload.append("files[]", file);
  });

  try {
    const response = await axios.post("/upload", formDataUpload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
    });

    const urls = response.data.data.urls;
    formData.value.imageUrl = [...formData.value.imageUrl, ...urls];

    showToast("Success", "Gambar berhasil diupload");
  } catch (error) {
    showToast("Error", "Gagal upload gambar", "destructive");
  } finally {
    uploading.value = false;
  }
};

// Add contact
const addContact = () => {
  formData.value.contacts.push({ type: 'phone', value: '' })
}

// Remove contact
const removeContact = (index) => {
  formData.value.contacts.splice(index, 1)
}

// Remove image
const removeImage = (index) => {
  formData.value.imageUrl.splice(index, 1)
}

// Handle facility checkbox
const handleFacilityChange = (facilityId, checked) => {
  if (checked) {
    formData.value.facilityIds.push(facilityId)
  } else {
    const index = formData.value.facilityIds.indexOf(facilityId)
    if (index > -1) {
      formData.value.facilityIds.splice(index, 1)
    }
  }
}

// Handle submit
const handleSubmit = async () => {
  const token = Cookies.get('token')
  loading.value = true

  try {
    const payload = {
      ...formData.value,
      schoolId: formData.value.schoolId || null,
      statusId: formData.value.statusId || null,
      educationLevelId: formData.value.educationLevelId || null,
      accreditationId: formData.value.accreditationId || null,
      facilityIds: formData.value.facilityIds.length > 0 ? formData.value.facilityIds : null,
      contacts: formData.value.contacts.length > 0 ? formData.value.contacts : null,
      tuitionFee: formData.value.tuitionFee || null,
      numStudent: formData.value.numStudent ? parseInt(formData.value.numStudent) : null,
      numTeacher: formData.value.numTeacher ? parseInt(formData.value.numTeacher) : null,
      movie: formData.value.movie || null,
      examInfo: formData.value.examInfo || null,
      operator: formData.value.operator || null,
      dateEstablishmentDecree: formData.value.dateEstablishmentDecree || null,
      operationalLicense: formData.value.operationalLicense || null,
      dateOperationalLicense: formData.value.dateOperationalLicense || null,
      address: {
        ...formData.value.address,
        village: formData.value.address.village || null,
        street: formData.value.address.street || null,
        postalCode: formData.value.address.postalCode || null,
        latitude: formData.value.address.latitude || null,
        longitude: formData.value.address.longitude || null
      },
      isRecommended: formData.value.isRecommended ? 1 : 0
    }

    await axios.post('/school-details', payload, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    showToast('Success', 'Sekolah berhasil ditambahkan')

    setTimeout(() => {
      navigateTo('/dashboard/school-lists')
    }, 1500)
  } catch (error) {
    showToast('Error', error.response?.data?.message || 'Gagal menambahkan sekolah', 'destructive')
  } finally {
    loading.value = false
  }
}
</script>