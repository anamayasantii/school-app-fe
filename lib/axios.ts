import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NUXT_PUBLIC_BASE_URL || process.env.NUXT_PUBLIC_BASE_URL_LOCAL,
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
});

instance.defaults.headers.common.Accept = "application/json";
instance.defaults.headers.common["Content-Type"] = "application/json";
instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default instance;