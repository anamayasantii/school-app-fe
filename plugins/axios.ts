import instance from "@/lib/axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const baseUrl =
    config.public.appEnv === "local"
      ? config.public.apiBaseUrlLocal
      : config.public.apiBaseUrl;

  instance.defaults.baseURL = baseUrl || "";
});
