<template>
        <div class="w-4/5 mx-auto py-12 my-5">
        <h1 class="text-center text-white">Payment Create</h1>
        <div class="mb-3">
            <RouterLink :to="{ name: 'groupsView', params: { id: groupId } }" class="border px-3 py-1 text-white hover:bg-gray-600">Back</RouterLink>
        </div>
        <form @submit.prevent="createPayment">
            <div class="mb-4">
                <label class="block text-white text-sm font-bold mb-2" for="payment_label">Label</label>
                <input v-model="payment_label" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="payment_label" type="text" required>
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
    import { createPayment, getGroup } from '@/api/payshare-api';

    export default {
        data() {
            return {
                payment_label: '',
                errorMessage: '',
                members: [],
                contributors: [{ "id": 1, "amount": 500 }],
                participants: [{ "id": 11 }],
            };
        },
        async created() {
            const response = await getGroup(this.groupId);
            this.members = response.data.includes.members;
        },
        computed: {
            groupId() {
                return this.$route.params.id;
            }
        },
        methods: {
            async createPayment() {
                const response = await createPayment(this.groupId, payment_label.value, this.contributors, this.participants);

                if(response.success){
                    return this.$router.push({name: 'groupsView', id: this.groupId });
                } else {
                    this.errorMessage = response.message;
                }      
            }
        }
    }
</script>