<template>
    <div class="w-full max-w-xs">
        <form @submit.prevent="login" class="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" required>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" required>
            </div>
            <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Login
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                </a>
            </div>
        </form>

        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    </div>
</template>

<script>
    import { login } from '../api/payshare-api';

    export default {
        data() {
            return {
                email: '',
                password: '',
                errorMessage: '',
            };
        },
        methods: {
            async login() {
                const response = await login(email.value, password.value);
                if(response.success){
                    return this.$router.push('/');
                } else {
                    this.errorMessage = response.message;
                }          
            }
        }
    };
</script>