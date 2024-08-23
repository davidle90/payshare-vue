<template>
    <div class="w-4/5 mx-auto">
        <h1 class="text-white mb-4 text-2xl font-bold sm:text-4xl text-center">
            PayShare
        </h1>

        <div class="flex justify-between items-center mb-3">
            <RouterLink :to="{ name: 'groupsCreate' }" class="border px-3 py-1 text-white hover:bg-gray-600">Add group</RouterLink>
            <div>
                <p v-if="errorMessage" class="text-red-500 mt-6">{{ errorMessage }}</p>
                <input v-model="groupReferenceId" id="groupReferenceId" type="text" class="mr-2" placeholder="Enter group id...">
                <span @click="joinGroup" class="cursor-pointer border px-3 py-1 text-white hover:bg-gray-600">Join a group</span>
            </div>
            
        </div>
        
        <div class="relative overflow-x-auto rounded-lg">
            <table class="w-full text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            PayShare Group
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Latest Activities
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Your Expenses
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total Expenses
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="group in groups" :key="group.id" @click="goToUrl(group.attributes.reference_id)" class="cursor-pointer bg-white border-b">
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ group.attributes.name }}
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            todo
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            todo
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ group.attributes.totalExpenses }}
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            <span v-if="group.attributes.isResolved" class="text-green-600">Resolved</span>
                            <span v-else class="text-yellow-500">Active</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
    import { getUserData, joinGroup } from '@/api/payshare-api';    

    export default {
        data() {
            return {
                groups: [],
                groupReferenceId: '',
                errorMessage: '',
            }
        },
        async created() {
            const response = await getUserData();            
            this.groups = response.data.includes.groups;           
        },
        methods: {
            goToUrl(groupId) {
                this.$router.push({ name: 'groupsView', params: { id: groupId }})
            },
            async joinGroup() {      
                                
                const response = await joinGroup(this.groupReferenceId);

                if(response.success){
                    const response = await getUserData();            
                    this.groups = response.data.includes.groups;
                } else {
                    this.errorMessage = 'Group not found.';
                }
            }
        }
    }
</script>
