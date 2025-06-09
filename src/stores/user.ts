import axios from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    me: null,
  }),
  actions: {
    async getMe() {
      const baseUrl = import.meta.env.VITE_VDGO_BASE_URL;
      await axios
      .get(`${baseUrl}/users/me`, 
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        this.me = res.data.id;
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    },
  },
});
