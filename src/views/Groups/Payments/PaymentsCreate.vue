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
            <div class="flex gap-8 text-white mt-6">
                <div class="border p-4">
                    <h1 class="text-center mb-4">Contributors:</h1>
                    <div v-for="member in members" :key="member.id" class="mb-4">
                        <div>
                            <input 
                                type="checkbox" 
                                :value="member.id" 
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                @change="toggleContributor(member.id)"
                            >
                            <label 
                                class="ms-2 text-sm font-medium text-gray-200"
                            >{{ member.attributes.name }}</label>
                        </div>
                        <input 
                            type="number" 
                            min="0" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-1 ml-2"
                            @input="updateContribution(member.id, $event.target.value)"
                        >
                    </div>
                </div>
                <div class="border p-4">
                    <h1 class="text-center mb-4">Particpants:</h1>
                    <div v-for="member in members" :key="member.id" class="mb-4">
                        <div>
                            <input 
                                type="checkbox" 
                                :value="member.id" 
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                @change="toggleParticipant(member.id)"
                            >
                            <label 
                                class="ms-2 text-sm font-medium text-gray-200"
                            >{{ member.attributes.name }}</label>
                        </div>
                        <input 
                            type="number" 
                            min="0" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-1 ml-2"
                            @input="updateExpenses(member.id, $event.target.value)"
                        >
                    </div>
                </div>
            </div>
            <div class="mt-6">
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
                contributors: [],
                participants: [],
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
            // Method to toggle participant selection
            toggleContributor(contributorId) {
                const index = this.contributors.findIndex(p => p.id === contributorId);
                if (index === -1) {
                    // Add the participant with default amount 0 if not already in the array
                    this.contributors.push({ id: contributorId, amount: 0 });
                } else {
                    // Remove the participant if already in the array
                    this.contributors.splice(index, 1);
                }
            },
            toggleParticipant(participantId) {
                const index = this.participants.findIndex(p => p.id === participantId);
                if (index === -1) {
                    // Add the participant with default amount 0 if not already in the array
                    this.participants.push({ id: participantId, amount: 0 });
                } else {
                    // Remove the participant if already in the array
                    this.participants.splice(index, 1);
                }
            },

            // Method to update the amount for a participant
            updateContribution(contributorId, value) {
                const parsedValue = parseFloat(value) || 0;

                // Find the participant by ID and update the amount
                const contributor = this.contributors.find(p => p.id === contributorId);
                if (contributor) {
                    contributor.amount = parsedValue;
                } else {
                    // If the participant is not in the array (e.g., if unchecked then re-checked), add them
                    this.contributors.push({ id: contributorId, amount: parsedValue });
                }
            },
            // Method to update the amount for a participant
            updateExpenses(participantId, value) {
                const parsedValue = parseFloat(value) || 0;

                // Find the participant by ID and update the amount
                const participant = this.participants.find(p => p.id === participantId);
                if (participant) {
                    participant.amount = parsedValue;
                } else {
                    // If the participant is not in the array (e.g., if unchecked then re-checked), add them
                    this.participants.push({ id: participantId, amount: parsedValue });
                }
            },
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