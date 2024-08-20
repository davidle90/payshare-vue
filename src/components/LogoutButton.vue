<template>
    <button @click="logout" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        methods: {
            logout() {
                localStorage.removeItem('authToken');
                this.$router.push({ name: 'login' });
            }
        }
    }
</script>