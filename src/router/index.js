import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/IntroView.vue'

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
      component: () => import('../views/CustomerQrView.vue')
    },
    {
      path: '/order-type-selection',
      name: 'order-type-selection',
      component: () => import('../views/OrderTypeSelectorView.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/Menu.vue')
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import('../views/Basket.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/Payment.vue')
    },
    {
      path: '/payment-waiting',
      name: 'payment-waiting',
      component: () => import('../views/PaymentWaiting.vue')
    },
    {
      path: '/payment-success',
      name: 'payment-success',
      component: () => import('../views/PaymentSuccess.vue')
    }
  ]
})

export default router
