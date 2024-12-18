import { defineStore } from "pinia";
import { apiService } from "@/services/api.service";
import { ref } from "vue";

export const useMenuStore = defineStore("menu", () => {
  const menuData = ref([]);
  const menu = ref([]);
  const modifiers = ref([]);
  const exchange = ref({});
  const paymentMethods = ref([]);

  const fetchMenu = async () => {

      const menuLastUpdateDateTime = getMenuLastUpdateDateTime();

      const data = await apiService.getKioskMenuData(menuLastUpdateDateTime);

      // Tarih eşit değilse verileri tekrar al
      if (menuLastUpdateDateTime !== data.MenuLastUpdateDateTime) {
        menuData.value = data;
        menu.value = data.Menu;
        modifiers.value = data.Modifiers;
        exchange.value = data.Exchange;
        paymentMethods.value = data.PaymentMethods;

        localStorage.setItem("menu", JSON.stringify(data));
      }
  };

  const getMenu = () => JSON.parse(localStorage.getItem("menu") ?? "{}").Menu;
  const getModifiers = () =>
    JSON.parse(localStorage.getItem("menu") ?? "{}").Modifiers;
  const getExchange = () =>
    JSON.parse(localStorage.getItem("menu") ?? "{}").Exchange;
  const getPaymentMethods = () =>
    JSON.parse(localStorage.getItem("menu") ?? "{}").PaymentMethods;
  const getMenuLastUpdateDateTime = () =>
    JSON.parse(localStorage.getItem("menu") ?? "{}")?.MenuLastUpdateDateTime ?? "2000-01-01";

  return {
    menuData,
    menu,
    modifiers,
    exchange,
    paymentMethods,

    fetchMenu,
    getMenu,
    getModifiers,
    getExchange,
    getPaymentMethods,
  };
});
