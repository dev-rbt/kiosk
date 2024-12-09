<template>

    <div class="customer-qr-view">

        <div class="logo">
            <Logo :width="200" />
        </div>


        <div class="selector-1">


            
        </div>


        <div class="selector-2">

        </div>

    </div>

    <BottomNav />

</template>


<script setup>

import BottomNav from '../components/BottomNav.vue'
import Logo from '../components/icons/Logo.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goWithoutQr = () => {

    router.push({ name: 'order-type-selection' });

};

</script>


<style scoped>
.customer-qr-view {
    width: 100vw;
    display: flex;
    flex-direction: column;
}

.customer-qr-view .logo {
    flex: 1;
    background-color: #000;
    display: flex;
    justify-content: center;
}

.customer-qr-view .logo svg {
    margin: 1rem 0;
}

.customer-qr-view .selector-1 {
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: center;
}


.customer-qr-view .selector-1 button {
    padding: 2rem 3rem;
    font-size: 2rem;
    font-weight: 700;
    background-color: #fff;
    border-radius: 1.5rem;
    color: orange;
    border-color: orange;
}

.customer-qr-view .selector-1 button:active {
    background-color: orange;
    color: #fff;
}

.customer-qr-view .selector-2 {
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid orange
}

.customer-qr-view .selector-2 button {
    padding: 2rem 3rem;
    font-size: 2rem;
    font-weight: 700;
    background-color: orange;
    border-radius: 1.5rem;
    color: #413d3d;
    border-color: #ac4800;
}

.customer-qr-view .selector-2 button:active {
    background-color: rgb(206, 134, 0);
}
</style>