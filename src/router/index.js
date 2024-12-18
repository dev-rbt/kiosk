import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/IntroView.vue'
import OrderTypeSelectorView from '../views/OrderTypeSelectorView.vue'
import Menu from '../views/Menu.vue'
import CustomerQrView from '../views/CustomerQrView.vue'
import Basket from '../views/Basket.vue'
import Payment from '../views/Payment.vue'
import PaymentWaiting from '../views/PaymentWaiting.vue'
import PaymentSuccess from '../views/PaymentSuccess.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intro',
      component: IntroView
    },
    {
      path: '/customer-qr',
      name: 'customer-qr',
      component: CustomerQrView
    },
    {
      path: '/order-type-selection',
      name: 'order-type-selection',
      component: OrderTypeSelectorView
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/basket',
      name: 'basket',
      component: Basket
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    {
      path: '/payment-waiting',
      name: 'payment-waiting',
      component: PaymentWaiting
    },
    {
      path: '/payment-success',
      name: 'payment-success',
      component: PaymentSuccess
    }
  ]
})

export default router