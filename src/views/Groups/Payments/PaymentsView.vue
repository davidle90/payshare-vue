<template>
    <div v-if="payment.attributes">

        <div v-if="!isEditing" class="flex justify-center items-center gap-4">
            <h1 class="text-center text-3xl text-white">{{ paymentLabel }}</h1>
            <button @click="startEditing" class="border px-2 py-1 text-xs">Edit</button>
        </div>

        <div v-else class="flex justify-center items-center gap-4">
            <input ref="editInput" v-model="editedLabel" class="text-center text-3xl bg-transparent w-1/4" />
            <button @click="saveChanges" class="border px-2 py-1 text-xs">Save</button>
            <button @click="cancelEditing" class="border px-2 py-1 text-xs">Cancel</button>
        </div>

        <div class="mb-3">
            <RouterLink :to="{ name: 'groupsView', params: { id: groupId } }" class="border px-3 py-1 text-white">Back</RouterLink>
        </div>

        <div class="flex justify-center items-center gap-8 text-white mt-6">
            <div class="border p-4">
                <h1>Contributors:</h1>
                <ul>
                    <li v-for="member in members" :key="member.id">{{ member.attributes.name }}</li>
                </ul>
            </div>
            <div class="border p-4">
                <h1>Particpants:</h1>
                <ul>
                    <li v-for="member in members" :key="member.id">{{ member.attributes.name }}</li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import { deletePayment, editPayment, getPayment } from '@/api/payshare-api';
import { nextTick } from 'vue';

export default {
    data() {
        return {
            payment: [],
            members: [],
            group: [],
            contributors: [{ "id": 11, "amount": 500 }, { "id": 1, "amount": 100 }],
            participants: [{ "id": 1 }, { "id": 2 }],
            paymentLabel: '',
            isEditing: false,
            errorMessage: '',
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
        // this.contributors = response.data.includes.contributors;
        // this.participants = response.data.includes.participants;
        this.paymentLabel = response.data.attributes.label;
    },
    methods: {
        formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        return `${day} ${month}`;
        },
        startEditing() {
            this.isEditing = true;
            this.editedLabel = this.payment.attributes.label;
            nextTick(() => {
                // Focus the input field after the DOM update
                this.$refs.editInput.focus();
            });
        },
        async saveChanges() {
            this.isEditing = false;
            const response = await editPayment(this.group.attributes.reference_id, this.payment.attributes.reference_id, this.editedLabel, this.contributors, this.participants);
            this.paymentLabel = response.data.attributes.label;
        },
        cancelEditing() {
            this.isEditing = false;
        },
        async deletePayment() {
            //const response = await deletePayment(this.id);

            if(response.success){
            // return this.$router.push({ name: 'groupsView' });
            } else {
            // this.errorMessage = response.message;
            }
        }
    }
}
</script>