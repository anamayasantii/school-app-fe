<script>
export const description = 'A sign up form with first name, last name, email, and password inside a card. There\'s an option to sign up with GitHub and a link to login if you already have an account'

export const iframeHeight = '600px'
export const containerClass = 'w-full h-screen flex items-center justify-center px-4'
</script>

<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { ref, onMounted } from 'vue';
import { useLocationStore } from '@/store/locationStore';

const signupData = ref({
  role: "", // 'student' or 'parent'
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  konfirmasi_password: "",
  gender: "", // 'perempuan' or 'laki-laki'
  nomorInduk: "",
  phoneNumber: "",
  childName: "",
  childNomorInduk: "",
  province: "",
  district: "",
  subdistrict: "",
  school: ""
});


const selectedPeran = ref('');

const setPeran = (role) => {
  selectedPeran.value = role;
  signupData.value.role = role === 'student' ? 'student' : 'parent'; // Set role based on selected value
  console.log(selectedPeran.value) // Cek nilai yang dipilih (misalnya 'orangtua' atau 'siswa')
}

const passwordMessages = reactive({
  length: "none",      // Pesan untuk panjang password
  capital: "none",     // Pesan untuk huruf kapital
  symbol: "none",      // Pesan untuk simbol
});

const confirmPasswordDoesNotMatch = ref("none");
const confirmPasswordMatch = ref("none");

// Fungsi untuk validasi password
const passwordCheck = () => {
  const password = signupData.value.password;

  // Reset pesan jika password kosong
  if (password === "") {
    passwordMessages.length = "none";
    passwordMessages.capital = "none";
    passwordMessages.symbol = "none";
    return;
  }

  // Validasi panjang minimal 8 karakter
  passwordMessages.length = password.length < 8 ? "block" : "none";
  // Validasi harus ada huruf kapital
  passwordMessages.capital = /[A-Z]/.test(password) ? "none" : "block";
  // Validasi harus ada simbol atau angka
  passwordMessages.symbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password) ? "none" : "block";
};

// Fungsi untuk validasi konfirmasi password
const confirm_passwordCheck = () => {
  const { password, konfirmasi_password } = signupData.value;

  // Reset pesan jika konfirmasi password kosong
  if (konfirmasi_password === "") {
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
    return;
  }

  // Cek kecocokan password
  if (password !== konfirmasi_password) {
    confirmPasswordDoesNotMatch.value = "block";
    confirmPasswordMatch.value = "none";
    return;
  }

  confirmPasswordDoesNotMatch.value = "none";
  confirmPasswordMatch.value = "block";
};

const locationStore = useLocationStore();  // Menggunakan Pinia store

// Set initial values for the selected dropdowns
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedSubDistrict = ref(null);
const selectedSchool = ref(null);

// Load the provinces when the component is mounted
onMounted(() => {
  locationStore.loadProvinces(); // Call to load provinces
});

// Watch for province changes and load the corresponding districts
watch(selectedProvince, (newProvinceId) => {
  locationStore.loadDistricts(newProvinceId);
  selectedDistrict.value = null; // Reset district when province changes
  selectedSubDistrict.value = null; // Reset sub-district when province changes
  selectedSchool.value = null; // Reset school when province changes
});

// Watch for district changes and load the corresponding sub-districts
watch(selectedDistrict, (newDistrictId) => {
  locationStore.loadSubDistricts(newDistrictId);
  selectedSubDistrict.value = null; // Reset sub-district when district changes
  selectedSchool.value = null; // Reset school when district changes
});

// Watch for sub-district changes and load the corresponding schools
watch(selectedSubDistrict, (newSubDistrictId) => {
  locationStore.loadSchools(newSubDistrictId);
  selectedSchool.value = null; // Reset school when sub-district changes
});
</script>

