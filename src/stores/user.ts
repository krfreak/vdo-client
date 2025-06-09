import axios from 'axios';
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useUserStore = defineStore('user', {
  state: () => ({
    me: Number,
  }),
  actions: {
    isAuthenticated() {
      return typeof this.me === 'number' && !isNaN(this.me);
    },
    async getMe() {
      const authStore = useAuthStore();
      await axios
        .get('http://localhost:3000/users/me', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })
        .then((res) => {
          this.me = res.data['id'];
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
