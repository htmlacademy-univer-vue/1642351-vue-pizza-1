import { defineStore } from "pinia";
import resources from "../services/resources";
import jwtService from "../services/jwt/jwt.service";
import { ProfileStore } from "../states_store/";

export const AuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated() {
      return !!this.user;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },

    async login(credentials) {
      const res = await resources.auth.login(credentials);
      if (res.__state === "success") {
        jwtService.saveToken(res.data.token);
        return res.__state;
      } else {
        return res.data.message;
      }
    },

    async logout() {
      await resources.auth.logout();
      jwtService.destroyToken();
      resources.auth.setAuthHeader("");
      this.user = null;
    },

    async whoAmI() {
      resources.auth.setAuthHeader(jwtService.getToken());
      const profile_store = ProfileStore();

      const res_whoAmI = await resources.auth.whoAmI();
      if (res_whoAmI.__state !== "success") {
        await this.logout();
        return;
      } else {
        this.setUser(res_whoAmI.data);
      }

      const res_address = await resources.address.getAddresses();
      if (res_address.__state !== "success") {
        await this.logout();
        return;
      } else {
        profile_store.addresses_set(res_address.data);
      }

      const res_orders = await resources.order.getOrders();
      if (res_orders.__state !== "success") {
        await this.logout();
      } else {
        profile_store.orders_set(res_orders.data);
      }
    },
  },
});
