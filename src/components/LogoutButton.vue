<template>
    <button @click="logout" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        <slot></slot>
    </button>
</template>

<script>
import { logout } from '@/api/payshare-api';


    export default {
        methods: {
            async logout() {
                const response = await logout();
                localStorage.removeItem('authToken');
                localStorage.removeItem('user_reference');
                this.$router.push({ name: 'login' });
            }
        }
    }
</script>