import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth',{
  state: () => ({
    returnUrl: null,
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  }),
  actions: {
    async login(email: string, password: string) {
      const baseUrl = import.meta.env.VITE_VDGO_BASE_URL;
      await axios
        .post(
          `${baseUrl}/auth/login`,
          {
            email: email,
            password: password
          },
          {
            withCredentials: true,
            headers: {
              Authorization: true
            }
          }
        )
        .then((res) => {
          localStorage.setItem('isLoggedIn', 'true');
          this.isLoggedIn = true;
        })
    },
    async logout() {
      const baseUrl = import.meta.env.VITE_VDGO_BASE_URL;
      await axios
        .post(`${baseUrl}/auth/logout`, 
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('me');
          this.isLoggedIn = false;
        })
     }
  }
})
