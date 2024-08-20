<template>
    <div class="w-4/5 mx-auto">
        <h1 class="text-white mb-4 text-2xl font-bold sm:text-4xl text-center">
            PayShare
        </h1>

        <div class="mb-3">
            <a href="/groups/create" class="border px-3 py-1 text-white">Create group</a>
        </div>
        
        <div class="relative overflow-x-auto rounded-lg">
            <table class="w-full text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            PayShare Group
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="group in groups" :key="group.id" class="cursor-pointer bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ group.attributes.name }}
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
    import { getGroups } from '@/api/payshare-api';    

    export default {
        data() {
            return {
                groups: [],
            }
        },
        async created() {
            const response = await getGroups();
            this.groups = response.data;            
        }
    }
</script>
