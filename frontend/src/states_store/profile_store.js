import { defineStore } from "pinia";
import { getPizzasId } from "@/common/helpers";
import resources from "../services/resources";

export const ProfileStore = defineStore("profile", {
  state: () => ({
    addresses: [],
    orders: [],
  }),
  getters: {
    getAddresses: (state) => {
      return state.addresses;
    },
    getOrders: (state) => {
      return state.orders;
    },
  },
  actions: {
    async order_add(order) {
      const order_p = {
        userId: order.userId,
        pizzas: order.pizzas,
        misc: order.misc,
        address: order.address,
        phone: order.phone,
      };
      const res = await resources.order.addOrder(order_p);
      if (res.__state !== "success") {
        return;
      } else {
        let newObject = {
          id: res.data.id,
          userId: res.data.userId,
          addressId: res.data.addressId,
          orderMisc: order.misc,
          orderPizzas: getPizzasId(order.pizzas),
          orderAddress: order.address,
        };
        this.orders.push(newObject);
      }
    },
    async order_drop(id) {
      const res = await resources.order.removeOrder(id);
      if (res.__state !== "success") {
        return;
      } else {
        this.orders = this.orders.filter((order) => order.id !== id);
      }
    },
    orders_clear() {
      this.orders = [];
    },
    async address_add(address) {
      const res = await resources.address.addAddress(address);
      if (res.__state !== "success") {
        return;
      } else {
        const data = res.data;
        this.addresses.push(data);
      }
    },
    async address_drop(id) {
      const res = await resources.address.removeAddress(id);
      if (res.__state !== "success") {
        return;
      } else {
        this.addresses = this.addresses.filter((address) => address.id !== id);
      }
    },
    async address_edit(address_created) {
      const res = await resources.address.updateAddress(address_created);
      if (res.__state !== "success") {
        return;
      } else {
        const index = this.addresses.findIndex(
          (address) => address.id === address_created.id
        );
        this.addresses.splice(index, 1, address_created);
      }
    },
    addresses_set(addresses) {
      this.addresses = addresses;
    },

    orders_set(orders) {
      this.orders = orders;
    },
    async adress_delete(id) {
      const res = await resources.address.removeAddress(id);
      if (res.__state !== "success") {
        return;
      } else {
        this.addresses = this.addresses.filter((address) => address.id !== id);
      }
    },
  },
});
