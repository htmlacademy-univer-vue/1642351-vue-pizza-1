import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    auth: "",
    errorMessage: null,
    whoAmIData: {},
  }),
  getters: {},
  actions: {
    login(data) {
      return fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((el) => {
          el.error
            ? (this.errorMessage = el.error.message)
            : (this.errorMessage = null);
          this.auth = el.token;
        });
    },
    whoAmI() {
      return fetch("api/whoAmI", {
        headers: {
          Authorization: `Bearer ${this.auth ?? ""}`,
        },
      })
        .then((el) => el.json())
        .then((el) => (this.whoAmIData = el))
        .catch((e) => (this.whoAmIData = e));
    },
    logout() {},
  },
});
