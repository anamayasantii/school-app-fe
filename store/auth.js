import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import axios from '@/lib/axios'; // Pastikan Anda menggunakan file axios kustom di sini

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    tokenExpiry: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  }),

  actions: {
    async login(credentials) {
      this.isLoading = true;
      this.error = null;

      try {
        // Validasi input
        if (!credentials.email || !credentials.password) {
          this.error = "Email dan password harus diisi";
          return { success: false, message: this.error };
        }

        const response = await axios.post('/login', {
          email: credentials.email,
          password: credentials.password
        });

        const result = response.data;

        if (result.status === 'success') {
          // Memanggil fungsi setAuth jika login berhasil
          this.setAuth(result.data.user, result.data.token, result.data.expiresAt);
          return { success: true, message: 'Login berhasil!', data: result.data };
        } else {
          this.error = result.message || 'Login gagal';
          return { success: false, message: this.error };
        }

      } catch (error) {
        console.error('Error during login:', error);
        this.error = 'Terjadi kesalahan saat login';
        return { success: false, message: this.error };
      } finally {
        this.isLoading = false;
      }
    },

    async register(signupData) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.post('/register', signupData);

        const result = response.data;

        if (result.token) {
          // Memanggil fungsi setAuth jika registrasi berhasil
          this.setAuth(result.user, result.token, result.expiresAt);
          return { success: true, message: 'Register berhasil! Silakan login.', data: result };
        } else {
          this.error = result.message || 'Register gagal';
          return { success: false, message: this.error };
        }

      } catch (error) {
        console.error('Error:', error);
        this.error = 'Terjadi kesalahan saat register';
        return { success: false, message: this.error };
      } finally {
        this.isLoading = false;
      }
    },

    setAuth(user, token, expiresAt = null) {
      this.user = user;
      this.token = token;
      this.tokenExpiry = expiresAt;
      this.isAuthenticated = true;

      // Simpan token di cookie dan set masa berlakunya
      Cookies.set('authToken', token, { expires: 7 }); // 7 hari

      // Set token ke axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    logout() {
      this.user = null;
      this.token = null;
      this.tokenExpiry = null;
      this.isAuthenticated = false;

      // Hapus token dari cookie
      Cookies.remove('authToken');

      // Hapus token dari axios
      delete axios.defaults.headers.common['Authorization'];
    },

    initializeAuth() {
      const token = Cookies.get('authToken');
      const user = localStorage.getItem('user'); // Atau ambil dari state lainnya

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.isAuthenticated = true;
        return true;
      }
      return false;
    },

    isTokenValid() {
      return !!this.token; // Cek apakah token ada
    },

    clearError() {
      this.error = null;
    }
  }
});