import axios from "axios";

const config = useRuntimeConfig();
const appEnv = config.public.appEnv;

const baseURL = appEnv === 'local' 
  ? config.public.apiBaseUrlLocal 
  : config.public.apiBaseUrl;

const instance = axios.create({
  baseURL: baseURL,
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
});

instance.defaults.headers.common.Accept = "application/json";
instance.defaults.headers.common["Content-Type"] = "application/json";
instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default instance;