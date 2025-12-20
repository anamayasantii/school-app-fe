import instance from "@/lib/axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  instance.defaults.baseURL = config.public.apiBaseUrl as string;
});
