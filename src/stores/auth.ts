import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth',{
  state: () => ({
    token: "scgsdgsdg",
    returnUrl: null,
    isLoggedIn: false,
  }),
  actions: {
    async login(email: string, password: string) {
      await axios
        .post(
          'http://localhost:3000/auth/login',
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
          this.token = res.data['accessToken']
          console.log(res)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async logout() {
      await axios
        .delete('http://localhost:3000/auth/logout', {})
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
})
