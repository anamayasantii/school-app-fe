import { defineStore } from "pinia";
import axios from "@/lib/axios";
import { ref, computed } from "vue";

import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const isLoggedIn = computed(() => {
    if (process.server) return false;
    
    const token = Cookies.get("token");
    console.log('isLoggedIn check - token:', !!token, 'user:', !!user.value);
    return !!token && !!user.value;
  });

  const initAuth = async () => {
    if (process.server) return;
    await fetchUser();
  };

  const setAuthToken = (token, expiresAt) => {
    if (process.server) return;
    
    Cookies.set("token", token, {
      expires: new Date(expiresAt),
      secure: true,
      sameSite: "strict",
    });
  };

  const fetchUser = async () => {
    if (process.server) return null;
    
    try {
      const token = Cookies.get("token");

      if (!token) {
        user.value = null;
        return null;
      }

      const { data: result } = await axios.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (result.status === "success") {
        user.value = result.data;
        return user.value;
      }

      return null;
    } catch (error) {
      console.error("Fetch user error:", error);

      if (error.response?.status === 401) {
        logout();
      }

      return null;
    }
  };

  const logout = () => {
    if (process.server) return;
    
    Cookies.remove("token");
    user.value = null;
  };

  return {
    user,
    isLoggedIn,
    fetchUser,
    logout,
    initAuth,
    setAuthToken,
  };
});