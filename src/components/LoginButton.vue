<template>
    <button @click="login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        <slot></slot>
    </button>
</template>

<script>
import { payshareLogin } from '@/api/payshare-api';

    export default {
        methods: {
            async login() {
                const response = await payshareLogin('admin@admin.com', 'password');
                if(response.success){
                    return this.$router.push('/');
                }
            }
        }
    }
</script>