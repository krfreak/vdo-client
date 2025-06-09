import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth',{
  state: () => ({
    returnUrl: null,
    isLoggedIn: true
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
          console.log(res);
        })
        .catch((error) => {
          console.error(error)
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
          this.isLoggedIn = false;
      
          console.log(res);
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
})
