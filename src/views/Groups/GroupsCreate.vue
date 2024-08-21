<template>
    <div class="w-4/5 mx-auto py-12 my-5">
        <h1 class="text-center text-white">Groups Create</h1>
        <div class="mb-3">
            <RouterLink :to="{ name: 'groups' }" class="border px-3 py-1 text-white">Back</RouterLink>
        </div>
        <form @submit.prevent="createGroup">
            <div class="mb-4">
                <label class="block text-white text-sm font-bold mb-2" for="group_name">Group Name</label>
                <input v-model="group_name" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="group_name" type="text" required>
            </div>
            <div class="flex items-center justify-between mt-6">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Save
                </button>
            </div>
        </form>

        <p v-if="errorMessage" class="text-red-500 mt-6">{{ errorMessage }}</p>
    </div>
</template>

<script>
    import { createGroup } from '@/api/payshare-api';

    export default {
        data() {
            return {
                group_name: '',
                errorMessage: ''
            };
        },
        methods: {
            async createGroup() {
                const response = await createGroup(group_name.value);

                if(response.success){
                    return this.$router.push({name: 'groups'});
                } else {
                    this.errorMessage = response.message;
                }      
            }
        }
    }
</script>