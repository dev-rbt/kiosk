import { defineStore } from 'pinia';
import { apiService } from '@/services/api.service';
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
    const menuData = ref([])
    const menu = ref([])
    const modifiers = ref([])
    const exchange = ref({})
    const paymentMethods = ref([])
    const loading = ref(false)
    const error = ref('')

    const fetchMenu = async () => {

        loading.value = true;
        error.value = null;

        try {
            const data = await apiService.getKioskMenuData()

            menuData.value = data
            menu.value = data.Menu
            modifiers.value = data.Modifiers
            exchange.value = data.Exchange
            paymentMethods.value = data.PaymentMethods

            localStorage.setItem('menu', JSON.stringify(data))
        } catch (error) {
            error.value = error.message;
            console.error('Store error:', error);
        } finally {
            loading.value = false;
        }

    }

    const getMenu = () => JSON.parse(localStorage.getItem('menu')).Menu
    const getModifiers = () => JSON.parse(localStorage.getItem('menu')).Modifiers
    const getExchange = () => JSON.parse(localStorage.getItem('menu')).Exchange
    const getPaymentMethods = () => JSON.parse(localStorage.getItem('menu')).PaymentMethods

    return { 
        menuData,
        menu,
        modifiers,
        exchange,
        paymentMethods,

        loading,
        error,
        
        fetchMenu,
        getMenu,
        getModifiers,
        getExchange,
        getPaymentMethods
    }
})