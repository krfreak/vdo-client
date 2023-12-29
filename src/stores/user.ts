import axios from 'axios';
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    me: Number,
  }),
  actions: {
    isAuthenticated() {
      return this.me === typeof Number;
    },
    async getMe() {
      const authStore = useAuthStore();
      const me = await axios
        .get('http://localhost:3000/users/me', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })
        .then((res) => {
          this.me = res['id'];
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
