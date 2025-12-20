import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.NUXT_API_BASE_URL || 'http://103.150.226.108/api',
    validateStatus: (status) => {
        if(status >= 200 && status < 300){
            return true
        }

        return false
    }
})

axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";

// Request interceptor untuk mengirim token dari cookies
instance.interceptors.request.use(
  (config) => {
    // Ambil token dari cookies
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance