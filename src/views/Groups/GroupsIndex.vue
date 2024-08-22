<template>
    <div class="w-4/5 mx-auto">
        <h1 class="text-white mb-4 text-2xl font-bold sm:text-4xl text-center">
            PayShare
        </h1>

        <div class="mb-3">
            <RouterLink :to="{ name: 'groupsCreate' }" class="border px-3 py-1 text-white hover:bg-gray-600">Add group</RouterLink>
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
    import { getAllGroups } from '@/api/payshare-api';    

    export default {
        data() {
            return {
                groups: [],
            }
        },
        async created() {
            const response = await getAllGroups();
            this.groups = response.data;           
        },
        methods: {
            goToUrl(groupId) {
                this.$router.push({ name: 'groupsView', params: { id: groupId }})
            }
        }
    }
</script>
