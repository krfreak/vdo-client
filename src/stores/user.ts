import axios from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    me: (() => {
      const stored = localStorage.getItem('me');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return { uuid: null, player: null };
        }
      }
      return { uuid: null, player: null };
    })(),
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
        this.me.uuid = res.data.id;
        this.me.player = res.data.player;
        localStorage.setItem('me', JSON.stringify(this.me));console.log(Number(res.data.layer.nation.leader.id) === Number(res.data.player.id))
      })
    },
  },
});