<template>
  <form @submit.prevent="register">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl">
          Register
        </CardTitle>
        <CardDescription>
          Masukkan informasi Anda untuk membuat akun
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <!-- Pilihan Peran -->
          <div class="grid gap-2">
            <Label for="peran">Peran</Label>
            <Select v-model="selectedPeran" @change="setPeran(selectedPeran)">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Pilih Peran" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Peran</SelectLabel>
                  <SelectItem value="student">
                    Siswa
                  </SelectItem>
                  <SelectItem value="parent">
                    Orang Tua
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- Informasi Pribadi -->
          <div v-if="selectedPeran === 'student' || selectedPeran === 'parent'" class="form_student grid gap-2">
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <Label for="first-name">First name</Label>
                <Input 
                id="first-name" 
                type="text"
                placeholder="Max" 
                v-model="signupData.firstName"
                required />
              </div>
              <div class="grid gap-2">
                <Label for="last-name">Last name</Label>
                <Input 
                id="last-name" 
                type="text"
                placeholder="Robinson" 
                v-model="signupData.lastName"
                required />
              </div>
            </div>

            <div class="grid gap-2">
              <Label for="email">Username</Label>
              <Input 
              id="username" 
              type="text" 
              placeholder="ex: maxrobinson" 
              v-model="signupData.username"
              required />
            </div>

            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              v-model="signupData.email"
              required />
            </div>

            <div class="grid gap-2">
              <Label for="gender">Jenis Kelamin</Label>
              <Select v-model="signupData.gender">
                <SelectTrigger class="w-[180px]">
                  <SelectValue placeholder="Pilih Jenis Kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="perempuan">Perempuan</SelectItem>
                    <SelectItem value="laki-laki">Laki Laki</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div class="grid gap-2">
              <Label for="notelp">Nomor Telepon</Label>
              <Input 
              id="notelp" 
              type="text" 
              placeholder="ex: 08123456789" 
              v-model="signupData.phoneNumber"
              required />
            </div>

            <div v-if="selectedPeran === 'student'" class="grid gap-2">
              <Label for="nis">NIS/NIM</Label>
              <Input 
              id="nis" 
              type="text" 
              placeholder="ex: 12345678" 
              v-model="signupData.nomorInduk"
              required />
            </div>

            <!-- Input Password dengan validasi -->
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input 
              id="password" 
              type="password"
              placeholder="Enter your chosen password"
              v-model="signupData.password"
              @input="passwordCheck"
              required />

              <!-- Pesan validasi password -->
              <p
                class="text-red-700 mt-1 fw-medium"
                style="font-size: 11px"
                :style="{ display: passwordMessages.length }"
              >
                Password harus minimal 8 karakter
              </p>
  
              <p
                class="text-red-700 mt-1 fw-medium"
                style="font-size: 11px"
                :style="{ display: passwordMessages.capital }"
              >
                Password harus diawali huruf kapital
              </p>
  
              <p
                class="text-red-700 mt-1 fw-medium"
                style="font-size: 11px"
                :style="{ display: passwordMessages.symbol }"
              >
                Password harus ada setidaknya 1 simbol/angka (@, $, &, dll)
              </p>
            </div>


            <!-- Input Konfirmasi Password -->
            <div class="grid gap-2">
              <Label for="konfirmasi_password">Konfimasi Password</Label>
              <Input 
              id="konfirmasi_password" 
              type="password"
              placeholder="Enter your confirm password"
              v-model="signupData.konfirmasi_password"
              @input="confirm_passwordCheck"
              required />

              <!-- Pesan validasi konfirmasi password -->
              <p
                class="text-red-700 mt-1 fw-medium"
                style="font-size: 11px"
                :style="{ display: confirmPasswordDoesNotMatch }"
              >
                Password dan Konfirmasi Password tidak cocok
              </p>

              <p
                class="text-green-700 mt-1 fw-medium"
                style="font-size: 11px"
                :style="{ display: confirmPasswordMatch }"
              >
                Password dan Konfirmasi Password cocok
              </p>
            </div>
          </div>

          <!-- Info Orang Tua -->
          <div v-if="selectedPeran === 'parent'" class="form_parent grid gap-2">
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <Label for="child-name">Nama Anak</Label>
                <Input 
                id="child-name" 
                type="text"
                placeholder="Lauren" 
                v-model="signupData.childName"
                required />
              </div>
              <div class="grid gap-2">
                <Label for="nis">NIS/NIM Anak</Label>
                <Input 
                id="nis" 
                type="text"
                placeholder="ex: 12345678" 
                v-model="signupData.childNomorInduk"
                required />
              </div>
            </div>
          </div>

          <!-- Province Dropdown -->
          <div class="grid gap-2">
            <Label for="province">Province</Label>
            <Select v-model="selectedProvince">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Pilih Provinsi" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Provinsi</SelectLabel>
                  <SelectItem v-for="province in locationStore.provinces" :key="province.id" :value="province.id">
                    {{ province.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- District Dropdown -->
          <div class="grid gap-2">
            <Label for="district">District</Label>
            <Select v-model="selectedDistrict" :disabled="!selectedProvince">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Pilih Kota/Kabupaten" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Kota/Kabupaten</SelectLabel>
                  <SelectItem v-for="district in locationStore.districts" :key="district.id" :value="district.id">
                    {{ district.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- Sub District Dropdown -->
          <div class="grid gap-2">
            <Label for="sub-district">Sub District</Label>
            <Select v-model="selectedSubDistrict" :disabled="!selectedDistrict">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Pilih Kecamatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Kecamatan</SelectLabel>
                  <SelectItem v-for="subDistrict in locationStore.subDistricts" :key="subDistrict.id" :value="subDistrict.id">
                    {{ subDistrict.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- Schools Dropdown -->
          <div class="grid gap-2">
            <Label for="school">Sekolah</Label>
            <Select v-model="selectedSchool" :disabled="!selectedSubDistrict">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Pilih Sekolah" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sekolah</SelectLabel>
                  <SelectItem v-for="school in locationStore.schools" :key="school.id" :value="school.id">
                    {{ school.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- Tombol Submit -->
          <Button type="submit" class="w-full">
            Register
          </Button>
        </div>

        <!-- Link Login -->
        <div class="mt-4 text-center text-sm">
          Sudah punya akun?
          <a href="#" class="underline">
            Login
          </a>
        </div>
      </CardContent>
    </Card>
  </form>
</template>
