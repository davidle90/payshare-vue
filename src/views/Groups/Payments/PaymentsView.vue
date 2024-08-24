<template>
    <div v-if="payment.attributes">
        <div class="flex justify-between mb-3 text-white">
            <div>
                <RouterLink :to="{ name: 'groupsView', params: { id: groupId } }" class="border px-3 py-1 hover:bg-gray-600">Back</RouterLink>
            </div>
            <div>
                <span @click="deletePayment" class="cursor-pointer border px-3 py-1 bg-red-600 hover:bg-red-700">Delete</span>
            </div>
        </div>
        
        <form @submit.prevent="saveChanges">
            <div class="mb-4">
                <label class="block text-white text-sm font-bold mb-2" for="payment_label">Label</label>
                <input v-model="paymentLabel" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="payment_label" type="text" required>
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
                                :checked="isContributor(member.id)"
                            >
                            <label 
                                class="ms-2 text-sm font-medium text-gray-200"
                            >{{ member.attributes.name }}</label>
                        </div>
                        <input 
                            type="number" 
                            min="0" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-1 ml-2"
                            v-model.number="contributorAmounts[member.id]"
                            @input="updateContribution(member.id, contributorAmounts[member.id])"
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
                                :checked="isParticipant(member.id)"
                            >
                            <label 
                                class="ms-2 text-sm font-medium text-gray-200"
                            >{{ member.attributes.name }}</label>
                        </div>
                        <input 
                            type="number" 
                            min="0" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-1 ml-2"
                            v-model.number="participantAmounts[member.id]"
                            @input="updateExpenses(member.id, participantAmounts[member.id])"
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
        <p v-if="successMessage" class="text-green-500 mt-6">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-500 mt-6">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { deletePayment, editPayment, getPayment } from '@/api/payshare-api';

export default {
    data() {
        return {
            payment: [],
            members: [],
            group: [],
            contributors: [],
            participants: [],
            paymentLabel: '',
            isEditing: false,
            errorMessage: '',
            successMessage: '',
            contributorAmounts: {},
            participantAmounts: {}
        }
    },
    computed: {
        groupId() {
            return this.$route.params.group_id;
        },
    },
    props: ['group_id', 'payment_id'],
    async created() {       
        const response = await getPayment(this.group_id, this.payment_id);

        this.payment = response.data;
        this.members = response.data.includes.group.includes.members;
        this.group = response.data.includes.group;
        this.paymentLabel = response.data.attributes.label;

        response.data.includes.contributors.forEach((contributor, index) => {
            this.contributors[index] = {
                id: contributor.attributes.member_id,
                amount: contributor.attributes.amount
            };

            this.contributorAmounts[contributor.attributes.member_id] = contributor.attributes.amount;
        });

        response.data.includes.participants.forEach((participant, index) => {
            this.participants[index] = {
                id: participant.attributes.member_id,
                amount: participant.attributes.amount
            };

            this.participantAmounts[participant.attributes.member_id] = participant.attributes.amount;
        });        
    },
    methods: {
        isContributor(contributorId) {
            return this.contributors.some(contributor => contributor.id === contributorId);
        },
        isParticipant(participantId) {
            return this.participants.some(participant => participant.id === participantId);
        },
        updateContribution(contributorId, value) {
            const parsedValue = parseFloat(value) || 0;

            this.contributorAmounts[contributorId] = parsedValue;

            const contributor = this.contributors.find(p => p.id === contributorId);
            if (contributor) {
                contributor.amount = parsedValue;
            } else {
                this.contributors.push({ id: contributorId, amount: parsedValue });
            }
        },
        updateExpenses(participantId, value) {
            const parsedValue = parseFloat(value) || 0;

            // Update the participantAmounts object
            this.participantAmounts[participantId] = parsedValue;

            // Also, update the participants array if needed
            const participant = this.participants.find(p => p.id === participantId);
            if (participant) {
                participant.amount = parsedValue;
            } else {
                // If the participant is not in the array, add them
                this.participants.push({ id: participantId, amount: parsedValue });
            }
        },
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
        async saveChanges() {
            const response = await editPayment(this.group.attributes.reference_id, this.payment.attributes.reference_id, this.paymentLabel, this.contributors, this.participants);
            if(response.success){
                this.successMessage = response.message;
            }       
        },
        async deletePayment() {
            const response = await deletePayment(this.group_id, this.payment_id);

            if(response.success){
                return this.$router.push({ name: 'groupsView', params: { id: this.group_id } });
            } else {
                this.errorMessage = response.message;
            }
        }
    }
}
</script>