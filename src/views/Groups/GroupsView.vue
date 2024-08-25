<template>
    <div v-if="group.attributes" class="text-white">

        <div v-if="!isEditing" class="flex justify-center items-center gap-4">
            <h1 class="text-center text-3xl">{{ groupName }}</h1>
            <button @click="startEditing" class="border px-2 py-1 text-xs hover:bg-gray-600">Edit</button>
        </div>

        <div v-else class="flex justify-center items-center gap-4">
            <input ref="editInput" v-model="editedName" class="text-center text-3xl bg-transparent w-1/4" />
            <button @click="saveChanges" class="border px-2 py-1 text-xs hover:bg-green-700">Save</button>
            <button @click="cancelEditing" class="border px-2 py-1 text-xs hover:bg-gray-600">Cancel</button>
        </div>

        <div class="flex justify-center items-center">
            <span>ID: {{ groupId }}</span>
        </div>

        <div class="flex justify-center my-5">
            <div>
                <div class="flex gap-4">
                    <span
                        v-for="member in members"
                        :key="member.id"
                        :title="member.attributes.name"
                        class="cursor-pointer flex items-center justify-center rounded-full border w-12 h-12 text-center hover:border-green-600 hover:text-green-600"
                        >
                            {{ member.attributes.name[0] }}
                    </span>
                    <!-- <span
                        title="Add member"
                        class="cursor-pointer flex items-center justify-center rounded-full border w-12 h-12 text-center text-2xl bg-gray-500 hover:bg-gray-600"
                        >
                            +
                    </span> -->
                </div>  
            </div>
        </div>

        <p v-if="errorMessage" class="text-red-500 mt-6">{{ errorMessage }}</p>

        <div class="flex justify-between mb-3 sm:mb-0">
            <div class="mb-4 sm:mb-4">
                <RouterLink :to="{ name: 'groups' }" class="border px-3 py-1 hover:bg-gray-600">Back</RouterLink>
            </div>
            <div class="sm:flex justify-end space-y-4 sm:space-y-0">
                <div>
                    <RouterLink :to="{ name: 'paymentsCreate' }" class="border px-3 py-1 hover:bg-gray-600">Add payment</RouterLink>
                </div>
                <div>
                    <span class="cursor-pointer border px-3 py-1 hover:bg-gray-600">Charts</span>
                </div>
                <div>
                    <span v-if="isResolved" @click="toggleResolved(false)" class="cursor-pointer border px-3 py-1 bg-green-700 hover:bg-green-800">Resolved</span>
                    <span v-else @click="toggleResolved(true)" class="cursor-pointer border px-3 py-1 hover:bg-gray-600">Resolve</span>
                </div>
                <div>
                    <span @click="deleteGroup" class="cursor-pointer border px-3 py-1 bg-red-600 hover:bg-red-700">Delete</span>
                </div>
                <div>
                    <span @click="leaveGroup" class="cursor-pointer border px-3 py-1 bg-purple-600 hover:bg-purple-700">Leave group</span>
                </div>
            </div> 
        </div>

        <div class="relative overflow-x-auto rounded-lg mb-5">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <th scope="col" class="px-6 py-3">Date</th>
                    <th scope="col" class="px-6 py-3">Label</th>
                    <th scope="col" class="px-6 py-3">Contributors</th>
                    <th scope="col" class="px-6 py-3">Participants</th>
                    <th scope="col" class="px-6 py-3">Total</th>
                </thead>
                <tbody>
                    <tr v-for="payment in payments" :key="payment.id" @click="goToUrl(payment.attributes.reference_id)" class="cursor-pointer bg-white border-b">
                        <td class="px-6 py-4">{{ formatDate(payment.attributes.createdAt) }}</td>
                        <td class="px-6 py-4">{{ payment.attributes.label}}</td>
                        <td class="px-6 py-4">
                            <span v-for="contributor in payment.includes.contributors" :key="contributor.id">
                                {{ contributor.attributes.name }}: {{ contributor.attributes.amount }},
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <span v-for="participant in payment.includes.participants" :key="participant.id">
                                {{ participant.attributes.name }}: {{ participant.attributes.amount }},
                            </span>
                        </td>
                        <td class="px-6 py-4">{{ payment.attributes.total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { getGroup, editGroup, deleteGroup, leaveGroup } from '@/api/payshare-api';
import { nextTick } from 'vue';

    export default {
        data() {
            return {
                group: [],
                members: [],
                payments: [],
                groupName: '',
                groupId: '',
                isEditing: false,
                errorMessage: '',
                isResolved: null,
            }
        },
        props: ['id'],
        async created() {
            const response = await getGroup(this.id);
            this.group = response.data;
            this.members = response.data.includes.members;
            this.payments = response.data.includes.payments;
            this.groupName = response.data.attributes.name;
            this.groupId = response.data.attributes.reference_id;
            this.isResolved = response.data.attributes.isResolved;
        },
        methods: {
            formatDate(dateString) {
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, '0');
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const month = monthNames[date.getMonth()];
                return `${day} ${month}`;
            },
            goToUrl(paymentId) {                
                this.$router.push({ name: 'paymentsView', params: { group_id: this.group.attributes.reference_id, payment_id: paymentId }})
            },
            startEditing() {
                this.isEditing = true;
                this.editedName = this.group.attributes.name;
                nextTick(() => {
                    // Focus the input field after the DOM update
                    this.$refs.editInput.focus();
                });
            },
            async saveChanges() {
                this.isEditing = false;
                const response = await editGroup(this.group.attributes.reference_id, this.editedName);

                this.groupName = response.data.attributes.name;
            },
            cancelEditing() {
                this.isEditing = false;
            },
            async deleteGroup() {
                const response = await deleteGroup(this.id);

                if(response.success){
                    return this.$router.push({ name: 'groups' });
                } else {
                    this.errorMessage = response.message;
                }
            },
            async leaveGroup() {
                const response = await leaveGroup(this.groupId);

                if(response.success){
                    return this.$router.push({ name: 'groups' });
                } else {
                    this.errorMessage = response.message;
                }
            },
            async toggleResolved(doResolve) {
                
                const resolve = doResolve ? true : false;
                const response = await editGroup(this.group.attributes.reference_id, this.groupName, resolve);
                this.isResolved = response.data.attributes.isResolved;
            }
        }
    }
</script>