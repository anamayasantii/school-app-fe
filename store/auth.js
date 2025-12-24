import { defineStore } from "pinia";
import axios from "@/lib/axios";
import { ref, computed } from "vue";

import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const isLoggedIn = computed(() => {
  const token = Cookies.get("token");
  console.log('isLoggedIn check - token:', !!token, 'user:', !!user.value);
  return !!token;
});

  const initAuth = async () => {
    await fetchUser();
  };

  const setAuthToken = (token, expiresAt) => {
    Cookies.set("token", token, {
      expires: new Date(expiresAt),
      secure: true,
      sameSite: "strict",
    });
  };

  const fetchUser = async () => {
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
