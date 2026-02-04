import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '/app.vue';
import router from './router'; 
import { useAuthStore } from '@/store/auth';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const authStore = useAuthStore();
const isValidSession = authStore.initializeAuth();

router.isReady().then(() => {
  if (!isValidSession && router.currentRoute.value.path !== '/auth/login') {
    router.push('/auth/login');
  }
});

app.mount('#app');