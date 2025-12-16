import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '/app.vue'; // Tambahkan './' untuk menghindari kesalahan
import router from './router'; 
import { useAuthStore } from '@/store/auth';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// ✅ Initialize auth store + handle expired token
const authStore = useAuthStore();
const isValidSession = authStore.initializeAuth(); // Satu panggilan untuk initializeAuth

// ✅ Jika token expired atau tidak ada, redirect ke login
router.isReady().then(() => {
  if (!isValidSession && router.currentRoute.value.path !== '/auth/login') {
    router.push('/auth/login');
  }
});

app.mount('#app');